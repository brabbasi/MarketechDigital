"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const quickReplies = ["Estimate my project", "What can you build?", "AI agent bot price", "How do we start?"];

const offers = [
  {
    name: "AI Agent Website Bot",
    range: "$750–$2,500 CAD starter / $3,500–$8,000+ CAD advanced",
    fit: "Best for websites that need lead capture, FAQs, qualification, booking guidance, and guided service discovery."
  },
  {
    name: "AI Strategy Sprint",
    range: "$500–$1,500 CAD",
    fit: "Best when a founder knows AI can help but needs a clear roadmap before spending on a full build."
  },
  {
    name: "Workflow Automation Build",
    range: "$1,500–$6,000+ CAD",
    fit: "Best for repetitive admin, client intake, follow-ups, internal alerts, CRM handoffs, and reporting workflows."
  },
  {
    name: "Decision Intelligence Dashboard",
    range: "$2,000–$8,000+ CAD",
    fit: "Best for teams that need clearer KPI visibility, reporting, data cleanup, and decision support."
  },
  {
    name: "Growth Systems Stack",
    range: "$4,000–$15,000+ CAD",
    fit: "Best for businesses that want a fuller operating layer across strategy, automation, analytics, and conversion flow."
  }
];

function estimate(input: string) {
  const q = input.toLowerCase();
  if (q.includes("bot") || q.includes("agent") || q.includes("chat") || q.includes("assistant")) return offers[0];
  if (q.includes("strategy") || q.includes("roadmap") || q.includes("audit") || q.includes("plan")) return offers[1];
  if (q.includes("automation") || q.includes("workflow") || q.includes("zapier") || q.includes("make") || q.includes("crm") || q.includes("follow")) return offers[2];
  if (q.includes("dashboard") || q.includes("data") || q.includes("analytics") || q.includes("report") || q.includes("kpi")) return offers[3];
  if (q.includes("system") || q.includes("stack") || q.includes("full") || q.includes("growth") || q.includes("website")) return offers[4];
  return null;
}

function catalogReply() {
  return `Marketech Digital can help with: ${offers.map((offer) => `${offer.name} (${offer.range})`).join("; ")}. These are guidance ranges, not final quotes. A final quote depends on integrations, pages, automation depth, data quality, and whether the system needs a real backend.`;
}

