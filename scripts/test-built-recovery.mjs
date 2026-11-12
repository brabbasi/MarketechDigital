/**
 * Isolated REAL Next production-bundle recovery acceptance on loopback.
 * The CI build is compiled with MARKETECH_RECOVERY_MODE=true.
 * No Namecheap, Resend, Vercel API, customer record, production domain, or
 * credential is used. This does NOT qualify a Vercel staged production build.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

assert.equal(process.env.MARKETECH_RECOVERY_MODE, "true",
  "refuse to run against any build not explicitly placed in recovery mode");

const port = 43379;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [
  "node_modules/next/dist/bin/next", "start",
  "--hostname", "127.0.0.1", "--port", String(port)
], {
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    MARKETECH_RECOVERY_MODE: "true",
    RESEND_API_KEY: "",
    OPENAI_API_KEY: "",
    NEXT_TELEMETRY_DISABLED: "1",
    NODE_ENV: "production"
  }
});
let diagnostic = "";
for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", chunk => {
    diagnostic = (diagnostic + chunk.toString("utf8")).slice(-1800);
  });
}

async function get(path) {
  return fetch(origin + path, {
    method: "GET", redirect: "manual", signal: AbortSignal.timeout(5000),
    headers: { "Cache-Control": "no-store" }
  });
}

try {
  let ready = false;
  for (let i = 0; i < 80; i += 1) {
    assert.equal(server.exitCode, null, "recovery server terminated before acceptance");
    try {
      if ((await get("/")).status === 200) { ready = true; break; }
    } catch { /* loopback server still starting */ }
    await delay(250);
  }
  assert.ok(ready, "recovery-mode production bundle did not serve GET /");

  for (const [path, patterns] of [
    ["/", [/Marketech Digital/i]],
    ["/privacy", [/Website privacy notice/i, /Website inquiry intake is temporarily paused/]],
    ["/contact", [/Online inquiry form temporarily unavailable/, /hello@getmarketechdigital.com/]],
    ["/solutions/ottawa", [/Lead Capture Rescue/, /Trades Quote Funnel/]]
  ]) {
    const response = await get(path);
    assert.equal(response.status, 200, `${path} must stay public`);
    const html = await response.text();
    for (const pattern of patterns) {
      assert.match(html, pattern, path + ": missing " + pattern.toString());
    }
    if (path === "/") {
      assert.doesNotMatch(html, /<form[^>]*class="idea-form"/,
        "Recovery homepage must not render Idea Helper input form");
      assert.doesNotMatch(html, /class="ai-panel/,
        "Recovery homepage must not render assistant input panel");
    }
    if (path === "/contact") {
      assert.doesNotMatch(html, /<form[^>]*class="contact-card"/,
        "Recovery contact page must not render intake form");
      assert.doesNotMatch(html, /name="consentToContact"/,
        "Recovery contact page must not offer submit consent field");
    }
    console.log("RECOVERY_GET_PASS=" + path);
  }

  // Deliberately malformed, non-personal fictional values. A recovery handler
  // must reject before reading/parsing the request or invoking provider APIs.
  for (const path of ["/api/inquiry", "/api/chat", "/api/idea"]) {
    const response = await fetch(origin + path, {
      method: "POST",
      headers: { "Content-Type": "text/plain", Origin: "https://untrusted.invalid" },
      body: "SYNTHETIC_NO_PERSONAL_DATA_NOT_JSON",
      signal: AbortSignal.timeout(5000)
    });
    assert.equal(response.status, 503, `${path} must fail closed`);
    assert.equal(response.headers.get("cache-control"), "no-store");
    console.log("RECOVERY_POST_503_PASS=" + path);
  }
  const retired = await fetch(origin + "/api/lead", {
    method: "POST", headers: { "Content-Type": "text/plain" },
    body: "SYNTHETIC_NO_PERSONAL_DATA",
    signal: AbortSignal.timeout(5000)
  });
  assert.equal(retired.status, 410, "retired legacy lead endpoint stays closed");
  console.log("RECOVERY_LEGACY_410_PASS");
  console.log("RECOVERY_BUNDLE_LOOPBACK_QA=PASS");
  console.log("PROVIDER_EGRESS=NOT_INVOKED_BY_TEST");
  console.log("PRODUCTION_DEPLOYMENT_AND_ROLLBACK=NOT_AUTHORIZED");
} catch (error) {
  console.error("RECOVERY_BUNDLE_QA_FAILED:", error?.message || "unknown");
  console.error("NEXT_DIAGNOSTIC:", diagnostic.replaceAll(/Bearer\\s+\\S+/gi, "[REDACTED]"));
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
  await delay(200);
  if (server.exitCode === null) server.kill("SIGKILL");
}
