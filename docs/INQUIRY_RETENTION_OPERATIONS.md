# Marketech Digital — operational inquiry retention procedure

**Status:** Operational steps and local metadata-only review tool implemented on existing DRAFT website PR #21. Live provider deletion and final process acceptance remain separate, evidence-based gates. No live records were deleted or exported as part of preparation.

**Policy owner:** Founder or an explicitly designated human privacy custodian. Do not assign destructive powers to JARVIS, a scheduled task, a generic agent, or the website's public API.

**Controlling policy:** Founder-approved November 5, 2026, for release preparation. Unconverted inquiry content and correspondence must be deleted or de-identified **within 180 days after the most recent meaningful human exchange**. An automated acknowledgment, tracking event or marketing message does not reset this clock. A converted client follows its project contract; a specific legal/regulatory duty, dispute or active verified privacy request requires a documented exception and periodic review.

## Previously established facts — do not repeat setup

The Founder previously verified the working Namecheap business mailbox, sending domain and Resend setup. The existing protected website preview later returned a successful provider-accepted synthetic owner-only inquiry at the approved recipient. Those facts are historical acceptance; none authorizes changing credentials, re-sending tests, deleting records, merging PR #21 or publishing production.

The current candidate app/api/inquiry/route.ts performs a single owner-only Resend API send; it does **not** persist inquiry bodies to an application database, CRM, queue or browser local storage. This statement concerns the checked source only; it does not prove the absence of independently configured mailbox forwards, Vercel access logs, Resend events, client backups or manual exports.

## Data locations and actual removal method

| System | What could contain inquiry information | Custodian action / evidence | Truth boundary |
| --- | --- | --- | --- |
| Namecheap Private Email: approved business inbox | Original owner notification; subsequent human replies and attachments in Inbox, Archive, Sent, Drafts, Spam, Trash and custom folders | Search the *full thread* and associated attachments; delete only the individually identified inquiry and related correspondence; select each targeted message in Trash and **permanently delete**. Verify search across all folders no longer finds the thread. Record private timestamp and opaque reference. | Moving to Trash is **not** permanent deletion. Namecheap confirms Trash is not automatically emptied. |
| Mail forwarding, IMAP/POP, other devices, downloads | Forwarded messages and independent copies that survive mailbox deletion | Check filters/forwarding and connected clients. Remove corresponding copies from actual destination/client only with relevant access and authority; record destinations reviewed or confirmed absent. | A mailbox deletion does not prove copies elsewhere are gone. |
| Resend delivery service | Outgoing email body and send/delivery logs | Check account plan/retention and matching provider message ID privately. Standard Free/Pro/Scale retention is **30 days** for email and logs, and vendor backups are **7 days**; enterprise may differ. For urgent early removal, request Resend support assistance using the message ID on the approved account. Preserve only status/expiry evidence privately. | Provider API 2xx means accepted, not necessarily inbox-delivered. No public individual-message delete API. |
| Spreadsheets, CRM, owner exports | Human-made copies, CSVs, support screenshots, attachments | Privately enumerate actual systems and delete or de-identify matching inquiry rows/files and recoverable versions, subject to separately approved legal/client holds. Record actual systems checked; do not invent that a CRM is connected. | No general GitHub or local-Downloads scan establishes actual completeness. |
| Provider and owner backups | Namecheap mailbox snapshots and owner-controlled backups | Namecheap states backups are daily and retained **up to four weeks**. Plan active-message purging by **day 140** at the latest to allow a conservative 28-day backup roll-off before day 180. For actual backup deletion/expiry, retain provider policy/account-specific evidence, not guesses. Review any external backup copies separately. | The four-week guidance is a provider ceiling, **not** an attestation that a particular message was purged from every backup. |
| Vercel hosting, security logs, optional analytics | Request telemetry, IP data and analytics if separately consented | Review logs/retention configuration and confirm the form handler never logs names, email, message text or provider error body. Track analytics/privacy rules separately from raw inquiry-message deletion. | A stateless route does not mean zero access metadata. |

Vendor references:
- Namecheap messages/Trash: https://www.namecheap.com/support/knowledgebase/article.aspx/10827/2178/managing-folders-and-emails-in-private-email/
- Namecheap server backups: https://www.namecheap.com/legal/hosting/netos/
- Resend email/log retention, backups and early removal: https://resend.com/security/gdpr
- Canadian privacy retention guidance: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_use/

## Weekly human-owned execution — existing mailbox, no new scheduler

