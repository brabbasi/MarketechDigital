"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Offer = {
  accent: "o" | "b";
  icon: string;
  title: string;
  sub: string;
  hook: string;
  overview: string;
  deliverables: string[];
  outcomes: string[];
  bestFor: string[];
  cta: string;
  visual: string;
  mini: string;
};

type ProcessStep = Offer;

type DetailState =
  | { type: "offer"; index: number }
  | { type: "process"; index: number }
  | null;

const offers: Offer[] = [
  {
    accent: "o",
    icon: "✦",
    title: "AI Strategy Sprint",
    sub: "Know exactly where AI should create leverage in your business in the next 30–90 days.",
    hook: "Best for founders and teams that need direction before they invest deeper.",
    overview:
      "A focused strategy engagement that helps you identify the highest-value AI opportunities, prioritize the right moves, and leave with a clearer roadmap instead of vague possibilities.",
    deliverables: [
      "AI opportunity audit",
      "Priority roadmap for the next 30–90 days",
      "Use-case shortlist with practical next steps"
    ],
    outcomes: [
      "Stop guessing where AI fits",
      "Focus on realistic high-value wins",
      "Move forward with a clearer plan and less risk"
    ],
    bestFor: [
      "Founders and executives exploring AI",
      "Businesses with scattered AI ideas",
      "Teams that need strategic clarity before implementation"
    ],
    cta: "If you need clarity before buildout, this is the fastest way to get it.",
    visual:
      '<svg viewBox="0 0 600 240"><circle cx="110" cy="120" r="22" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="300" cy="120" r="22" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="490" cy="120" r="22" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M132 120H278M322 120H468" stroke="rgba(255,255,255,.28)" stroke-width="3"><animate attributeName="stroke-dasharray" values="2 20;20 0;2 20" dur="2.8s" repeatCount="indefinite"/></path><circle cx="300" cy="120" r="70" fill="none" stroke="rgba(89,175,255,.18)"><animate attributeName="r" values="62;72;62" dur="4s" repeatCount="indefinite"/></circle></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><circle cx="60" cy="43" r="12" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="160" cy="43" r="12" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="260" cy="43" r="12" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M72 43H148M172 43H248" stroke="rgba(255,255,255,.28)" stroke-width="3"><animate attributeName="stroke-dasharray" values="2 18;18 0;2 18" dur="2.8s" repeatCount="indefinite"/></path></svg>'
  },
  {
    accent: "b",
    icon: "⬢",
    title: "Workflow Automation Build",
    sub: "Automate the repetitive steps slowing your team down and clean up execution.",
    hook: "Best for operations-heavy businesses that need speed, consistency, and less manual drag.",
    overview:
      "A delivery-focused build that maps your workflow, automates repetitive actions, and creates a cleaner operating sequence your team can actually use every week.",
    deliverables: [
      "Workflow mapping and friction review",
      "Automation build for repetitive tasks",
      "Simple handoff and operational guidance"
    ],
    outcomes: [
      "Save time on repetitive work",
      "Reduce handoff mistakes and operational friction",
      "Improve speed and consistency across execution"
    ],
    bestFor: [
      "Service businesses with manual processes",
      "Growing teams needing operational efficiency",
      "Founders tired of bottlenecks and repeat admin work"
    ],
    cta: "If your team keeps repeating the same steps manually, this is where the biggest time savings show up.",
    visual:
      '<svg viewBox="0 0 600 240"><circle cx="90" cy="120" r="18" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="210" cy="68" r="18" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="210" cy="172" r="18" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="350" cy="120" r="18" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="500" cy="120" r="18" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M108 120L192 72M108 120L192 168M228 68L332 120M228 172L332 120M368 120H482" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none"><animate attributeName="stroke-dasharray" values="0 260;260 0;0 260" dur="3.8s" repeatCount="indefinite"/></path><circle cx="350" cy="120" r="44" fill="none" stroke="rgba(89,175,255,.16)"><animate attributeName="r" values="36;46;36" dur="3.2s" repeatCount="indefinite"/></circle></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><circle cx="44" cy="43" r="9" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="112" cy="20" r="9" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="112" cy="66" r="9" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="198" cy="43" r="9" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="278" cy="43" r="9" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M53 43L103 22M53 43L103 64M121 20L189 43M121 66L189 43M207 43H269" stroke="rgba(255,255,255,.3)" stroke-width="2.5" fill="none"><animate attributeName="stroke-dasharray" values="0 180;180 0;0 180" dur="3.4s" repeatCount="indefinite"/></path></svg>'
  },
  {
    accent: "o",
    icon: "◉",
    title: "Decision Intelligence Layer",
    sub: "Give leadership a cleaner view of what matters so faster decisions become possible.",
    hook: "Best for teams drowning in data but still lacking clarity on what to act on.",
    overview:
      "A visibility and intelligence layer that helps leadership and operating teams see what matters, spot priorities, and act with more confidence instead of reacting to scattered dashboards.",
    deliverables: [
      "Decision dashboard logic",
      "Priority signals and focus views",
      "Executive visibility layer"
    ],
    outcomes: [
      "See what matters faster",
      "Reduce reporting overload",
      "Create stronger decision confidence"
    ],
    bestFor: [
      "Leadership teams needing clearer visibility",
      "Businesses with dashboard fatigue",
      "Operations that need better prioritization"
    ],
    cta: "If your team has data but still struggles to decide what matters most, this offer closes that gap.",
    visual:
      '<svg viewBox="0 0 600 240"><circle cx="300" cy="120" r="84" fill="none" stroke="rgba(89,175,255,.22)" stroke-width="2"/><circle cx="300" cy="120" r="48" fill="none" stroke="rgba(255,106,0,.18)" stroke-width="2"/><circle cx="300" cy="120" r="14" fill="#59afff"><animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/></circle><line x1="300" y1="36" x2="300" y2="70" stroke="rgba(255,255,255,.24)" stroke-width="2"/><line x1="300" y1="170" x2="300" y2="204" stroke="rgba(255,255,255,.24)" stroke-width="2"/><line x1="216" y1="120" x2="250" y2="120" stroke="rgba(255,255,255,.24)" stroke-width="2"/><line x1="350" y1="120" x2="384" y2="120" stroke="rgba(255,255,255,.24)" stroke-width="2"/><circle cx="386" cy="76" r="6" fill="#ff6a00"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/></circle></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><circle cx="160" cy="43" r="26" fill="none" stroke="rgba(89,175,255,.22)"/><circle cx="160" cy="43" r="10" fill="#59afff"><animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/></circle><line x1="160" y1="12" x2="160" y2="26" stroke="rgba(255,255,255,.24)" stroke-width="2"/><line x1="191" y1="43" x2="208" y2="43" stroke="rgba(255,255,255,.24)" stroke-width="2"/></svg>'
  },
  {
    accent: "b",
    icon: "⟐",
    title: "Growth Systems Stack",
    sub: "Connect strategy, systems, automation, and growth execution into one operating layer.",
    hook: "Best for businesses that want a bigger, more connected operating system instead of isolated fixes.",
    overview:
      "A broader systems engagement for businesses that want their AI, automation, digital execution, and growth processes to work together as one coherent engine.",
    deliverables: [
      "System architecture and integration map",
      "Growth flow and execution stack",
      "Connected operating model for scale"
    ],
    outcomes: [
      "Reduce disconnected tooling",
      "Create a clearer growth engine",
      "Build a system that can scale with the business"
    ],
    bestFor: [
      "Businesses with multiple moving parts",
      "Founders wanting one connected operating layer",
      "Teams outgrowing patchwork tools and workflows"
    ],
    cta: "If the bigger issue is fragmentation across tools, workflows, and growth execution, this is the right fit.",
    visual:
      '<svg viewBox="0 0 600 240"><rect x="130" y="56" width="340" height="30" rx="12" fill="rgba(89,175,255,.1)" stroke="#59afff"/><rect x="158" y="104" width="284" height="26" rx="12" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="188" y="146" width="224" height="22" rx="12" fill="rgba(255,106,0,.08)" stroke="#ff6a00"/><path d="M300 32V56M300 86V104M300 130V146" stroke="rgba(255,255,255,.26)" stroke-width="2.4"><animate attributeName="stroke-dasharray" values="0 60;60 0;0 60" dur="3s" repeatCount="indefinite"/></path></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><rect x="60" y="14" width="200" height="14" rx="7" fill="rgba(89,175,255,.1)" stroke="#59afff"/><rect x="78" y="36" width="164" height="12" rx="6" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="96" y="56" width="128" height="10" rx="5" fill="rgba(255,106,0,.08)" stroke="#ff6a00"/></svg>'
  }
];

