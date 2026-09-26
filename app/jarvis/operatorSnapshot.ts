import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
} from "./jarvisState";

const SNAPSHOT_AT = "2026-09-26T19:25:00Z";

const projectOverrides: Record<string, Partial<JarvisProject>> = {
  jarvis: {
    state: "review",
    progress: 94,
    now: "Trusted Bridge #66 is LIVE at d34b4e45 and Trusted Reviewer #46 is LIVE at fd07e217. Runtime #40 is frozen at c743f1ff with both engineering CIs green, but Runtime remains OFF because legitimate semantic-review capacity is exhausted. Hosted Codex confirmed the code-review usage limit at comment 5849112468; the installed Reviewer also reaches its governed sandbox then returns no verdict. Phase A #80 fa684dd8 remains engineering-green and OFF. Parallel lanes are moving: #77 Revenue worker QA passed again; #93 Workforce truth is green; #132 MemPalace, #133 Hermes, and #134 dependency helper are green after fresh hardening. The Founder Portal deployment gate was repaired so this dedicated JARVIS branch no longer silently skips updates when a commit lacks [vercel-preview].",
    next: "Keep #40 exact c743f1ff frozen and first in line for legitimate semantic review when capacity returns. On PASS: governed Runtime recovery -> live event-driven continuation proof -> #80 review -> Founder-gated Phase A. In parallel, continue bounded revenue, workforce, memory and dependency QA, and keep the Founder Portal synchronized on every material transition.",
    blocked: 1,
    lastUpdate: "2026-09-26: #40 engineering green but semantic review capacity blocked; #77 QA passed; #93 workforce ce870d5d green; #132 ef5c4f4f green; #133 1ba352b0 green; #134 01d2fdcc green. Portal auto-deploy skip repaired at b0e4571c.",
    history: [
      "Bridge #66 d34b4e45 is installed and live with finite Trusted Reviewer install authority only.",
      "Reviewer #46 fd07e217 is installed/live/restricted and fails closed when Codex cannot produce a verdict.",
      "#40 c743f1ff: Continuation CI 36260436446 SUCCESS and Activation Closure CI 36260436382 SUCCESS; Runtime remains OFF pending legitimate exact-head semantic PASS.",
      "Hosted Codex review request 5849110274 was rejected at 5849112468 because the code-review usage limit is reached.",
      "#77 Revenue Autonomous Workers ce12bb47 passed the fresh self-hosted QA rerun; business-worker runtime remains unactivated.",
      "#93 Workforce ce870d5d, #132 MemPalace ef5c4f4f, #133 Hermes 1ba352b0 and #134 dependency helper 01d2fdcc are engineering-green.",
      "Founder Portal branch builds are now always eligible so operator-truth commits cannot be silently canceled by the preview-budget tag gate."
    ],
  },
  site: {
    state: "review",
    progress: 84,
    now: "Revenue-first public-site release train is explicit. Inbound PR #11 dd33b705 is CI-green, independently reviewed and already conditionally Founder-approved; only factual production WAF proof remains. Production favicon/OG defect PR #17 b36fe5b2 is exact-head CI SUCCESS + Vercel READY after directly proving /og-image.png and all icon routes render HTTP 200.",
    next: "Verify #11 production WAF rule without guessing or changing firewall authority. Review #17 exact b36fe5b2 when capacity permits. Keep #16 preview-budget gate and #15 Next 15 migration behind those revenue/reliability gates.",
    blocked: 2,
    lastUpdate: "Fresh production telemetry showed 57 favicon/OG renderer errors affecting 22 users on the old live baseline. #17 fixed the renderer and closed the missing /og-image.png CI coverage gap. This portal checkpoint also installs the preview-budget gate so future JARVIS status refreshes do not burn unnecessary Vercel builds.",
    history: [
      "PR #11 exact dd33b705 fixes the live email-app/personal-Gmail inquiry flow but still requires factual WAF verification.",
      "PR #17 exact b36fe5b2: Favicon Runtime CI 35540883666 SUCCESS; /og-image.png returned HTTP 200 image/png; Vercel preview dpl_8NUNhmgxYiGXDawi3YN2brtzVQTh READY.",
      "PR #16 preview-budget gate permits production and explicit [vercel-preview] checkpoints while suppressing ordinary high-churn JARVIS previews.",
      "Online portal remains coordination truth; signed Runtime/live-state mirror governance stays separate."
    ],
  },
  deutschpath: {
    state: "on_track",
    progress: 69,
    now: "Launch reconciliation PR #22 was reduced to zero changed files and closed as redundant. The real Vercel build regression was the missing permanent /beta -> /pricing redirect; redirect-only repair proved READY.",
    next: "Keep canonical main as product truth; continue central Reviewer enrollment and route future private CI through governed self-hosted capacity once #101 is installed.",
    blocked: 1,
    lastUpdate: "PR #22 closed reconciled/redundant; product build root cause proven and canonical main preserved.",
    history: [
      "Missing /beta -> /pricing redirect deterministically caused validate:appearance-4d build failure.",
      "Redirect-only repair deployed READY on Vercel.",
      "Older auth/footer variants were not revived; final reconciliation had zero file differences from main.",
    ],
  },
  rangrez: {
    state: "review",
    progress: 67,
    now: "P27 stays frozen. Wardrobe continuity #28 is source-contract green at 004d14f5 after preserving Load more across empty category filters; affiliate policy #29 is 4/4 focused-test green at 55ef2a8d; #30 central Reviewer enrollment is c930394e.",
    next: "Hold exact product heads for independent review; keep live Supabase/device/Spatial Closet release gates separate and do not revive closed legacy #4/#22/#23 implementations.",
    blocked: 1,
    lastUpdate: "Legacy #4/#22/#23 closed; #28/#29 carry the preserved capabilities safely; #30 carries central Reviewer enrollment. Hosted red jobs remain pre-step infrastructure failures, not product verdicts.",
    history: [
      "Legacy wardrobe delete branch #4 closed; non-destructive continuity preserved in #28.",
      "Legacy affiliate-admin #22 closed; server-authoritative policy preserved in #29.",
      "Legacy partner catalog #23 closed; only ranked verified alternatives requirement retained.",
      "P27 Reviewer enrollment moved from obsolete repo-local hosted Action to central Marketech Reviewer contract in #30.",
    ],
  },
  axiom: {
    state: "review",
    progress: 72,
    now: "Canonical research scorecard remains 50 tested / 50 immutable rejects / 0 historical passes / 0 forward survivors. Presentation-truth repair PR #161 is Vercel READY at 5b2d3218 after fixing the final stale 0/42 proof-card value; GitHub proof-ledger run 35535264412 failed before step 1 (steps=null), so that red is infrastructure-only.",
    next: "Keep Stage29.7.3 performance-gated behind independent novelty adjudication and central Reviewer deployment. Do not merge/deploy #161 to production until its review/release gate clears; live capital remains OFF.",
    blocked: 1,
    lastUpdate: "Axiom Command Center stale Stage29.3 / 42-of-42 presentation debt is fully reconciled across the bounded #161 static scorecard surfaces; exact preview dpl_6K683aSDrDVuiqAqXwxZxxtDLRCG is READY without changing research, broker, paper or capital semantics.",
    history: [
      "Canonical scorecard stays 50 tested / 50 rejects / 0 passes / 0 forward survivors.",
      "PR #161 exact head 5b2d3218 changes only index.html, proof.html and dashboard/v2.js; all static 42/42 scorecard remnants are removed and Vercel preview is READY.",
      "GitHub proof-ledger run failed pre-step with steps=null; no product test executed.",
      "Stage29.7.3 remains blocked on independent adjudication; no performance exposure or capital authority was added.",
    ],
  },
  tradepilot: {
    state: "review",
    progress: 58,
    now: "PR #5 exact b27957d4 is candidate-hardened and review-required. Duplicate-current-draft ambiguity fails closed; the latest hosted product CI did not execute any steps because private Actions capacity is exhausted, so that red is infrastructure-only rather than a product verdict.",
    next: "Hold exact source for independent review and resume executable CI through governed capacity. Supabase remains inactive; no live DB/send/provider/billing authority.",
    blocked: 1,
    lastUpdate: "TradePilot remains source-ready but execution-capacity-blocked; no false product failure is inferred from steps=null hosted runs.",
    history: [
      "Exact draft review objects remain immutable/version-bound.",
      "Duplicate current-draft ambiguity now fails closed.",
      "Hosted private CI is blocked by the confirmed 3000/3000 monthly Actions allowance.",
      "Supabase remains inactive and external send/provider authority remains OFF."
    ],
  },
  "finance-os": {
    state: "review",
    progress: 32,
    now: "Stage-1 truth hardening PR #117 exact 8db00ec9 is isolated-Lab green with 23 tests. Conflicting duplicate evidence IDs fail closed, transfer hints are tenant-scoped, and conflicting user-confirmed responsibility/category truth fails closed.",
    next: "Hold #117 for independent review. Continue only synthetic/reference truth-layer engineering; no personal financial data in Git and no financial-action authority.",
    blocked: 1,
    lastUpdate: "Financial Independence OS is now a tested Stage-1 truth-engine candidate, not merely a roadmap, while preserving zero customer-data and zero money-movement authority.",
    history: [
      "F1 CI 35536375641 passed with 23 tests.",
      "Tenant/evidence conflicts fail closed instead of silently collapsing records.",
      "Synthetic/reference data only; no provider integration or financial action authority."
    ],
  },
  portfolio: {
    state: "review",
    progress: 44,
    now: "Central Reviewer enrollment successor is open on current main.",
    next: "Keep portfolio refresh behind higher-priority production/revenue lanes.",
    lastUpdate: "Reviewer enrollment branch refreshed on 2026-09-20.",
  },
  veilbound: {
    state: "review",
    progress: 30,
    now: "Central Reviewer enrollment successor is open; no product scope change is being inferred.",
    next: "Recover roadmap evidence before new implementation.",
    lastUpdate: "Reviewer enrollment branch refreshed on 2026-09-20.",
  },
};

