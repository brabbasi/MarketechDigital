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

if (contact.includes('fetch("/api/lead"')) throw new Error("contact page still posts to legacy lead endpoint");
if (inquiry.includes("localStorage") || inquiry.includes("sessionStorage")) throw new Error("server route must not rely on browser storage");

console.log("Inbound acquisition contract: PASS");
