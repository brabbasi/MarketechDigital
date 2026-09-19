export type AgentState = "running" | "ready" | "blocked" | "review" | "training";
export type ProjectState = "on_track" | "blocked" | "review" | "planning";
export type TaskState = "live" | "next" | "queued" | "review" | "founder" | "blocked" | "done";

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
  now: string;
  blocked: number;
  repo?: string;
  agentIds: string[];
};

export type JarvisTask = {
  id: string;
  title: string;
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
    { id:"revenue", name:"Revenue Agent", short:"RV", department:"Revenue", state:"running", x:16, y:63, load:49, task:"Research + pipeline movement", skills:["qualification","research","pipeline"], workers:[{name:"Revenue Assessment Trainee",state:"evaluation",last:"current"}], history:["48 qualified prospects in canonical queue","Outbound remains governed and held"] },
    { id:"marketing", name:"Marketing Agent", short:"MK", department:"Growth", state:"ready", x:14, y:35, load:28, task:"SEO + organic growth", skills:["SEO","GEO/AEO","content"], workers:[{name:"Website Evidence Specialist",state:"planned",last:"n/a"}], history:["Website evidence workflows defined","Publishing authority remains gated"] },
    { id:"client", name:"Client Success Agent", short:"CS", department:"Client", state:"ready", x:29, y:18, load:18, task:"Client readiness + support", skills:["onboarding","support","status comms"], workers:[{name:"Client Comms specialist",state:"planned",last:"n/a"}], history:["Client-agent pack canonicalized","No unsupported client state claims"] }
  ],
  projects: [
    { id:"jarvis", name:"Marketech OS / JARVIS", area:"Company OS", state:"review", progress:74, now:"Bridge -> Reviewer -> Runtime -> Autonomy", blocked:1, repo:"brabbasi/Marketech_Digital_OS", agentIds:["orchestrator","resource","reviewer","engineering","delivery","memory"] },
    { id:"site", name:"Marketech Website", area:"Growth + acquisition", state:"on_track", progress:68, now:"Founder portal + acquisition engine", blocked:1, repo:"brabbasi/MarketechDigital", agentIds:["engineering","marketing","reviewer"] },
    { id:"rangrez", name:"Rangrez", area:"AI styling", state:"on_track", progress:58, now:"Product convergence + visual QA", blocked:0, repo:"brabbasi/Rangrez", agentIds:["delivery","engineering","reviewer"] },
    { id:"deutschpath", name:"DeutschPath / Jiya", area:"AI learning", state:"on_track", progress:64, now:"Adaptive learning + release readiness", blocked:0, repo:"brabbasi/deutschpath-ai", agentIds:["delivery","engineering","reviewer"] },
    { id:"axiom", name:"Axiom", area:"Market intelligence", state:"review", progress:71, now:"Evidence-first research gates", blocked:1, repo:"brabbasi/axiom-market-intelligence", agentIds:["engineering","reviewer"] },
    { id:"tradepilot", name:"TradePilot", area:"Trades opportunity OS", state:"planning", progress:46, now:"Reconcile product lineage", blocked:0, repo:"brabbasi/Tradepilot", agentIds:["delivery","engineering","reviewer"] },
    { id:"finance-os", name:"Financial Independence OS", area:"Personal finance product", state:"planning", progress:24, now:"Foundation + privacy architecture", blocked:0, agentIds:["orchestrator","reviewer"] },
    { id:"leadahead", name:"LeadAhead", area:"Predictive operations", state:"planning", progress:18, now:"Concept + employer-safe scope", blocked:0, agentIds:["orchestrator","reviewer"] }
  ],
  tasks: [
    { id:"t1", title:"Trusted Bridge exact-head review", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"Engineering green; independent reviewer capacity is the gate." },
    { id:"t2", title:"Remote Founder portal v1", project:"Website", agent:"Engineering Agent", state:"live", detail:"Build secure visual Founder interface without exposing Trusted runtime." },
    { id:"t3", title:"Canonical system map", project:"JARVIS", agent:"Engineering Agent", state:"done", detail:"Full living scope map + drift guard created in PR #92." },
    { id:"t4", title:"Capability Lab isolation certification", project:"JARVIS", agent:"Delivery Operations", state:"blocked", detail:"Repair landed; hosted runner allocation has not executed certification." },
    { id:"t5", title:"Revenue research review batch", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"12 newest packets await independent review; no outbound." },
    { id:"t6", title:"Reviewer install after Bridge", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Governed install only after #66 clean exact-head review." },
    { id:"t7", title:"Founder activation decision", project:"JARVIS", agent:"Executive Orchestrator", state:"founder", detail:"Example approval surface only; no real action is wired in this preview." },
    { id:"t8", title:"Rangrez product lane", project:"Rangrez", agent:"Delivery Operations", state:"live", detail:"Project worklane continues independently from JARVIS architecture." }
  ],
  revenue: {
    qualifiedProspects: 48,
    pendingIndependentReview: 12,
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
