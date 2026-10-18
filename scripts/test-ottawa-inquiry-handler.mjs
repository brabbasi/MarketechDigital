// Strictly isolated API handler contract: no live rate-limit, Resend, customer,
// Production environment, Vercel, or Internet calls. Mock boundaries ONLY.
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync("app/api/inquiry/route.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

function harness({ limiter = { rateLimited: false }, providerStatus = 200, key = "synthetic-test-only" } = {}) {
  const sends = [];
  const limiterCalls = [];
  const logs = [];
  const exports = {};
  const env = {
    NEXT_PUBLIC_SITE_URL: "https://getmarketechdigital.com",
    LEAD_TO_EMAIL: "owner-synthetic@example.invalid",
    LEAD_FROM_EMAIL: "Synthetic <noreply@example.invalid>",
    RESEND_API_KEY: key,
  };
  const checkRateLimit = async (id, { request }) => {
    limiterCalls.push([id, request.url]);
    if (limiter instanceof Error) throw limiter;
    return limiter;
  };
  const network = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails", "unexpected network destination");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.Authorization, "Bearer synthetic-test-only");
    sends.push({ url, options, payload: JSON.parse(options.body) });
    return new Response(JSON.stringify(providerStatus === 200 ? { id: "synthetic-sent" } : { error: "synthetic-failure" }), {
      status: providerStatus
    });
  };
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === "@vercel/firewall") return { checkRateLimit };
      if (name === "next/server") return { NextResponse: { json: (value, options) => Response.json(value, options) } };
      throw Error("unexpected external dependency " + name);
    },
    process: { env },
    fetch: network,
    console: { error: (...args) => logs.push(args.map(String).join(" ")) },
    URL,
    TextEncoder,
    TextDecoder,
    Response,
    Request
  }, { timeout: 2000 });
  assert.equal(typeof exports.POST, "function");
  async function post(body, { origin = "https://getmarketechdigital.com", site = "same-origin", contentType = "application/json" } = {}) {
    const headers = { "Content-Type": contentType, "sec-fetch-site": site };
    if (origin !== null) headers.Origin = origin;
    const request = new Request("https://getmarketechdigital.com/api/inquiry", {
      method: "POST", headers,
      body: typeof body === "string" ? body : JSON.stringify(body)
    });
    const response = await exports.POST(request);
    return { status: response.status, body: await response.json(), response };
  }
  return { post, sends, limiterCalls, logs };
}
function syntheticInquiry(override = {}) {
  return {
    submissionId: "offline-test-001", consentToContact: "yes", name: "Test Person", email: "test@example.invalid",
    company: "Test Co", service: "Lead capture / quote forms",
    message: "Interested in <lead> rescue", offer: "lead-rescue",
    source: "website-contact", medium: "website",
    landingPage: "/contact", companyUrl2: "", ...override
  };
}

test("governed synthetic form sends ONE owner-only mock with stable key and escaped HTML", async () => {
  const h = harness();
  const r = await h.post(syntheticInquiry());
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.equal(r.body.submissionId, "offline-test-001");
  assert.equal(h.sends.length, 1, "client acknowledgment is never a second email");
  assert.equal(h.limiterCalls.length, 1);
  assert.equal(h.limiterCalls[0][0], "marketech-inquiry-owner-notification");
  const sent = h.sends[0];
  assert.deepEqual(sent.payload.to, ["owner-synthetic@example.invalid"]);
  assert.equal(sent.options.headers["Idempotency-Key"], "lead-owner/offline-test-001");
  assert.equal(sent.payload.reply_to, "test@example.invalid");
  assert.match(sent.payload.text, /Lead capture \/ quote forms/);
  assert.match(sent.payload.html, /&lt;lead&gt; rescue/);
  assert.ok(!sent.payload.html.includes("<lead>"), "raw user HTML must be escaped");
  assert.equal(h.logs.length, 0);
});

test("synthetic retries keep the same provider idempotency key; no actual dedup is claimed", async () => {
  const h = harness();
  await h.post(syntheticInquiry());
  await h.post(syntheticInquiry());
  assert.equal(h.sends.length, 2, "mock provider does not emulate Resend deduplication");
  assert.equal(h.sends[0].options.headers["Idempotency-Key"], h.sends[1].options.headers["Idempotency-Key"]);
});

