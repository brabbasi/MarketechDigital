"use client";

import { useMemo, useState, type DragEvent } from "react";
import styles from "./jarvis.module.css";

type AgentState = "running" | "ready" | "blocked" | "review" | "training";
type ProjectState = "on_track" | "blocked" | "review" | "planning";
type TaskState = "live" | "next" | "queued" | "review" | "founder" | "blocked" | "done";

type Agent = {
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

type Project = {
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

type Task = {
  id: string;
  title: string;
  project: string;
  agent: string;
  state: TaskState;
  detail: string;
};

const agents: Agent[] = [
  { id:"orchestrator", name:"Executive Orchestrator", short:"EO", department:"Executive", state:"ready", x:50, y:12, load:38, task:"Company priorities + delegation", skills:["mission planning","delegation","founder briefing"], workers:[{name:"Codex Engineering Senior",state:"available",last:"22m ago"}], history:["Reconciled JARVIS finish chain","Preserved parallel company lanes"] },
  { id:"resource", name:"Agent Resource Manager", short:"RM", department:"Operations", state:"running", x:72, y:20, load:54, task:"Capacity + assignment planning", skills:["workforce planning","capacity","reassignment"], workers:[{name:"Remote Standard Worker",state:"gated",last:"not active"}], history:["Detected stalled Capability Lab lane","Recommended review-preserving reassignment"] },
  { id:"reviewer", name:"AI Reviewer", short:"AR", department:"Governance", state:"review", x:86, y:43, load:67, task:"Exact-head review queue", skills:["security review","regression","evidence","governance"], workers:[{name:"Remote Critical Reviewer",state:"quota blocked",last:"current"}], history:["Reviewer coverage mandatory across portfolio","PR #66 exact review waiting on provider quota"] },
  { id:"delivery", name:"Delivery Operations", short:"DO", department:"Delivery", state:"running", x:78, y:68, load:61, task:"Project worklane continuity", skills:["delivery planning","QA","dependency tracking"], workers:[{name:"Codex Engineering Senior",state:"busy",last:"now"}], history:["Maintained project continuation points","No project silently replaced"] },
  { id:"engineering", name:"Engineering Agent", short:"EN", department:"Engineering", state:"running", x:57, y:82, load:78, task:"JARVIS + product engineering", skills:["Next.js","Python","CI","systems"], workers:[{name:"Codex Engineering Senior",state:"running",last:"now"},{name:"Codebase Memory",state:"restricted",last:"verified"}], history:["Built canonical JARVIS system map","Building remote Founder portal"] },
  { id:"memory", name:"Memory Agent", short:"ME", department:"Knowledge", state:"training", x:34, y:80, load:31, task:"Memory Fabric evaluation", skills:["episodic memory","provenance","retrieval"], workers:[{name:"MemPalace candidate",state:"lab only",last:"evaluation pending"},{name:"Graft",state:"restricted",last:"verified"}], history:["Memory Router contract defined","MemPalace kept behind Lab gate"] },
  { id:"revenue", name:"Revenue Agent", short:"RV", department:"Revenue", state:"running", x:16, y:63, load:49, task:"Research + pipeline movement", skills:["qualification","research","pipeline"], workers:[{name:"Revenue Assessment Trainee",state:"evaluation",last:"current"}], history:["48 qualified prospects in canonical queue","Outbound remains governed and held"] },
  { id:"marketing", name:"Marketing Agent", short:"MK", department:"Growth", state:"ready", x:14, y:35, load:28, task:"SEO + organic growth", skills:["SEO","GEO/AEO","content"], workers:[{name:"Website Evidence Specialist",state:"planned",last:"n/a"}], history:["Website evidence workflows defined","Publishing authority remains gated"] },
  { id:"client", name:"Client Success Agent", short:"CS", department:"Client", state:"ready", x:29, y:18, load:18, task:"Client readiness + support", skills:["onboarding","support","status comms"], workers:[{name:"Client Comms specialist",state:"planned",last:"n/a"}], history:["Client-agent pack canonicalized","No unsupported client state claims"] },
];

const initialProjects: Project[] = [
  { id:"jarvis", name:"Marketech OS / JARVIS", area:"Company OS", state:"review", progress:74, now:"Bridge -> Reviewer -> Runtime -> Autonomy", blocked:1, repo:"brabbasi/Marketech_Digital_OS", agentIds:["orchestrator","resource","reviewer","engineering","delivery","memory"] },
  { id:"site", name:"Marketech Website", area:"Growth + acquisition", state:"on_track", progress:68, now:"Founder portal + acquisition engine", blocked:1, repo:"brabbasi/MarketechDigital", agentIds:["engineering","marketing","reviewer"] },
  { id:"rangrez", name:"Rangrez", area:"AI styling", state:"on_track", progress:58, now:"Product convergence + visual QA", blocked:0, repo:"brabbasi/Rangrez", agentIds:["delivery","engineering","reviewer"] },
  { id:"deutschpath", name:"DeutschPath / Jiya", area:"AI learning", state:"on_track", progress:64, now:"Adaptive learning + release readiness", blocked:0, repo:"brabbasi/deutschpath-ai", agentIds:["delivery","engineering","reviewer"] },
  { id:"axiom", name:"Axiom", area:"Market intelligence", state:"review", progress:71, now:"Evidence-first research gates", blocked:1, repo:"brabbasi/axiom-market-intelligence", agentIds:["engineering","reviewer"] },
  { id:"tradepilot", name:"TradePilot", area:"Trades opportunity OS", state:"planning", progress:46, now:"Reconcile product lineage", blocked:0, repo:"brabbasi/Tradepilot", agentIds:["delivery","engineering","reviewer"] },
  { id:"finance-os", name:"Financial Independence OS", area:"Personal finance product", state:"planning", progress:24, now:"Foundation + privacy architecture", blocked:0, agentIds:["orchestrator","reviewer"] },
  { id:"leadahead", name:"LeadAhead", area:"Predictive operations", state:"planning", progress:18, now:"Concept + employer-safe scope", blocked:0, agentIds:["orchestrator","reviewer"] },
];

const tasks: Task[] = [
  { id:"t1", title:"Trusted Bridge exact-head review", project:"JARVIS", agent:"AI Reviewer", state:"review", detail:"Engineering green; independent reviewer capacity is the gate." },
  { id:"t2", title:"Remote Founder portal v1", project:"Website", agent:"Engineering Agent", state:"live", detail:"Build secure visual Founder interface without exposing Trusted runtime." },
  { id:"t3", title:"Canonical system map", project:"JARVIS", agent:"Engineering Agent", state:"done", detail:"Full living scope map + drift guard created in PR #92." },
  { id:"t4", title:"Capability Lab isolation certification", project:"JARVIS", agent:"Delivery Operations", state:"blocked", detail:"Repair landed; hosted runner allocation has not executed certification." },
  { id:"t5", title:"Revenue research review batch", project:"Revenue", agent:"Revenue Agent", state:"queued", detail:"12 newest packets await independent review; no outbound." },
  { id:"t6", title:"Reviewer install after Bridge", project:"JARVIS", agent:"Engineering Agent", state:"next", detail:"Governed install only after #66 clean exact-head review." },
  { id:"t7", title:"Founder activation decision", project:"JARVIS", agent:"Executive Orchestrator", state:"founder", detail:"Example approval surface only; no real action is wired in this preview." },
  { id:"t8", title:"Rangrez product lane", project:"Rangrez", agent:"Delivery Operations", state:"live", detail:"Project worklane continues independently from JARVIS architecture." },
];

const stateLabel: Record<AgentState,string> = { running:"RUNNING", ready:"READY", blocked:"BLOCKED", review:"REVIEW", training:"TRAINING" };
const taskLabel: Record<TaskState,string> = { live:"LIVE NOW", next:"NEXT", queued:"QUEUED", review:"IN REVIEW", founder:"NEEDS FOUNDER", blocked:"BLOCKED", done:"DONE" };

export default function JarvisPortal() {
  const [projects,setProjects] = useState(initialProjects);
  const [selectedProjectId,setSelectedProjectId] = useState("jarvis");
  const [selectedAgentId,setSelectedAgentId] = useState<string | null>(null);
  const [selectedTaskId,setSelectedTaskId] = useState<string | null>(null);
  const [pendingAssignment,setPendingAssignment] = useState<{agentId:string;projectId:string}|null>(null);
  const [assignmentRole,setAssignmentRole] = useState("Assist");
  const [query,setQuery] = useState("");
  const [jarvisAnswer,setJarvisAnswer] = useState("Ask what changed, what is blocked, which agents are working, or what needs your approval.");
  const [approvalState,setApprovalState] = useState<Record<string,string>>({});

  const selectedProject = useMemo(() => projects.find(p=>p.id===selectedProjectId) || projects[0], [projects,selectedProjectId]);
  const selectedAgent = useMemo(() => agents.find(a=>a.id===selectedAgentId) || null,[selectedAgentId]);
  const selectedTask = useMemo(() => tasks.find(t=>t.id===selectedTaskId) || null,[selectedTaskId]);
  const assigned = new Set(selectedProject.agentIds);

  function startDrag(event:DragEvent<HTMLButtonElement>,agentId:string){
    event.dataTransfer.setData("text/agent-id",agentId);
    event.dataTransfer.effectAllowed="copy";
  }
  function dropAgent(event:DragEvent<HTMLButtonElement>,projectId:string){
    event.preventDefault();
    const agentId=event.dataTransfer.getData("text/agent-id");
    if(agentId) setPendingAssignment({agentId,projectId});
  }
  function confirmAssignment(){
    if(!pendingAssignment) return;
    setProjects(current=>current.map(project=>{
      if(project.id!==pendingAssignment.projectId || project.agentIds.includes(pendingAssignment.agentId)) return project;
      return {...project,agentIds:[...project.agentIds,pendingAssignment.agentId]};
    }));
    setSelectedProjectId(pendingAssignment.projectId);
    setPendingAssignment(null);
  }
  function askJarvis(){
    const normalized=query.toLowerCase();
    let answer="I can summarize company state, agent assignments, project worklanes, approvals and blockers from the governed read model.";
    if(normalized.includes("block")) answer="Current preview focus: JARVIS is gated at the exact-head Trusted Bridge review; Capability Lab certification is waiting on hosted runner allocation. Project lanes remain independently preserved.";
    if(normalized.includes("agent")) answer=`${agents.filter(a=>a.state==="running").length} agents are shown running in this prototype. Select any agent to inspect its projects, workers, history and skills.`;
    if(normalized.includes("approval")) answer="The Founder rail shows approval objects separately from ordinary blockers. These buttons are preview-only until signed Founder Intents and Trusted Bridge consumption are implemented.";
    if(normalized.includes("revenue")) answer="Canonical revenue research has 48 qualified prospects; the newest 12 packets await independent review. Outbound remains intentionally held.";
    setJarvisAnswer(answer);
    setQuery("");
  }

  const approvalItems=[
    {id:"a1",title:"Phase-A autonomy canary",meta:"JARVIS · exact target required",risk:"LOW"},
    {id:"a2",title:"Production portal activation",meta:"Website · auth + review required",risk:"MED"},
    {id:"a3",title:"Skill promotion candidate",meta:"Agent Skill Fabric · reviewer required",risk:"LOW"},
  ];

  return (
    <main className={styles.portal}>
      <div className={styles.grid}/>
      <header className={styles.topbar}>
        <div className={styles.brand}><span className={styles.mark}>M</span><div><strong>MARKETECH DIGITAL</strong><small>JARVIS · COMPANY OS</small></div></div>
        <div className={styles.askTop}><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askJarvis()} placeholder="Ask JARVIS anything..."/><button onClick={askJarvis}>ASK</button></div>
        <div className={styles.founder}><i/><div><strong>Founder</strong><small>PRIVATE PREVIEW · NO AUTHORITY</small></div></div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.projects}>
          <div className={styles.railTitle}><span>PROJECT UNIVERSE</span><b>{projects.length}</b></div>
          <p>Projects live here. Agents are assigned to them.</p>
          <div className={styles.projectList}>
            {projects.map(project=>{
              const active=project.id===selectedProject.id;
              return <button key={project.id} className={active?styles.projectActive:""} onClick={()=>setSelectedProjectId(project.id)} onDragOver={e=>e.preventDefault()} onDrop={e=>dropAgent(e,project.id)}>
                <div><strong>{project.name}</strong><small>{project.area}</small></div>
                <span className={styles[project.state]}>{project.progress}%</span>
                <em>{project.agentIds.length} agents</em>
              </button>
            })}
          </div>
          <section className={styles.projectFocus}>
            <small>SELECTED PROJECT</small><h2>{selectedProject.name}</h2>
            <p>{selectedProject.now}</p>
            <div><span>{selectedProject.agentIds.length} assigned</span><span>{selectedProject.blocked} blocked</span></div>
          </section>
        </aside>

        <section className={styles.center}>
          <div className={styles.sceneHeader}>
            <div><small>LIVE COMPANY VIEW</small><h1>Agent Constellation</h1><p>Drag an agent onto a project to request assistance.</p></div>
            <div className={styles.companyStats}><b>{agents.filter(a=>a.state==="running").length}<small>running</small></b><b>{tasks.filter(t=>t.state==="live").length}<small>live tasks</small></b><b>{tasks.filter(t=>t.state==="founder").length}<small>needs you</small></b></div>
          </div>

          <div className={styles.scene}>
            <div className={styles.orbitA}/><div className={styles.orbitB}/><div className={styles.orbitC}/>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{agents.map(agent=><line key={agent.id} className={assigned.has(agent.id)?styles.beamActive:styles.beam} x1="50" y1="50" x2={agent.x} y2={agent.y}/>)}</svg>
            <button className={styles.core} onClick={()=>setSelectedAgentId(null)}><span>J</span><strong>JARVIS</strong><small>COMPANY BRAIN</small><em>{selectedProject.name}</em></button>
            {agents.map(agent=>{
              const related=assigned.has(agent.id);
              return <button draggable onDragStart={e=>startDrag(e,agent.id)} onClick={()=>setSelectedAgentId(agent.id)} key={agent.id} className={[styles.agent,styles[agent.state],related?styles.related:""].join(" ")} style={{left:`${agent.x}%`,top:`${agent.y}%`}}>
                <span>{agent.short}</span><div><strong>{agent.name}</strong><small>{agent.department} · {stateLabel[agent.state]}</small></div><i>{agent.load}%</i>
              </button>
            })}
            <div className={styles.sceneLegend}><span><i className={styles.runningDot}/>working</span><span><i className={styles.reviewDot}/>review</span><span><i className={styles.trainingDot}/>learning</span><span>bright beam = assigned to selected project</span></div>
          </div>

          <div className={styles.taskHorizon}>
            {(["live","next","queued","review","founder","blocked","done"] as TaskState[]).map(state=><div key={state}><header>{taskLabel[state]} <b>{tasks.filter(t=>t.state===state).length}</b></header>{tasks.filter(t=>t.state===state).slice(0,2).map(task=><button key={task.id} onClick={()=>setSelectedTaskId(task.id)}><strong>{task.title}</strong><small>{task.project} · {task.agent}</small></button>)}</div>)}
          </div>
        </section>

        <aside className={styles.founderRail}>
          <section className={styles.brief}>
            <div><small>FOUNDER BRIEF</small><span>LIVE MODEL PREVIEW</span></div>
            <h2>Good afternoon, Basit.</h2>
            <p>JARVIS should tell you what changed, who is working, what is blocked and what needs you—without making you inspect every project.</p>
            <div className={styles.briefStats}><b>4<small>finish gates</small></b><b>48<small>prospects</small></b><b>0<small>unsafe sends</small></b></div>
          </section>

          <section className={styles.approvals}>
            <header><span>NEEDS YOUR APPROVAL</span><b>{approvalItems.filter(a=>!approvalState[a.id]).length}</b></header>
            {approvalItems.map(item=><div key={item.id} className={approvalState[item.id]?styles.decided:""}>
              <div><strong>{item.title}</strong><small>{item.meta}</small></div><em>{approvalState[item.id]||item.risk}</em>
              {!approvalState[item.id]&&<span><button onClick={()=>setApprovalState(s=>({...s,[item.id]:"APPROVED PREVIEW"}))}>Approve</button><button onClick={()=>setApprovalState(s=>({...s,[item.id]:"REJECTED PREVIEW"}))}>Reject</button></span>}
            </div>)}
            <p>Preview only. Real buttons will create signed, expiring Founder Intents—never direct shell commands.</p>
          </section>

          <section className={styles.jarvisChat}>
            <header>ASK JARVIS</header>
            <div className={styles.answer}>{jarvisAnswer}</div>
            <div className={styles.chips}><button onClick={()=>{setQuery("What is blocked?");setTimeout(askJarvis,0)}}>Blockers</button><button onClick={()=>setJarvisAnswer("Select a project, then drag a glowing agent node onto it. JARVIS validates scope before creating an Assist assignment.")}>How do I assign help?</button><button onClick={()=>setJarvisAnswer("Agent -> Projects -> Workers -> History is preserved separately so you can see accountability and exact execution evidence.")}>Show history model</button></div>
          </section>
        </aside>
      </div>

      {selectedAgent&&<div className={styles.backdrop} onClick={()=>setSelectedAgentId(null)}><section className={styles.drawer} onClick={e=>e.stopPropagation()}>
        <button className={styles.close} onClick={()=>setSelectedAgentId(null)}>×</button>
        <small>AGENT INSPECTOR</small><h2>{selectedAgent.name}</h2><p>{selectedAgent.department} · {stateLabel[selectedAgent.state]} · load {selectedAgent.load}%</p>
        <div className={styles.drawerGrid}>
          <article><small>CURRENT WORK</small><strong>{selectedAgent.task}</strong></article>
          <article><small>PROJECTS</small><strong>{projects.filter(p=>p.agentIds.includes(selectedAgent.id)).map(p=>p.name).join(", ")||"Unassigned"}</strong></article>
        </div>
        <h3>Workers</h3>{selectedAgent.workers.map(w=><div className={styles.historyRow} key={w.name}><b>{w.name}</b><span>{w.state}</span><small>{w.last}</small></div>)}
        <h3>Skills</h3><div className={styles.skillRow}>{selectedAgent.skills.map(s=><span key={s}>{s}</span>)}</div>
        <h3>Recent agent history</h3>{selectedAgent.history.map(h=><div className={styles.historyRow} key={h}><b>{h}</b><span>evidence retained</span></div>)}
      </section></div>}

      {selectedTask&&<div className={styles.backdrop} onClick={()=>setSelectedTaskId(null)}><section className={styles.drawer} onClick={e=>e.stopPropagation()}>
        <button className={styles.close} onClick={()=>setSelectedTaskId(null)}>×</button><small>TASK / MISSION</small><h2>{selectedTask.title}</h2><p>{taskLabel[selectedTask.state]} · {selectedTask.project} · {selectedTask.agent}</p><div className={styles.taskDetail}>{selectedTask.detail}</div><h3>Evidence chain</h3><div className={styles.historyRow}><b>Project → Agent → Worker → exact run/evidence</b><span>canonical model</span></div>
      </section></div>}

      {pendingAssignment&&<div className={styles.backdrop}><section className={styles.confirm}>
        <small>ASSIGN AGENT</small><h2>{agents.find(a=>a.id===pendingAssignment.agentId)?.name}</h2><p>to {projects.find(p=>p.id===pendingAssignment.projectId)?.name}</p>
        <label>Role<select value={assignmentRole} onChange={e=>setAssignmentRole(e.target.value)}><option>Assist</option><option>Specialist</option><option>Observer</option><option>Primary</option></select></label>
        <div className={styles.scopeBox}><span>Scope validation</span><b>Preview: bounded project scope only</b><small>No new production, financial or credential authority.</small></div>
        <footer><button onClick={()=>setPendingAssignment(null)}>Cancel</button><button onClick={confirmAssignment}>Assign preview</button></footer>
      </section></div>}

      <footer className={styles.footer}><span>PRIVATE FOUNDER PORTAL · DEMO DATA</span><span>AGENTS → PROJECTS → TASKS → WORKERS → EVIDENCE</span><span>REMOTE AUTHORITY OFF</span></footer>
    </main>
  );
}
