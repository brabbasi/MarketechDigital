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
  training:"TRAINING",
  unknown:"UNKNOWN"
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
  const [snapshot,setSnapshot] = useState<JarvisState | null>(null);
  const [projects,setProjects] = useState<JarvisProject[]>([]);
  const [readModelStatus,setReadModelStatus] = useState<"loading"|"demo"|"mirror"|"unavailable">("loading");
  const agents = snapshot?.agents ?? [];
  const tasks = snapshot?.tasks ?? [];
  const portalBuild = snapshot?.portal?.buildSha || "unknown";
  const portalEnvironment = snapshot?.portal?.environment || "unknown";
  const [selectedProjectId,setSelectedProjectId] = useState("jarvis");
  const [selectedAgentId,setSelectedAgentId] = useState<string | null>(null);
  const [selectedTaskId,setSelectedTaskId] = useState<string | null>(null);
  const [pendingAssignment,setPendingAssignment] = useState<{agentId:string;projectId:string}|null>(null);
  const [assignmentRole,setAssignmentRole] = useState("Assist");
  const [query,setQuery] = useState("");
  const [jarvisAnswer,setJarvisAnswer] = useState("Ask what changed, what is blocked, which agents are working, or what needs your approval.");
  const [approvalState,setApprovalState] = useState<Record<string,string>>({});
  const [mobileView,setMobileView] = useState<"jarvis"|"agents"|"projects"|"tasks"|"approvals"|"history">("jarvis");

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch("/api/jarvis/state", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) {
            setSnapshot(null);
            setProjects([]);
            setReadModelStatus("unavailable");
          }
          return;
        }
        const next = (await response.json()) as JarvisState;
        if (cancelled) return;
        setSnapshot(next);
        setProjects(next.projects);
        setReadModelStatus(next.source);
      } catch {
        if (!cancelled) {
          setSnapshot(null);
          setProjects([]);
          setReadModelStatus("unavailable");
        }
      }
    }

    refresh();
    const timer = window.setInterval(refresh, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const selectedProject = useMemo(() => projects.find(p=>p.id===selectedProjectId) || projects[0] || null, [projects,selectedProjectId]);
  const selectedAgent = useMemo(() => agents.find(a=>a.id===selectedAgentId) || null,[agents,selectedAgentId]);
  const selectedTask = useMemo(() => tasks.find(t=>t.id===selectedTaskId) || null,[tasks,selectedTaskId]);
  const projectTasks = useMemo(() => selectedProject ? tasks.filter(t=>t.projectId===selectedProject.id) : [],[tasks,selectedProject]);
  const assigned = new Set(selectedProject?.agentIds ?? []);
  const reviewQueueCount = tasks.filter(task=>task.state==="review").length;
  const ciInfrastructureBlockers = tasks.filter(task =>
    task.state==="blocked" && /\b(ci|runner|infrastructure)\b/i.test(`${task.title} ${task.detail}`)
  ).length;
  const readFreshness = snapshot?.mirror ? `${snapshot.mirror.ageSeconds}s old` : "5s refresh";

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
    if(snapshot?.source==="mirror"){
      setJarvisAnswer("The live Founder Intent path is not activated yet. No assignment was written; the trusted mirror remains read-only.");
      setPendingAssignment(null);
      return;
    }
    setProjects(current=>current.map(project=>{
      if(project.id!==pendingAssignment.projectId || project.agentIds.includes(pendingAssignment.agentId)) return project;
      return {...project,agentIds:[...project.agentIds,pendingAssignment.agentId],assignments:[...project.assignments,{agentId:pendingAssignment.agentId,role:assignmentRole as JarvisProject["assignments"][number]["role"]}]};
    }));
    setSelectedProjectId(pendingAssignment.projectId);
    setPendingAssignment(null);
  }
  function askJarvis(){
    const normalized=query.toLowerCase();
    let answer="I can summarize company state, agent assignments, project worklanes, approvals and blockers from the governed read model.";
    if(normalized.includes("block")){
      const blocked=tasks.filter(task=>task.state==="blocked");
      answer=blocked.length
        ? `The current read model exposes ${blocked.length} blocked item${blocked.length===1?"":"s"}: ${blocked.slice(0,3).map(task=>task.title).join("; ")}.`
        : "The current read model exposes no blocked task. That does not imply unexposed systems are healthy.";
    }
    if(normalized.includes("agent")){
      const running=agents.filter(agent=>agent.state==="running").length;
      const unknown=agents.filter(agent=>agent.state==="unknown").length;
      answer=snapshot?.source==="mirror"
        ? `The sanitized mirror explicitly marks ${running} agent${running===1?"":"s"} running and leaves ${unknown} agent${unknown===1?"":"s"} with unknown live activity. I will not infer activity from org membership.`
        : `${running} agents are shown running in this preview. Select any agent to inspect its projects, workers, history and skills.`;
    }
    if(normalized.includes("approval")){
      const needsFounder=tasks.filter(task=>task.state==="founder");
      answer=`The current read model exposes ${needsFounder.length} item${needsFounder.length===1?"":"s"} needing Founder action. The remote signed-intent path is still off, so this portal does not record a decision yet.`;
    }
    if(normalized.includes("revenue") && snapshot){
      answer=`The read model shows ${snapshot.revenue.qualifiedProspects} qualified prospects and ${snapshot.revenue.pendingIndependentReview} pending independent review. Outbound is ${snapshot.revenue.outboundHeld?"held":"not marked held"} by the current authority state.`;
    }
    setJarvisAnswer(answer);
    setQuery("");
  }

  const approvalItems = snapshot?.source==="mirror"
    ? tasks.filter(task=>task.state==="founder").slice(0,5).map(task=>({
        id:task.id,
        title:task.title,
        meta:`${task.project} · ${task.agent}`,
        risk:"GATED",
      }))
    : [
        {id:"a1",title:"Phase-A autonomy canary",meta:"JARVIS · exact target required",risk:"LOW"},
        {id:"a2",title:"Production portal activation",meta:"Website · auth + review required",risk:"MED"},
        {id:"a3",title:"Skill promotion candidate",meta:"Agent Skill Fabric · reviewer required",risk:"LOW"},
      ];

  function recordApprovalPreview(id:string, decision:"APPROVED PREVIEW"|"REJECTED PREVIEW"){
    if(snapshot?.source==="mirror"){
      setJarvisAnswer("Founder Intent signing is not activated. The trusted mirror is read-only, so no approval or rejection was recorded.");
      return;
    }
    setApprovalState(state=>({...state,[id]:decision}));
  }

  if(!snapshot || !selectedProject){
    return (
      <main className={styles.portal}>
        <div className={styles.grid}/>
        <header className={styles.topbar}>
          <div className={styles.brand}><span className={styles.mark}>M</span><div><strong>MARKETECH DIGITAL</strong><small>JARVIS · COMPANY OS</small></div></div>
          <div className={styles.askTop}><span>⌕</span><input disabled placeholder="JARVIS read model unavailable"/><button disabled>ASK</button></div>
          <div className={styles.founder}><i/><div><strong>Founder</strong><small>{readModelStatus.toUpperCase()} · NO AUTHORITY</small></div></div>
        </header>
        <section className={styles.stateGate} data-testid="read-model-gate">
          <small>{readModelStatus==="loading"?"CONNECTING TO READ MODEL":"READ MODEL UNAVAILABLE"}</small>
          <h1>{readModelStatus==="loading"?"Loading governed company state…":"JARVIS will not show demo data as live state."}</h1>
          <p>{readModelStatus==="loading"?"Waiting for a validated DEMO or Trusted Control Plane mirror response.":"The current mirror is missing, stale, malformed, or unreachable. Remote authority remains off and stale company data is hidden."}</p>
        </section>
        <footer className={styles.footer}><span data-testid="read-model-status">PRIVATE FOUNDER PORTAL · {readModelStatus.toUpperCase()} READ MODEL</span><span>FAIL CLOSED · NO STALE FALLBACK</span><span>REMOTE AUTHORITY OFF</span></footer>
      </main>
    );
  }

  return (
    <main className={styles.portal}>
      <div className={styles.grid}/>
      <header className={styles.topbar}>
        <div className={styles.brand}><span className={styles.mark}>M</span><div><strong>MARKETECH DIGITAL</strong><small>JARVIS · COMPANY OS</small></div></div>
        <div className={styles.askTop}><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askJarvis()} placeholder="Ask JARVIS anything..."/><button onClick={askJarvis}>ASK</button></div>
        <div className={styles.founder}><i/><div><strong>Founder</strong><small>{readModelStatus.toUpperCase()} READ MODEL · NO AUTHORITY</small></div></div>
      </header>

      <nav className={styles.mobileNav} data-testid="mobile-nav" aria-label="JARVIS mobile sections">
        {([
          ["jarvis","JARVIS"],
          ["agents","Agents"],
          ["projects","Projects"],
          ["tasks","Tasks"],
          ["approvals","Approvals"],
          ["history","History"],
        ] as const).map(([id,label])=><button key={id} className={mobileView===id?styles.mobileNavActive:""} onClick={()=>setMobileView(id)}>{label}</button>)}
      </nav>

      <div className={styles.mobileShell} data-testid="mobile-shell">
        {mobileView==="jarvis"&&<section className={styles.mobileHome} data-testid="mobile-home">
          <div className={styles.mobileBrief}>
            <div><small>FOUNDER SNAPSHOT</small><span>{snapshot.source.toUpperCase()} · BUILD {portalBuild.slice(0,8)}{snapshot.mirror?` · ${snapshot.mirror.ageSeconds}s`:""}</span></div>
            <h1>Good afternoon, Basit.</h1>
            <p>{snapshot.source==="mirror"?"Trusted mirror only. Unknown activity stays unknown.":"Preview mode for product and interaction QA."}</p>
            <div className={styles.mobilePulse}>
              <b>{tasks.filter(t=>t.state==="live").length}<small>live</small></b>
              <b>{tasks.filter(t=>t.state==="review").length}<small>review</small></b>
              <b>{tasks.filter(t=>t.state==="blocked").length}<small>blocked</small></b>
              <b>{tasks.filter(t=>t.state==="founder").length}<small>needs you</small></b>
            </div>
          </div>

          <div className={styles.mobileAgentWheel}>
            <div className={styles.mobileCore}><b>J</b><span>JARVIS</span></div>
            {agents.slice(0,6).map(agent=><button data-testid={`mobile-agent-${agent.id}`} title={agent.name} key={agent.id} onClick={()=>setSelectedAgentId(agent.id)} className={styles[agent.state]}>
              <b>{agent.short}</b><span>{agent.name}</span><small>{stateLabel[agent.state]}</small>
            </button>)}
          </div>

          <section className={styles.mobileNeeds}>
            <header><span>NEEDS YOU</span><b>{approvalItems.filter(a=>!approvalState[a.id]).length}</b></header>
            {approvalItems.slice(0,2).map(item=><article key={item.id}>
              <div><strong>{item.title}</strong><small>{item.meta}</small></div><em>{approvalState[item.id]||item.risk}</em>
              {!approvalState[item.id]&&<span className={styles.mobileReviewAction}><button onClick={()=>setMobileView("approvals")}>Review</button></span>}
            </article>)}
            {approvalItems.length>2&&<button className={styles.mobileMore} onClick={()=>setMobileView("approvals")}>View all approvals</button>}
          </section>

          <section className={styles.mobileAsk}>
            <header>ASK JARVIS</header>
            <div>{jarvisAnswer}</div>
            <label><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askJarvis()} placeholder="What changed? What is blocked?"/><button onClick={askJarvis}>Ask</button></label>
          </section>
        </section>}

        {mobileView==="agents"&&<section className={styles.mobilePanel} data-testid="mobile-agents">
          <header><div><small>WORKFORCE</small><h2>Agents</h2></div><b>{agents.length}</b></header>
          <div className={styles.mobileAgentList}>{agents.map(agent=><button data-testid={`mobile-list-agent-${agent.id}`} key={agent.id} onClick={()=>setSelectedAgentId(agent.id)}>
            <b className={styles[agent.state]}>{agent.short}</b><div><strong>{agent.name}</strong><small>{agent.department} · {stateLabel[agent.state]}</small></div><em>{agent.workers.length} workers</em>
          </button>)}</div>
        </section>}

        {mobileView==="projects"&&<section className={styles.mobilePanel} data-testid="mobile-projects">
          <header><div><small>WORKLANES</small><h2>Projects</h2></div><b>{projects.length}</b></header>
          <div className={styles.mobileProjectList}>{projects.map(project=><button data-testid={`mobile-project-${project.id}`} key={project.id} onClick={()=>setSelectedProjectId(project.id)}>
            <div><strong>{project.name}</strong><small>{project.area}</small></div><em className={styles[project.state]}>{project.progressKnown===false?"UNKNOWN":`${project.progress}%`}</em>
            <span>{project.now}</span>
          </button>)}</div>
          <article className={styles.mobileProjectFocus}>
            <small>SELECTED</small><h3>{selectedProject.name}</h3><p>{selectedProject.now}</p><p><b>Next:</b> {selectedProject.next}</p>
          </article>
        </section>}

        {mobileView==="tasks"&&<section className={styles.mobilePanel} data-testid="mobile-tasks">
          <header><div><small>MISSION HORIZON</small><h2>Tasks</h2></div><b>{tasks.length}</b></header>
          <div className={styles.mobileTaskGroups}>{(["live","next","queued","review","founder","blocked","done"] as TaskState[]).map(state=>{
            const bucket=tasks.filter(task=>task.state===state);
            return <section key={state}><header><span>{taskLabel[state]}</span><b>{bucket.length}</b></header>{bucket.slice(0,5).map(task=><button key={task.id} onClick={()=>setSelectedTaskId(task.id)}><strong>{task.title}</strong><small>{task.project} · {task.agent}</small></button>)}</section>
          })}</div>
        </section>}

        {mobileView==="approvals"&&<section className={styles.mobilePanel} data-testid="mobile-approvals">
          <header><div><small>FOUNDER CONTROL</small><h2>Approvals</h2></div><b>{approvalItems.filter(a=>!approvalState[a.id]).length}</b></header>
          <div className={styles.mobileApprovalList}>{approvalItems.map(item=><article key={item.id}>
            <div><strong>{item.title}</strong><small>{item.meta}</small></div><em>{approvalState[item.id]||item.risk}</em>
            {!approvalState[item.id]&&<span><button onClick={()=>recordApprovalPreview(item.id,"APPROVED PREVIEW")}>Preview approve</button><button onClick={()=>recordApprovalPreview(item.id,"REJECTED PREVIEW")}>Preview reject</button></span>}
          </article>)}</div>
          <p className={styles.mobileSafety}>{snapshot.source==="mirror"?"Read-only mirror. Signed Founder Intents are not active.":"Preview decisions only; no consequential authority."}</p>
        </section>}

        {mobileView==="history"&&<section className={styles.mobilePanel} data-testid="mobile-history">
          <header><div><small>PROVENANCE</small><h2>History</h2></div><b>{selectedProject.history.length}</b></header>
          <article className={styles.mobileProjectFocus}><small>SELECTED PROJECT</small><h3>{selectedProject.name}</h3><p>{selectedProject.lastUpdate}</p></article>
          <div className={styles.mobileHistoryList}>{selectedProject.history.map(entry=><div key={entry}><b>{entry}</b><small>project evidence retained</small></div>)}</div>
          <article className={styles.mobileProvenance}>
            <small>READ MODEL</small><strong>{snapshot.source.toUpperCase()}</strong>
            <span>{snapshot.mirror?.contract || "demo-preview-v1"}</span>
            <span>{snapshot.mirror?.workforceSourceSha ? `workforce ${snapshot.mirror.workforceSourceSha.slice(0,12)}…` : "No live workforce provenance in demo mode"}</span>
          </article>
        </section>}
      </div>

      <div className={styles.layout}>
        <aside className={styles.projects}>
          <div className={styles.railTitle}><span>PROJECT UNIVERSE</span><b>{projects.length}</b></div>
          <p>Choose a project to see what is happening now, what comes next, and which agents own the work.</p>
          <div className={styles.projectList}>
            {projects.map(project=>{
              const active=project.id===selectedProject.id;
              return <button data-testid={`project-${project.id}`} key={project.id} className={active?styles.projectActive:""} onClick={()=>setSelectedProjectId(project.id)} onDragOver={e=>e.preventDefault()} onDrop={e=>dropAgent(e,project.id)}>
                <div><strong>{project.name}</strong><small>{project.area}</small></div>
                <span className={styles[project.state]}>{project.progressKnown===false?"—":`${project.progress}%`}</span>
                <em>{project.agentIds.length} agents</em>
                <div className={styles.projectProgress}><i style={{width:project.progressKnown===false?"0%":`${project.progress}%`}}/></div>
                <div className={styles.projectAgents}>
                  {project.agentIds.slice(0,5).map(id=><b key={id}>{agents.find(a=>a.id===id)?.short || "?"}</b>)}
                  {project.agentIds.length>5&&<b>+{project.agentIds.length-5}</b>}
                </div>
              </button>
            })}
          </div>
          <section className={styles.projectFocus} data-testid="selected-project-summary">
            <small>SELECTED PROJECT</small><h2>{selectedProject.name}</h2>
            <p>{selectedProject.now}</p>
            <div><span>{selectedProject.agentIds.length} assigned</span><span>{selectedProject.blocked} blocked</span><span>{projectTasks.length} tasks</span></div>
          </section>
        </aside>

        <section className={styles.center}>
          <div className={styles.sceneHeader}>
            <div><small>COMPANY VIEW · {readModelStatus.toUpperCase()}</small><h1>Agent Constellation</h1><p>{readModelStatus==="mirror"?"Sanitized trusted mirror. Drag an agent onto a project to request assistance.":"Preview data only. Drag an agent onto a project to rehearse bounded assistance."}</p></div>
            <div className={styles.companyStats}><b>{snapshot.source==="mirror"?"—":agents.filter(a=>a.state==="running").length}<small>{snapshot.source==="mirror"?"activity":"running"}</small></b><b>{tasks.filter(t=>t.state==="live").length}<small>live tasks</small></b><b>{tasks.filter(t=>t.state==="founder").length}<small>needs you</small></b></div>
            <div className={styles.truthStrip} data-testid="founder-truth-strip">
              <article><small>DATA</small><strong>{snapshot.source==="mirror"?"TRUSTED MIRROR":"PREVIEW"}</strong><span>{readFreshness}</span></article>
              <article><small>REVIEW QUEUE</small><strong>{reviewQueueCount}</strong><span>independent review gates</span></article>
              <article><small>CI BLOCKERS</small><strong>{ciInfrastructureBlockers}</strong><span>infrastructure, not product verdicts</span></article>
              <article><small>CONTROL</small><strong>GATED</strong><span>read-only · MFA staged</span></article>
            </div>
          </div>

          <div className={styles.scene} data-testid="agent-scene">
            <div className={styles.orbitA}/><div className={styles.orbitB}/><div className={styles.orbitC}/>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{agents.map(agent=><line key={agent.id} data-state={agent.state} data-assigned={assigned.has(agent.id) ? "true" : "false"} className={assigned.has(agent.id)?styles.beamActive:styles.beam} x1="50" y1="50" x2={agent.x} y2={agent.y}/>)}</svg>
            <button className={styles.core} onClick={()=>setSelectedAgentId(null)}><span>J</span><strong>JARVIS</strong><small>COMPANY BRAIN</small><em>{selectedProject.name}</em></button>
            {agents.map(agent=>{
              const related=assigned.has(agent.id);
              return <button data-testid={`agent-${agent.id}`} data-assigned={related ? "true" : "false"} draggable onDragStart={e=>startDrag(e,agent.id)} onClick={()=>setSelectedAgentId(agent.id)} key={agent.id} className={[styles.agent,styles[agent.state],related?styles.related:styles.unrelated].join(" ")} style={{left:`${agent.x}%`,top:`${agent.y}%`}}>
                <span>{agent.short}</span><div><strong>{agent.name}</strong><small>{agent.department} · {stateLabel[agent.state]}</small></div><i>{agent.load}%</i>
                <span className={styles.workerSatellites} aria-label={`${agent.workers.length} workers`}>
                  {agent.workers.slice(0,3).map((worker,index)=><u key={worker.name} style={{transform:`rotate(${index*120}deg) translateX(27px)`}} title={worker.name}/>)}
                </span>
              </button>
            })}
            <div className={styles.sceneLegend}><span><i className={styles.runningDot}/>working</span><span><i className={styles.reviewDot}/>review</span><span><i className={styles.trainingDot}/>learning</span><span>moving beam = active assigned work</span></div>
          </div>

          <section className={styles.projectWorklane} data-testid="project-worklane">
            <div className={styles.worklaneHead}>
              <div><small>PROJECT WORKLANE</small><strong>{selectedProject.name}</strong><span>{selectedProject.lastUpdate}</span></div>
              <div className={styles.worklaneHealth}><b>{selectedProject.progressKnown===false?"—":`${selectedProject.progress}%`}</b><span className={styles[selectedProject.state]}>{selectedProject.state.replace("_"," ")}</span></div>
            </div>
            <div className={styles.worklaneGrid}>
              <article><small>OBJECTIVE</small><p>{selectedProject.objective}</p></article>
              <article><small>NOW</small><p>{selectedProject.now}</p></article>
              <article><small>NEXT</small><p>{selectedProject.next}</p></article>
            </div>
            <div className={styles.squadRow}>
              <small>SQUAD</small>
              <div>{selectedProject.assignments.map(assignment=>{
                const agent=agents.find(a=>a.id===assignment.agentId);
                return <button key={assignment.agentId} onClick={()=>setSelectedAgentId(assignment.agentId)}><b>{agent?.short || "?"}</b><span>{agent?.name || assignment.agentId}</span><em>{assignment.role}</em></button>
              })}</div>
            </div>
            <div className={styles.projectTaskStrip}>
              {(["live","next","queued","review","founder","blocked","done"] as TaskState[]).map(state=>{
                const bucket=projectTasks.filter(t=>t.state===state);
                return <button key={state} disabled={!bucket.length} onClick={()=>bucket[0]&&setSelectedTaskId(bucket[0].id)}><span>{taskLabel[state]}</span><b>{bucket.length}</b>{bucket[0]&&<small>{bucket[0].title}</small>}</button>
              })}
            </div>
          </section>

          <div className={styles.taskHorizon} data-testid="task-horizon">
            {(["live","next","queued","review","founder","blocked","done"] as TaskState[]).map(state=><div key={state}><header>{taskLabel[state]} <b>{tasks.filter(t=>t.state===state).length}</b></header>{tasks.filter(t=>t.state===state).slice(0,2).map(task=><button key={task.id} onClick={()=>setSelectedTaskId(task.id)}><strong>{task.title}</strong><small>{task.project} · {task.agent}</small></button>)}</div>)}
          </div>
        </section>

        <aside className={styles.founderRail}>
          <section className={styles.brief}>
            <div><small>FOUNDER BRIEF</small><span>{snapshot.source.toUpperCase()} · BUILD {portalBuild.slice(0,8)}{snapshot.mirror?` · ${snapshot.mirror.ageSeconds}s old`:""}</span></div>
            <h2>Good afternoon, Basit.</h2>
            <p>{snapshot.source==="mirror"?"This view is derived from the sanitized Trusted Control Plane snapshot. Unexposed activity is shown as unknown instead of invented.":"This is preview data for interaction and visual QA; it is not installed/runtime truth."}</p>
            <div className={styles.briefStats}><b>4<small>finish gates</small></b><b>{snapshot.revenue.qualifiedProspects}<small>prospects</small></b><b>{snapshot.revenue.outboundHeld ? 0 : snapshot.revenue.outreachSent}<small>outbound active</small></b></div>
          </section>

          <section className={styles.approvals}>
            <header data-testid="approvals-title"><span>NEEDS YOUR APPROVAL <i>PREVIEW ONLY</i></span><b>{approvalItems.filter(a=>!approvalState[a.id]).length}</b></header>
            {approvalItems.map(item=><div key={item.id} className={approvalState[item.id]?styles.decided:""}>
              <div><strong>{item.title}</strong><small>{item.meta}</small></div><em>{approvalState[item.id]||item.risk}</em>
              {!approvalState[item.id]&&<span><button onClick={()=>recordApprovalPreview(item.id,"APPROVED PREVIEW")}>Preview approve</button><button onClick={()=>recordApprovalPreview(item.id,"REJECTED PREVIEW")}>Preview reject</button></span>}
            </div>)}
            <p>{snapshot.source==="mirror"?"Read-only mirror. Buttons do not record a decision until signed Founder Intents are activated.":"Preview only. Real buttons will create signed, expiring Founder Intents—never direct shell commands."}</p>
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
        <h3>Project roles</h3>{projects.filter(p=>p.assignments.some(a=>a.agentId===selectedAgent.id)).map(project=>{
          const role=project.assignments.find(a=>a.agentId===selectedAgent.id)?.role;
          return <div className={styles.historyRow} key={project.id}><b>{project.name}</b><span>{role}</span><small>{project.now}</small></div>
        })}
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

      <footer className={styles.footer}><span data-testid="read-model-status">PRIVATE FOUNDER PORTAL · {readModelStatus.toUpperCase()} READ MODEL{snapshot.mirror?` · ${snapshot.mirror.ageSeconds}s OLD`:""}</span><span data-testid="portal-build">BUILD {portalBuild.slice(0,12)} · {portalEnvironment.toUpperCase()} · 5S REFRESH</span><span>REMOTE CONTROLS GATED · MFA STAGED</span></footer>
    </main>
  );
}
