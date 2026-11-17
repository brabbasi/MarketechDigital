# Marketech Digital — website release rollback and recovery packet

**Status:** Read-only rollback planning completed on the original website PR #21. No production deployment, merge, promote, alias reassignment, WAF change or rollback was executed. This packet does **not** authorize any of them.

## 1. Goal

Preserve the currently working website while preparing an explicit, testable incident recovery option for the reviewed governed inbound release. Avoid new deployment infrastructure and do not confuse a Preview deployment with a staged Production build.

## 2. Current state and exact identities (must recheck at execution time)

| Property | Last established reference |
| --- | --- |
| Website repository / PR | brabbasi/MarketechDigital / existing DRAFT #21, base main |
| Vercel project | prj_iRZyxQA5Gh93mcrEt7Z6XSMN7HVJ |
| Vercel team | team_OHRkafYU5Gg6L00qcwYYsq81 |
| Production domain | getmarketechdigital.com (www redirects to apex) |
| Existing pre-release production deployment | dpl_CjgrvECd5fTmLQguhU4ofm3Cj7ob |
| Existing production SHA and branch | e8ce3ac37edfad6cd54de5d68666699a068ebfef, main |
| Existing prior production deployment state | READY; production target |
| Prior exact-head source of owner-only protected preview | 28aa267d0c65c8beda5220d33eabcefd56a45f0b, dpl_DBFasky7QfQBRKYnCWApfdDxe2fr, PREVIEW only |
| Latest release-candidate SHA | Must be retrieved freshly from PR #21 after retention documentation/test updates; never silently reuse old 28aa... |
| Deployment promotion authorization | Not granted. Founder production HOLD remains active. |

These immutable IDs support comparison and recovery; they do not prove that domains, environment settings or deployment status remain unchanged at any future point.

### Critical rollback risk — pre-release website is not privacy-equivalent

The old production/main tree has **no** app/privacy/page.tsx, and its contact form POSTs to **/api/lead**. The old /api/lead handler may send personal information without the newer governed owner-only form controls. The newer PR #21 instead publishes /privacy, retires /api/lead (410), and uses same-origin, consent-gated, throttled /api/inquiry.

Consequently **do not claim a direct rollback to old main is privacy-safe**. Any incident rollback must explicitly decide whether re-exposing /api/lead and removing /privacy is acceptable; normally it should require a separately approved, documented emergency intake-disable/maintenance mitigation until the governed release is restored. No existing safe toggle or firewall rule for the old API has been proven. An automatic old-binary rollback is not accepted by this packet.

## 3. Active files / services and evidence

- Production app: source SHA e8ce3ac; Vercel production deployment dpl_CjgrvECd5fTmLQguhU4ofm3Cj7ob.
- Candidate app: original Draft PR #21 and its reviewable main-relative diff; retain its pre-production approved recipient/security controls.
- Current policy: docs/FOUNDER_INBOUND_RELEASE_GATE_20261018.md.
- Retention procedure: docs/INQUIRY_RETENTION_OPERATIONS.md.
- Current CI: the two existing acquisition and integration workflows on exact head.
- Vercel deployment and alias history, currently active firewall, original business mailbox and Resend are existing infrastructure. Do not add a competing provider or sender.
- Provider official docs on rollback and environment-specific builds:
  https://vercel.com/docs/instant-rollback
  https://vercel.com/docs/deployments/promoting-a-deployment

## 4. Changes and read-only rollback rehearsal

No production action. The recorded deployment and domain identities establish the baseline. For the final release acceptance operator:

1. Confirm exact PR head, both CI workflows and separate **independent full-main-diff security review**. Verify Founder approval is for that exact SHA and main/production target. Do not treat review comments on older SHA as exact current-head clearance.
2. Re-read Vercel project and aliases; ensure getmarketechdigital.com points to the intended READY production deployment and the planned release exists in the same project/team. Check current WAF rule, provider configuration and original release conditions. Never print secret values.
3. Understand how the production candidate will be built: a protected Preview is not a production binary and may have different environment variables. If authorization is obtained, stage a **production-environment** build without assigning the domain, verify its actual output, and present that immutable staged deployment for a separate promotion decision. Do not promote a Preview as if identical.
4. Before promotion, identify the precise last-known-good deployment for each critical public route: /, /contact, /privacy, /solutions/ottawa, POST /api/inquiry, and retired POST /api/lead. The original baseline differs, so capture route-risk acceptance explicitly.
5. Record dry-run operator actions, prerequisites, expected state changes and rollback trigger. A dry-run is **read-only**: inspecting current aliases and deployment metadata does not change routing.
6. After a future **separately authorized** production release, compare domain routing, forms, consent, analytics choices, mobile rendering, effective WAF, owner delivery and error telemetry to the approved release receipt. An incident must be evidenced; do not roll back reflexively.
7. If a real incident requires rollback, obtain specific Founder authorization for the exact previous deployment and any intake-disable/maintenance mitigation. Use Vercel's supported rollback control against the *approved* deployment. This can stop automatic production-domain assignment; record and explicitly restore normal promotion policy after recovery, not blindly.
8. Validate actual restored domain and route behavior, privacy notice visibility or emergency mitigation, and keep customer inquiry sends suppressed if the old ungoverned endpoint would otherwise be re-enabled. Record timeline, affected routes, alias identity and follow-up postmortem privately.

### Execution triggers — not commands to execute now

