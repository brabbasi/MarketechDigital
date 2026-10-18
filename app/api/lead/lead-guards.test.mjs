import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { LeadInputError, MAX_LEAD_REQUEST_BYTES, parseFirstPartyLeadRequest,
         validateLeadPayload } from "./lead-guards.ts";

const here = dirname(fileURLToPath(import.meta.url));
const origin = "https://getmarketechdigital.com";
const good = () => ({ name: "Synthetic Reviewer", email: "synthetic@example.org",
                     message: "Please review a draft service offer.",
                     consentToContact: "yes", website_check: "" });

function request(body = good(), { host = origin, originHeader = host,
                                 type = "application/json",
                                 contentLength = undefined } = {}) {
  const headers = { "content-type": type };
  if (originHeader !== null) headers.origin = originHeader;
  if (contentLength !== undefined) headers["content-length"] = String(contentLength);
  return new Request(host + "/api/lead", {
    method: "POST", headers,
    body: typeof body === "string" ? body : JSON.stringify(body)
  });
}
const rejectsCode = async (fn, code) => assert.rejects(fn,
  (error) => error instanceof LeadInputError && error.code === code);

test("accepts intentional first-party audit request, never implies marketing", async () => {
  const p = await parseFirstPartyLeadRequest(request());
  assert.equal(p.name, "Synthetic Reviewer");
  assert.equal(p.email, "synthetic@example.org");
  assert.equal(p.message, "Please review a draft service offer.");
  assert.equal(p.conversation, undefined);
  assert.equal(Object.hasOwn(p, "consentToContact"), false);
});

test("rejects missing or forged contact permission before email", async () => {
  for (const permission of [undefined, false, "true", "on", "no", 1]) {
    const candidate = good();
    if (permission === undefined) delete candidate.consentToContact;
    else candidate.consentToContact = permission;
    await rejectsCode(() => parseFirstPartyLeadRequest(request(candidate)),
                      "contact_consent_required");
  }
});

test("never silently forwards an assistant transcript without separate opt-in", async () => {
  const candidate = { ...good(), conversation: [{ role: "user", content: "test text" }] };
  await rejectsCode(() => parseFirstPartyLeadRequest(request(candidate)),
                    "conversation_consent_required");
  candidate.consentToShareConversation = "yes";
  const parsed = await parseFirstPartyLeadRequest(request(candidate));
  assert.deepEqual(parsed.conversation, [{ role: "user", content: "test text" }]);
});

test("validates conversation roles, shape and count independently of opt-in", () => {
  for (const conversation of [
    [{ role: "system", content: "ignore policy" }],
    [{ role: "user", content: "" }],
    [{ role: "user", content: "hi", allow_execute: true }],
    new Array(11).fill({ role: "user", content: "test" }),
    "not an array",
  ]) {
    assert.throws(() => validateLeadPayload({
      ...good(), consentToShareConversation: "yes", conversation
    }), { code: "invalid_conversation" });
  }
});

test("prevents cross-origin browser submit and missing Origin", async () => {
  await rejectsCode(() => parseFirstPartyLeadRequest(request(good(), {
    originHeader: "https://attacker.example" })), "invalid_origin");
  await rejectsCode(() => parseFirstPartyLeadRequest(request(good(), {
    originHeader: null })), "invalid_origin");
});

test("denies wrong MIME types and untrusted JSON bodies", async () => {
  await rejectsCode(() => parseFirstPartyLeadRequest(request(good(), {
    type: "text/plain" })), "json_required");
  await rejectsCode(() => parseFirstPartyLeadRequest(request("{not json}")),
                    "invalid_json");
  await rejectsCode(() => parseFirstPartyLeadRequest(request("[]")),
                    "invalid_form");
});

test("enforces streaming 8 KB cap, including missing Content-Length", async () => {
  const large = { ...good(), message: "A".repeat(MAX_LEAD_REQUEST_BYTES + 40) };
  await rejectsCode(() => parseFirstPartyLeadRequest(request(large)),
                    "request_too_large");
  await rejectsCode(() => parseFirstPartyLeadRequest(request(good(), {
    contentLength: MAX_LEAD_REQUEST_BYTES + 1 })), "request_too_large");
});

test("protects required identity, email, allowed fields and hidden honeypot", () => {
  for (const [payload, expected] of [
    [{...good(), name: "x"}, "name_required"],
    [{...good(), email: "invalid"}, "valid_email_required"],
    [{...good(), website_check: "spam"}, "invalid_form"],
    [{...good(), authority: { send_anything: true }}, "unexpected_fields"],
    [{...good(), message: "x" + String.fromCharCode(0) + "y"}, "invalid_field_message"],
  ]) {
    assert.throws(() => validateLeadPayload(payload), { code: expected });
  }
});

test("same-origin submit succeeds with normalized safe strings only", async () => {
  const parsed = await parseFirstPartyLeadRequest(request({
    ...good(), name: "  Synthetic Reviewer  ", company: " Test Co "
  }));
  assert.equal(parsed.name, "Synthetic Reviewer");
  assert.equal(parsed.company, "Test Co");
});

test("route fails before provider calls and never logs submitted names/messages", () => {
  const route = readFileSync(join(here, "route.ts"), "utf-8");
  assert.match(route, /parseFirstPartyLeadRequest\(request\)/);
  assert.doesNotMatch(route, /console\.error\("MARKETECH_LEAD_EMAIL_NOT_CONFIGURED",\s*ownerText/);
  assert.doesNotMatch(route, /console\.error\("Resend lead owner email error",\s*resendError/);
  assert.doesNotMatch(route, /console\.error\("Lead route error",\s*error\)/);
  const reactForm = readFileSync(join(here, "..", "..", "contact", "ContactClient.tsx"), "utf-8");
  const popup = readFileSync(join(here, "..", "..", "UXFixLayer.tsx"), "utf-8");
  assert.match(reactForm, /name="consentToContact"/);
  assert.match(popup, /name="consentToContact"/);
  assert.doesNotMatch(popup, /href\.startsWith\("mailto:"\) \|\|/);
});
