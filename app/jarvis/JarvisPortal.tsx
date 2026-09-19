"use client";

import { useMemo, useState } from "react";
import styles from "./jarvis.module.css";

type State = "live" | "ready" | "gated" | "active";
type Node = { id:string; label:string; kind:string; state:State; detail:string; next:string; x:number; y:number };

const nodes: Node[] = [
  { id:"bridge", label:"Trusted Bridge", kind:"CONTROL PLANE", state:"ready", detail:"Engineering green. Exact-head independent review is the current gate.", next:"Independent review -> governed install", x:16, y:18 },
  { id:"reviewer", label:"AI Reviewer", kind:"GOVERNANCE", state:"ready", detail:"Bounded reviewer is green and waiting behind the Trusted Bridge.", next:"Install through Trusted Bridge", x:73, y:17 },
  { id:"runtime", label:"24/7 Runtime", kind:"COMPANY RUNTIME", state:"gated", detail:"Event-driven continuation is certified but intentionally not active.", next:"Trusted review -> acceptance", x:82, y:58 },
  { id:"autonomy", label:"Autonomy A", kind:"MISSION ENGINE", state:"gated", detail:"The single idempotent runtime identity canary is prepared.", next:"Run after live predecessor proof", x:62, y:78 },
  { id:"revenue", label:"Revenue", kind:"BUSINESS LANE", state:"active", detail:"Revenue work continues independently instead of waiting for autonomy.", next:"Review -> approved conversion work", x:24, y:77 },
  { id:"projects", label:"Projects", kind:"PORTFOLIO", state:"live", detail:"Projects remain isolated, resumable and independently accountable.", next:"Keep parallel lanes moving", x:8, y:50 }
];

const labels: Record<State,string> = { live:"LIVE", ready:"READY", gated:"GATED", active:"ACTIVE" };

export default function JarvisPortal() {
  const [selectedId,setSelectedId] = useState("bridge");
  const selected = useMemo(() => nodes.find(n => n.id === selectedId) || nodes[0], [selectedId]);

  return (
    <main className={styles.portal}>
      <div className={styles.grid} />
      <header className={styles.topbar}>
        <div className={styles.identity}><span className={styles.logo}>///</span><div><small>MARKETECH DIGITAL</small><strong>JARVIS Founder Portal</strong></div></div>
        <span className={styles.preview}>PRIVATE PORTAL PREVIEW · NO LIVE DATA</span>
        <div className={styles.health}><i /> CONTROLLED</div>
      </header>

      <div className={styles.frame}>
        <nav className={styles.nav}>
          {["COMMAND","PROJECTS","AGENTS","REVENUE","EVIDENCE"].map((item,i)=><button className={i===0?styles.active:""} key={item}>{item.slice(0,2)}<small>{item}</small></button>)}
          <span />
          <button>SE<small>SETTINGS</small></button>
        </nav>

        <section className={styles.command}>
          <div className={styles.head}>
            <div><small>COMPANY DIGITAL TWIN</small><h1>Your company, as a living system.</h1></div>
            <div className={styles.metrics}><b>4<span>finish gates</span></b><b>6<span>active lanes</span></b><b>0<span>unsafe actions</span></b></div>
          </div>

          <div className={styles.stage}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{nodes.map(n=><line key={n.id} x1="50" y1="49" x2={n.x} y2={n.y}/>)}</svg>
            <button className={styles.core} onClick={()=>setSelectedId("bridge")}><span/><b>JARVIS</b><small>COMPANY OS</small></button>
            {nodes.map(n=>(
              <button
                key={n.id}
                onClick={()=>setSelectedId(n.id)}
                className={[styles.node,styles[n.state],selectedId===n.id?styles.selected:""].join(" ")}
                style={{left:String(n.x)+"%",top:String(n.y)+"%"}}
              >
                <i/><small>{n.kind}</small><b>{n.label}</b><em>{labels[n.state]}</em>
              </button>
            ))}
            <div className={styles.legend}><span>green running</span><span>amber ready</span><span>red gated</span></div>
          </div>

          <div className={styles.timeline}>
            <div><small>NOW</small><b>Bridge review</b></div><i/>
            <div><small>NEXT</small><b>Reviewer install</b></div><i/>
            <div><small>THEN</small><b>24/7 runtime</b></div><i/>
            <div><small>PROVE</small><b>Autonomy canary</b></div>
          </div>
        </section>

        <aside className={styles.side}>
          <section className={styles.detail}>
            <div><small>SELECTED SYSTEM</small><span className={styles[ selected.state ]}>{labels[selected.state]}</span></div>
            <h2>{selected.label}</h2><p>{selected.detail}</p>
            <label>NEXT CONTROLLED MOVE<strong>{selected.next}</strong></label>
            <button>Open history -></button>
          </section>

          <section className={styles.panel}>
            <header>JARVIS FINISH LINE <b>4 gates</b></header>
            {[["01","Trusted Bridge","REVIEW"],["02","Independent Reviewer","WAITING"],["03","24/7 Runtime","WAITING"],["04","Autonomy Phase A","WAITING"]].map(row=><div className={styles.gate} key={row[0]}><span>{row[0]}</span><b>{row[1]}</b><em>{row[2]}</em></div>)}
          </section>

          <section className={styles.panel}>
            <header>LATEST MOVEMENT <b>live feed</b></header>
            {[
              ["Cockpit v6","Fixed workspace architecture certified."],
              ["Capability Lab","Isolation repair landed; runner allocation blocked."],
              ["Autonomy chain","Engineering heads remain frozen and green."]
            ].map(x=><div className={styles.event} key={x[0]}><i/><div><b>{x[0]}</b><small>{x[1]}</small></div></div>)}
          </section>
        </aside>
      </div>

      <footer className={styles.footer}><span>Founder view · read-only preview</span><span>Remote authority OFF</span><span>Concept A · Digital Twin Mission Control</span></footer>
    </main>
  );
}
