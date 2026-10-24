/** Real built Next.js GET smoke test — no browser JS, provider calls or POSTs.
 * This is deliberately a narrower acceptance check than mobile/browser QA.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";

const port = 43271;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  { path: "/", checks: [/Marketech Digital/i] },
  // The inquiry form must be in the INITIAL HTML, not trapped behind Suspense.
  { path: "/contact", checks: [
    /Free Digital Growth Audit/, /A simple audit, not a pressure call/,
    /form class="contact-card"/, /name="consentToContact"/, /href="\/privacy"/
  ] },
  { path: "/contact?offer=lead-rescue&service=Lead%20capture%20%2F%20quote%20forms", checks: [
    /form class="contact-card"/, /Lead Capture Rescue/, /Lead capture \/ quote forms/,
    /name="consentToContact"/
  ] },
  { path: "/privacy", checks: [/Website privacy notice/i, /Resend/, /OpenAI/] },
  { path: "/solutions/ottawa", checks: [
    /Lead Capture Rescue/, /Trades Quote Funnel/,
    /Short-Form Content Sprint/, /Internal AI Workflow Pilot/,
    /\/contact\?service=/
  ] },
];
const node = process.execPath;
const child = spawn(node, [
  "node_modules/next/dist/bin/next", "start",
  "--hostname", "127.0.0.1", "--port", String(port)
], {
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    // This test must not receive provider credentials or customer content.
    RESEND_API_KEY: "",
    OPENAI_API_KEY: "",
    NEXT_TELEMETRY_DISABLED: "1",
    NODE_ENV: "production"
  }
});
let diagnostic = "";
for (const stream of [child.stdout, child.stderr]) {
  stream.on("data", (part) => {
    diagnostic = (diagnostic + part.toString("utf8")).slice(-2400);
  });
}

async function get(path) {
  return fetch(origin + path, {
    method: "GET", redirect: "manual", signal: AbortSignal.timeout(4000),
    headers: { "cache-control": "no-store" }
  });
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (child.exitCode !== null) throw new Error("Next server exited early");
    try {
      const response = await get("/");
      if (response.status === 200) {
        ready = true;
        break;
      }
    } catch {
      // The isolated local Next server may still be binding the port.
    }
    await delay(300);
  }
  assert.ok(ready, "built Next server must become ready for local GET");

  for (const route of routes) {
    const response = await get(route.path);
    assert.equal(response.status, 200, `${route.path}: expected HTTP 200`);
    assert.match(response.headers.get("content-type") || "", /text\/html/i,
      `${route.path}: expected rendered HTML`);
    const html = await response.text();
    assert.ok(html.length > 400, `${route.path}: unexpectedly empty HTML`);
    for (const pattern of route.checks) {
      assert.match(html, pattern, `${route.path}: required page content missing`);
    }
    // No analytics script tag should render into first-response HTML before
    // the visitor can explicitly choose analytics in the browser.
    assert.doesNotMatch(html, /src="[^"]*googletagmanager\.com\/gtag\/js/i,
      `${route.path}: unexpected pre-consent analytics script tag`);
    console.log(`BUILT_ROUTE_GET_PASS=${route.path}`);
  }
  // The server now renders the form. Browser checks still prove interactive
  // hydration and that consent defaults to unchecked after client startup.
  const contactPageSource = readFileSync("app/contact/page.tsx", "utf8");
  assert.match(contactPageSource, /<style dangerouslySetInnerHTML=/,
    "contact CSS must avoid raw React style-text hydration mismatch");
  assert.doesNotMatch(contactPageSource, /<style>\{\x60/,
    "React text child must not contain the contact CSS '>' selector");
  const contactClient = readFileSync("app/contact/ContactClient.tsx", "utf8");
  assert.match(contactClient, /name="consentToContact"/);
  assert.ok(contactClient.includes('href="/privacy"'), "visible contact privacy link must remain");
  console.log("CONTACT_CLIENT_SOURCE_CONSENT_GUARD=PASS");
    console.log("BUILT_NEXT_GET_SMOKE=PASS");
  console.log("BROWSER_INTERACTION=NOT_TESTED");
  console.log("CONTACT_POST_AND_EMAIL=NOT_EXECUTED");
  console.log("PRODUCTION_RELEASE=OFF");
} catch (error) {
  console.error("BUILT_NEXT_GET_SMOKE=FAIL", error.message);
  console.error("NEXT_SERVER_LOG_TAIL", diagnostic);
  process.exitCode = 1;
} finally {
  if (child.exitCode === null) {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("close", resolve)),
      delay(1800)
    ]);
    if (child.exitCode === null) child.kill("SIGKILL");
  }
}
