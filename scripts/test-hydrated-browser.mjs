/**
 * Real Chromium hydration QA for the built Next.js preview.
 *
 * Zero providers: all browser requests not directed at local GET/HEAD are
 * intercepted and failed before network. No contact/chat submission is made.
 * Phone hardware keyboards, screen readers and authenticated Vercel preview
 * remain separate acceptance gates.
 */
import assert from "node:assert/strict";
import {spawn, spawnSync} from "node:child_process";
import {existsSync, mkdtempSync, readFileSync, rmSync} from "node:fs";
import {join} from "node:path";
import {tmpdir} from "node:os";
import {setTimeout as delay} from "node:timers/promises";

const origin = "http://127.0.0.1:43272";
const profile = mkdtempSync(join(tmpdir(), "marketech-chrome-qa-"));
let next, chrome, socket, nextLogs = "", blockedExternal = 0, blockedWrites = 0;
const browserErrors = [];
const debug = (child, callback) => {
  for (const stream of [child.stdout, child.stderr])
    stream?.on("data", chunk => callback(chunk.toString("utf8")));
};
const mustPoll = async (predicate, label, max = 20000) => {
  const until = Date.now() + max;
  while (Date.now() < until) {
    try { const value = await predicate(); if (value) return value; } catch {}
    await delay(125);
  }
  throw new Error("Timeout: " + label);
};
function chromeBin() {
  for (const name of ["google-chrome", "chromium", "chromium-browser"]) {
    if (spawnSync("which", [name]).status === 0) return name;
  }
  throw new Error("Real Chromium missing: browser acceptance cannot be replaced by source checks");
}
async function nextServer() {
  next = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start",
    "--hostname", "127.0.0.1", "--port", "43272"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {...process.env, RESEND_API_KEY: "", OPENAI_API_KEY: "",
      NEXT_TELEMETRY_DISABLED: "1", NODE_ENV: "production"}
  });
  debug(next, msg => {nextLogs = (nextLogs + msg).slice(-1200);});
  await mustPoll(async () => {
    if (next.exitCode !== null) throw new Error("Next server exited");
    return (await fetch(origin, {signal: AbortSignal.timeout(1800)})).status === 200;
  }, "built Next server");
}
async function browser() {
  chrome = spawn(chromeBin(), [
    "--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu",
    "--disable-background-networking", "--disable-sync", "--disable-extensions",
    "--no-default-browser-check", "--no-first-run", "--no-proxy-server",
    "--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1",
    "--remote-debugging-port=0", "--remote-allow-origins=*",
    "--user-data-dir=" + profile, "about:blank"
  ], {stdio: ["ignore", "pipe", "pipe"]});
  debug(chrome, () => {});
  const portFile = join(profile, "DevToolsActivePort");
  const lines = await mustPoll(() => {
    if (chrome.exitCode !== null) throw new Error("Chromium exited");
    return existsSync(portFile) && readFileSync(portFile, "utf8");
  }, "Chromium DevTools listener");
  const port = Number(lines.split("\n")[0]);
  assert.ok(Number.isSafeInteger(port) && port > 0, "DevTools port invalid");
  const tabs = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
  const page = tabs.find(t => t.type === "page" && t.webSocketDebuggerUrl);
  assert.ok(page, "Chromium did not expose a browser page");
  socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let counter = 0;
  function cdp(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++counter;
      const timer = setTimeout(() => {
        pending.delete(id); reject(new Error("CDP timeout " + method));
      }, 15000);
      pending.set(id, {resolve, reject, timer});
      socket.send(JSON.stringify({id, method, params}));
    });
  }
  socket.addEventListener("message", event => {
    let msg;
    try {msg = JSON.parse(event.data);} catch {return;}
    if (msg.id) {
      const p = pending.get(msg.id);
      if (!p) return;
      clearTimeout(p.timer); pending.delete(msg.id);
      if (msg.error) p.reject(new Error(msg.error.message));
      else p.resolve(msg.result || {});
      return;
    }
    if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails || {};
      browserErrors.push("JS: " + String(d.exception?.description || d.exception?.value || d.text || "unknown").slice(0,400));
      return;
    }
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      browserErrors.push("Console: " + (msg.params.args || [])
        .map(x => String(x.value || x.description || x.type || "unknown").slice(0,260))
        .join(" ").slice(0,500));
      return;
    }
    if (msg.method === "Network.responseReceived") {
      const response = msg.params.response || {};
      if (response.status >= 400) {
        const url = String(response.url || "").split("?")[0].slice(-150);
        browserErrors.push("HTTP " + response.status + ": " + url);
      }
      return;
    }
    if (msg.method !== "Fetch.requestPaused") return;
    const request = msg.params.request;
    let safe = false;
    try {
      const url = new URL(request.url);
      safe = url.origin === origin && ["GET", "HEAD"].includes(request.method.toUpperCase());
    } catch {}
    if (!safe) {
      if (!["GET", "HEAD"].includes(request.method.toUpperCase())) blockedWrites++;
      else blockedExternal++;
    }
    cdp(safe ? "Fetch.continueRequest" : "Fetch.failRequest",
      safe ? {requestId: msg.params.requestId}
        : {requestId: msg.params.requestId, errorReason: "BlockedByClient"}).catch(() => {});
  });
  await new Promise((resolve, reject) => {
    if (socket.readyState === WebSocket.OPEN) return resolve();
    socket.addEventListener("open", resolve, {once:true});
    socket.addEventListener("error", () => reject(new Error("DevTools connection failed")), {once:true});
  });
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Network.enable");
  await cdp("Fetch.enable", {patterns: [{urlPattern:"*", requestStage:"Request"}]});
  return cdp;
}
async function main() {
  await nextServer();
  const cdp = await browser();
  const js = async code => {
    const r = await cdp("Runtime.evaluate", {
      expression: code, returnByValue: true, awaitPromise: true, userGesture: true
    });
    if (r.exceptionDetails) throw new Error("Browser exception: " + r.exceptionDetails.text);
    return r.result?.value;
  };
  const ready = async (code, label) => mustPoll(() => js(code), label, 15000);
  const size = async (w,h) => {
    await cdp("Emulation.setDeviceMetricsOverride",
      {width:w,height:h,mobile:true,deviceScaleFactor:2});
    await cdp("Emulation.setTouchEmulationEnabled", {enabled:true,maxTouchPoints:1});
  };
  const navigate = async route => {
    const x = await cdp("Page.navigate", {url: origin + route});
    if (x.errorText) throw new Error("Navigation failed: " + x.errorText);
    const pathname = new URL(origin + route).pathname;
    await ready("location.pathname===" + JSON.stringify(pathname) + " && document.readyState==='complete'",
      "Complete browser navigation " + route);
  };
  await size(375,600);
  await navigate("/");
  await ready('!!document.querySelector(\'[aria-label="Optional website analytics preferences"]\')',
    "Analytics consent hydration");
  await ready('!!document.querySelector(\'button[aria-label="Open Marketech AI assistant"]\')',
    "Assistant hydration");
  assert.equal(await js('!!document.querySelector(\'script[src*="googletagmanager.com"]\')'), false);
  console.log("REAL_CHROMIUM_REACT_HYDRATION=PASS");

  assert.equal(await js('(() => {const b=[...document.querySelectorAll("button")].find(x=>x.textContent.trim()==="No thanks"); if(!b) return false; b.click(); return true;})()'), true);
  await ready('localStorage.getItem("marketech-analytics-choice-v1")==="declined"',
    "Decline persisted");
  assert.equal(await js('!!document.querySelector(\'script[src*="googletagmanager.com"]\')'), false);
  await ready('!!document.querySelector(\'button[aria-label="Change optional analytics privacy preferences"]\')',
    "Reopen preferences");
  await js('document.querySelector(\'button[aria-label="Change optional analytics privacy preferences"]\').click()');
  await ready('[...document.querySelectorAll("button")].some(x=>x.textContent.trim()==="Allow analytics")',
    "Re-consent prompt");
  await js('[...document.querySelectorAll("button")].find(x=>x.textContent.trim()==="Allow analytics").click()');
  await ready('localStorage.getItem("marketech-analytics-choice-v1")==="accepted"',
    "Acceptance persisted");
  assert.equal(await js('window["ga-disable-G-JEMN04ZWC8"]'), false);
  console.log("ANALYTICS_DECLINE_AND_RECONSENT_BROWSER=PASS");

  await navigate("/contact?offer=lead-rescue&service=Lead%20capture%20%2F%20quote%20forms");
  try {
    await ready('!!document.querySelector("form.contact-card input[name=consentToContact]")',
      "Hydrated inquiry form");
  } catch (error) {
    const diag = await js('(() => ({pathname:location.pathname,search:location.search,ready:document.readyState,title:document.title,forms:document.querySelectorAll("form").length,scripts:document.querySelectorAll("script[src]").length,text:(document.body?.innerText||"").slice(-600)}))()');
    throw new Error("Hydrated inquiry form: " + JSON.stringify({diag,browserErrors:browserErrors.slice(-15)}));
  }
  const contact = await js('(() => {const f=document.querySelector("form.contact-card");return {unchecked:!f.querySelector("[name=consentToContact]").checked,required:f.querySelector("[name=consentToContact]").required,privacy:!!f.querySelector(\'a[href="/privacy"]\'),service:f.querySelector("select[name=service]").value,message:f.querySelector("textarea[name=message]").value};})()');
  assert.ok(contact.unchecked && contact.required && contact.privacy);
  assert.equal(contact.service, "Lead capture / quote forms");
  assert.match(contact.message, /Lead Capture Rescue/);
  console.log("HYDRATED_CONTACT_OFFER_CONSENT=PASS");

  for (const [w,h,label] of [[375,600,"PORTRAIT"],[600,375,"LANDSCAPE"]]) {
    await size(w,h);
    await navigate("/");
    await ready('!!document.querySelector(\'button[aria-label="Open Marketech AI assistant"]\')',
      label + " launcher hydration");
    await js('document.querySelector(\'button[aria-label="Open Marketech AI assistant"]\').click()');
    await ready('document.querySelector(".ai-panel")?.getAttribute("aria-hidden")==="false"',
      label + " assistant dialog");
    assert.equal(await js('!!document.querySelector(".ai-panel .ai-provider-consent input[type=checkbox]")'),true);
    await js('document.querySelector(".ai-panel .ai-form input").focus()');
    try {
      await ready('document.querySelector(".ai-panel").classList.contains("ai-keyboard-adjusted")',
        label + " input focus geometry");
    } catch {
      const state = await js('(() => {const p=document.querySelector(".ai-panel"),input=p?.querySelector(".ai-form input"),v=window.visualViewport;return {path:location.pathname,focused:document.activeElement===input,open:p?.getAttribute("aria-hidden"),class:p?.className,viewport:!!v,viewportHeight:v?.height,innerHeight,innerWidth};})()');
      throw new Error(label + " focused keyboard geometry missing: " + JSON.stringify({state,browserErrors:browserErrors.slice(-8)}));
    }
    await delay(350);
    const rect = await js('(() => {const p=document.querySelector(".ai-panel");const r=p.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height,view:innerHeight};})()');
    assert.ok(rect.height > 100 && rect.top >= -8 && rect.bottom <= rect.view + 8,
      label + " assistant clipped: " + JSON.stringify(rect));
    await js('document.querySelector(".ai-panel").scrollTop=document.querySelector(".ai-panel").scrollHeight');
    const action = await js('(() => {const p=document.querySelector(".ai-panel").getBoundingClientRect();const a=document.querySelector(".ai-panel .ai-actions").getBoundingClientRect();return {actionTop:a.top,actionBottom:a.bottom,panelTop:p.top,panelBottom:p.bottom};})()');
    assert.ok(action.actionBottom <= action.panelBottom + 9,
      label + " assistant action footer cannot scroll into view: " + JSON.stringify(action));
    console.log("MOBILE_" + label + "_ASSISTANT_GEOMETRY=PASS");
  }
  assert.equal(blockedWrites,0,"No browser form or provider POST may be attempted");
  console.log("EXTERNAL_GETS_BLOCKED_BEFORE_NETWORK=" + blockedExternal);
  console.log("BROWSER_POST_ATTEMPTS=0");
  console.log("HARDWARE_KEYBOARD_AND_SCREENREADER=NOT_TESTED");
  console.log("INBOX_DELIVERY_AND_PRODUCTION=NOT_TESTED");
}
try { await main(); }
catch (error) {
  console.error("CHROMIUM_HYDRATION_QA=FAIL", error.message);
  console.error("NEXT_LOCAL_LOG_TAIL", nextLogs);
  process.exitCode = 1;
} finally {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  for (const child of [chrome,next]) if (child && child.exitCode === null) child.kill("SIGTERM");
  await delay(700);
  for (const child of [chrome,next]) if (child && child.exitCode === null) child.kill("SIGKILL");
  rmSync(profile,{recursive:true,force:true});
}