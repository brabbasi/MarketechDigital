import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
} from "./jarvisState";

const SNAPSHOT_AT = "2026-09-23T23:56:00Z";

const projectOverrides: Record<string, Partial<JarvisProject>> = {
  jarvis: {
    state: "review",
    progress: 82,
    now: "P0 finish chain remains #66 -> #46 -> #40 -> #80. Fresh exact-head review of #66 predecessor 949296f5 found one final P1: request-level fallback fences could not durably bind a different predecessor ref. Current exact #66 head 9b026ad8 preserves the target/predecessor recovery-fence repair and adds the private-permission regression-fixture correction. All five required exact-head gates are SUCCESS and fresh Codex review 5804916051 is requested. Bridge remains not installed. In parallel, MemPalace #36 exact d137e14a is green across sealed no-network, isolated install, Portfolio and Web Intelligence audits; fresh Codex review 5804908860 is active. Issue #123 remains the durable capability ledger. Hermes #121 is pinned to v2026.9.21 / d337b736 and AwesomeLLMApps #122 to c6228784. #46 remains clean/not installed and #40 remains Runtime OFF.",
    next: "Consume fresh Codex review 5804916051 on unchanged 9b026ad8. The predecessor-fence P1 is resolved with exact-run evidence and all five required gates are green; only a clean exact-head verdict may advance to the separate Founder Bridge-install decision. In parallel, consume fresh Codex review 5804908860 on unchanged MemPalace d137e14a; all four active exact-head audit lanes are green. Continue Hermes/AwesomeLLMApps bounded extraction through #121/#122/#123. Runtime/autonomy/outbound/spend remain OFF.",
    blocked: 2,
    lastUpdate: "#66 exact 9b026ad8 is fully engineering-green; the predecessor-ref fallback-fence P1 is resolved, all five required gates are SUCCESS, and fresh Codex review 5804916051 is active. MemPalace #36 exact d137e14a is exact-head green and under fresh independent review 5804908860. Hermes/AwesomeLLMApps remain durably pinned under #121/#122/#123. No Bridge, Reviewer, Runtime, real memory corpus or external authority has been activated.",
    history: [
      "#66 head 42dde3ab passed engineering gates but fresh Codex review found two P1 crash-convergence defects: incomplete full-session reaping and unsafe selector/target cleanup ordering. Current exact 1c7d3227 repairs both with full validated-session identity tracking and selector-first rollback; exact-head certification is running and all 42dde3ab authorization evidence is stale.",
      "#46 exact 0ddb5e8e is Trusted Independent Review Executor CI green and fresh Codex review 5768921053 found no major issues; it remains NOT installed behind #66.",
      "Control Center manifest commit d6c690fd carries the current P0 heads but does not claim local consumption; latest verified local Trusted heartbeat remains 2026-09-21T02:32:21Z.",
      "Read-only Scheduled Task recurrence remains durable; no replacement worker-object migration is needed while those same task objects keep advancing.",
      "Baytree R03 is the repaired immutable revenue successor at maintenance@baytreepm.com; independent review is pending and no Founder/send authority is inherited.",
      "Trusted finish chain remains #66 -> #46 -> #40 -> #80. Runtime/autonomy remain OFF."
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
    task: "Revenue-first orchestration + durable read-only recurrence",
    history: [
      "Permanent automation rule: reuse/update existing tasks; no new monitor/check task unless absolutely necessary.",
      "Revenue-first scoreboard is reply -> meeting -> scoped proposal -> contracted CAD -> collected CAD.",
      "The same read-only Queue, Conversion, Reviewer, Resource Manager, Keeper and Finish Watch objects continue recurring at the 10-task ceiling; the earlier migration experiment is cancelled while this remains stable.",
      "Commercial chain #72 -> #68 -> #73 remains review-gated; outbound is held.",
      "Workforce #93 remains review-gated; employment never implies dispatch activation."
    ],
  },
  reviewer: {
    state: "review",
    task: "Exact-head independent-review queue #109",
    history: [
      "Never reuse stale-SHA PASSes or quota-rejected requests as approval.",
      "#66 9b026ad8 is the current exact-head candidate: target/predecessor request-fence role binding and retry reconciliation are implemented; all five required gates are SUCCESS and fresh Codex review 5804916051 is active. #46 0ddb5e8e remains exact-head CI green with clean fresh Codex review 5768921053.",
      "#68 1a51a0e7, #73 939f601f and public-site #17 b36fe5b2 remain downstream review targets.",
      "#21 central Reviewer remains engineering-green but NOT deployed and has no model-spend authority."
    ],
  },
  delivery: {
    state: "running",
    task: "Parallel product reconciliation",
    history: [
      "DeutschPath stale successor removed after zero-diff reconciliation.",
      "TradePilot exact-draft and tenant persistence defects repaired.",
      "Rangrez legacy branches #4/#22/#23 closed with useful deltas preserved safely.",
    ],
  },
  engineering: {
    state: "running",
    task: "Founder cockpit state + workforce synchronization",
    history: [
      "Online portal operator snapshot is refreshed on material company transitions instead of silently lagging behind the work.",
      "Preview read model remains explicit operator-snapshot coordination truth, never production Runtime authority.",
      "Control Center manifest commit d6c690fd is synchronized separately; local Trusted consumption remains stale/unproven until a newer heartbeat.",
    ],
  },
};

const operatorTasks: JarvisTask[] = [
  { id:"t1", title:"Trusted Bridge exact-head review", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"#66 exact 9b026ad8 carries explicit target/predecessor request-fence role binding and predecessor retry regressions. Bridge 35934666086, Action Guard 35934666092, Phase-0 35934666099, AI Reviewer CI 35934666134 and Observability 35934666077 are all SUCCESS. The latest P1 thread is resolved and fresh Codex review 5804916051 is active. Bridge remains NOT installed." },
  { id:"t2", title:"Dashboard read-model synchronization", projectId:"site", project:"Website", agent:"Engineering Agent", state:"live", detail:"Permanent rule: material company transitions refresh the online operator snapshot and local Trusted project manifest, or record an explicit sync blocker. This checkpoint is revenue-first and exact-head bound." },
  { id:"t3", title:"Read-only scheduler durability", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"live", detail:"The same strict read-only core task objects continue recurring naturally at the 10-task ceiling. Earlier worker-object migration is cancelled/not needed unless a real read-only recurrence regression appears." },
  { id:"t13", title:"Private product CI runner fallback", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"GitHub-hosted private reserve remains 3000/3000 until Oct 1. PR #101 is engineering-green/frozen/not installed; no runner token or installation authority exists." },
  { id:"t15", title:"Signed remote mirror publisher", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"PR #104 remains engineering-green/not activated. Store connected=false; write secret configured=false; ingestion enabled=false. The operator snapshot remains coordination truth only and does not substitute for the signed Runtime/live-state mirror." },
  { id:"t16", title:"Independent review queue", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"Issue #109 is canonical. #66 current exact 9b026ad8 carries the predecessor-bound recovery-fence repair and regressions; fresh exact-head certification is queued after the 949296f5 review P1. MemPalace #36 current exact d137e14a is green on sealed/install/portfolio/web audits with fresh independent review 5804908860 active. #46 0ddb5e8e remains exact-head CI green and independently clean. Nothing is installed; stale-SHA review is never approval." },
  { id:"t17", title:"Revenue control chain", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"review", detail:"Revenue dependency is #72 authority root -> #68 guarded outbound executor -> #73 provider runtime binding, with #69 CRM and #70 Founder price authority after #72 as needed. #68 exact 1a51a0e7 and #73 exact 939f601f are engineering-green/review-ready; outbound remains held." },

  { id:"t25", title:"Trusted Reviewer exact-head clean", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"#46 exact 0ddb5e8e is Trusted Independent Review Executor CI 35666846080 SUCCESS and fresh Codex review 5768921053 found no major issues. Both rollback/cutover temp selectors are per-process unique, failed candidate cleanup remains fail-closed, and complete PR-file pagination is preserved. Reviewer remains NOT installed behind #66." },
  { id:"t26", title:"First paid customer scoreboard", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"live", detail:"72 qualified identities; net-new growth frozen while review backlog >12. Baytree R03 is the repaired review-pending successor at maintenance@baytreepm.com. Business scoreboard remains 0 replies / 0 meetings / 0 proposals / CAD 0 contracted / CAD 0 collected; outbound held." },
  { id:"t27", title:"Authority Registry", projectId:"jarvis", project:"Revenue", agent:"Engineering Agent", state:"review", detail:"#72 exact eeee4078 is the verifier-only root for outbound, price and CRM authority. Engineering-green/frozen; current independent review required." },
  { id:"t28", title:"Guarded outbound executor", projectId:"jarvis", project:"Revenue", agent:"Engineering Agent", state:"review", detail:"#68 exact 1a51a0e7 closes the authority-to-transport TOCTOU race. Authority Registry CI 35541022900 + Guarded Outbound CI 35541022902 SUCCESS; 37 tests OK; outbound held." },
  { id:"t29", title:"External capability integration registry", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"Canonical Issue #123 persists the external capability backlog. Hermes #121 is pinned to v2026.9.21 / d337b736 (MIT) for bounded-worker audit; AwesomeLLMApps #122 is pinned to c6228784 (Apache-2.0) for selective pattern extraction; MemPalace stays governed through #26/#36. Standing rule: advance this lane in parallel, but require qualification, license/security, sandbox, review, install, register, employ and health proof before ACTIVE." },
  { id:"t44", title:"Provider runtime binding", projectId:"jarvis", project:"Revenue", agent:"Engineering Agent", state:"review", detail:"#73 exact 939f601f inherits the serialized outbound guard. Provider Runtime CI 35541178625 SUCCESS; 64 combined tests OK; production provider policy remains REVIEW_PENDING." },
  { id:"t30", title:"Founder price authority", projectId:"jarvis", project:"Revenue", agent:"AI Reviewer", state:"review", detail:"#70 exact 391655d9 keeps shared Founder authority serialized through client-visible price insertion. Current exact independent review remains required before any external quote." },
  { id:"t31", title:"CRM requalification", projectId:"jarvis", project:"Revenue", agent:"AI Reviewer", state:"review", detail:"#69 exact b6784953 keeps shared Founder authority serialized through closed-stage requalification. Current exact independent review remains required." },
  { id:"t32", title:"Inbound acquisition release", projectId:"site", project:"Website", agent:"Engineering Agent", state:"blocked", detail:"#11 exact dd33b705 is CI-green, independently reviewed and already conditionally Founder-approved. Sole remaining gate: factual production WAF proof for POST /api/inquiry at 5 requests / 60s / IP -> 429." },
  { id:"t33", title:"Production favicon/OG repair", projectId:"site", project:"Website", agent:"AI Reviewer", state:"review", detail:"#17 exact b36fe5b2 is review-ready. Favicon Runtime CI 35540883666 SUCCESS with direct /og-image.png HTTP 200 proof; exact Vercel preview READY. Current production baseline still carries the historical error until release." },
  { id:"t34", title:"Vercel preview-budget gate", projectId:"site", project:"Website", agent:"Engineering Agent", state:"review", detail:"#16 preserves production builds while suppressing ordinary high-churn JARVIS/migration/security/ops previews unless [vercel-preview] is explicitly requested." },
  { id:"t35", title:"Founder Portal checkpoint", projectId:"site", project:"Website", agent:"Engineering Agent", state:"review", detail:"Revenue-first operator truth, preview-budget protection and favicon/OG repair are consolidated on the existing #13 branch. Exact-head browser QA must pass before this source is called current." },
  { id:"t36", title:"Agent employment registry", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"#93 exact 78af9f41 is engineering-green: CBM blocked_runtime; Graft/Codex installed_reverify; Gemini/Copilot/Claude blocked_auth. No dispatch activation." },
  { id:"t37", title:"Financial Independence OS F1", projectId:"finance-os", project:"Financial Independence OS", agent:"Delivery Operations", state:"review", detail:"#117 exact 8db00ec9: F1 CI 35536375641 SUCCESS / 23 tests. Synthetic/reference data only; no financial-action authority." },
  { id:"t38", title:"TradePilot exact-draft hardening", projectId:"tradepilot", project:"TradePilot", agent:"Delivery Operations", state:"review", detail:"#5 exact b27957d4 is review-required; hosted red is steps=null capacity-only. Supabase inactive and send/provider authority OFF." },
  { id:"t39", title:"Axiom research truth", projectId:"axiom", project:"Axiom", agent:"Engineering Agent", state:"review", detail:"Canonical scorecard remains 50 tested / 50 immutable rejects / 0 historical passes / 0 forward survivors. #161 presentation repair preview READY; production unchanged." },
  { id:"t40", title:"Rangrez P27 convergence", projectId:"rangrez", project:"Rangrez", agent:"Delivery Operations", state:"review", detail:"P27 stays frozen; #28/#29 hosted reds are zero-step private-CI capacity failures, not product verdicts; #30 is Reviewer enrollment." },
  { id:"t41", title:"DeutschPath release gate", projectId:"deutschpath", project:"DeutschPath", agent:"Delivery Operations", state:"review", detail:"Canonical product lineage remains intact; #20 hosted red is a zero-step private-CI capacity failure rather than a product verdict." },
  { id:"t42", title:"MemPalace persistent memory lane", projectId:"jarvis", project:"JARVIS", agent:"Memory Router Specialist", state:"review", detail:"PR #36 exact d137e14a is the current sealed-memory candidate. Sealed No-Network, Isolated Install Wave 1, Portfolio audit and Web Intelligence audit are SUCCESS, and fresh exact-head Codex review 5804908860 is active; promotion remains OFF pending a clean verdict. Real corpus ingestion and MCP/model/provider/write authority remain OFF." },
{ id:"t44", title:"Capability integration ledger", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"live", detail:"Issue #123 + PR #33 exact 670c03e are the single canonical capability memory. The ledger durably registers MemPalace, Hermes, Awesome-LLM-Apps, Codebase Memory, OpenBot, AgentTrail, Causentra, event-driven autonomy, Browser Use, MoneyPrinterTurbo, YouTube automation, OpenVoice/MeloTTS and OpenHuman with lifecycle/blocker/next-gate fields. PR #33 current reds are zero-step runner-allocation failures, not capability-code verdicts; duplicate PR #124 is closed and discovery cannot silently install or promote sources." },
  { id:"t43", title:"Hermes selective integration lane", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"NousResearch/hermes-agent is pinned for the bounded worker audit at release v2026.9.21 / exact d337b736. The current reuse target is the memory-provider lifecycle plus selected scheduler patterns only; Hermes installer/gateway/services/cron/provider credentials/arbitrary MCP/browser/computer-use/channels/updater authority remain OFF. Awesome-LLM-Apps is pinned at c6228784 for selective offline helper/pattern extraction, not daemon authority." },
];

export const operatorJarvisState: JarvisState = {
  ...demoJarvisState,
  source: "operator",
  generatedAt: SNAPSHOT_AT,
  agents: demoJarvisState.agents.map(agent => ({ ...agent, ...(agentOverrides[agent.id] ?? {}) })),
  projects: demoJarvisState.projects.map(project => ({ ...project, ...(projectOverrides[project.id] ?? {}) })),
  tasks: operatorTasks,
  finishChain: {
    bridge: "exact_head_green_fresh_review_active",
    reviewer: "exact_head_review_clean_not_installed",
    runtime: "engineering_green_runtime_off",
    autonomy: "engineering_green_not_activated",
  },
};