1. **Inventory.** In the existing approved business mailbox, identify unconverted inquiry threads and all meaningful human replies. Confirm whether the inquiry became a client project, is subject to a verified privacy request, or requires a documented specific legal/dispute hold. Reuse the established business email flow; do **not** run another setup or synthetic owner-delivery test.
2. **Prepare minimal private metadata.** In an operator-controlled secure folder outside the Git repository, record only opaque reference, original received UTC timestamp, an array of meaningful **human** exchange UTC timestamps, converted/hold/deletion-request flags, and verification flags for provider, backups and exports. Do not include names, email addresses, phone numbers, customer messages or provider tokens in this JSON. Never commit the input/output.
3. **Calculate and triage.** From this website repository, run the existing offline implementation with a *private* input and output path:

       node scripts/review-inquiry-retention.mjs --input PRIVATE_METADATA.json --output PRIVATE_PLAN.json

   The input must declare schema_version 1, an explicit as_of UTC timestamp and records; the output is created exclusively and contains no original message bodies. Reuse scripts/test-inquiry-retention-policy.mjs for CI regression checks. The tool **never sends, deletes or connects to any service**. Actual mailbox evidence, not the JSON flags alone, determines acceptance.
4. **Act well before expiry.** At **day 120**, review for closure/active human discussions. By **day 140**, identify inactive unconverted items for targeted permanent mailbox deletion after human review. This leaves a buffer for the Namecheap provider's stated backup retention. If a meaningful human exchange occurs, recalculate from that exchange; automated acknowledgments do not restart time. At **day 152+**, escalate backup-window risk immediately rather than silently claiming compliance. At **day 180**, unresolved personal data without a legitimate documented exception is an overdue privacy action.
5. **Verify all copies individually.** For each eligible thread, prove removal from Namecheap Inbox, Archive, Sent, custom folders and **Trash**; check forwarding, external mail clients, exports, actual CRMs and any owner-controlled backups. Reconcile Resend metadata to the applicable provider retention/early-removal process. Do **not** bulk-empty the entire Trash folder or delete active-client/legal-hold information.
6. **Close with private evidence.** Record opaque reference, last meaningful exchange date, purge/verification dates, provider and backup expiry evidence or exception reason, reviewer identity and independent spot-check. Store this receipt **privately**, never in GitHub comments, analytics or public CI. Escalate missing sources and conflicting retention policies; never mark a record deleted on the basis of a script prediction.

### Example private metadata shape (all identifiers and dates fictional)

    {
      "schema_version": 1,
      "as_of": "2026-11-08T00:45:00Z",
      "records": [
        {
          "reference": "INQ-fixture-001",
          "received_at": "2026-07-01T12:00:00Z",
          "meaningful_human_at": [],
          "automated_message_at": [],
          "client_converted": false,
          "legal_hold": false,
          "deletion_requested": false,
          "provider_inventory_verified": false,
          "backup_expiry_verified": false,
          "exports_reviewed": false
        }
      ]
    }

Never put **real** inquiry metadata into this example, the repo, or GitHub Actions.

## Operator acceptance / failure criteria

- **PASS, implementation:** metadata-only retention planner runs locally; established 9 fictional policy scenarios and boundary/privacy tests pass; Namecheap/Resend/backup/manual-copy SOP is documented; no network, credentials, automated deletion or customer email side effects.
- **PASS, operational deletion:** authorized custodian presents a private synthetic **or legitimately due** record with evidence of targeted permanent mailbox removal and other copies/retention, review of applicable backup lifespan and second-person/Founder audit. **Do not delete live customer data without separate permission**; a synthetic isolated rehearsal is sufficient to check the workflow while waiting for the first real expiry.
- **FAIL:** code tests alone, moving to Trash, assuming Resend HTTP 2xx means inbox delivery, assuming there are no exports, relying on a GitHub comment or clean logs to establish deletion, or relying on a calendar reminder without proof.
- **Release gate:** The Founder must accept the manual human process and its real or isolated, privacy-safe evidence. Until then, retain the honest draft notice in app/privacy/page.tsx and treat production as **NO-GO** for this acceptance criterion.

## Scope and governance

This procedure does not create a new scheduler or JARVIS worker, change production, rotate credentials, create a customer database, delete any mailbox records, or modify Resend/Namecheap settings. Human owner reviews unconverted inquiry retention weekly. The actual privacy policy may require legal review where applicable; this is an engineering and operational procedure, not legal advice.
