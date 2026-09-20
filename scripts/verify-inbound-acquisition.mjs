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

function requireEqual(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

const inquiry = read("app/api/inquiry/route.ts");
const legacyLead = read("app/api/lead/route.ts");
const contact = read("app/contact/ContactClient.tsx");
const idea = read("app/IdeaGenerator.tsx");
const assistant = read("app/AIAssistant.tsx");
const guard = read("app/AcquisitionGuard.tsx");
const layout = read("app/layout.tsx");
const homepage = read("app/page.tsx");
const inboundCi = read(".github/workflows/inbound-acquisition-ci.yml");
const packageJson = JSON.parse(read("package.json"));
const rateLimitManifest = JSON.parse(read(".marketech/inquiry-rate-limit-v1.json"));

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

// The public endpoint can generate an owner email, so a submission ID alone is not
// an abuse boundary. Require the Vercel firewall SDK and fail closed if the bound
// dashboard rule is absent/unavailable rather than silently allowing unlimited
// unique submission IDs to consume owner mailbox/provider quota.
requireEqual(packageJson.dependencies?.["@vercel/firewall"], "1.2.5", "pinned Vercel firewall SDK");
requireText(inquiry, 'import { checkRateLimit } from "@vercel/firewall"', "rate-limit SDK import");
requireText(inquiry, 'INQUIRY_RATE_LIMIT_ID = "marketech-inquiry-owner-notification"', "fixed rate-limit rule identity");
requireText(inquiry, "checkRateLimit(INQUIRY_RATE_LIMIT_ID, { request })", "server-side rate-limit check");
requireText(inquiry, '"error" in limitResult && limitResult.error', "missing-rule fail-closed detection");
requireText(inquiry, "MARKETECH_INQUIRY_RATE_LIMIT_UNAVAILABLE", "rate-limit unavailable audit marker");
requireText(inquiry, "MARKETECH_INQUIRY_RATE_LIMIT_FAILED", "rate-limit exception audit marker");
requireText(inquiry, "status: 429", "rate-limit rejection status");
requireText(inquiry, '"Retry-After": "60"', "rate-limit retry contract");
requireText(inquiry, "status: 503", "rate-limit fail-closed status");
requireText(inquiry, "const rateLimitResponse = await enforceInquiryRateLimit(request)", "rate-limit execution before owner send");

requireEqual(rateLimitManifest.schema_version, 1, "rate-limit manifest schema");
requireEqual(rateLimitManifest.vercel?.team_id, "team_OHRkafYU5Gg6L00qcwYYsq81", "rate-limit team binding");
requireEqual(rateLimitManifest.vercel?.project_id, "prj_iRZyxQA5Gh93mcrEt7Z6XSMN7HVJ", "rate-limit project binding");
requireEqual(rateLimitManifest.rule?.id, "marketech-inquiry-owner-notification", "rate-limit rule binding");
requireEqual(rateLimitManifest.rule?.environment, "production", "rate-limit environment binding");
requireEqual(rateLimitManifest.rule?.method, "POST", "rate-limit method binding");
requireEqual(rateLimitManifest.rule?.path, "/api/inquiry", "rate-limit path binding");
requireEqual(rateLimitManifest.rule?.window_seconds, 60, "rate-limit window");
requireEqual(rateLimitManifest.rule?.requests_per_window, 5, "rate-limit request budget");
requireEqual(rateLimitManifest.rule?.keys?.join(","), "ip", "rate-limit privacy-preserving platform key");
requireEqual(rateLimitManifest.rule?.limit_action, "rate_limit", "rate-limit action");
requireEqual(rateLimitManifest.rule?.limited_status, 429, "rate-limit status binding");
requireEqual(rateLimitManifest.application_contract?.missing_rule_or_sdk_error, "fail_closed_503", "missing-rule fail-closed manifest");
requireEqual(rateLimitManifest.application_contract?.submission_id_is_not_rate_limit_identity, true, "submission-id abuse-boundary assertion");
requireEqual(rateLimitManifest.application_contract?.raw_client_ip_stored_by_application, false, "application IP minimization");
requireEqual(rateLimitManifest.deployment_gate?.production_rule_required, true, "production firewall prerequisite");
requireEqual(rateLimitManifest.deployment_gate?.production_rule_activation_performed_by_this_pr, false, "no implicit firewall activation");
requireEqual(rateLimitManifest.deployment_gate?.founder_approval_required_before_production_activation, true, "Founder firewall activation gate");
requireEqual(rateLimitManifest.deployment_gate?.production_deployment_authorized_by_this_manifest, false, "manifest is not deployment authority");

// Acquisition attribution is advisory analytics data, not trusted user input.
// Keep v1 sources/campaigns bounded and normalize URL-like values again server-side.
for (const marker of [
  "ALLOWED_SOURCES",
  "ALLOWED_MEDIUMS",
  "ALLOWED_CAMPAIGNS",
  "ALLOWED_FIRST_TOUCH",
  "pickAllowed",
  "safeLandingPath",
  "safeReferrer"
]) {
  requireText(inquiry, marker, "server attribution normalization");
}
for (const allowedValue of [
  '"website-contact"',
  '"website-contact-popup"',
  '"idea-helper"',
  '"ai-assistant"',
  '"inbound-idea-helper"',
  '"assistant-contact"',
  '"Idea Helper recommendation"',
  '"Talk to Basit"'
]) {
  requireText(inquiry, allowedValue, "bounded acquisition vocabulary");
}
requireText(inquiry, 'parsed.protocol !== "https:" && parsed.protocol !== "http:"', "referrer protocol gate");
requireText(inquiry, "candidate.split(/[?#]/, 1)[0]", "landing query-fragment stripping");
requireText(inquiry, "`${parsed.origin}${parsed.pathname}`", "server referrer query stripping");

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

// Contact taxonomy must continue to represent Marketech's broader business model,
// not collapse back to a website-only agency.
for (const offer of [
  "Website / web app",
  "SEO / GEO / local search",
  "AI strategy",
  "Workflow automation",
  "AI website agent / lead qualification",
  "Dashboard / decision intelligence",
  "Custom software / internal tool",
  "Digital marketing / growth campaign",
  "Branding / messaging",
  "Partnership / implementation",
  "Not sure yet"
]) {
  requireText(contact, offer, "full Marketech inquiry taxonomy");
}
requireText(contact, "Tell us what you need", "broad inquiry CTA");

// Homepage acquisition behavior is part of this contract; homepage-only changes
// must trigger this workflow so mailto/send-surface and structured-data regressions
// cannot bypass the acquisition verifier.
requireText(inboundCi, "- 'app/page.tsx'", "homepage acquisition CI trigger");

requireText(idea, "Send me this plan", "idea-helper conversion CTA");
requireText(idea, "Talk to Basit", "founder CTA");
requireText(idea, 'source: "idea-helper"', "idea-helper attribution");
requireText(idea, 'firstTouchOffer: "Idea Helper recommendation"', "fixed first-touch label");
requireText(idea, 'service: "Not sure yet"', "valid contact-service default");
requireText(idea, 'recommendedService: "Idea Helper recommendation"', "fixed non-PII recommendation handoff");
forbidText(idea, "recommendedService: idea.recommendedSystem", "generated recommendation text in contact URL");
forbidText(idea, "firstTouchOffer: idea.title", "generated title in URL attribution");

// AI assistant now links directly to the governed contact flow. It must not rely
// on a mailto click interceptor or silently submit a second lead request.
requireText(assistant, 'const contactHref = "/contact?source=ai-assistant', "AI assistant direct contact route");
requireText(assistant, "campaign=assistant-contact", "AI assistant campaign attribution");
requireText(assistant, "recommendedService=AI%20assistant%20conversation", "AI assistant service attribution");
forbidText(assistant, 'fetch("/api/lead"', "AI assistant legacy endpoint");
forbidText(assistant, "submitLead", "AI assistant hidden side-effect handler");
forbidText(assistant, "mailto:", "AI assistant contact mailto bypass");

// AcquisitionGuard remains only as a compatibility bridge for the legacy popup
// form in UXFixLayer. It no longer intercepts AI-assistant clicks.
requireText(guard, 'target.matches(".contact-popup-form")', "legacy contact-popup guard");
requireText(guard, 'fetch("/api/inquiry"', "legacy popup endpoint migration");
requireText(guard, "safeReferrer", "legacy referrer minimization");
requireText(guard, "window.location.pathname", "legacy landing-path minimization");
requireText(guard, "stopImmediatePropagation", "legacy duplicate-handler prevention");
forbidText(guard, ".ai-actions", "obsolete AI assistant click interception");
forbidText(guard, "assistant-contact", "duplicate AI assistant attribution path");
forbidText(guard, "window.location.search", "legacy landing query-string collection");

requireText(layout, 'import AcquisitionGuard from "./AcquisitionGuard"', "global guard import");
requireText(layout, "<AcquisitionGuard />", "global guard mount");

requireText(homepage, 'window.location.href = `/contact?${params.toString()}`', "homepage governed contact handoff");
requireText(homepage, 'source: "website-contact" | "website-contact-popup"', "homepage bounded contact sources");
requireText(homepage, 'medium: "website"', "homepage bounded contact medium");
requireText(homepage, '"@type": "FAQPage"', "homepage FAQ structured data");
forbidText(homepage, '"@type": "Organization"', "duplicate homepage organization structured data");
forbidText(homepage, "abasitabbasi99@gmail.com", "personal Gmail public contact bypass");
forbidText(homepage, "mailto:", "homepage mailto bypass");
forbidText(homepage, 'fetch("/api/lead"', "homepage legacy lead endpoint");
forbidText(homepage, "sendEmail", "homepage legacy email handler");
forbidText(homepage, "ContactFields", "homepage duplicate form implementation");
requireText(layout, "organizationJsonLd()", "canonical organization structured-data source");

forbidText(contact, 'fetch("/api/lead"', "contact page legacy endpoint");
forbidText(inquiry, "localStorage", "server route browser storage");
forbidText(inquiry, "sessionStorage", "server route browser storage");

console.log("Inbound acquisition contract: PASS");
