"use client";

import { FormEvent, useState } from "react";

type Idea = {
  title: string;
  overview: string;
  recommendedSystem: string;
  firstBuild: string[];
  automations: string[];
  dataLayer: string[];
  priceRange: string;
  nextQuestions: string[];
};

const defaultIdea: Idea = {
  title: "A practical starter system for your business",
  overview:
    "Share your business type, goal, current friction, and tools. The generator will think through a focused starter system instead of giving generic AI advice.",
  recommendedSystem: "AI Strategy Sprint or Starter System",
  firstBuild: ["Map the workflow first so the right system is built around the real bottleneck."],
  automations: ["Identify the highest-value repetitive task before adding automation."],
  dataLayer: ["Create a simple view of leads, status, next action, and decision signals."],
  priceRange: "Guidance range appears after the system idea is generated.",
  nextQuestions: ["What business do you run?", "What part of the workflow feels slow, repetitive, or unclear?"]
};

function normalizeIdea(value: unknown): Idea {
  const data = value && typeof value === "object" ? (value as Partial<Idea>) : {};
  return {
    title: typeof data.title === "string" ? data.title : defaultIdea.title,
    overview: typeof data.overview === "string" ? data.overview : defaultIdea.overview,
    recommendedSystem: typeof data.recommendedSystem === "string" ? data.recommendedSystem : defaultIdea.recommendedSystem,
    firstBuild: Array.isArray(data.firstBuild) ? data.firstBuild.map(String).slice(0, 4) : defaultIdea.firstBuild,
    automations: Array.isArray(data.automations) ? data.automations.map(String).slice(0, 4) : defaultIdea.automations,
    dataLayer: Array.isArray(data.dataLayer) ? data.dataLayer.map(String).slice(0, 4) : defaultIdea.dataLayer,
    priceRange: typeof data.priceRange === "string" ? data.priceRange : defaultIdea.priceRange,
    nextQuestions: Array.isArray(data.nextQuestions) ? data.nextQuestions.map(String).slice(0, 3) : defaultIdea.nextQuestions
  };
}

export default function IdeaGenerator() {
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [friction, setFriction] = useState("");
  const [tools, setTools] = useState("");
  const [idea, setIdea] = useState<Idea>(defaultIdea);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("ready");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMode("thinking");

    try {
      const response = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business, goal, friction, tools })
      });
      const data = await response.json();
      setIdea(normalizeIdea(data?.idea));
      setMode(data?.mode === "ai" ? "AI-powered recommendation" : "Guided recommendation");
    } catch {
      setMode("Connection issue");
      setIdea({
        ...defaultIdea,
        title: "I could not reach the idea engine",
        overview:
          "The live generator had trouble connecting. Try again, or use the AI assistant button to describe the project and get a recommendation."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="idea-lab">
      <div className="services-label"><span /> Free AI idea generator</div>
      <h2>Not sure what you need yet?</h2>
      <p>
        Describe your business and the real bottleneck. The generator now uses the same Marketech intelligence layer
        as the assistant to create a more specific starter-system idea, not a generic template.
      </p>
      <form className="idea-form" onSubmit={onSubmit}>
        <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business type, e.g. cleaning company, clinic, real estate, trades" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Main goal, e.g. more qualified leads, less admin, faster decisions" />
        <input value={tools} onChange={(e) => setTools(e.target.value)} placeholder="Current tools, e.g. website, Gmail, WhatsApp, CRM, Google Sheets" />
        <textarea value={friction} onChange={(e) => setFriction(e.target.value)} placeholder="What feels slow, repetitive, confusing, expensive, or hard to track right now?" />
        <button type="submit" disabled={loading}>{loading ? "Thinking through your system..." : "Generate thoughtful system idea →"}</button>
      </form>
      <div className="idea-result">
        <div className="idea-mode">{mode}</div>
        <strong>{idea.title}</strong>
        <p>{idea.overview}</p>
        <div className="idea-system">
          <span>Recommended system</span>
          <b>{idea.recommendedSystem}</b>
          <em>{idea.priceRange}</em>
        </div>
        <div className="idea-columns">
          <div><h4>First build</h4><ul>{idea.firstBuild.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Automation layer</h4><ul>{idea.automations.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>Visibility layer</h4><ul>{idea.dataLayer.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <div className="idea-questions">
          <h4>Smart next questions</h4>
          <ul>{idea.nextQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