- A newly promoted production deployment fails contact routing, causes consent bypass, exposes PII, breaks public pages or changes ownership.
- The independent release/incident approver identifies a severe regression and approves the exact rollback+privacy containment procedure.
- Monitoring and permitted incident response establish the intended previous deployment is still READY and compatible. If not, STOP and present a recovery decision, rather than guessing an alias.

## 5. Failed attempts, known limitations, and review gates

- Current old main **/privacy returns 404**; old API route remains /api/lead. That prevents labeling the old binary a fully accepted privacy-preserving fallback.
- No emergency-route suppression has been implemented or proven; do not claim one exists.
- No production-deployment staging, Vercel Instant Rollback, alias reassignment or source merge performed. A recorded READY deployment alone does not establish operational recovery acceptance.
- Previous exact-head security review did not encompass any future retention/rollback source changes. Full main-relative release verdict must be repeated for final immutable head.
- Historical Namecheap/Resend setup and owner-only Preview acceptance are carried forward. They are not reasons for new setup or duplicate synthetic sends.
- No secret values or real inquiry records belong in GitHub.

## 6. Next steps and production GO/NO-GO boundary

**Technical release candidate:** PR #21 exact new head; CI green; separate full-main-diff security/release verdict; human privacy-retention process accepted; source/header/domain/consent and rollback conditions accepted.

**Recovery decision:** Either (a) explicitly approve an emergency, narrowly scoped intake-disable/maintenance containment that prevents personal-data collection when the older binary is active, with independent review and a reversible procedure, or (b) defer production promotion until a privacy-equivalent, independently accepted recovery build exists. This is a real release risk, not grounds to replace existing website code with another prototype.

**Final Founder decision:** After above gates, issue a separately scoped GO for exact PR head and staged production deployment; otherwise NO-GO. Do not auto-merge, auto-promote, send outreach, spend, modify WAF/secrets, activate Runtime or execute rollback under a review-only acceptance authorization.

## 7. In-branch source-only privacy-equivalent recovery variant (November 12, 2026)

The ORIGINAL Draft PR #21 branch now contains a restricted recovery code path;
this is a modification of the existing reviewed website, **not** a new site,
PR, production deployment, ingress service, sender or architecture.

**Activation contract (source/build only):** `MARKETECH_RECOVERY_MODE=true`
is a server-owned environment flag. When present for a dedicated *immutable*
build and its runtime, the site:

- Preserves public pages, `/privacy`, direct-email contact information and
  the existing stated privacy/retention policy; the recovery notice explicitly
  explains that the online form and optional AI inputs are unavailable.
- Serves `/contact` without rendering the inquiry form.
- Blocks `POST /api/inquiry` with HTTP 503 and `Cache-Control: no-store`
  **before inspecting headers, origin or request body**, invoking the WAF SDK,
  or contacting Resend. The guard is defense in depth, not a bypass of the
  normal approved WAF/intake controls when regular mode is active.
- Preserves `POST /api/lead` at HTTP 410; no legacy sender is restored.
- Blocks `POST /api/chat` and `POST /api/idea` with HTTP 503 before parsing
  user text or contacting a metered model. AI assistant and audit popup are
  not rendered, and the Idea Helper shows an offline notice instead of a form.
- Intercepts legacy popup forms before reading their fields and routes the
  visitor to the non-submitting contact notice.
- Keeps direct `mailto:` optional: choosing to send ordinary email remains a
  **separate provider/mailbox flow** governed by existing human retention and
  privacy practices, not a silent website inquiry collection workaround.

**Isolated CI evidence:** the original Ottawa Integration workflow now includes
a distinct `recovery-non-collecting` job. It builds the actual Next production
bundle with `MARKETECH_RECOVERY_MODE=true`, NO provider secrets and NO
deployment token, then starts it on loopback for public GET checks and
synthetic 503/410 POST checks. The original standard-mode CI still tests
working owner-only intake. Verify the exact-head job's real result; the
existence of a CI job alone is **not** a successful build.

**Missing and separately gated:**

1. Obtain successful exact-head standard-mode CI and recovery-mode CI, including
   real built route checks. Source tests cannot establish deployed
   production-environment behavior.
2. Obtain full main-relative independent SOURCE SECURITY ACCEPT on the immutable
   combined PR #21 head. The old PASS at `ea43b0f` is historical after
   recovery code changes; require renewed review of all inherited changes.
3. Verify *the separate intended production-environment recovery artifact*
   is built and run with `MARKETECH_RECOVERY_MODE=true` consistently at
   build time and runtime. A regular READY Preview, an unset flag, or a
   static source assertion cannot satisfy this. Check actual GET and POST
   responses, no provider egress/PII logging, consent/analytics and mobile
   paths, under independent acceptance, before assigning any domain.
4. Require explicit Founder staging authorization **before** any Vercel
   production-target deployment, even with --skip-domain; require a second
   final Founder GO to promote/rollback/alias a domain. The old
   `e8ce3ac` build is NOT silently reclassified as safe.
5. Independently accept the separate human synthetic retention rehearsal:
   folders, Trash permanent deletion, forwards/IMAP, exports, Resend
   retention, Namecheap/owner backups and signed private audit receipt.
   Do not delete real customer data or claim a rehearsal was done by CI.

**Governance at source preparation:** production alias remains on the previous
build until a separate authorization. No merge, deployment, provider settings
change, customer send, actual mailbox deletion, or incident rollback is
permitted by this section.
