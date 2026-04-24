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
    </>
  );
}
