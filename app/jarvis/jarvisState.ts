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
    reviewedSendReady: number;
    founderApproved: number;
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
};

export const demoJarvisState: JarvisState = {
  schemaVersion: 1,
  generatedAt: new Date(0).toISOString(),
  source: "demo",
  authority: "read_only",
  agents: [
    { id:"orchestrator", name:"Executive Orchestrator", short:"EO", department:"Executive", state:"ready", x:50, y:12, load:38, task:"Company priorities + delegation", skills:["mission planning","delegation","founder briefing"], workers:[{name:"Codex Engineering Senior",state:"available",last:"22m ago"}], history:["Reconciled JARVIS finish chain","Preserved parallel company lanes"] },
    { id:"resource", name:"Agent Resource Manager", short:"RM", department:"Operations", state:"running", x:72, y:20, load:54, task:"Capacity + assignment planning", skills:["workforce planning","capacity","reassignment"], workers:[{name:"Remote Standard Worker",state:"gated",last:"not active"}], history:["Detected stalled Capability Lab lane","Recommended review-preserving reassignment"] },
    { id:"reviewer", name:"AI Reviewer", short:"AR", department:"Governance", state:"review", x:86, y:43, load:67, task:"Exact-head review queue", skills:["security review","regression","evidence","governance"], workers:[{name:"Remote Critical Reviewer",state:"quota blocked",last:"current"}], history:["Reviewer coverage mandatory across portfolio","PR #66 exact review waiting on provider quota"] },
    { id:"delivery", name:"Delivery Operations", short:"DO", department:"Delivery", state:"running", x:78, y:68, load:61, task:"Project worklane continuity", skills:["delivery planning","QA","dependency tracking"], workers:[{name:"Codex Engineering Senior",state:"busy",last:"now"}], history:["Maintained project continuation points","No project silently replaced"] },
    { id:"engineering", name:"Engineering Agent", short:"EN", department:"Engineering", state:"running", x:57, y:82, load:78, task:"JARVIS + product engineering", skills:["Next.js","Python","CI","systems"], workers:[{name:"Codex Engineering Senior",state:"running",last:"now"},{name:"Codebase Memory",state:"restricted",last:"verified"}], history:["Built canonical JARVIS system map","Building remote Founder portal"] },
    { id:"memory", name:"Memory Agent", short:"ME", department:"Knowledge", state:"training", x:34, y:80, load:31, task:"Memory Fabric evaluation", skills:["episodic memory","provenance","retrieval"], workers:[{name:"MemPalace candidate",state:"lab only",last:"evaluation pending"},{name:"Graft",state:"restricted",last:"verified"}], history:["Memory Router contract defined","MemPalace kept behind Lab gate"] },
    { id:"revenue", name:"Revenue Agent", short:"RV", department:"Revenue", state:"running", x:16, y:63, load:49, task:"Research + pipeline movement", skills:["qualification","research","pipeline"], workers:[{name:"Revenue Assessment Trainee",state:"evaluation",last:"current"}], history:["51 qualified prospects in canonical queue","Outbound remains governed and held"] },
    { id:"marketing", name:"Marketing Agent", short:"MK", department:"Growth", state:"ready", x:14, y:35, load:28, task:"SEO + organic growth", skills:["SEO","GEO/AEO","content"], workers:[{name:"Website Evidence Specialist",state:"planned",last:"n/a"}], history:["Website evidence workflows defined","Publishing authority remains gated"] },
    { id:"client", name:"Client Success Agent", short:"CS", department:"Client", state:"ready", x:29, y:18, load:18, task:"Client readiness + support", skills:["onboarding","support","status comms"], workers:[{name:"Client Comms specialist",state:"planned",last:"n/a"}], history:["Client-agent pack canonicalized","No unsupported client state claims"] }
  ],
  projects: [
    {
      id:"jarvis", name:"Marketech OS / JARVIS", area:"Company OS", state:"review", progress:74,
      objective:"Ship a governed autonomous company runtime and Founder cockpit without widening consequential authority.",
      now:"Bridge -> Reviewer -> Runtime -> Autonomy", next:"Install the independently cleared Reviewer through the Trusted Bridge, then review Runtime.",
      blocked:1, repo:"brabbasi/Marketech_Digital_OS", lastUpdate:"Canonical map + Founder portal integration lane active",
      agentIds:["orchestrator","resource","reviewer","engineering","delivery","memory"],
      assignments:[{agentId:"orchestrator",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"delivery",role:"Assist"},{agentId:"resource",role:"Observer"},{agentId:"reviewer",role:"Reviewer"},{agentId:"memory",role:"Specialist"}],
      history:["Canonical JARVIS system map created","Phase-A autonomy parent consolidated and engineering-green","Trusted Control Plane Sync tracks #66 -> #46 -> #40 -> #80"]
    },
    {
      id:"site", name:"Marketech Website", area:"Growth + acquisition", state:"on_track", progress:68,
      objective:"Operate the public agency website as a trustworthy acquisition surface and secure host for the private Founder portal.",
      now:"Founder portal + acquisition engine", next:"Bind sanitized JARVIS mirror only after auth/data-boundary review.",
      blocked:1, repo:"brabbasi/MarketechDigital", lastUpdate:"Portal exact-head QA green; private read model remains demo-only",
      agentIds:["engineering","marketing","reviewer"],
      assignments:[{agentId:"engineering",role:"Primary"},{agentId:"marketing",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Inbound acquisition engine independently reviewed","JARVIS portal isolated from public header and public AI assistant","Desktop/mobile browser QA added"]
    },
    {
      id:"rangrez", name:"Rangrez", area:"AI styling", state:"on_track", progress:58,
      objective:"Converge the styling product into a coherent, device-tested app with reviewed design and implementation changes.",
      now:"Product convergence + visual QA", next:"Continue approved UI/product lane without losing physical-device QA gates.",
      blocked:0, repo:"brabbasi/Rangrez", lastUpdate:"Independent delivery lane preserved",
      agentIds:["delivery","engineering","reviewer"],
      assignments:[{agentId:"delivery",role:"Primary"},{agentId:"engineering",role:"Assist"},{agentId:"reviewer",role:"Reviewer"}],
      history:["Rangrez retained in canonical project catalog","AI Reviewer coverage required","Design source-of-truth and physical-device QA preserved"]
    },
    {
      id:"deutschpath", name:"DeutschPath / Jiya", area:"AI learning", state:"on_track", progress:64,
      objective:"Deliver an adaptive German-learning experience with Jiya while preserving progression, memory and release QA.",
      now:"Adaptive learning + release readiness", next:"Resolve the remaining hint-ladder regression and continue journey convergence.",
      blocked:0, repo:"brabbasi/deutschpath-ai", lastUpdate:"Project continuation point preserved",
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
      now:"Current-main live prospect reactivation is active in PR #5; scoped typecheck + Vercel build are green.", next:"Keep PR #5 canonical, preserve Safety Mode, and verify live Supabase behavior only when the inactive Tradepilot project is deliberately restored.",
      blocked:1, repo:"brabbasi/Tradepilot", lastUpdate:"PR #5 current-main successor active; Supabase Tradepilot currently INACTIVE; duplicate PR #6 closed",
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
    { id:"t2", title:"Remote Founder portal v1", projectId:"site", project:"Website", agent:"Engineering Agent", state:"live", detail:"Build secure visual Founder interface without exposing Trusted runtime." },
    { id:"t3", title:"Canonical system map", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"done", detail:"Full living scope map + drift guard created in PR #92." },
    { id:"t4", title:"Capability Lab isolation certification", projectId:"jarvis", project:"JARVIS", agent:"Delivery Operations", state:"blocked", detail:"Repair landed; hosted runner allocation has not executed certification." },
    { id:"t5", title:"Revenue research review batch", projectId:"jarvis", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"15 newest packets await independent review; no outbound." },
    { id:"t6", title:"Reviewer install after Bridge", projectId:"jarvis", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Governed install only after #66 clean exact-head review." },
    { id:"t7", title:"Founder activation decision", projectId:"jarvis", project:"JARVIS", agent:"Executive Orchestrator", state:"founder", detail:"Example approval surface only; no real action is wired in this preview." },
    { id:"t8", title:"Rangrez product lane", projectId:"rangrez", project:"Rangrez", agent:"Delivery Operations", state:"live", detail:"Project worklane continues independently from JARVIS architecture." },
    { id:"t9", title:"Rangrez next visual QA pass", projectId:"rangrez", project:"Rangrez", agent:"AI Reviewer", state:"next", detail:"Keep design implementation and device QA as separate acceptance gates." },
    { id:"t10", title:"DeutschPath hint ladder regression", projectId:"deutschpath", project:"DeutschPath", agent:"Engineering Agent", state:"queued", detail:"Known progressive-hint ladder test remains the current defect from latest recorded E2E evidence." },
    { id:"t11", title:"Axiom paper execution QA", projectId:"axiom", project:"Axiom", agent:"Engineering Agent", state:"review", detail:"Research/paper evidence continues; live-capital authority remains disabled." },
    { id:"t12", title:"TradePilot live prospect reactivation", projectId:"tradepilot", project:"TradePilot", agent:"Delivery Operations", state:"review", detail:"PR #5 is the canonical current-main successor. Vercel/scoped typecheck are green; live Supabase verification is blocked because the project is inactive." }
  ],
  revenue: {
    qualifiedProspects: 51,
    pendingIndependentReview: 15,
    reviewedSendReady: 36,
    founderApproved: 17,
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
