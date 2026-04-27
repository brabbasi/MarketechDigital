"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type UiMessage = {
  role: "user" | "assistant" | "bot";
  text: string;
};

type AssistantMode = "checking" | "ai" | "fallback" | "error";

const founderImage = "/founder.webp";
const projectEmail = "project@getmarketechdigital.com";
const quickReplies = ["Estimate my project", "What can you build?", "AI agent bot price", "How do we start?"];

function toApiRole(role: UiMessage["role"]): "user" | "assistant" {
  return role === "user" ? "user" : "assistant";
}

function modeLabel(mode: AssistantMode, reason?: string) {
  if (mode === "ai") return "Live AI connected";
  if (mode === "fallback") {
    if (reason === "missing_openai_api_key") return "Guided mode · API key missing";
    if (reason?.startsWith("openai_error_")) return `Guided mode · ${reason.replace("openai_error_", "OpenAI error ")}`;
    return "Guided mode";
  }
  if (mode === "error") return "Connection issue";
  return "Checking backend";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("checking");
  const [reason, setReason] = useState<string>("");
  const [messages, setMessages] = useState<UiMessage[]>([
    { role: "bot", text: "Protocol active. I’m the Marketech AI guide. Tell me what you want to build, automate, or clarify — I can suggest services, scope, and estimate ranges before you contact Basit." }
  ]);

  const mailHref = useMemo(() => {
    const subject = encodeURIComponent("Marketech Digital project inquiry");
    const body = encodeURIComponent("Hi Marketech Digital, I visited the website and would like to discuss a project.\n\nProject / problem:\nBusiness type:\nPreferred next step:\nEstimated budget range:");
    return `mailto:${projectEmail}?subject=${subject}&body=${body}`;
  }, []);

  async function send(text = input) {
    const value = text.trim();
    if (!value || loading) return;

    const nextMessages: UiMessage[] = [...messages, { role: "user", text: value }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({ role: toApiRole(message.role), content: message.text }))
        })
      });
      const data = await response.json();
      const reply = typeof data?.reply === "string" ? data.reply : "I had trouble answering that. Tell me your business type, goal, and what feels repetitive or unclear.";
      setMode(data?.mode === "ai" ? "ai" : data?.mode === "error" ? "error" : "fallback");
      setReason(typeof data?.reason === "string" ? data.reason : "");
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMode("error");
      setReason("frontend_fetch_failed");
      setMessages((prev) => [...prev, { role: "bot", text: "I had trouble connecting to the live assistant. Tell me your business type, goal, and what you want automated, and I’ll still help you narrow the starting point." }]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    const lastUser = [...messages].reverse().find((message) => message.role === "user")?.text || "Website visitor requested contact from the AI assistant.";
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: lastUser,
        recommendedService: "AI assistant conversation",
        conversation: messages.map((message) => ({ role: toApiRole(message.role), content: message.text }))
      })
    }).catch(() => null);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  return (
    <>
      <button className="ai-launcher" type="button" onClick={() => setOpen(true)} aria-label="Open Marketech AI assistant">
        <Image src={founderImage} alt="Basit Abbasi AI assistant" width={72} height={72} priority={false} unoptimized />
      </button>
      <div className={`ai-panel ${open ? "show" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Marketech Digital AI assistant">
        <div className="ai-head">
          <div className="ai-avatar"><Image src={founderImage} alt="Basit Abbasi AI assistant" width={54} height={54} unoptimized /></div>
          <div>
            <strong>MARKETECH_INTELLIGENCE</strong>
            <span>v2.1 // {modeLabel(mode, reason)}</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close Marketech AI assistant">×</button>
        </div>
        <div className="ai-messages" aria-live="polite">
          {messages.map((msg, index) => (
            <div className={`ai-message ${msg.role === "user" ? "user" : "bot"}`} key={`${msg.role}-${index}`}>{msg.text}</div>
          ))}
          {loading ? <div className="ai-message bot">Thinking through the best Marketech path...</div> : null}
        </div>
        <div className="ai-quick" aria-label="Quick prompts for Marketech AI assistant">
          {quickReplies.map((q) => <button type="button" key={q} onClick={() => send(q)} disabled={loading}>{q}</button>)}
        </div>
        <form className="ai-form" onSubmit={onSubmit}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe your project..." aria-label="Describe your project to the Marketech AI assistant" disabled={loading} />
          <button type="submit" disabled={loading} aria-label="Send message to Marketech AI assistant">➤</button>
        </form>
        <div className="ai-actions">
          <a href="/services">Starter systems</a>
          <a href={mailHref} onClick={submitLead}>Contact →</a>
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
        .ai-launcher img { width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 50%; filter: contrast(1.05); }
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
        .ai-avatar img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .ai-head strong { display: block; font-size: 12px; letter-spacing: .22em; }
        .ai-head span { display: block; margin-top: 4px; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.45); }
        .ai-head button { width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); color: rgba(255,255,255,.75); font-size: 26px; cursor: pointer; }
        .ai-messages { flex: 1; overflow: auto; padding: 22px; display: flex; flex-direction: column; gap: 14px; }
        .ai-message { max-width: 90%; padding: 15px 16px; border-radius: 20px; line-height: 1.55; font-size: 14px; white-space: pre-wrap; }
        .ai-message.bot { align-self: flex-start; background: #f5f5f2; color: #101010; border-top-left-radius: 6px; }
        .ai-message.user { align-self: flex-end; background: rgba(255,106,0,.16); border: 1px solid rgba(255,106,0,.26); color: #fff; border-top-right-radius: 6px; }
        .ai-quick { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 22px 14px; }
        .ai-quick button { border: 1px solid rgba(255,255,255,.1); border-radius: 999px; background: rgba(255,255,255,.04); color: rgba(255,255,255,.78); padding: 10px 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; font-size: 10px; cursor: pointer; }
        .ai-quick button:disabled, .ai-form button:disabled, .ai-form input:disabled { opacity: .62; cursor: not-allowed; }
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
