import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
} from "./jarvisState";

const SNAPSHOT_AT = "2026-09-20T19:48:30Z";

const projectOverrides: Record<string, Partial<JarvisProject>> = {
  jarvis: {
    state: "review",
    progress: 80,
    now: "CI fallback #101 is engineering-green at 0042acf7 with 30 workflows / 0 hard violations / 0 concurrency advisories. Workforce #93 remains review-ready at 28b39784 with Codebase Memory correctly blocked_runtime. All four legacy core worker task objects have now reproduced post-run self-disable; v6 keeps one clean Revenue Queue replacement as the controlled canary while the newer Keeper continues to recur.",
    next: "Let the clean v6 Revenue Queue complete its first natural :25 run and verify it remains enabled. If it survives, migrate legacy workers one-by-one with the same mission/authority; if it self-disables, move the repair down into scheduler/control-plane state. Keep durability at 0/3 and continue #21/#66/#46/#40, workforce and product lanes in parallel."
    blocked: 2,
    lastUpdate: "Capacity hardening is complete and workforce activation is explicit: 56 agents are assigned, 3 installed workers require re-verification, 4 workers require approved auth/scope evidence, and independent review issue #109 remains the finish-chain gate.",
    history: [
      "Private CI capacity policy enforced across 30 workflows with zero hard violations/advisories.",
      "v5 confirmed that prompt hardening and same-ID schedule re-arm were insufficient; Revenue Queue and Conversion Worker self-disabled again.",
      "All four legacy core workers have now reproduced post-run self-disable at least once. v6 replaces only Revenue Queue first; Draft Reviewer and Resource Manager both failed again this cycle and were restored. Durability remains 0/3."
      "Trusted finish chain remains #66 -> #46 -> #40 -> #80.",
      "Remote and local dashboard read models are being synchronized as part of this checkpoint.",
      "Workforce #93 current head 28b39784 makes runtime truth explicit: Codebase Memory is blocked_runtime until governed Runtime recovery; Graft and Codex remain installed_reverify; Gemini, Copilot, Claude and Figma are blocked_auth; Reviewer remains blocked_runtime.",
    ],
  },
  site: {
    state: "review",
    progress: 79,
    now: "Founder Portal continues on the rolling preview and consumes the refreshed operator snapshot; material project/workforce/core-lane transitions are represented explicitly instead of waiting on a baked demo refresh.",
    next: "Keep operator snapshots synchronized on material transitions while #47/#104 remain the governed path to a signed production mirror.",
    blocked: 1,
    lastUpdate: "Dashboard-sync habit active: material transitions must refresh both the online operator snapshot and local Trusted project manifest or be reported as a dashboard-sync blocker.",
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
  tradepilot: {
    state: "review",
    progress: 56,
    now: "PR #5 is frozen at cb3eaca1 and Vercel READY. Exact-draft approvals now fail closed on version drift, and fallback imports bind to the authenticated RLS-visible tenant context.",
    next: "Perform live database verification only after a separately authorized Supabase restore; keep external send/provider/billing authority off.",
    blocked: 1,
    lastUpdate: "Vercel exact-head build green; Supabase Tradepilot remains INACTIVE and was not restored.",
    history: [
      "Exact draft review objects are created after transition to needs_approval.",
      "Approve/reject binds id + needs_approval + exact updated_at and expires stale approvals.",
      "Fallback prospect imports populate required organization/client IDs from the existing RLS-visible client context.",
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
    task: "Core-lane durability + workforce activation + self-hosted CI capacity",
    history: [
      "Private CI capacity policy reached 30 workflows / 0 violations / 0 advisories.",
      "v5 same-ID schedule re-arm still reproduced post-run self-disable on Revenue Queue + Conversion Worker.",
      "v6 clean-object canary replaces Revenue Queue only; the historical queue stays intentionally disabled while recurrence is tested.",
      "Legacy Draft Reviewer self-disabled after its 15:30 run and Agent Resource Manager self-disabled after its 15:40 run; both were restored in place. The current cycle is explicitly failed and cannot count toward durability."
      "Durability proof remains 0/3 until natural recurrence survives.",
      "Workforce #93 records 56 explicit agent assignments; employment does not imply autonomous Runtime dispatch.",
      "Activation sequencing is now fail-closed: Codebase Memory waits for #66 -> #46 -> #40 Runtime recovery; Graft -> Codex remain installed_reverify; Gemini/Copilot/Claude/Figma require separate approved auth/scope evidence.",
    ],
  },
  reviewer: {
    state: "review",
    task: "Independent-review queue #109 + central Reviewer self-hosting",
    history: [
      "No quota-rejected or stale-head request is treated as approval.",
      "#66 remains first finish-chain review target, followed by #46 and #40 through the installed Reviewer path.",
      "Rangrez central Reviewer enrollment successor is #30.",
      "PR #21 central AI Reviewer is now engineering-green at ffca1fc5 with loopback self-hosting as the preferred zero-spend staging path; Vercel is optional fallback only."
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
      "Online portal stale-demo root cause identified.",
      "Preview read model moved to explicit operator snapshot semantics.",
      "Local Trusted manifest is synchronized separately without widening Runtime authority.",
    ],
  },
};

const operatorTasks: JarvisTask[] = [
  { id:"t1", title:"Trusted Bridge exact-head review", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"PR #66 is engineering-green; independent review capacity issue #109 remains the gate." },
  { id:"t2", title:"Dashboard read-model synchronization", projectId:"site", project:"Website", agent:"Engineering Agent", state:"live", detail:"Permanent rule: every material company transition refreshes both the online operator snapshot and local Trusted project manifest, or records an explicit sync blocker. This checkpoint includes the v6 recurrence repair." },
  { id:"t3", title:"Core-lane durability proof", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"blocked", detail:"All four legacy core worker objects have now reproduced post-run self-disable. In this cycle Draft Reviewer failed after :30 and Resource Manager failed after :40; both were restored. The clean v6 Revenue Queue replacement still awaits its first natural :25 run. Durability remains 0/3." },
  { id:"t13", title:"Private product CI runner fallback", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"GitHub-hosted private reserve remains 3000/3000. PR #101 exact head 0042acf7 is engineering-green with 30 workflows / 0 hard violations / 0 concurrency advisories; no runner is installed." },
  { id:"t5", title:"Revenue research review batch", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"72 qualified prospects; 36 newest packets pending independent review; 36 historical reviewed coverage; 5 evidence-valid Founder-approved held identities; 3 evidence-drift holds; outbound remains held." },
  { id:"t6", title:"Reviewer install after Bridge", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Sequence remains #66 Bridge -> #46 Reviewer -> fresh #40 Runtime review -> #80 autonomy canary. Runtime and autonomy remain OFF." },
  { id:"t8", title:"Rangrez P27 child convergence", projectId:"rangrez", project:"Rangrez", agent:"Delivery Operations", state:"review", detail:"#28 004d14f5 source-contract green; #29 55ef2a8d focused policy 4/4 green; #30 c930394e central Reviewer enrollment open. Hosted red jobs are pre-step infrastructure failures, not product verdicts." },
  { id:"t10", title:"DeutschPath stale successor reconciliation", projectId:"deutschpath", project:"DeutschPath", agent:"Engineering Agent", state:"done", detail:"PR #22 closed as reconciled/redundant after zero-file diff versus canonical main; missing beta redirect was proven as the former build breaker." },
  { id:"t11", title:"Axiom paper execution QA", projectId:"axiom", project:"Axiom", agent:"Engineering Agent", state:"review", detail:"Research/paper evidence continues; live-capital authority remains disabled." },
  { id:"t12", title:"TradePilot persistence hardening", projectId:"tradepilot", project:"TradePilot", agent:"Delivery Operations", state:"review", detail:"PR #5 cb3eaca1 is Vercel READY with exact-draft review binding + tenant-safe fallback import. Supabase remains INACTIVE; no live DB verification claimed." },
  { id:"t14", title:"Vercel preview budget gate", projectId:"site", project:"Website", agent:"Engineering Agent", state:"review", detail:"High-churn previews stay explicitly gated; public-repo hosted CI remains separate from exhausted private Actions minutes." },
  { id:"t15", title:"Signed remote mirror publisher", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"PR #104 remains engineering-green. Store connected=false, write secret configured=false and ingestion enabled=false; operator snapshot is not a substitute for the signed production mirror." },
  { id:"t16", title:"Independent review capacity", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"blocked", detail:"Issue #109 remains canonical for #66/#46/#47/#68/#69/#70/#72/#73/#93/#98/#101/#104 and product Reviewer gates. Passing CI is not independent approval." },
  { id:"t17", title:"Revenue control chain", projectId:"site", project:"Website", agent:"Revenue Agent", state:"review", detail:"Revenue dependency stays #72 authority root -> #68 guarded outbound executor -> #73 provider runtime binding, with #69 CRM and #70 Founder price authority as parallel #72 dependents. Outbound remains held." },
  { id:"t18", title:"Codebase Memory runtime recovery gate", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"blocked", detail:"Workforce #93 head 28b39784 preserves the accepted historical v0.10.8 first-worker proof but now correctly blocks fresh dispatch while Company Runtime is quarantined. After #66 Bridge -> #46 Reviewer -> #40 Runtime recovery clears, require fresh exact identity/scope plus one read-only lifecycle proof." },
  { id:"t19", title:"Graft worker re-verification", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Priority 2 from workforce #93. Verify the graft-safe wrapper SHA and explicit denial of deep/provider modes before any dispatch promotion." },
  { id:"t20", title:"Codex worker re-verification", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"queued", detail:"Priority 3 from workforce #93. Require fresh exact identity, read-only usefulness and denied writes/network/approval escalation before headless dispatch." },
  { id:"t21", title:"Authenticated worker cohort", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"blocked", detail:"Gemini, Copilot, Claude and Figma are installed/configured capability lanes but remain blocked on approved personal/Marketech authentication plus execution-scope evidence; employer credentials remain prohibited." },
  { id:"t22", title:"Agent employment registry", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"PR #93 current head 28b39784 records 56 explicit assignments and corrects Codebase Memory from installed_reverify to blocked_runtime. Both exact-head engineering gates are green on the corrected workforce truth; independent review remains required before promotion." },
  { id:"t23", title:"Central AI Reviewer self-hosted path", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"PR #21 exact head ffca1fc5 is AI Reviewer CI green. Preferred hosting is now the existing governed Trusted/self-hosted plane with loopback-only binding and zero-spend validation before any OpenAI key/model call. Dedicated Vercel project is optional, not required. Service is NOT deployed and model-spend authority remains OFF." },
];

export const operatorJarvisState: JarvisState = {
  ...demoJarvisState,
  source: "operator",
  generatedAt: SNAPSHOT_AT,
  agents: demoJarvisState.agents.map(agent => ({ ...agent, ...(agentOverrides[agent.id] ?? {}) })),
  projects: demoJarvisState.projects.map(project => ({ ...project, ...(projectOverrides[project.id] ?? {}) })),
  tasks: operatorTasks,
  finishChain: {
    bridge: "engineering_green_review_blocked",
    reviewer: "engineering_green_review_blocked",
    runtime: "engineering_green_runtime_off",
    autonomy: "engineering_green_not_activated",
  },
};
