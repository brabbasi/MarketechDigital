export type AgentState = "running" | "ready" | "blocked" | "review" | "training" | "unknown";
export type ProjectState = "on_track" | "blocked" | "review" | "planning" | "unknown";
export type TaskState = "live" | "next" | "queued" | "review" | "founder" | "blocked" | "done";
export type AssignmentRole = "Primary" | "Assist" | "Specialist" | "Reviewer" | "Observer" | "Shadow";

export type JarvisAgent = {
  id: string;
  name: string;
  short: string;
  department: string;
  state: AgentState;
  x: number;
  y: number;
  load: number;
  task: string;
  skills: string[];
  workers: { name: string; state: string; last: string }[];
  history: string[];
};

export type JarvisProject = {
  id: string;
  name: string;
  area: string;
  state: ProjectState;
  progress: number;
  progressKnown?: boolean;
  objective: string;
  now: string;
  next: string;
  blocked: number;
  repo?: string;
  lastUpdate: string;
  agentIds: string[];
  assignments: { agentId: string; role: AssignmentRole }[];
  history: string[];
};

export type JarvisTask = {
  id: string;
  title: string;
  projectId: string;
  project: string;
  agent: string;
  state: TaskState;
  detail: string;
};

export type JarvisState = {
  schemaVersion: 1;
  generatedAt: string;
  source: "demo" | "mirror";
  authority: "read_only";
  agents: JarvisAgent[];
  projects: JarvisProject[];
  tasks: JarvisTask[];
  revenue: {
    qualifiedProspects: number;
    pendingIndependentReview: number;
    historicalReviewedCoverage: number;
    historicalFounderApproved: number;
    currentEvidenceValidFounderApproved: number | null;
    knownRequalificationHolds: number | null;
    outreachSent: number;
    replies: number;
    meetings: number;
    contractedCad: number;
    collectedCad: number;
    outboundHeld: boolean;
  };
  finishChain: {
    bridge: string;
    reviewer: string;
    runtime: string;
    autonomy: string;
  };
  mirror?: {
    contract: string;
    ageSeconds: number;
    sourceRepository: string;
    workforceSourceSha?: string;
    authoritySafe: boolean;
  };
  portal?: {
    buildSha: string;
    deploymentUrl?: string;
    branchUrl?: string;
    environment: string;
  };
};

