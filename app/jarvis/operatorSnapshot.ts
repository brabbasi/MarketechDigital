import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
} from "./jarvisState";

const SNAPSHOT_AT = "2026-10-02T16:06:08Z";

const projectOverrides: Record<string, Partial<JarvisProject>> = {
  jarvis: {
    state: "review",
    progress: 0,
    progressKnown: false,
    now: "Bridge #66 and Trusted Reviewer #46 are LIVE. Multi-provider failover #135 is engineering-green with Copilot Auto corrected semantic 6/6 and USD 0/no-paid-overage qualification. Draft immutable install successor #138 exact 86fd524b is engineering-green and host/session compatible but remains uninstalled because a fresh independent Codex review is quota-blocked. Runtime #40 exact 577bcf09 and Phase A #80 exact 2079a2b4 are green and OFF.",
    next: "Keep #135/#138 frozen until a genuine independent exact-head review is available. After #138 independent review plus fresh Founder exact-ref install approval, use its immutable cutover/rollback path. Then obtain legitimate semantic PASS and governed live acceptance for #40 before any #80 activation.",
    blocked: 1,
    lastUpdate: "2026-10-02: local Control Center source 3cf2b40c is CI-green with evidence-backed employee profiles/progress; hosted portal remains a static fallback until the signed mirror is connected.",
    history: [
      "Bridge #66 d34b4e45 is installed/live and bounded.",
      "Reviewer #46 fd07e217 is installed/live/restricted.",
      "#135 901bc2db is engineering-green and records Copilot Auto 6/6 semantic qualification; it is not installed.",
      "#138 86fd524b is engineering-green; Trusted Reviewer CI 36956082888 and install-preflight CI 36956080258 are SUCCESS; no cutover occurred.",
      "Founder-host zero-inference Copilot server session preflight passed with protocol v3, zero tools, no prompt and no model call.",
      "Current #40 577bcf09 review packet is 781459/1048576 bytes, SHA-256 99ac8031aaa1f8dc80526cfe7642f14a2b937fb1a1a828dd857034c0c9b0b118, untruncated, with no model call.",
      "#80 2079a2b4 is directly based on current #40; Phase A CI 36953444710 and Worker Launcher CI 36953444714 are SUCCESS; Phase A remains OFF.",
      "#93 af4a38bc reconciles 56 registry agents / 56 employment assignments / zero gaps.",
      "#139 d6623bec synthetic memory continuity is green; real corpus and production memory writer remain OFF.",
      "No static fallback percentage is treated as live progress; automatic live truth requires the signed Trusted mirror."
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

const staticProgress: NonNullable<JarvisAgent["progress"]> = {
  known: false,
  label: "Live progress unavailable in static fallback",
  source: "static_operator_fallback",
  exact: false,
};

const unprovenLearning: NonNullable<JarvisAgent["learning"]> = {
  status: "governed_learning_not_yet_proven",
  selfLearningActive: false,
  promotionEvidenceCount: 0,
  learningFocus: [],
  competencies: [],
  note: "Skill Fabric exists, but the governed promotion-evidence registry currently has zero proven promotions. Do not claim autonomous improvement yet.",
};

const agentOverrides: Record<string, Partial<JarvisAgent>> = {
  orchestrator: {
    state: "ready",
    task: "Founder-visible company coordination; live mission telemetry requires the signed mirror",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"coo-jarvis", jobTitle:"Executive Orchestrator", mission:"Coordinate company priorities, worklanes and Founder escalation without inventing authority." },
    history: ["Static fallback only; current live mission state is intentionally not inferred.", "56/56 workforce reconciliation is proven in #93.", "Automatic live profile telemetry is being moved to the signed mirror path."],
  },
  resource: {
    state: "ready",
    task: "56/56 workforce reconciliation is proven; autonomous Runtime dispatch remains gated",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"agent-resource-manager", jobTitle:"Agent Resource Manager", mission:"Maintain workforce assignments, capacity and activation gates." },
    history: ["#93 af4a38bc reconciles 56 registry agents / 56 employment assignments / zero gaps.", "Static fallback does not claim workers are currently executing.", "Only evidence-backed Runtime missions may produce a live progress bar."],
  },
  reviewer: {
    state: "blocked",
    task: "Fresh exact-head independent review capacity for #135/#138",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"ai-reviewer", jobTitle:"Independent AI Reviewer", mission:"Independently review exact evidence and fail closed on stale, ambiguous or authority-widening claims." },
    history: ["Trusted Reviewer #46 fd07e217 is live/restricted.", "Copilot Auto semantic qualification is corrected 6/6 with USD 0/no-paid-overage proof.", "Fresh Codex exact-head review remains quota-blocked; Copilot may not self-approve its own install."],
  },
  delivery: {
    state: "ready",
    task: "Parallel delivery lanes continue while autonomy activation remains gated",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"portfolio-delivery-manager", jobTitle:"Delivery Operations", mission:"Preserve project continuity, QA evidence and bounded delivery lanes." },
  },
  engineering: {
    state: "running",
    task: "Founder cockpit live employee profiles + trusted mirror convergence",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"platform-engineering-manager", jobTitle:"Engineering Agent", mission:"Build and verify Marketech operating infrastructure without widening consequential authority." },
    history: ["Local Control Center source 3cf2b40c is CI-green with evidence-backed employee profiles and truthful progress.", "Hosted /jarvis is being changed to label operator data STATIC FALLBACK / NOT LIVE.", "#138 Trusted fallback release surface is engineering-green and uninstalled."],
  },
  memory: {
    state: "review",
    task: "Memory continuity is synthetic-proven; real-corpus writer remains OFF",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"memory-agent", jobTitle:"Memory Agent", mission:"Maintain durable, provenance-bound organizational memory under governed write authority." },
    history: ["#139 d6623bec synthetic continuity canary is green.", "Real corpus and production memory writer remain OFF.", "No self-learning claim is made from synthetic continuity alone."],
  },
  revenue: {
    state: "review",
    task: "Revenue preparation remains internal while outbound authority is OFF",
    progress: staticProgress,
    learning: unprovenLearning,
    resume: { agentId:"revenue-manager", jobTitle:"Revenue Agent", mission:"Research, qualify and prepare revenue opportunities without unauthorized outbound action." },
    history: ["Revenue workers #77 remain engineering-green.", "Outbound authority remains held.", "Static fallback does not claim an active revenue worker unless the live mirror proves a mission."],
  },
};

