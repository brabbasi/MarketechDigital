// Exercise the actual locked @vercel/firewall package without any network, provider
// call, production key, customer record, or Vercel configuration mutation.
// This verifies SDK key derivation semantics, NOT live per-IP 429 enforcement.
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("node_modules/@vercel/firewall/package.json", "utf8"));
assert.equal(pkg.version, "1.2.5", "test must run against the exact lockfile SDK");
const RATE_LIMIT_ID = "marketech-inquiry-owner-notification";
const TEST_HOST = "marketech.test.invalid";

test("pinned SDK defaults to IP-derived WAF header key with mocked GET only", async () => {
  const previousFetch = globalThis.fetch;
  const previousNodeEnv = process.env.NODE_ENV;
  const calls = [];
  let nextStatus = 204;
  try {
    // The SDK intentionally skips the remote check in non-production mode.
    // This only selects its production branch; global fetch is replaced
    // before the module is imported or the SDK can make any request.
    process.env.NODE_ENV = "production";
    globalThis.fetch = async (input, init = {}) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      assert.equal(url.protocol, "https:");
      assert.equal(url.hostname, TEST_HOST, "unexpected network destination");
      assert.equal(
        url.pathname,
        "/.well-known/vercel/rate-limit-api/" + RATE_LIMIT_ID,
        "unexpected SDK request path"
      );
      assert.equal((init.method || "GET").toUpperCase(), "GET");
      assert.equal(init.redirect, "manual", "SDK cannot follow redirects");
      const headers = new Headers(init.headers);
      assert.equal(headers.get("x-vercel-rate-limit-api"), RATE_LIMIT_ID);
      const key = headers.get("x-vercel-rate-limit-key");
      assert.ok(key && key.length > 20, "SDK must construct a scoped key");
      calls.push({ key });
      return new Response(null, { status: nextStatus });
    };

    const { checkRateLimit } = await import("@vercel/firewall");
    assert.equal(typeof checkRateLimit, "function");
    const request = (ip, incomingKey = undefined) => {
      const headers = { host: TEST_HOST, "x-real-ip": ip };
      if (incomingKey) headers["x-vercel-rate-limit-key"] = incomingKey;
      return new Request("https://" + TEST_HOST + "/api/inquiry", { headers });
    };

    const ipA = "198.51.100.7"; // RFC 5737 synthetic documentation address
    const ipB = "203.0.113.9"; // RFC 5737 synthetic documentation address
    const a = await checkRateLimit(RATE_LIMIT_ID, { request: request(ipA) });
    const b = await checkRateLimit(RATE_LIMIT_ID, {
      request: request(ipA, "untrusted-incoming-header")
    });
    const c = await checkRateLimit(RATE_LIMIT_ID, { request: request(ipB) });
    assert.equal(a.rateLimited, false);
    assert.equal(b.rateLimited, false);
    assert.equal(c.rateLimited, false);
    assert.equal(calls.length, 3);
    assert.equal(calls[0].key, calls[1].key,
      "same trusted client IP should produce stable key regardless of inbound header");
    assert.notEqual(calls[0].key, calls[2].key,
      "different client IP must produce a distinct key");
    assert.notEqual(calls[1].key, "untrusted-incoming-header",
      "the SDK must not take its count key from a user-provided header");

    nextStatus = 429;
    const limited = await checkRateLimit(RATE_LIMIT_ID, { request: request(ipA) });
    assert.equal(limited.rateLimited, true, "SDK must interpret mocked 429");
    nextStatus = 404;
    const missing = await checkRateLimit(RATE_LIMIT_ID, { request: request(ipA) });
    assert.equal(missing.error, "not-found", "absent rule is not a pass");
    assert.equal(calls.length, 5, "one mocked SDK GET per call");

    console.log("PINNED_FIREWALL_IP_HEADER_CONTRACT=PASS");
    console.log("PRODUCTION_WAF_429_AND_CLIENT_ISOLATION=NOT_TESTED");
    console.log("REAL_NETWORK_REQUESTS=0");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});
