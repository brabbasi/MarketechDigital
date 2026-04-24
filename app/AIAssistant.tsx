"use client";

import { FormEvent, useMemo, useState } from "react";

const quickReplies = ["What do you offer?", "Tell me about Basit", "How do we start?", "Contact Marketech"];

function getReply(input: string) {
  const q = input.toLowerCase();
  if (q.includes("founder") || q.includes("basit")) {
    return "Basit Abbasi is the founder of Marketech Digital, with a Computer Science background from the University of Hertfordshire and a focus on AI systems, workflow automation, data intelligence, and clarity-driven digital execution. Open the founder profile for the full portfolio page.";
  }
  if (q.includes("price") || q.includes("cost") || q.includes("package")) {
    return "Pricing depends on the scope: strategy sprint, workflow automation build, decision intelligence layer, or a broader growth systems stack. The best next step is to share what you want automated or clarified so the right package can be shaped.";
  }
  if (q.includes("contact") || q.includes("start") || q.includes("call") || q.includes("book")) {
    return "You can start by sending a short message about your business, your current workflow problem, and what outcome you want. Marketech can then recommend the right path: AI strategy, automation, data clarity, or a full systems buildout.";
  }
  if (q.includes("offer") || q.includes("service") || q.includes("automation") || q.includes("ai")) {
    return "Marketech Digital offers AI Strategy Sprints, Workflow Automation Builds, Decision Intelligence Layers, and Growth Systems Stack buildouts. The focus is practical business value: fewer repetitive tasks, clearer visibility, and faster decision-making.";
  }
  return "I can help you understand Marketech Digital's offers, founder profile, AI automation work, project concepts, and how to start a conversation. Ask about services, workflow automation, data intelligence, bot creation, or founder experience.";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Protocol active. I’m the Marketech AI guide. Ask about services, founder profile, automation, data intelligence, or how to start." }
  ]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent("Marketech Digital inquiry");
    const body = encodeURIComponent("Hi Basit, I visited the Marketech Digital website and would like to discuss a project.\n\nProject / problem:\nBusiness type:\nPreferred next step:");
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
        <span>AI</span>
      </button>
      <div className={`ai-panel ${open ? "show" : ""}`} aria-hidden={!open}>
        <div className="ai-head">
          <div className="ai-avatar">M</div>
          <div>
            <strong>MARKETECH_INTELLIGENCE</strong>
            <span>v1.0 // secure inquiry layer</span>
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
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Transmit query..." />
          <button type="submit">➤</button>
        </form>
        <div className="ai-actions">
          <a href="/founder">Founder profile</a>
          <a href={mailHref}>Contact →</a>
        </div>
      </div>
      <style jsx global>{`
        .ai-launcher {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: max(18px, env(safe-area-inset-bottom));
          z-index: 220;
          width: 74px;
          height: 74px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,.82);
          background: radial-gradient(circle at 34% 22%, rgba(255,255,255,.28), transparent 30%), linear-gradient(180deg, #11161d, #05070b);
          color: #fff;
          cursor: pointer;
          box-shadow: 0 20px 70px rgba(0,0,0,.5), 0 0 0 8px rgba(255,255,255,.035), 0 0 42px rgba(255,106,0,.18);
          display: grid;
          place-items: center;
          transition: transform .22s ease, box-shadow .22s ease;
        }
        .ai-launcher:hover { transform: translateY(-4px) scale(1.04); box-shadow: 0 24px 86px rgba(0,0,0,.58), 0 0 56px rgba(255,106,0,.24); }
        .ai-launcher span { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; border: 1px solid rgba(255,106,0,.38); background: rgba(255,106,0,.1); font-weight: 900; letter-spacing: .08em; }
        .ai-launcher::after { content: ""; position: absolute; right: 8px; bottom: 8px; width: 14px; height: 14px; border-radius: 50%; background: #28d66b; border: 2px solid #05070b; box-shadow: 0 0 16px rgba(40,214,107,.7); }
        .ai-panel {
          position: fixed;
          right: max(18px, env(safe-area-inset-right));
          bottom: calc(max(18px, env(safe-area-inset-bottom)) + 90px);
          z-index: 230;
          width: min(430px, calc(100vw - 28px));
          height: min(680px, calc(100vh - 130px));
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
        .ai-avatar { width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(180deg,#fff,#e9eef7); color:#07111d; font-weight: 900; box-shadow: 0 0 0 1px rgba(255,255,255,.15); }
        .ai-head strong { display: block; font-size: 12px; letter-spacing: .26em; }
        .ai-head span { display: block; margin-top: 4px; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.45); }
        .ai-head button { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); color: rgba(255,255,255,.75); font-size: 26px; cursor: pointer; }
        .ai-messages { flex: 1; overflow: auto; padding: 22px; display: flex; flex-direction: column; gap: 14px; }
        .ai-message { max-width: 88%; padding: 15px 16px; border-radius: 20px; line-height: 1.55; font-size: 14px; }
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
          .ai-launcher { width: 64px; height: 64px; right: 16px; bottom: 18px; }
          .ai-launcher span { width: 46px; height: 46px; }
          .ai-panel { right: 10px; left: 10px; bottom: 92px; width: auto; height: min(620px, calc(100vh - 118px)); border-radius: 30px; }
          .ai-head { padding: 18px; }
          .ai-head strong { font-size: 11px; letter-spacing: .18em; }
          .ai-messages { padding: 18px; }
          .ai-quick, .ai-form, .ai-actions { padding-left: 18px; padding-right: 18px; }
        }
      `}</style>
    </>
  );
}
