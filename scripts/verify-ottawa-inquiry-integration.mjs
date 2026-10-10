import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const page = read("app/solutions/ottawa/page.tsx");
const contact = read("app/contact/ContactClient.tsx");
const inquiry = read("app/api/inquiry/route.ts");
const retired = read("app/api/lead/route.ts");
const home = read("app/page.tsx");
const hydratedHome = read("app/HomeV1CleanupLayer.tsx");
const about = read("app/about/page.tsx");
const founder = read("app/founder/page.tsx");
const dice = read("app/GlobalLogoCube.tsx");
const innerDice = read("app/GlobalPageHeader.tsx");
const sitemap = read("app/sitemap.ts");

const offers = ["lead-rescue", "trades-funnel", "internal-ai-pilot", "content-sprint"];
for (const offer of offers) {
  assert.ok(page.includes(`slug: "${offer}"`), "missing landing-page offer: "+offer);
  assert.ok(contact.includes(`"${offer}":`), "missing governed contact offer allowlist: "+offer);
}
assert.ok(contact.includes('fetch("/api/inquiry"'), "contact form must use governed inquiry path");
assert.ok(!contact.includes('fetch("/api/lead"'), "legacy lead sender must be unreachable from contact");
assert.ok(retired.includes("status: 410"), "legacy lead route must remain hard-retired");
assert.ok(inquiry.includes("Idempotency-Key"), "governed inquiry must keep provider idempotency");
assert.ok(contact.includes("submissionId: submissionIdRef.current"), "client submission identity required");
assert.ok(contact.includes('companyUrl2'), "anti-bot honeypot required");
assert.ok(contact.includes('defaultValue={initialMessage}'), "safe offer prefill must remain editable");
for (const source of [home, hydratedHome, dice, innerDice, about, founder, sitemap]) {
  assert.ok(source.includes("/solutions/ottawa"), "offer route missing discoverability surface");
}
assert.ok(contact.includes('"Lead capture / quote forms"'), "lead rescue contact category missing");
assert.ok(contact.includes('"Video editing / content"'), "content sprint contact category missing");
assert.ok(page.includes('service: "Workflow automation"'), "AI offer should use governed service category");
assert.ok(page.includes('service: "Website / web app"'), "trades offer should use governed service category");
assert.ok(page.includes('offerHref("lead-rescue", "Lead capture / quote forms")'), "hero lead CTA must preselect a governed service");
assert.ok(!page.includes("guaranteed leads"), "no guaranteed lead-volume claims");
console.log("OTTAWA_OFFERS_INBOUND_INTEGRATION=PASS");
console.log("SINGLE_GOVERNED_SENDER=/api/inquiry");
console.log("LEGACY_LEAD_SENDER=410");
console.log("LIVE_PRODUCTION_RELEASE_AND_CUSTOMER_OUTBOUND=NOT_AUTHORIZED");
