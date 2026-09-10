import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireText(source, needle, label) {
  if (!source.includes(needle)) throw new Error(`${label}: missing ${needle}`);
}

function forbidText(source, needle, label) {
  if (source.includes(needle)) throw new Error(`${label}: forbidden ${needle}`);
}

const inquiry = read("app/api/inquiry/route.ts");
const legacyLead = read("app/api/lead/route.ts");
const contact = read("app/contact/ContactClient.tsx");
const idea = read("app/IdeaGenerator.tsx");
const guard = read("app/AcquisitionGuard.tsx");
const layout = read("app/layout.tsx");

for (const field of [
  "submissionId",
  "source",
  "medium",
  "campaign",
  "referrer",
  "landingPage",
  "firstTouchOffer",
  "recommendedService"
]) {
  requireText(inquiry, field, "inquiry attribution contract");
}

requireText(inquiry, "MAX_BODY_BYTES = 32_000", "request-size cap");
requireText(inquiry, "isSameOriginRequest", "same-origin gate");
requireText(inquiry, 'request.headers.get("origin")', "origin verification");
requireText(inquiry, 'request.headers.get("sec-fetch-site")', "fetch-site verification");
requireText(inquiry, "new TextEncoder().encode(raw).length", "actual-body size verification");
requireText(inquiry, "companyUrl2", "honeypot contract");
requireText(inquiry, '"Idempotency-Key": message.idempotencyKey', "provider idempotency");
requireText(inquiry, "lead-owner/${payload.submissionId}", "owner send key");
requireText(inquiry, "isValidSubmissionId", "submission-id validation");
requireText(inquiry, "Deliberately no automatic client receipt in v1", "public mail-relay boundary");
forbidText(inquiry, "lead-receipt/${payload.submissionId}", "automatic client receipt must remain disabled");

// The old endpoint must fail closed rather than remain a second public mail path.
requireText(legacyLead, 'mode: "legacy_endpoint_retired"', "legacy endpoint retirement marker");
requireText(legacyLead, "status: 410", "legacy endpoint retirement status");
requireText(legacyLead, '"Cache-Control": "no-store"', "legacy endpoint no-store response");
forbidText(legacyLead, "api.resend.com", "legacy outbound provider surface");
forbidText(legacyLead, "RESEND_API_KEY", "legacy outbound credential surface");
forbidText(legacyLead, "sendResendEmail", "legacy outbound helper");
forbidText(legacyLead, "fetch(", "legacy network action surface");

requireText(contact, 'fetch("/api/inquiry"', "contact endpoint migration");
requireText(contact, "submissionIdRef", "stable retry identity");
requireText(contact, "safeReferrer", "referrer minimization");
requireText(contact, "referrer.origin", "referrer origin preservation");
requireText(contact, "referrer.pathname", "referrer query stripping");
requireText(contact, "window.location.pathname", "landing-path minimization");
requireText(contact, 'name="companyUrl2"', "contact honeypot");
forbidText(contact, "window.location.search", "landing query-string collection");

requireText(idea, "Send me this plan", "idea-helper conversion CTA");
requireText(idea, "Talk to Basit", "founder CTA");
requireText(idea, 'source: "idea-helper"', "idea-helper attribution");
requireText(idea, 'firstTouchOffer: "Idea Helper recommendation"', "fixed first-touch label");
requireText(idea, 'service: "Not sure yet"', "valid contact-service default");
requireText(idea, "recommendedService: idea.recommendedSystem", "recommendation preservation");
forbidText(idea, "firstTouchOffer: idea.title", "generated title in URL attribution");

requireText(guard, 'target.matches(".contact-popup-form")', "legacy contact-popup guard");
requireText(guard, 'fetch("/api/inquiry"', "legacy popup endpoint migration");
requireText(guard, ".ai-actions a[href^='mailto:']", "AI assistant contact interception");
requireText(guard, "assistant-contact", "AI assistant acquisition attribution");
requireText(guard, "safeReferrer", "legacy referrer minimization");
requireText(guard, "window.location.pathname", "legacy landing-path minimization");
forbidText(guard, "window.location.search", "legacy landing query-string collection");

requireText(layout, 'import AcquisitionGuard from "./AcquisitionGuard"', "global guard import");
requireText(layout, "<AcquisitionGuard />", "global guard mount");

forbidText(contact, 'fetch("/api/lead"', "contact page legacy endpoint");
forbidText(inquiry, "localStorage", "server route browser storage");
forbidText(inquiry, "sessionStorage", "server route browser storage");
requireText(guard, "stopImmediatePropagation", "legacy duplicate-handler prevention");

console.log("Inbound acquisition contract: PASS");
