"use client";

import { useEffect, useMemo, useState, type DragEvent } from "react";
import styles from "./jarvis.module.css";
import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
  type TaskState,
} from "./jarvisState";

const stateLabel: Record<JarvisAgent["state"],string> = {
  running:"RUNNING",
  ready:"READY",
  blocked:"BLOCKED",
  review:"REVIEW",
  training:"TRAINING"
};

const taskLabel: Record<TaskState,string> = {
  live:"LIVE NOW",
  next:"NEXT",
  queued:"QUEUED",
  review:"IN REVIEW",
  founder:"NEEDS FOUNDER",
  blocked:"BLOCKED",
  done:"DONE"
};

export default function JarvisPortal() {
  const [snapshot,setSnapshot] = useState<JarvisState>(demoJarvisState);
  const [projects,setProjects] = useState<JarvisProject[]>(demoJarvisState.projects);
  const [readModelStatus,setReadModelStatus] = useState<"loading"|"demo"|"mirror"|"unavailable">("loading");
  const agents = snapshot.agents;
  const tasks = snapshot.tasks;
  const [selectedProjectId,setSelectedProjectId] = useState("jarvis");
  const [selectedAgentId,setSelectedAgentId] = useState<string | null>(null);
  const [selectedTaskId,setSelectedTaskId] = useState<string | null>(null);
  const [pendingAssignment,setPendingAssignment] = useState<{agentId:string;projectId:string}|null>(null);
  const [assignmentRole,setAssignmentRole] = useState("Assist");
  const [query,setQuery] = useState("");
  const [jarvisAnswer,setJarvisAnswer] = useState("Ask what changed, what is blocked, which agents are working, or what needs your approval.");
  const [approvalState,setApprovalState] = useState<Record<string,string>>({});

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch("/api/jarvis/state", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) setReadModelStatus("unavailable");
          return;
        }
        const next = (await response.json()) as JarvisState;
        if (cancelled) return;
        setSnapshot(next);
        setProjects(next.projects);
        setReadModelStatus(next.source);
      } catch {
        if (!cancelled) setReadModelStatus("unavailable");
      }
    }

    refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

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
        <div className={styles.founder}><i/><div><strong>Founder</strong><small>{readModelStatus.toUpperCase()} READ MODEL · NO AUTHORITY</small></div></div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.projects}>
          <div className={styles.railTitle}><span>PROJECT UNIVERSE</span><b>{projects.length}</b></div>
          <p>Projects live here. Agents are assigned to them.</p>
          <div className={styles.projectList}>
            {projects.map(project=>{
              const active=project.id===selectedProject.id;
              return <button data-testid={`project-${project.id}`} key={project.id} className={active?styles.projectActive:""} onClick={()=>setSelectedProjectId(project.id)} onDragOver={e=>e.preventDefault()} onDrop={e=>dropAgent(e,project.id)}>
                <div><strong>{project.name}</strong><small>{project.area}</small></div>
                <span className={styles[project.state]}>{project.progress}%</span>
                <em>{project.agentIds.length} agents</em>
                <div className={styles.projectProgress}><i style={{width:`${project.progress}%`}}/></div>
                <div className={styles.projectAgents}>
                  {project.agentIds.slice(0,5).map(id=><b key={id}>{agents.find(a=>a.id===id)?.short || "?"}</b>)}
                  {project.agentIds.length>5&&<b>+{project.agentIds.length-5}</b>}
                </div>
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
              return <button data-testid={`agent-${agent.id}`} draggable onDragStart={e=>startDrag(e,agent.id)} onClick={()=>setSelectedAgentId(agent.id)} key={agent.id} className={[styles.agent,styles[agent.state],related?styles.related:styles.unrelated].join(" ")} style={{left:`${agent.x}%`,top:`${agent.y}%`}}>
                <span>{agent.short}</span><div><strong>{agent.name}</strong><small>{agent.department} · {stateLabel[agent.state]}</small></div><i>{agent.load}%</i>
                <span className={styles.workerSatellites} aria-label={`${agent.workers.length} workers`}>
                  {agent.workers.slice(0,3).map((worker,index)=><u key={worker.name} style={{transform:`rotate(${index*120}deg) translateX(27px)`}} title={worker.name}/>)}
                </span>
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
            <div><small>FOUNDER BRIEF</small><span>{snapshot.source.toUpperCase()} · READ ONLY</span></div>
            <h2>Good afternoon, Basit.</h2>
            <p>JARVIS should tell you what changed, who is working, what is blocked and what needs you—without making you inspect every project.</p>
            <div className={styles.briefStats}><b>4<small>finish gates</small></b><b>{snapshot.revenue.qualifiedProspects}<small>prospects</small></b><b>{snapshot.revenue.outboundHeld ? 0 : snapshot.revenue.outreachSent}<small>unsafe sends</small></b></div>
          </section>

          <section className={styles.approvals}>
            <header data-testid="approvals-title"><span>NEEDS YOUR APPROVAL</span><b>{approvalItems.filter(a=>!approvalState[a.id]).length}</b></header>
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

      <footer className={styles.footer}><span data-testid="read-model-status">PRIVATE FOUNDER PORTAL · {readModelStatus.toUpperCase()} READ MODEL</span><span>AGENTS → PROJECTS → TASKS → WORKERS → EVIDENCE</span><span>REMOTE AUTHORITY OFF</span></footer>
    </main>
  );
}