test("cross-origin and absent-origin requests cannot reach WAF or provider", async () => {
  for (const origin of ["https://unrelated.example.invalid", null]) {
    const h = harness();
    const result = await h.post(syntheticInquiry(), { origin });
    assert.equal(result.status, 403);
    assert.equal(h.sends.length, 0);
    assert.equal(h.limiterCalls.length, 0);
  }
});

test("rate-limited, missing-rule and thrown-rule calls fail closed without provider", async () => {
  for (const [limiter, expected] of [
    [{ rateLimited: true }, 429],
    [{ error: "rule-not-available" }, 503],
    [new Error("synthetic WAF unavailable"), 503]
  ]) {
    const h = harness({ limiter });
    const result = await h.post(syntheticInquiry());
    assert.equal(result.status, expected);
    assert.equal(h.sends.length, 0);
  }
});

test("honeypot and invalid synthetic input never reach provider", async () => {
  for (const [payload, code] of [
    [syntheticInquiry({ companyUrl2: "robot" }), 200],
    [syntheticInquiry({ submissionId: "short" }), 400],
    [syntheticInquiry({ email: "invalid" }), 400],
    ["{not-json", 400]
  ]) {
    const h = harness();
    assert.equal((await h.post(payload)).status, code);
    assert.equal(h.sends.length, 0);
  }
});

test("missing provider auth and rejected fake delivery have truthful unavailable outcomes", async () => {
  const unconfigured = harness({ key: "" });
  const missing = await unconfigured.post(syntheticInquiry());
  assert.equal(missing.status, 503);
  assert.equal(unconfigured.sends.length, 0);
  const failure = harness({ providerStatus: 503 });
  const response = await failure.post(syntheticInquiry());
  assert.equal(response.status, 502, "synthetic backend failure must not be shown as success");
  assert.equal(failure.sends.length, 1);
});

test("explicit inquiry consent is required before any owner email", async () => {
  for (const consentToContact of [undefined, false, "no", "on", "true", 1]) {
    const h = harness();
    const candidate = syntheticInquiry({ consentToContact });
    const r = await h.post(candidate);
    assert.equal(r.status, 400);
    assert.equal(h.sends.length, 0);
  }
});

test("JSON, identity and response remain fail-closed on incorrect input shape", async () => {
  const bodies = [null, [], "{}", "{broken-json", JSON.stringify({ name: "Only name" })];
  for (const value of bodies) {
    const h = harness();
    const input = typeof value === "string" ? value : JSON.stringify(value);
    const r = await h.post(input);
    assert.equal(r.status, 400);
    assert.equal(h.sends.length, 0);
  }
  const h = harness();
  assert.equal((await h.post(syntheticInquiry(), { contentType: "text/plain" })).status, 415);
  assert.equal(h.sends.length, 0);
});

test("streaming 32 KB limit rejects body before email and does not log submitted text", async () => {
  const h = harness();
  const r = await h.post(syntheticInquiry({ message: "x".repeat(33_000) }));
  assert.equal(r.status, 413);
  assert.equal(h.sends.length, 0);
  assert.equal(h.logs.length, 0);
});

test("upstream provider failures never leak private response bodies to logs", async () => {
  const h = harness({ providerStatus: 503 });
  const r = await h.post(syntheticInquiry({ message: "PRIVATE_TEST_NOTE_DO_NOT_LOG" }));
  assert.equal(r.status, 502);
  assert.equal(h.sends.length, 1);
  assert.ok(h.logs.every((row) => !row.includes("PRIVATE_TEST_NOTE_DO_NOT_LOG")));
  assert.ok(h.logs.every((row) => !row.includes("synthetic-failure")));
});

console.log("SYNTHETIC_INQUIRY_HANDLER_CONTRACT=OFFLINE_ONLY");
console.log("LIVE_OWNER_DELIVERY_AND_PROVIDER_DEDUP=NOT_TESTED");