const agentOverrides: Record<string, Partial<JarvisAgent>> = {
  resource: {
    state: "running",
    task: "Safe queue orchestration while Runtime activation is held",
    history: [
      "Bounded internal work can be queued and self-hosted QA can run; general autonomous Runtime dispatch is still OFF.",
      "#77 revenue-preparation work is queued without outbound authority.",
      "Codebase Memory and broader workers remain behind #40 -> #80 rather than being falsely labeled active.",
      "Workforce truth is current at #93 ce870d5d."
    ],
  },
  reviewer: {
    state: "blocked",
    task: "#40 exact-head semantic review capacity",
    history: [
      "Never reuse stale-SHA PASSes or quota-rejected requests as approval.",
      "Trusted Reviewer fd07e217 is live and healthy at the control-plane boundary.",
      "Current #40 attempts pass Reviewer preflight/sandbox but return no semantic verdict.",
      "Hosted Codex independently confirmed code-review usage limits at comment 5849112468."
    ],
  },
  delivery: {
    state: "running",
    task: "Parallel product and QA reconciliation",
    history: [
      "#77 Revenue worker QA passed on the self-hosted Lab lane.",
      "#93 Workforce truth was reconciled to live Bridge/Reviewer state.",
      "Product lanes remain individually gated; no red infrastructure result is treated as a product verdict."
    ],
  },
  engineering: {
    state: "running",
    task: "Founder cockpit auto-sync + current-state redesign",
    history: [
      "JARVIS dedicated branch now always builds on Vercel; missing [vercel-preview] no longer silently cancels dashboard updates.",
      "Founder view now prioritizes Working Now, Blocked, Next Unlock and Recent Proof.",
      "Preview operator state remains coordination truth only; it does not create Runtime authority."
    ],
  },
  memory: {
    state: "review",
    task: "MemPalace IF-3 + Hermes lifecycle hardening",
    history: [
      "#132 ef5c4f4f hardened boolean, timezone and record-size boundaries and is CI-green.",
      "#133 1ba352b0 is synchronized to that hardened parent and CI-green.",
      "No real-corpus writer, provider authentication or memory-store write authority is active."
    ],
  },
  revenue: {
    state: "review",
    task: "Revenue worker QA passed; internal business batch queued",
    history: [
      "#77 ce12bb47 passed fresh self-hosted Revenue Autonomous Workers QA.",
      "Prospect research and drafting are queued internally with outbound OFF.",
      "No worker claim/lease/result is labeled executed until the actual Runtime worker cycle proves it."
    ],
  },
};