const processSteps: ProcessStep[] = [
  {
    accent: "o",
    icon: "①",
    title: "Discover",
    sub: "Understand the signal and isolate what matters.",
    hook: "The goal here is diagnosis before action.",
    overview:
      "This phase is about understanding the real bottlenecks, identifying the most important signal, and making sure the project solves the right problem first.",
    deliverables: [
      "Review the business goal and friction points",
      "Identify the biggest clarity and execution gaps",
      "Define the most valuable focus area"
    ],
    outcomes: ["Smarter scope", "Clearer priorities", "Less wasted effort"],
    bestFor: ["Projects that need direction before buildout"],
    cta: "This phase prevents building the wrong thing beautifully.",
    visual:
      '<svg viewBox="0 0 600 240"><g opacity=".14"><line x1="40" y1="40" x2="560" y2="40" stroke="#fff"/><line x1="40" y1="68" x2="560" y2="68" stroke="#fff"/><line x1="40" y1="96" x2="560" y2="96" stroke="#fff"/><line x1="40" y1="124" x2="560" y2="124" stroke="#fff"/><line x1="40" y1="152" x2="560" y2="152" stroke="#fff"/><line x1="40" y1="180" x2="560" y2="180" stroke="#fff"/></g><circle cx="190" cy="118" r="52" fill="none" stroke="rgba(89,175,255,.24)"/><circle cx="190" cy="118" r="18" fill="rgba(89,175,255,.12)" stroke="#59afff"/><path d="M226 152L286 196" stroke="#ff6a00" stroke-width="4"/><circle cx="306" cy="210" r="22" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><circle cx="100" cy="40" r="18" fill="none" stroke="rgba(89,175,255,.24)"/><circle cx="100" cy="40" r="7" fill="rgba(89,175,255,.12)" stroke="#59afff"/><path d="M112 52L134 68" stroke="#ff6a00" stroke-width="3"/><circle cx="144" cy="74" r="8" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/></svg>'
  },
  {
    accent: "b",
    icon: "②",
    title: "Design",
    sub: "Engineer the structure that supports the goal.",
    hook: "This is where the system logic gets shaped.",
    overview:
      "Once the signal is clear, the next step is designing the workflow, information architecture, and interaction logic that supports real execution.",
    deliverables: [
      "Map the operating logic and user flow",
      "Design information structure and clarity layers",
      "Shape the system around real decisions and actions"
    ],
    outcomes: ["Cleaner architecture", "Better information flow", "Stronger usability"],
    bestFor: ["Projects that need structure before implementation"],
    cta: "This phase makes the future build more precise and more useful.",
    visual:
      '<svg viewBox="0 0 600 240"><rect x="94" y="52" width="132" height="52" rx="16" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="374" y="52" width="132" height="52" rx="16" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="234" y="136" width="132" height="52" rx="16" fill="rgba(255,106,0,.08)" stroke="#ff6a00"/><path d="M226 78H374M300 104V136" stroke="rgba(255,255,255,.3)" stroke-width="3"><animate attributeName="stroke-dasharray" values="0 120;120 0;0 120" dur="3s" repeatCount="indefinite"/></path></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><rect x="42" y="18" width="70" height="24" rx="10" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="208" y="18" width="70" height="24" rx="10" fill="rgba(89,175,255,.08)" stroke="#59afff"/><rect x="125" y="50" width="70" height="20" rx="10" fill="rgba(255,106,0,.08)" stroke="#ff6a00"/><path d="M112 30H208M160 42V50" stroke="rgba(255,255,255,.3)" stroke-width="2.6"><animate attributeName="stroke-dasharray" values="0 90;90 0;0 90" dur="2.8s" repeatCount="indefinite"/></path></svg>'
  },
  {
    accent: "o",
    icon: "③",
    title: "Build",
    sub: "Implement the system with cleaner motion and logic.",
    hook: "This is where the concept becomes something usable.",
    overview:
      "The build phase turns the approved logic into a working layer: automation, interfaces, intelligence views, and the supporting system behind them.",
    deliverables: [
      "Implement the approved workflow or system",
      "Refine interactions for speed and clarity",
      "Test the working layer for practical use"
    ],
    outcomes: ["Usable execution layer", "Cleaner interfaces", "Measurable operational improvement"],
    bestFor: ["Projects ready to move from strategy into execution"],
    cta: "This phase is where the business starts feeling the change.",
    visual:
      '<svg viewBox="0 0 600 240"><circle cx="110" cy="120" r="20" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><rect x="240" y="96" width="120" height="48" rx="16" fill="rgba(89,175,255,.08)" stroke="#59afff"/><circle cx="490" cy="120" r="20" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M130 120H240M360 120H470" stroke="rgba(255,255,255,.3)" stroke-width="3"><animate attributeName="stroke-dasharray" values="0 140;140 0;0 140" dur="2.4s" repeatCount="indefinite"/></path><circle cx="300" cy="120" r="56" fill="none" stroke="rgba(89,175,255,.16)"><animate attributeName="r" values="48;58;48" dur="3s" repeatCount="indefinite"/></circle></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><circle cx="46" cy="43" r="9" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><rect x="114" y="30" width="90" height="26" rx="10" fill="rgba(89,175,255,.08)" stroke="#59afff"/><circle cx="274" cy="43" r="9" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><path d="M55 43H114M204 43H265" stroke="rgba(255,255,255,.3)" stroke-width="2.8"><animate attributeName="stroke-dasharray" values="0 100;100 0;0 100" dur="2.4s" repeatCount="indefinite"/></path></svg>'
  },
  {
    accent: "b",
    icon: "④",
    title: "Evolve",
    sub: "Improve the system as the business grows.",
    hook: "This keeps the system useful after launch.",
    overview:
      "After launch, the work continues through refinement, optimization, and expansion so the operating layer stays useful as the business changes.",
    deliverables: [
      "Review what is working in real use",
      "Refine weak points and remove friction",
      "Scale or expand the system when needed"
    ],
    outcomes: [
      "More long-term value",
      "Less friction over time",
      "A system that can grow with the business"
    ],
    bestFor: ["Businesses that want improvement after launch, not just delivery"],
    cta: "This phase keeps the work from becoming static or outdated.",
    visual:
      '<svg viewBox="0 0 600 240"><path d="M50 184C122 170 150 188 210 160C268 132 302 82 362 88C412 94 452 126 550 60" stroke="#59afff" stroke-width="3.5" fill="none"><animate attributeName="stroke-dasharray" values="0 640;640 0;0 640" dur="6s" repeatCount="indefinite"/></path><path d="M50 202H552" stroke="rgba(255,255,255,.08)"/><circle cx="362" cy="88" r="6" fill="#ff6a00"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/></circle></svg>',
    mini:
      '<svg viewBox="0 0 320 88"><path d="M20 64C60 56 80 68 114 52C144 38 164 18 198 22C228 26 244 40 300 8" stroke="#59afff" stroke-width="3" fill="none"><animate attributeName="stroke-dasharray" values="0 360;360 0;0 360" dur="5s" repeatCount="indefinite"/></path><circle cx="198" cy="22" r="5" fill="#ff6a00"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle></svg>'
  }
];