const operatorTasks: JarvisTask[] = [
  { id:"t1", title:"Trusted Bridge #66 LIVE", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"done", detail:"Trusted Bridge exact d34b4e45b9f9f4fd084a97a6a1715935872306c9 is installed and live." },
  { id:"t18", title:"Trusted Reviewer #46 LIVE", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"done", detail:"Trusted Reviewer exact fd07e21738145b8aac78c9fac7fe59e99db967cc is installed/live/restricted." },
  { id:"t16", title:"Reviewer failover #135 qualified", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"#135 exact 901bc2db6f80c04b835d84188be5ecfdc3d0e5ad is engineering-green. Copilot Auto corrected semantic qualification is 6/6 with final evidence de6cee06...; no install or Reviewer-authority widening occurred." },
  { id:"t27", title:"Immutable Copilot install successor #138", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"#138 exact 86fd524b35389edaaef0bc088d5e9a1b367f4892 is engineering-green. Trusted Reviewer CI 36956082888 and install preflight CI 36956080258 are SUCCESS. Fresh independent exact-head Codex review remains quota-blocked; no cutover occurred." },
  { id:"t19", title:"Runtime #40 semantic PASS", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"#40 exact 577bcf090746300007ed7c4c8f9069dd80164cca is engineering-green and OFF. Its complete bounded review packet is 781459 bytes with no truncation/model call. Legitimate semantic PASS + fresh Founder exact-ref approval are still required." },
  { id:"t20", title:"Phase A #80 activation", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"#80 exact 2079a2b4f9157c4920c8ddcb60ae940b5f6227ca is directly based on current #40 and both Phase A suites are green. It remains OFF until live #40 acceptance and separate review/Founder gates." },
  { id:"t22", title:"Workforce truth reconciliation", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"done", detail:"#93 exact af4a38bc3a2f01d179898a691fc0b61b0156e7b3 proves 56 registry agents / 56 employment assignments / zero gaps." },
  { id:"t28", title:"Founder cockpit employee profiles", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"Local Control Center exact source 3cf2b40c is CI-green with evidence-backed task progress, resume/profile, learning evidence and durable agent history. Deployment-manifest promotion is being certified." },
  { id:"t29", title:"Memory continuity #139", projectId:"jarvis", project:"JARVIS", agent:"Memory Agent", state:"review", detail:"#139 d6623bec is synthetic-continuity green. Real corpus and production memory writer remain OFF." },
  { id:"t26", title:"Revenue research + drafting batch", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"Internal research/drafting may continue; outbound/send/spend/client commitment authority remains OFF." },
  { id:"t15", title:"Signed live mirror chain", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"#104 remains engineering-green but publisher/storage activation is still OFF. Until the signed mirror is connected, hosted /jarvis operator data is explicitly STATIC FALLBACK / NOT LIVE." },
];

export const operatorJarvisState: JarvisState = {
  ...demoJarvisState,
  source: "operator",
  generatedAt: SNAPSHOT_AT,
  readModel: {
    liveConnected: false,
    mode: "static_operator_fallback",
    label: "STATIC FALLBACK · NOT LIVE",
    reason: "The signed Trusted control-plane mirror is not connected. This snapshot is coordination context only.",
  },
  agents: demoJarvisState.agents.map(agent => ({ ...agent, ...(agentOverrides[agent.id] ?? {}) })),
  projects: demoJarvisState.projects.map(project => ({ ...project, ...(projectOverrides[project.id] ?? {}), progressKnown: false })),
  tasks: operatorTasks,
  finishChain: {
    bridge: "live",
    reviewer: "live_restricted_independent_review_capacity_blocked",
    runtime: "engineering_green_577bcf09_off_pending_semantic_pass",
    autonomy: "engineering_green_2079a2b4_off_waiting_on_runtime",
  },
};