export const demoJarvisState: JarvisState = {
  schemaVersion: 1,
  generatedAt: new Date(0).toISOString(),
  source: "demo",
  authority: "read_only",
  agents: [
    { id:"orchestrator", name:"Executive Orchestrator", short:"EO", department:"Executive", state:"ready", x:50, y:12, load:38, task:"Company priorities + parallel lane continuity", skills:["mission planning","delegation","founder briefing"], workers:[{name:"Codex Engineering Senior",state:"available",last:"current"}], history:["Reconciled JARVIS finish chain","Preserved parallel company lanes","Founder cockpit v9 verified live locally"] },
    { id:"resource", name:"Agent Resource Manager", short:"RM", department:"Operations", state:"running", x:72, y:20, load:54, task:"56-agent employment + private-CI capacity planning", skills:["workforce planning","capacity","reassignment"], workers:[{name:"Remote Standard Worker",state:"gated",last:"not active"}], history:["56 registered agents / 56 explicit assignments proven","Private Actions allowance confirmed exhausted at 3000/3000 minutes; reset October 1, 2026","Private product CI fallback #101 engineering-green / not installed","Installed worker activation queue remains gated by exact re-verification"] },
    { id:"reviewer", name:"AI Reviewer", short:"AR", department:"Governance", state:"review", x:86, y:43, load:67, task:"Exact-head review queue", skills:["security review","regression","evidence","governance"], workers:[{name:"Remote Critical Reviewer",state:"quota blocked",last:"current"}], history:["Reviewer coverage mandatory across portfolio","Independent-review capacity blocker issue #109 covers #66/#46/#47/#68/#69/#70/#72/#73/#93/#98/#101/#104/#15/#16/#17","PR #66 remains priority #1; #46/#47 follow; revenue-control candidates remain independently review-gated"] },
    { id:"delivery", name:"Delivery Operations", short:"DO", department:"Delivery", state:"running", x:78, y:68, load:61, task:"Project worklane continuity", skills:["delivery planning","QA","dependency tracking"], workers:[{name:"Codex Engineering Senior",state:"busy",last:"now"}], history:["Maintained project continuation points","No project silently replaced"] },
    { id:"engineering", name:"Engineering Agent", short:"EN", department:"Engineering", state:"running", x:57, y:82, load:78, task:"Live cockpit + remote Founder portal convergence", skills:["Next.js","Python","CI","systems"], workers:[{name:"Codex Engineering Senior",state:"running",last:"now"},{name:"Codebase Memory",state:"installed-reverify",last:"gated"}], history:["Founder cockpit v9 deployed through Trusted pull lane","Founder Portal rolling Vercel alias is deployed + browser-QA green; exact build SHA is exposed dynamically","Private Vercel Blob mirror driver is implemented behind OIDC/store gates and remains unconnected","Signed sanitized mirror publisher #104 is engineering-green and not activated"] },
    { id:"memory", name:"Memory Agent", short:"ME", department:"Knowledge", state:"training", x:34, y:80, load:31, task:"Memory Fabric evaluation", skills:["episodic memory","provenance","retrieval"], workers:[{name:"MemPalace candidate",state:"lab only",last:"evaluation pending"},{name:"Graft",state:"restricted",last:"verified"}], history:["Memory Router contract defined","MemPalace kept behind Lab gate"] },
    { id:"revenue", name:"Revenue Agent", short:"RV", department:"Revenue", state:"running", x:16, y:63, load:49, task:"Research + pipeline movement", skills:["qualification","research","pipeline"], workers:[{name:"Revenue Assessment Trainee",state:"evaluation",last:"current"}], history:["72 qualified prospects in canonical queue","36 newest packets await independent review","36 is historical independent-review coverage, not current send authority","5 Founder-approved unsent identities explicitly revalidated as evidence-valid; 3 known evidence-drift holds","Revenue authority prerequisites #72/#68/#73 remain review-gated; #69/#70 remain parallel revenue-governance gates","Outbound remains governed and held"] },
    { id:"marketing", name:"Marketing Agent", short:"MK", department:"Growth", state:"ready", x:14, y:35, load:28, task:"SEO + organic growth", skills:["SEO","GEO/AEO","content"], workers:[{name:"Website Evidence Specialist",state:"planned",last:"n/a"}], history:["Website evidence workflows defined","Publishing authority remains gated"] },
    { id:"client", name:"Client Success Agent", short:"CS", department:"Client", state:"ready", x:29, y:18, load:18, task:"Client readiness + support", skills:["onboarding","support","status comms"], workers:[{name:"Client Comms specialist",state:"planned",last:"n/a"}], history:["Client-agent pack canonicalized","No unsupported client state claims"] }
  ],
  projects: [
    {
      id:"jarvis", name:"Marketech OS / JARVIS", area:"Company OS", state:"review", progress:74,
      objective:"Ship a governed autonomous company runtime and Founder cockpit without widening consequential authority.",
      now:"Cockpit v9 live; remote Founder portal rolling alias is deployed and QA-green with exact build identity exposed dynamically; #93/#98/#101/#104 remain engineering-green", next:"Issue #109 is the shared review-capacity gate; keep #66 frozen as priority #1, review #46 and #47 exact heads next, then connect one private Marketech Blob store only after governed approval before any #104 publisher activation.",
      blocked:1, repo:"brabbasi/Marketech_Digital_OS", lastUpdate:"Remote Founder portal rolling alias is deployed and QA-green; issue #109 tracks #66/#46/#47 plus the remaining frozen review queue; #104 publisher is hardened/green but no Blob store/write secret/ingest activation exists",
      agentIds:["orchestrator","resource","reviewer","engineering","delivery","memory"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"delivery",role:"Assist"},{agentId:"resource",role:"Observer"},{agentId:"reviewer",role:"Reviewer"},{agentId:"memory",role:"Specialist"}],
      history:["Canonical JARVIS system map created","Phase-A autonomy #80 engineering-green and not activated","Workforce #93 proves 56/56 employment assignments","Cursor refresh #98 passes isolated Lab discovery + no-network version probe","Private product CI blocker consolidated in issue #100 with #101 fallback","Signed sanitized mirror publisher #104 passes its Lab contract and inherited #47 sync CI","Founder cockpit v9 verified live locally","Trusted finish chain remains #66 -> #46 -> #40 -> #80"]
    },
    {
      id:"site", name:"Marketech Website", area:"Growth + acquisition", state:"review", progress:71,
      objective:"Operate the public agency website as a trustworthy acquisition surface and secure host for the private Founder portal.",
      now:"Founder Portal rolling Vercel alias is deployed with Next 15.5.24, browser QA, dynamic build identity, Actions-capacity truth and private Blob driver green", next:"Keep auth/consequence controls gated; clear #47/#104 and #15/#16/#17 through issue #109, then connect one private Marketech Blob store only after governed approval before signed snapshot publication.",
      blocked:1, repo:"brabbasi/MarketechDigital", lastUpdate:"PR #13 rolling preview is deployed and QA-green; exact SHA is shown dynamically; #47/#104 and #15/#16/#17 remain review-gated in issue #109; private Blob store remains unconnected",
      agentIds:["engineering","marketing","reviewer"],
      assignments:[{agentId:"engineering",role:"Primary"},{agentId:"marketing",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Inbound acquisition engine independently reviewed","JARVIS portal isolated from public header and public AI assistant","Desktop/mobile browser QA added"]
    },
    {
      id:"rangrez", name:"Rangrez", area:"AI styling", state:"blocked", progress:58,
      objective:"Converge the styling product into a coherent, device-tested app with reviewed design and implementation changes.",
      now:"Product head frozen; GitHub confirms the account used 3000/3000 private Actions minutes, so hosted CI cannot start", next:"Wait for the October 1 Actions reset or install independently reviewed #101 repo-scoped self-hosted fallback; then execute the frozen product tests.",
      blocked:1, repo:"brabbasi/Rangrez", lastUpdate:"PR #29 unchanged; issue #100 root cause confirmed as exhausted private Actions allowance (3000/3000); no Rangrez product test has executed",
      agentIds:["delivery","engineering","reviewer"],
      assignments:[{agentId:"delivery",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Rangrez retained in canonical project catalog","AI Reviewer coverage required","Design source-of-truth and physical-device QA preserved"]
    },
    {
      id:"deutschpath", name:"DeutschPath / Jiya", area:"AI learning", state:"blocked", progress:64,
      objective:"Deliver an adaptive German-learning experience with Jiya while preserving progression, memory and release QA.",
      now:"Release head frozen; GitHub confirms the account used 3000/3000 private Actions minutes, so hosted CI cannot start", next:"Wait for the October 1 Actions reset or install independently reviewed #101 repo-scoped self-hosted fallback; only executed test failures reopen product debugging.",
      blocked:1, repo:"brabbasi/deutschpath-ai", lastUpdate:"PR #22 unchanged; issue #100 root cause confirmed as exhausted private Actions allowance (3000/3000); no release test has executed",
      agentIds:["delivery","engineering","reviewer"],
      assignments:[{agentId:"delivery",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Adaptive state migration approved","Jiya journey redesign applied","47/48 latest E2E checks passed in prior evidence"]
    },
    {
      id:"axiom", name:"Axiom", area:"Market intelligence", state:"review", progress:71,
      objective:"Build an evidence-first halal market-intelligence and paper-execution research system with no live capital before gates pass.",
      now:"Evidence-first research gates", next:"Continue research-only readiness and paper QA while live-capital authority stays off.",
      blocked:1, repo:"brabbasi/axiom-market-intelligence", lastUpdate:"Strict research-only direction remains canonical",
      agentIds:["engineering","reviewer"],
      assignments:[{agentId:"engineering",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Stage 28 resilience and paper execution QA built","Axiom Intelligence Fabric foundation created","Live trading and capital authority remain off"]
    },
    {
      id:"tradepilot", name:"TradePilot", area:"Trades opportunity OS", state:"review", progress:46,
      objective:"Turn the canonical TradePilot repository into a useful trades opportunity product without reviving retired lineage.",
      now:"PR #5 remains canonical and frozen; GitHub confirms the account used 3000/3000 private Actions minutes, so hosted CI cannot start.", next:"Wait for the October 1 Actions reset or install independently reviewed #101 repo-scoped self-hosted fallback; preserve Safety Mode and inactive Supabase boundary.",
      blocked:2, repo:"brabbasi/Tradepilot", lastUpdate:"PR #5 unchanged; issue #100 root cause confirmed as exhausted private Actions allowance (3000/3000); Supabase Tradepilot remains INACTIVE",
      agentIds:["delivery","engineering","reviewer"],
      assignments:[{agentId:"delivery",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Canonical repo selected","Legacy tradepilot-ai marked noncanonical","Stale PR #1 preserved as history; current-main successor is PR #5","Duplicate PR #6 closed after reconciliation","Supabase Tradepilot project confirmed INACTIVE; no restore attempted"]
    },
    {
      id:"portfolio", name:"Founder Portfolio", area:"Founder brand", state:"planning", progress:42,
      objective:"Maintain a credible technical portfolio that reflects current projects and capabilities.",
      now:"Awaiting next bounded content/build pass", next:"Refresh project evidence when higher-priority production lanes clear.",
      blocked:0, repo:"brabbasi/Basit-Portfolio", lastUpdate:"Visible in canonical catalog",
      agentIds:["marketing","engineering","reviewer"],
      assignments:[{agentId:"marketing",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Next.js rebuild direction retained","Golden-gradient visual direction retained"]
    },
    {
      id:"veilbound", name:"Veilbound", area:"Game / creative", state:"planning", progress:28,
      objective:"Preserve the project as a durable venture lane with its own continuation point and reviewer coverage.",
      now:"Catalogued / not the current execution priority", next:"Recover current roadmap before new implementation.",
      blocked:0, repo:"brabbasi/veilbound-shadows-origin", lastUpdate:"Visible in canonical catalog",
      agentIds:["delivery","reviewer"],
      assignments:[{agentId:"delivery",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Canonical repository retained","No silent retirement"]
    },
    {
      id:"finance-os", name:"Financial Independence OS", area:"Personal finance product", state:"planning", progress:24,
      objective:"Design a commercializable mobile finance assistant with privacy-first ingestion and autonomous goal support.",
      now:"Foundation + privacy architecture", next:"Define mobile product boundary, permissions and secure ingestion model.",
      blocked:0, lastUpdate:"Commercial mobile-first direction preserved",
      agentIds:["orchestrator","reviewer"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Commercialization considered from inception","Android + iOS app direction preserved"]
    },
    {
      id:"leadahead", name:"LeadAhead", area:"Predictive operations", state:"planning", progress:18,
      objective:"Explore an employer-safe predictive operations assistant without exposing private company data or bypassing workplace policy.",
      now:"Concept + employer-safe scope", next:"Keep concept separate from unauthorized employer-system integration.",
      blocked:0, lastUpdate:"Concept lane preserved",
      agentIds:["orchestrator","reviewer"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Whole-store intelligence concept recorded","Codepuppy/Copilot constraints retained"]
    },
    {
      id:"unframed", name:"UnframedFiles", area:"Incubation", state:"planning", progress:8,
      objective:"Preserve the venture slot and prevent it from disappearing while inactive.",
      now:"Parked / catalogued", next:"Define a success metric before active build work.",
      blocked:0, lastUpdate:"Visible in canonical catalog",
      agentIds:["orchestrator","reviewer"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Durable incubation lane created"]
    },
    {
      id:"twoends", name:"TwoEnds", area:"Adaptive clothing", state:"planning", progress:12,
      objective:"Develop the adaptive garment concept as a distinct product venture.",
      now:"Concept lane", next:"Validate customer problem and product wedge before engineering.",
      blocked:0, lastUpdate:"Visible in canonical catalog",
      agentIds:["orchestrator","reviewer"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Adaptive clothing concept retained"]
    },
    {
      id:"silent-focus", name:"Silent Focus Vault", area:"Digital product", state:"planning", progress:30,
      objective:"Package the focus toolkit as a useful low-friction digital product.",
      now:"Existing concept preserved", next:"Reconcile product assets and distribution state before expansion.",
      blocked:0, lastUpdate:"Visible in canonical catalog",
      agentIds:["marketing","reviewer"],
      assignments:[{agentId:"marketing",role:"Primary"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Notion + Payhip product concept retained"]
    }
  ],
  tasks: [
    { id:"t1", title:"Trusted Bridge exact-head review", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"Engineering green; independent reviewer capacity is the gate." },
    { id:"t2", title:"Remote Founder portal delivery checkpoint", projectId:"site", project:"Website", agent:"Engineering Agent", state:"done", detail:"Rolling Vercel alias is deployed and QA-green; exact build SHA is shown dynamically in Founder Truth. Next 15.5.24 and fail-closed private Blob mirror driver remain green." },
    { id:"t3", title:"Canonical system map", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"done", detail:"Full living scope map + drift guard created in PR #92." },
    { id:"t4", title:"Cursor capability refresh review", projectId:"jarvis", project:"JARVIS", agent:"Delivery Operations", state:"review", detail:"PR #98 discovery + full isolated Lab audit are green for build 2026.09.18-9a7762b; independent review remains required before promotion." },
    { id:"t5", title:"Revenue research review batch", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"36 newest packets await independent review; 36 historical review coverage; 5 explicitly revalidated Founder-approved/held; 3 known evidence-drift holds; 72 qualified total; no outbound." },
    { id:"t6", title:"Reviewer install after Bridge", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Governed install only after clean exact-head reviews of both #66 Bridge and #46 Reviewer, followed by fresh short-lived Founder exact-ref approvals." },
    { id:"t7", title:"Founder activation decision", projectId:"jarvis", project:"JARVIS", agent:"Executive Orchestrator", state:"founder", detail:"Example approval surface only; no real action is wired in this preview." },
    { id:"t8", title:"Rangrez CI evidence recovery", projectId:"rangrez", project:"Rangrez", agent:"Delivery Operations", state:"blocked", detail:"Private Actions allowance is exhausted at 3000/3000 minutes; reset October 1. #101 is the review-gated self-hosted alternative." },
    { id:"t9", title:"Rangrez next visual QA pass", projectId:"rangrez", project:"Rangrez", agent:"AI Reviewer", state:"next", detail:"Keep design implementation and device QA as separate acceptance gates." },
    { id:"t10", title:"DeutschPath release CI evidence recovery", projectId:"deutschpath", project:"DeutschPath", agent:"Engineering Agent", state:"blocked", detail:"Private Actions allowance is exhausted at 3000/3000 minutes; reset October 1. #101 is the review-gated self-hosted alternative." },
    { id:"t11", title:"Axiom paper execution QA", projectId:"axiom", project:"Axiom", agent:"Engineering Agent", state:"review", detail:"Research/paper evidence continues; live-capital authority remains disabled." },
    { id:"t12", title:"TradePilot CI evidence recovery", projectId:"tradepilot", project:"TradePilot", agent:"Delivery Operations", state:"blocked", detail:"PR #5 stays canonical. Private Actions allowance is exhausted at 3000/3000 minutes; reset October 1. #101 is the review-gated self-hosted alternative; Supabase stays inactive." },
    { id:"t13", title:"Private product CI runner fallback", projectId:"jarvis", project:"JARVIS", agent:"Agent Resource Manager", state:"review", detail:"Root cause confirmed: 3000/3000 private Actions minutes used. PR #101 is engineering-green and avoids hosted minutes with one repo-scoped self-hosted runner per affected private repo; none is installed." },
    { id:"t14", title:"Vercel preview budget gate", projectId:"site", project:"Website", agent:"Engineering Agent", state:"review", detail:"PR #16 exact-head CI is green; high-churn previews will require explicit [vercel-preview] checkpoints after independent review." },
    { id:"t15", title:"Signed remote mirror publisher", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"review", detail:"PR #104 publisher is hardened and green; #47 successor and #104 both remain independent-review-gated. Store connected=false, write secret configured=false and ingestion enabled=false." },
    { id:"t16", title:"Independent review capacity", projectId:"jarvis", project:"JARVIS", agent:"AI Reviewer", state:"blocked", detail:"Issue #109 is the canonical blocker for #66/#46/#47/#68/#69/#70/#72/#73/#93/#98/#101/#104/#15/#16/#17. No passing CI is treated as independent approval." },\n    { id:"t17", title:"Revenue control chain", projectId:"site", project:"Website", agent:"Revenue Agent", state:"review", detail:"Current revenue-control review dependencies are #72 authority root -> #68 guarded outbound executor -> #73 provider runtime binding, with #69 CRM and #70 Founder price authority as parallel #72 dependents. Outbound remains held." }
  ],
  revenue: {
    qualifiedProspects: 72,
    pendingIndependentReview: 36,
    historicalReviewedCoverage: 36,
    historicalFounderApproved: 17,
    currentEvidenceValidFounderApproved: 5,
    knownRequalificationHolds: 3,
    outreachSent: 11,
    replies: 0,
    meetings: 0,
    contractedCad: 0,
    collectedCad: 0,
    outboundHeld: true
  },
  finishChain: {
    bridge: "review_required",
    reviewer: "waiting_on_bridge",
    runtime: "engineering_green_off",
    autonomy: "engineering_green_off"
  }
};