const faq = [
  {
    q: "What does Marketech Digital actually help with?",
    a: "Marketech Digital helps businesses with AI strategy, workflow automation, decision intelligence, and growth-ready systems that reduce friction and improve clarity."
  },
  {
    q: "Who is this for?",
    a: "This is for founders, operators, and leadership teams that need cleaner systems, less operational drag, and better visibility into what matters."
  },
  {
    q: "What happens after I reach out?",
    a: "You start a conversation, explain the business problem or goal, and then the right offer or build path can be shaped around your needs."
  },
  {
    q: "Can this become a backend-driven live site later?",
    a: "Yes. The current version is structured so public metrics, contact handling, and content management can be wired into a real backend later."
  }
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="label">
      <span className="dot" />
      {children}
    </div>
  );
}

function usePointerGlow() {
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);
}

function useBackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points = Array.from({ length: 68 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00042,
      vy: (Math.random() - 0.5) * 0.00042,
      r: Math.random() * 1.8 + 0.6
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    let raf = 0;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const x = p.x * window.innerWidth;
        const y = p.y * window.innerHeight;
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,.28)";
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = (a.x - b.x) * window.innerWidth;
          const dy = (a.y - b.y) * window.innerHeight;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(89,175,255,${(1 - d / 110) * 0.07})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * window.innerWidth, a.y * window.innerHeight);
            ctx.lineTo(b.x * window.innerWidth, b.y * window.innerHeight);
            ctx.stroke();
          }
        }
      }
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return canvasRef;
}