const operatorTasks: JarvisTask[] = [
  { id:"t1", title:"Trusted Bridge #66 LIVE", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"done", detail:"Trusted Bridge exact d34b4e45b9f9f4fd084a97a6a1715935872306c9 is installed and live. No Runtime, outbound, spend or Founder-decision authority was widened." },
  { id:"t18", title:"Trusted Reviewer #46 LIVE", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"done", detail:"Trusted Reviewer exact fd07e21738145b8aac78c9fac7fe59e99db967cc is installed/live/restricted. It fails closed when Codex cannot return a semantic verdict." },
  { id:"t19", title:"Runtime #40 semantic PASS", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"blocked", detail:"#40 exact c743f1ffc468170ceca8d7710899716c26c08844 is engineering-green: Continuation CI 36260436446 SUCCESS and Activation Closure CI 36260436382 SUCCESS. Hosted Codex comment 5849112468 confirms code-review usage limits; local Trusted Reviewer also has no current semantic capacity. Runtime remains OFF." },
  { id:"t20", title:"Phase A #80 activation", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"#80 exact fa684dd8e368788053feb764250d91b3e7cf073e is engineering-green and OFF. It starts only after #40 receives a legitimate semantic PASS and live Runtime continuation is proven." },
  { id:"t2", title:"Dashboard auto-sync + Founder-first redesign", projectId:"site", project:"Website", agent:"Engineering Agent", state:"live", detail:"Dedicated JARVIS branch builds are now always eligible on Vercel. Current pass replaces stale operator truth and prioritizes Working Now / Blocked / Next Unlock / Recent Proof over jargon-heavy status density." },
  { id:"t21", title:"Revenue worker exact-head QA", projectId:"jarvis", project:"Revenue", agent:"Lab Audit Runner", state:"done", detail:"#77 exact ce12bb476b882baa252c50b2b60f85ece2c68abe passed fresh self-hosted Revenue Autonomous Workers QA attempt 2. Queue/history/continuity and no-outbound authority checks passed." },
  { id:"t22", title:"Workforce truth reconciliation", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"done", detail:"#93 exact ce870d5d87354a0b1794e9a290fc93d721d129e2 is green. Bridge and Reviewer are now represented as live; Codebase Memory correctly remains blocked on #40." },
  { id:"t23", title:"MemPalace IF-3 hardening", projectId:"jarvis", project:"JARVIS", agent:"Memory Router Specialist", state:"review", detail:"#132 exact ef5c4f4f95f16f0a2e8cea63b128043a94776c37 is CI-green after boolean, timezone and record-boundary hardening. No real-corpus writer is active." },
  { id:"t24", title:"Hermes memory lifecycle hardening", projectId:"jarvis", project:"JARVIS", agent:"Memory Router Specialist", state:"review", detail:"#133 exact 1ba352b0acdc553897e504cf3d8f0bcaf6b4c4bf is CI-green and synchronized to the hardened #132 parent. Provider/write authority remains OFF." },
  { id:"t25", title:"Dependency helper hardening", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"#134 exact 01d2fdcc82dd31cb619d7fd99bee68d34e074879 is CI-green. PEP 735 and Poetry dependency-group incompleteness is explicit instead of silently skipped." },
  { id:"t26", title:"Revenue research + drafting batch", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"Internal prospect research, evidence, ICP, assessment, drafting and pipeline analysis are queued. No email/SMS/DM/call, paid enrichment, booking, pricing commitment or outbound authority is enabled." },
  { id:"t13", title:"Private product CI runner fallback", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"GitHub-hosted private reserve remains 3000/3000 until Oct 1. Self-hosted Lab QA is usable for bounded lanes; broader runner fallback remains governed." },
  { id:"t15", title:"Signed remote mirror publisher", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"PR #104 remains engineering-green/not activated. Store connected=false; write secret configured=false; ingestion enabled=false. Operator snapshot remains coordination truth only." },
  { id:"t16", title:"Independent review capacity", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"blocked", detail:"Issue #109 is canonical; stale-SHA review is never approval. Fresh hosted review on #40 was rejected at 5849112468 because Codex code-review usage limits are reached. Exact #40 remains frozen and first in line when capacity returns." },
  { id:"t17", title:"Revenue control chain", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"review", detail:"Revenue dependency remains #72 authority root -> #68 guarded outbound executor -> #73 provider runtime binding. Outbound remains held; no passing engineering CI substitutes for independent review." }
];

export const operatorJarvisState: JarvisState = {
  ...demoJarvisState,
  source: "operator",
  generatedAt: SNAPSHOT_AT,
  agents: demoJarvisState.agents.map(agent => ({ ...agent, ...(agentOverrides[agent.id] ?? {}) })),
  projects: demoJarvisState.projects.map(project => ({ ...project, ...(projectOverrides[project.id] ?? {}) })),
  tasks: operatorTasks,
  finishChain: {
    bridge: "live",
    reviewer: "live_restricted_review_capacity_blocked",
    runtime: "engineering_green_semantic_review_capacity_blocked_off",
    autonomy: "engineering_green_waiting_on_runtime_off",
  },
};