function getReply(input: string) {
  const q = input.toLowerCase();
  const matched = estimate(input);

  if (q.includes("quote") || q.includes("estimate") || q.includes("price") || q.includes("cost") || q.includes("package") || q.includes("budget")) {
    if (matched) {
      return `Estimated fit: ${matched.name}. Typical range: ${matched.range}. ${matched.fit} To tighten the quote, I would need: business type, current process, tools you use, number of pages/workflows, and whether you need backend/live data.`;
    }
    return catalogReply();
  }

  if (q.includes("founder") || q.includes("basit")) {
    return "Basit Abbasi is the founder of Marketech Digital, with a Computer Science background from the University of Hertfordshire and a focus on AI systems, workflow automation, data intelligence, bot creation, and clarity-driven digital execution. Open the founder profile for the full portfolio page.";
  }

  if (q.includes("small service") || q.includes("starter") || q.includes("entry")) {
    return "A starter services page is a smart move if it is positioned as Entry Systems, not cheap packages. It can include AI Agent Bot, Automation Audit, Landing Page Intelligence, Data Dashboard Starter, and CRM Workflow Setup. This keeps the brand premium while giving smaller clients a clear first step.";
  }

  if (q.includes("contact") || q.includes("start") || q.includes("call") || q.includes("book")) {
    return "The best first step is to describe your business, what is slowing you down, what tools you use, and what result you want. Marketech can then recommend whether you need a strategy sprint, AI bot, automation build, dashboard, or full systems stack.";
  }

  if (q.includes("solve") || q.includes("help") || q.includes("problem")) {
    return "Marketech Digital solves business problems where work is scattered, repetitive, unclear, or hard to measure. Examples: automating lead follow-up, building AI support bots, cleaning reporting dashboards, connecting forms to CRMs, summarizing customer conversations, and creating decision views for leaders.";
  }

  if (q.includes("offer") || q.includes("service") || q.includes("automation") || q.includes("ai") || q.includes("dashboard") || q.includes("data")) {
    return catalogReply();
  }

  if (matched) {
    return `This sounds like a fit for ${matched.name}. Typical range: ${matched.range}. ${matched.fit} Share the business type and workflow details, and I can suggest a tighter starting scope.`;
  }

  return "I can help you think through what Marketech Digital can solve before you contact Basit: AI agents, workflow automation, dashboards, business systems, CRM flows, lead capture, reporting, and quotation ranges. Tell me what your business does and what feels slow, repetitive, or unclear.";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Protocol active. I’m the Marketech AI guide. Tell me what you want to build, automate, or clarify — I can suggest services, scope, and estimate ranges before you contact Basit." }
  ]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent("Marketech Digital inquiry");
    const body = encodeURIComponent("Hi Basit, I visited the Marketech Digital website and would like to discuss a project.\n\nProject / problem:\nBusiness type:\nPreferred next step:\nEstimated budget range:");
    return `mailto:abasitabbasi99@gmail.com?subject=${subject}&body=${body}`;
  }, []);

  function send(text = input) {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { role: "user", text: value }, { role: "bot", text: getReply(value) }]);
    setInput("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  return (
    <>
      <button className="ai-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open Marketech AI guide">
        <Image src="/founder.webp" alt="Basit Abbasi AI guide" width={72} height={72} priority={false} />
      </button>
      <div className={`ai-panel ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="ai-head">
          <div className="ai-avatar"><Image src="/founder.webp" alt="Basit Abbasi" width={54} height={54} /></div>
          <div>
            <strong>MARKETECH_INTELLIGENCE</strong>
            <span>v1.1 // quote-aware inquiry layer</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close AI guide">×</button>
        </div>
        <div className="ai-messages">
          {messages.map((msg, index) => (
            <div className={`ai-message ${msg.role}`} key={`${msg.role}-${index}`}>{msg.text}</div>
          ))}
        </div>
        <div className="ai-quick">
          {quickReplies.map((q) => <button type="button" key={q} onClick={() => send(q)}>{q}</button>)}
        </div>
        <form className="ai-form" onSubmit={onSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your project..." />
          <button type="submit">➤</button>
        </form>
        <div className="ai-actions">
          <a href="/services">Starter systems</a>
          <a href={mailHref}>Contact →</a>
        </div>
      </div>
      <style jsx global>{`
        .ai-launcher {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: max(18px, env(safe-area-inset-bottom));
          z-index: 220;
          width: 76px;
          height: 76px;
          padding: 4px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,.86);
          background: linear-gradient(180deg, #11161d, #05070b);
          cursor: pointer;
          box-shadow: 0 20px 70px rgba(0,0,0,.5), 0 0 0 8px rgba(255,255,255,.035), 0 0 42px rgba(255,106,0,.2);
          display: grid;
          place-items: center;
          transition: transform .22s ease, box-shadow .22s ease;
          overflow: visible;
        }
        .ai-launcher img { width: 100%; height: 100%; object-fit: cover; object-position: center top; border-radius: 50%; filter: contrast(1.05); }
        .ai-launcher:hover { transform: translateY(-4px) scale(1.04); box-shadow: 0 24px 86px rgba(0,0,0,.58), 0 0 56px rgba(255,106,0,.28); }
        .ai-launcher::after { content: ""; position: absolute; right: 5px; bottom: 8px; width: 15px; height: 15px; border-radius: 50%; background: #28d66b; border: 2px solid #05070b; box-shadow: 0 0 16px rgba(40,214,107,.75); }
        .ai-panel {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: calc(max(18px, env(safe-area-inset-bottom)) + 92px);
          z-index: 230;
          width: min(460px, calc(100vw - 28px));
          height: min(700px, calc(100vh - 132px));
          display: flex;
          flex-direction: column;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,.13);
          background: radial-gradient(circle at 20% 0%, rgba(255,106,0,.11), transparent 30%), linear-gradient(180deg, rgba(17,18,21,.98), rgba(4,6,10,.98));
          color: #fff;
          box-shadow: 0 30px 120px rgba(0,0,0,.62);
          backdrop-filter: blur(18px);
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px) scale(.96);
          pointer-events: none;
          transition: opacity .22s ease, transform .22s ease;
        }
        .ai-panel.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .ai-head { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px; padding: 22px; border-bottom: 1px solid rgba(255,255,255,.08); }
        .ai-avatar { width: 54px; height: 54px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(255,255,255,.78); box-shadow: 0 0 22px rgba(255,106,0,.16); }
        .ai-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .ai-head strong { display: block; font-size: 12px; letter-spacing: .22em; }
        .ai-head span { display: block; margin-top: 4px; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.45); }
        .ai-head button { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); color: rgba(255,255,255,.75); font-size: 26px; cursor: pointer; }
        .ai-messages { flex: 1; overflow: auto; padding: 22px; display: flex; flex-direction: column; gap: 14px; }
        .ai-message { max-width: 90%; padding: 15px 16px; border-radius: 20px; line-height: 1.55; font-size: 14px; }
        .ai-message.bot { align-self: flex-start; background: #f5f5f2; color: #101010; border-top-left-radius: 6px; }
        .ai-message.user { align-self: flex-end; background: rgba(255,106,0,.16); border: 1px solid rgba(255,106,0,.26); color: #fff; border-top-right-radius: 6px; }
        .ai-quick { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 22px 14px; }
        .ai-quick button { border: 1px solid rgba(255,255,255,.1); border-radius: 999px; background: rgba(255,255,255,.04); color: rgba(255,255,255,.78); padding: 10px 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 10px; cursor: pointer; }
        .ai-form { display: grid; grid-template-columns: 1fr 62px; gap: 10px; padding: 0 22px 16px; }
        .ai-form input { min-width: 0; border: 1px solid rgba(255,255,255,.1); border-radius: 20px; background: rgba(255,255,255,.045); color: #fff; padding: 16px; outline: none; }
        .ai-form input:focus { border-color: rgba(255,106,0,.4); box-shadow: 0 0 0 4px rgba(255,106,0,.08); }
        .ai-form button { border: 0; border-radius: 20px; background: #f3f3f0; color: #111; font-size: 22px; cursor: pointer; }
        .ai-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 22px 22px; }
        .ai-actions a { display: flex; align-items: center; justify-content: center; min-height: 48px; border-radius: 999px; border: 1px solid rgba(255,255,255,.1); color: #fff; text-decoration: none; background: rgba(255,255,255,.04); font-weight: 900; letter-spacing: .1em; text-transform: uppercase; font-size: 11px; }
        .ai-actions a:first-child { border-color: rgba(40,214,107,.28); background: rgba(40,214,107,.09); color: #78f2a4; }
        @media (max-width: 560px) {
          .ai-launcher { width: 66px; height: 66px; right: 16px; bottom: 18px; }
          .ai-panel { right: 10px; left: 10px; bottom: 92px; width: auto; height: min(640px, calc(100vh - 118px)); border-radius: 30px; }
          .ai-head { padding: 18px; grid-template-columns: 46px 1fr 40px; }
          .ai-avatar { width: 46px; height: 46px; }
          .ai-head strong { font-size: 10px; letter-spacing: .14em; }
          .ai-messages { padding: 18px; }
          .ai-quick, .ai-form, .ai-actions { padding-left: 18px; padding-right: 18px; }
          .ai-actions { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