function useHeroCanvas(mode: string) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const render = (timeRaw: number) => {
      const time = timeRaw * 0.001;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
          const x = 30 + j * 34 + Math.sin(time + i + j);
          const y = 34 + i * 46 + Math.cos(time * 1.2 + j);
          ctx.fillStyle = "rgba(255,255,255,.06)";
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const wave = (color: string, offset: number, width: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        for (let x = 14; x < w - 14; x++) {
          const y =
            h * 0.55 +
            Math.sin((x + offset) / 54 + time * 1.6) * 20 +
            Math.cos((x + offset) / 122 + time) * 15;
          if (x === 14) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      const nodes = (arr: [number, number, string][]) => {
        arr.forEach(([x, y, color], i) => {
          const r = 4 + Math.sin(time * 2 + i) * 1.6;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 20);
          g.addColorStop(0, color);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      const flowMap = () => {
        const pts: [number, number][] = [
          [64, h * 0.56],
          [144, h * 0.34],
          [144, h * 0.74],
          [246, h * 0.54],
          [350, h * 0.54],
          [468, h * 0.42]
        ];
        ctx.strokeStyle = "rgba(255,255,255,.28)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(...pts[0]);
        ctx.lineTo(...pts[1]);
        ctx.moveTo(...pts[0]);
        ctx.lineTo(...pts[2]);
        ctx.lineTo(...pts[3]);
        ctx.lineTo(...pts[4]);
        ctx.lineTo(...pts[5]);
        ctx.stroke();
        pts.forEach((p, i) => {
          const color = i === 3 ? "#59afff" : "#ff6a00";
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 8, 0, Math.PI * 2);
          ctx.fill();
        });
        const prog = (Math.sin(time * 1.3) + 1) / 2;
        ctx.strokeStyle = "#59afff";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(64, h * 0.56);
        ctx.lineTo(64 + prog * 300, h * 0.56 + Math.sin(prog * 5) * 4);
        ctx.stroke();
      };

      const radar = () => {
        const cx = w * 0.56;
        const cy = h * 0.52;
        ctx.strokeStyle = "rgba(89,175,255,.18)";
        [88, 54, 24].forEach((r) => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        const ang = time * 0.8;
        ctx.strokeStyle = "rgba(89,175,255,.18)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(ang) * 88, cy + Math.sin(ang) * 88);
        ctx.stroke();
        [
          [cx + 66, cy - 30, "#ff6a00"],
          [cx - 56, cy + 30, "#59afff"],
          [cx + 18, cy - 74, "#ff6a00"]
        ].forEach(([x, y, color], i) => {
          ctx.fillStyle = String(color);
          ctx.beginPath();
          ctx.arc(Number(x), Number(y), 5 + Math.sin(time * 2 + i), 0, Math.PI * 2);
          ctx.fill();
        });
      };

      if (mode === "signal") {
        wave("#59afff", 0, 3);
        wave("#ff6a00", 28, 2.2);
        nodes([
          [w * 0.58, h * 0.34, "#ff6a00"],
          [w * 0.76, h * 0.58, "#59afff"],
          [w * 0.32, h * 0.66, "#59afff"]
        ]);
      } else if (mode === "flow") {
        flowMap();
      } else {
        radar();
      }
      raf = window.requestAnimationFrame(render);
    };
    raf = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mode]);
  return canvasRef;
}

function Card({ item, index, type, onOpen }: { item: Offer; index: number; type: "offer" | "process" ; onOpen: (type: "offer" | "process", index: number) => void }) {
  return (
    <article
      className={`${type === "offer" ? "offer-card" : "process-card"} ${item.accent === "o" ? "accent-o" : "accent-b"}`}
      onClick={() => onOpen(type, index)}
      onPointerMove={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--px", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        target.style.setProperty("--py", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
    >
      <div className="card-top">
        <div className="card-icon">{item.icon}</div>
        <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.32)" }}>↗</div>
      </div>
      <div className="card-title">{item.title}</div>
      <p className="card-sub">{item.sub}</p>
      <div className="card-hook">{item.hook}</div>
      <div className="mini-schematic" dangerouslySetInnerHTML={{ __html: item.mini }} />
      <div className="lower-band">
        <div className="micro-chip">Outcome-focused</div>
        <div className="micro-chip">Tap for details</div>
      </div>
      <div className="card-meta">Open detail popup</div>
    </article>
  );
}

function DetailModal({
  state,
  onClose,
  onOpenContact
}: {
  state: DetailState;
  onClose: () => void;
  onOpenContact: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "deliverables" | "outcomes" | "bestfor">("overview");
  useEffect(() => {
    setTab("overview");
  }, [state]);

  if (!state) return null;
  const item = state.type === "offer" ? offers[state.index] : processSteps[state.index];
  const deliverableTitle = state.type === "offer" ? "Deliverable" : "Step";

  return (
    <div className="modal-wrap show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close details">
          ×
        </button>
        <div className="modal-inner">
          <div className="eyebrow">
            <span className="dot" />
            {state.type === "offer" ? "Offer details" : "Process details"}
          </div>
          <h3>{item.title}</h3>
          <p>{item.overview}</p>
          <div className="metric-row">
            <div className="metric-box">
              <strong>{state.type === "offer" ? "Built For" : "Phase Goal"}</strong>
              <span>{item.bestFor[0]}</span>
            </div>
            <div className="metric-box">
              <strong>{state.type === "offer" ? "Main Outcome" : "Primary Gain"}</strong>
              <span>{item.outcomes[0]}</span>
            </div>
            <div className="metric-box">
              <strong>{state.type === "offer" ? "Why Buy It" : "Why It Matters"}</strong>
              <span>{item.cta}</span>
            </div>
          </div>
          <div className="visual-wrap" dangerouslySetInnerHTML={{ __html: item.visual }} />
          <div className="tab-strip">
            <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>Overview</button>
            <button className={tab === "deliverables" ? "active" : ""} onClick={() => setTab("deliverables")}>
              {state.type === "offer" ? "Deliverables" : "What Happens"}
            </button>
            <button className={tab === "outcomes" ? "active" : ""} onClick={() => setTab("outcomes")}>Outcomes</button>
            <button className={tab === "bestfor" ? "active" : ""} onClick={() => setTab("bestfor")}>Best For</button>
          </div>
          <div className="tab-panel">
            {tab === "overview" && (
              <div className="value-list">
                <div className="value-item"><strong>What this is</strong>{item.overview}</div>
                <div className="value-item"><strong>What improves</strong>{item.outcomes[0]}</div>
                <div className="value-item"><strong>Fast clarity</strong>{item.cta}</div>
              </div>
            )}
            {tab === "deliverables" && (
              <div className="value-list">
                {item.deliverables.map((value, i) => (
                  <div className="value-item" key={value}><strong>{deliverableTitle} {i + 1}</strong>{value}</div>
                ))}
              </div>
            )}
            {tab === "outcomes" && (
              <div className="value-list">
                {item.outcomes.map((value, i) => (
                  <div className="value-item" key={value}><strong>Outcome {i + 1}</strong>{value}</div>
                ))}
              </div>
            )}
            {tab === "bestfor" && (
              <div className="value-list">
                <div className="value-item">
                  <strong>Best fit</strong>
                  <div className="tag-row">
                    {item.bestFor.map((value) => <span className="tag" key={value}>{value}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cta-slab">
            <div className="lead">Ready to move from interest to action?</div>
            <div className="copy">{item.cta}</div>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={onOpenContact}>Book this consultation →</button>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FounderModal({ open, onClose, onOpenContact }: { open: boolean; onClose: () => void; onOpenContact: () => void }) {
  if (!open) return null;
  return (
    <div className="modal-wrap show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close founder profile">×</button>
        <div className="modal-inner">
          <div className="founder-profile">
            <div className="founder-hero"><img src="/founder.webp" alt="Portrait of Basit Abbasi" /></div>
            <div>
              <div className="eyebrow"><span className="dot" />Founder profile</div>
              <h3>Basit Abbasi</h3>
              <p>
                Basit Abbasi is building Marketech Digital as a premium company focused on AI systems,
                workflow automation, software execution, and decision intelligence. The goal is to help
                businesses reduce complexity, improve execution, and build systems that create clarity instead of noise.
              </p>
              <div className="value-list">
                <div className="value-item"><strong>Focus</strong>AI systems strategy, workflow automation, growth-driven execution, and digital infrastructure.</div>
                <div className="value-item"><strong>Approach</strong>Understand the signal, design the right system, and build around practical business outcomes.</div>
                <div className="value-item"><strong>Positioning</strong>Premium, futuristic, high-trust, and built for serious client acquisition.</div>
              </div>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={onOpenContact}>Book a Consultation →</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ open, onClose, onSend }: { open: boolean; onClose: () => void; onSend: (name: string, email: string, message: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  if (!open) return null;
  return (
    <div className="modal-wrap show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close contact form">×</button>
        <div className="modal-inner">
          <div className="eyebrow"><span className="dot" />Consultation request</div>
          <h3>Tell me what you need.</h3>
          <p>
            This form opens an email draft to <strong>abasitabbasi99@gmail.com</strong>. Once you get your domain live,
            this can switch to your branded email and a backend contact flow.
          </p>
          <div className="form-grid">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Work email" />
          </div>
          <div className="form-grid">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Project, challenge, or goal" />
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onSend(name, email, message)}>Send request →</button>
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  usePointerGlow();
  const bgCanvasRef = useBackgroundNetwork();
  const [mode, setMode] = useState<"signal" | "flow" | "decision">("signal");
  const heroCanvasRef = useHeroCanvas(mode);
  const [detailState, setDetailState] = useState<DetailState>(null);
  const [founderOpen, setFounderOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const modes: Array<"signal" | "flow" | "decision"> = ["signal", "flow", "decision"];
    const id = setInterval(() => {
      setMode((prev) => modes[(modes.indexOf(prev) + 1) % modes.length]);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const modeMeta = useMemo(
    () => ({
      signal: {
        label: "Signal View",
        note:
          "Tap between modes to see how the business outcome changes from finding the signal to improving workflow to making faster decisions."
      },
      flow: {
        label: "Flow View",
        note: "This shows how workflow can move more cleanly when repetitive bottlenecks are reduced."
      },
      decision: {
        label: "Decision View",
        note: "This shows how teams gain clearer visibility so faster decisions become possible."
      }
    }),
    []
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const sendEmail = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent("Marketech Digital Inquiry");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:abasitabbasi99@gmail.com?subject=${subject}&body=${body}`;
    setContactOpen(false);
    showToast("Opening your email app…");
  };

  return (
    <>
      <canvas id="bgCanvas" ref={bgCanvasRef} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Marketech Digital",
                email: "abasitabbasi99@gmail.com",
                description:
                  "Marketech Digital helps businesses implement AI strategy, workflow automation, decision intelligence, and growth systems.",
                founder: { "@type": "Person", name: "Basit Abbasi" }
              },
              ...offers.map((offer) => ({
                "@type": "Service",
                serviceType: offer.title,
                provider: { "@type": "Organization", name: "Marketech Digital" },
                description: offer.overview
              })),
              {
                "@type": "FAQPage",
                mainEntity: faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a }
                }))
              }
            ]
          })
        }}
      />
      <header>
        <div className="container navbar">
          <a className="brand" href="#top">
            <div className="brand-plate"><img src="/logo.svg" alt="Marketech Digital logo" /></div>
            <div className="brand-copy"><div className="top">MARKETECH</div><div className="sub">DIGITAL</div></div>
          </a>
          <nav className="nav-links">
            <a href="#offers">Offers</a>
            <a href="#process">Process</a>
            <a href="#founder">Founder</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="btn btn-primary" onClick={() => setContactOpen(true)}>Book a Consultation →</button>
        </div>
      </header>

      <main id="top">
        <section className="container hero" aria-label="Hero section">
          <div>
            <SectionLabel>AI systems. Workflow automation. Decision clarity.</SectionLabel>
            <h1>Buy a clearer system — not more noise.</h1>
            <p>
              Marketech Digital helps businesses get specific outcomes: a sharper AI roadmap, cleaner workflow automation,
              stronger decision visibility, and a growth-ready operating system built for action. The focus is practical
              business value, not vague tech talk.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#offers">See the offers →</a>
              <button className="btn btn-secondary" onClick={() => setContactOpen(true)}>Start a conversation</button>
            </div>
            <div className="hero-pills">
              <div className="pill">AI strategy sprint</div>
              <div className="pill">workflow automation build</div>
              <div className="pill">decision intelligence layer</div>
            </div>
          </div>
          <div className="panel hero-panel" aria-label="Interactive intelligence modes">
            <div className="panel-head"><span>Intelligence modes</span><span className="live-chip"><span />active motion</span></div>
            <div className="mode-tabs">
              <button className={mode === "signal" ? "active" : ""} onClick={() => setMode("signal")}>Signal</button>
              <button className={mode === "flow" ? "active" : ""} onClick={() => setMode("flow")}>Flow</button>
              <button className={mode === "decision" ? "active" : ""} onClick={() => setMode("decision")}>Decision</button>
            </div>
            <div className="hero-screen">
              <div className="grid" />
              <canvas id="heroCanvas" ref={heroCanvasRef} />
              <div className="status-card"><div className="sm">Current mode</div><div className="lg">{modeMeta[mode].label}</div></div>
              <div className="hero-foot">
                <div className="mini-note"><strong>What it means</strong>This is a live visual demonstration of the type of system Marketech builds: signal clarity, workflow flow, and decision visibility.</div>
                <div className="mini-note"><strong>What it does</strong>{modeMeta[mode].note}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container section" id="offers" aria-label="Offers section">
          <SectionLabel>What clients actually get</SectionLabel>
          <div className="section-head">
            <h2>Offer-focused by design.</h2>
            <p>Each offer opens in a deeper animated popup with clearer conversion copy, business outcomes, deliverables, and who it is best for.</p>
          </div>
          <div className="card-grid" id="offerGrid">
            {offers.map((offer, i) => <Card key={offer.title} item={offer} index={i} type="offer" onOpen={(type, index) => setDetailState({ type, index })} />)}
          </div>
        </section>

        <section className="container section" id="process" aria-label="Process section">
          <SectionLabel>How the work happens</SectionLabel>
          <div className="section-head">
            <h2>Discover. Design. Build. Evolve.</h2>
            <p>Every phase has its own animated schematic and its own popup explaining what actually happens, what improves, and why it matters.</p>
          </div>
          <div className="card-grid" id="processGrid">
            {processSteps.map((step, i) => <Card key={step.title} item={step} index={i} type="process" onOpen={(type, index) => setDetailState({ type, index })} />)}
          </div>
        </section>

        <section className="container section" id="founder" aria-label="Founder section">
          <SectionLabel>Founder / Trust</SectionLabel>
          <div className="founder-wrap">
            <div className="portrait-card" onClick={() => setFounderOpen(true)}>
              <img src="/founder.webp" alt="Portrait of Basit Abbasi" />
              <svg className="portrait-orbits" viewBox="0 0 600 700" preserveAspectRatio="none">
                <ellipse cx="300" cy="250" rx="124" ry="206" fill="none" stroke="rgba(255,106,0,.28)" strokeWidth="2">
                  <animate attributeName="rx" values="118;132;118" dur="8s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="325" cy="250" rx="136" ry="216" fill="none" stroke="rgba(89,175,255,.24)" strokeWidth="2">
                  <animate attributeName="transform" values="rotate(0 325 250);rotate(360 325 250)" dur="16s" repeatCount="indefinite" />
                </ellipse>
              </svg>
              <div className="portrait-overlay">
                <div>
                  <div className="name">Basit Abbasi</div>
                  <div className="sub">Founder · tap to view profile and approach</div>
                </div>
                <button className="btn btn-primary btn-small">Open profile</button>
              </div>
            </div>
            <div className="founder-card">
              <div className="brand">
                <div className="brand-plate"><img src="/logo.svg" alt="Marketech Digital logo" /></div>
                <div className="brand-copy"><div className="top">MARKETECH</div><div className="sub">DIGITAL</div></div>
              </div>
              <h3>Strategy, systems, and clarity built for serious growth.</h3>
              <p>
                Marketech Digital is built for businesses that want cleaner systems, stronger execution, and a brand that feels premium from the first interaction.
                The founder layer adds trust while keeping the focus on what clients get.
              </p>
              <div className="principles">
                <div className="bullet">AI systems design aligned with business goals</div>
                <div className="bullet">Workflow automation that reduces friction and saves time</div>
                <div className="bullet">Decision intelligence that helps teams act faster</div>
              </div>
              <div className="trust-motion" aria-hidden="true" dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 600 110"><path d="M20 76C86 74 112 30 180 34C252 38 268 80 340 78C412 76 444 36 580 42" stroke="#59afff" stroke-width="3" fill="none"><animate attributeName="stroke-dasharray" values="0 700;700 0;0 700" dur="7s" repeatCount="indefinite"/></path><path d="M20 88C84 94 126 66 176 64C246 60 270 94 336 92C404 90 454 66 580 74" stroke="#ff6a00" stroke-width="2.6" fill="none"><animate attributeName="stroke-dasharray" values="0 680;680 0;0 680" dur="6s" repeatCount="indefinite"/></path></svg>' }} />
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setFounderOpen(true)}>View founder details</button>
                <button className="btn btn-secondary" onClick={() => setContactOpen(true)}>Start a conversation</button>
              </div>
            </div>
          </div>
        </section>

        <section className="container section" id="faq" aria-label="Frequently asked questions">
          <SectionLabel>FAQ</SectionLabel>
          <div className="section-head">
            <h2>Clear answers for serious buyers.</h2>
            <p>This section improves clarity for visitors, search engines, and AI systems that summarize what your company offers.</p>
          </div>
          <div className="faq-grid">
            {faq.map((item) => (
              <article className="faq-card" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container section" id="contact" aria-label="Contact section">
          <div className="contact-card">
            <SectionLabel>Contact</SectionLabel>
            <div className="section-head" style={{ marginBottom: 10 }}>
              <h2>Start the conversation.</h2>
              <p>Send a message directly to Marketech Digital. For now, this form opens your email app to send a message to <strong>abasitabbasi99@gmail.com</strong>.</p>
            </div>
            <ContactFields onSend={sendEmail} onOpenContact={() => setContactOpen(true)} />
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-wrap">
          <div className="brand">
            <div className="brand-plate" style={{ width: 48, height: 48, flexBasis: 48 }}><img src="/logo.svg" alt="Marketech Digital logo" /></div>
            <div className="brand-copy"><div className="top">MARKETECH</div><div className="sub">DIGITAL</div></div>
          </div>
          <div>Marketech Digital</div>
        </div>
      </footer>

      <DetailModal state={detailState} onClose={() => setDetailState(null)} onOpenContact={() => setContactOpen(true)} />
      <FounderModal open={founderOpen} onClose={() => setFounderOpen(false)} onOpenContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} onSend={sendEmail} />
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </>
  );
}

function ContactFields({ onSend, onOpenContact }: { onSend: (name: string, email: string, message: string) => void; onOpenContact: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="form-grid">
        <input value={name} onChange={(e) => setName(e.target.value)} id="nameInput" type="text" placeholder="Your name" aria-label="Your name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} id="emailInput" type="email" placeholder="Work email" aria-label="Work email" />
      </div>
      <div className="form-grid">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="messageInput" rows={5} placeholder="Tell me what you want to build, improve, or automate." aria-label="Your message" />
      </div>
      <div className="contact-flow" aria-hidden="true" dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 600 110"><circle cx="78" cy="55" r="12" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><circle cx="206" cy="55" r="12" fill="rgba(89,175,255,.12)" stroke="#59afff"/><circle cx="336" cy="55" r="12" fill="rgba(255,106,0,.12)" stroke="#ff6a00"/><rect x="428" y="35" width="92" height="40" rx="16" fill="rgba(89,175,255,.08)" stroke="#59afff"/><path d="M90 55H194M218 55H324M348 55H428" stroke="rgba(255,255,255,.28)" stroke-width="3"><animate attributeName="stroke-dasharray" values="0 180;180 0;0 180" dur="4s" repeatCount="indefinite"/></path></svg>' }} />
      <div className="hero-actions">
        <button className="btn btn-primary" id="sendMail" onClick={() => onSend(name, email, message)}>Send message →</button>
        <button className="btn btn-secondary" onClick={onOpenContact}>Open form popup</button>
      </div>
    </>
  );
}
