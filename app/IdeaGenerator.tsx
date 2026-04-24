"use client";

import { FormEvent, useState } from "react";

function buildIdea(business: string, goal: string, friction: string) {
  const b = business.trim() || "your business";
  const g = goal.trim() || "generate more qualified leads and save time";
  const f = friction.trim() || "manual follow-ups, unclear reporting, and repeated admin work";

  return {
    title: `A starter system for ${b}`,
    summary: `Based on your goal to ${g}, the best first Marketech system would focus on reducing ${f} while improving visibility and client response speed.`,
    items: [
      "Add an AI website guide that answers common questions and captures lead details before a call.",
      "Automate the first follow-up, internal notification, and lead handoff so inquiries do not get lost.",
      "Create a simple visibility dashboard showing leads, source, status, follow-up stage, and next action.",
      "Start small, prove value quickly, then expand into a fuller automation or decision-intelligence layer."
    ]
  };
}

export default function IdeaGenerator() {
  const [business, setBusiness] = useState("");
  const [goal, setGoal] = useState("");
  const [friction, setFriction] = useState("");
  const [idea, setIdea] = useState(() => buildIdea("", "", ""));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIdea(buildIdea(business, goal, friction));
  }

  return (
    <section className="idea-lab">
      <div className="services-label"><span /> Free idea generator</div>
      <h2>Not sure what you need yet?</h2>
      <p>
        Use this quick idea generator to turn a business problem into a possible starter system.
        It is not a final quote, but it helps you understand what Marketech could build first.
      </p>
      <form className="idea-form" onSubmit={onSubmit}>
        <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business type, e.g. clinic, agency, real estate, trades" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Main goal, e.g. more leads, less admin, faster decisions" />
        <textarea value={friction} onChange={(e) => setFriction(e.target.value)} placeholder="What feels slow, repetitive, confusing, or hard to track right now?" />
        <button type="submit">Generate starter idea →</button>
      </form>
      <div className="idea-result">
        <strong>{idea.title}</strong>
        <p>{idea.summary}</p>
        <ul>{idea.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  );
}
