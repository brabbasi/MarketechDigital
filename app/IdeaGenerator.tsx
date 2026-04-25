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
  title: "A helpful first step for your business",
  overview:
    "Tell us what kind of business you run, what you want to improve, and where things feel messy. We will suggest a practical starting point that fits your situation.",
  recommendedSystem: "Strategy session or starter system",
  firstBuild: ["Start by understanding the real problem before building anything new."],
  automations: ["Look for one repeated task that costs time every week and fix that first."],
  dataLayer: ["Create a simple place to see leads, next steps, and what needs attention."],
  priceRange: "A guidance range will appear after your idea is generated.",
  nextQuestions: ["What business do you run?", "What part of your work feels slow, repetitive, or hard to track?"]
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
      setMode(data?.mode === "ai" ? "Personalized suggestion" : "Guided suggestion");
    } catch {
      setMode("Connection issue");
      setIdea({
        ...defaultIdea,
        title: "We could not load the idea tool right now",
        overview:
          "Please try again in a moment. You can also open the assistant button and describe your project there."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="idea-lab" id="idea-generator">
      <div className="services-label"><span /> Free idea helper</div>
      <h2>Not sure what you need yet?</h2>
      <p>
        Share what you do and where things feel stuck. This tool will suggest a useful starting point for your business,
        without making you sit through a sales call first.
      </p>
      <form className="idea-form" onSubmit={onSubmit}>
        <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business type, for example cleaning, clinic, real estate, trades" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Main goal, for example better leads, less admin, faster follow ups" />
        <input value={tools} onChange={(e) => setTools(e.target.value)} placeholder="Current tools, for example website, Gmail, WhatsApp, CRM, Google Sheets" />
        <textarea value={friction} onChange={(e) => setFriction(e.target.value)} placeholder="What feels slow, repetitive, confusing, expensive, or hard to track right now?" />
        <button type="submit" disabled={loading}>{loading ? "Thinking through your situation..." : "Suggest a helpful starting point →"}</button>
      </form>
      <div className="idea-result">
        <div className="idea-mode">{mode}</div>
        <strong>{idea.title}</strong>
        <p>{idea.overview}</p>
        <div className="idea-system">
          <span>Suggested starting point</span>
          <b>{idea.recommendedSystem}</b>
          <em>{idea.priceRange}</em>
        </div>
        <div className="idea-columns">
          <div><h4>What to build first</h4><ul>{idea.firstBuild.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>What to save time on</h4><ul>{idea.automations.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h4>What to track</h4><ul>{idea.dataLayer.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
        <div className="idea-questions">
          <h4>Good questions to ask next</h4>
          <ul>{idea.nextQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
