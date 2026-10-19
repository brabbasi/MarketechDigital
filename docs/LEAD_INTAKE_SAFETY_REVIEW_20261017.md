# Marketech Digital — first-party inquiry safety review candidate

**DRAFT, UNMERGED, UNDEPLOYED.** This is a modification to the real Next.js website source, **not** the separate offline four-offer prototype in the Marketech OS repository. No customer messages, Resend API calls, production environment variables, DNS, Vercel deployment, keys, or published site changed in this work cycle.

## Actual live-site finding

The public landing page currently shows older mailto fallback copy with a personal-address destination, while its modern `/contact` route and popup send to an existing `/api/lead` Resend handler. The handler did not previously require affirmative inquiry/contact permission, had no bounded body stream, and logged complete submitted inquiry contents when the provider key was missing. The popup's global capture listener also hijacked `mailto:` fallback links back into its own form.

## Draft changes

- `app/api/lead/lead-guards.ts`: pure strict first-party request parser with exact same-origin `Origin` comparison, JSON-only type, max 8 KiB streaming body, bounded fields, explicit request-to-contact opt-in, separate opt-in for forwarding assistant conversations, reject unknown fields, validate email/name, and optional hidden honeypot. This **does not** authenticate email ownership or protect against scripted bots/rate floods.
- `app/api/lead/route.ts`: calls the guard before constructing or sending any message and avoids logging inquiry names/text or raw provider error bodies.
- `app/contact/ContactClient.tsx` and `app/UXFixLayer.tsx`: require a visible contact checkbox and required identity fields; direct `mailto:` fallback is no longer intercepted.
- `app/page.tsx`: direct email draft fallback now uses the branded project mailbox rather than the historical personal mailbox; stale domain-not-live language was corrected.
- `app/api/lead/lead-guards.test.mjs`: real Node Request/stream tests for accepted and rejected synthetic data, no network or provider use; least-privileged no-email CI.

## Separate publication gates

1. Review same-origin behavior across custom domain, mobile, preview and proxy deployments; same-origin is only a browser CSRF control, not bot defense.
2. Ensure email provider and branded mailboxes actually receive messages in an isolated **explicitly approved** end-to-end synthetic delivery test; this PR does **not** send one.
3. Add edge rate limits / abuse detection, retention and privacy-policy approval, consent/version receipts, and appropriate bot protection before broad exposure.
4. Run the full Next.js TypeScript build and manual mobile/browser accessibility testing before deployment; source-only Node tests are not equivalent to that.
5. Independently review all code and obtain explicit Founder release approval. Do not auto-merge or silently redeploy this branch.

**Revenue truth:** Existing public website is live, but the draft safety fixes are not. No inquiry, booking, transaction or new revenue was verified by this work cycle.
