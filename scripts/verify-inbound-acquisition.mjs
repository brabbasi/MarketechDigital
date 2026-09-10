import fs from "node:fs";

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function requireText(source, needle, label) {
  if (!source.includes(needle)) throw new Error(`${label}: missing ${needle}`);
}

const inquiry = read("app/api/inquiry/route.ts");
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

requireText(inquiry, '"Idempotency-Key": message.idempotencyKey', "provider idempotency");
requireText(inquiry, "lead-owner/${payload.submissionId}", "owner send key");
requireText(inquiry, "lead-receipt/${payload.submissionId}", "receipt send key");
requireText(inquiry, "isValidSubmissionId", "submission-id validation");
requireText(contact, 'fetch("/api/inquiry"', "contact endpoint migration");
requireText(contact, "submissionIdRef", "stable retry identity");
requireText(contact, "document.referrer", "referrer capture");
requireText(contact, "window.location.pathname", "landing-page capture");
requireText(idea, "Send me this plan", "idea-helper conversion CTA");
requireText(idea, "Talk to Basit", "founder CTA");
requireText(idea, 'source: "idea-helper"', "idea-helper attribution");
requireText(idea, "recommendedService", "recommendation preservation");
requireText(guard, 'target.matches(".contact-popup-form")', "legacy contact-popup guard");
requireText(guard, 'fetch("/api/inquiry"', "legacy popup endpoint migration");
requireText(guard, ".ai-actions a[href^='mailto:']", "AI assistant contact interception");
requireText(guard, "assistant-contact", "AI assistant acquisition attribution");
requireText(layout, 'import AcquisitionGuard from "./AcquisitionGuard"', "global guard import");
requireText(layout, "<AcquisitionGuard />", "global guard mount");

if (contact.includes('fetch("/api/lead"')) throw new Error("contact page still posts to legacy lead endpoint");
if (inquiry.includes("localStorage") || inquiry.includes("sessionStorage")) throw new Error("server route must not rely on browser storage");
if (!guard.includes("stopImmediatePropagation")) throw new Error("legacy capture guard must prevent legacy submit/click handlers from firing after interception");

console.log("Inbound acquisition contract: PASS");
