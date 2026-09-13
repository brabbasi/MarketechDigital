"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

// Keep the inquiry taxonomy aligned with the full Marketech offer surface rather
// than reducing every lead to a website project. The list stays outcome-oriented
// so visitors do not need to understand internal product names before contacting us.
const needs = [
  "Website / web app",
  "SEO / GEO / local search",
  "AI strategy",
  "Workflow automation",
  "AI website agent / lead qualification",
  "Dashboard / decision intelligence",
  "Custom software / internal tool",
  "Digital marketing / growth campaign",
  "Branding / messaging",
  "TradePilot AI",
  "Partnership / implementation",
  "Not sure yet"
];

function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function safeReferrer() {
  if (typeof document === "undefined" || !document.referrer) return "";
  try {
    const referrer = new URL(document.referrer);
    return `${referrer.origin}${referrer.pathname}`;
  } catch {
    return "";
  }
}

export default function ContactClient() {
  const params = useSearchParams();
  const initialServiceCandidate = params.get("service") || "";
  const initialService = needs.includes(initialServiceCandidate) ? initialServiceCandidate : "";
  const source = params.get("source") || "website-contact";
  const medium = params.get("medium") || "website";
  const campaign = params.get("campaign") || "";
  const firstTouchOffer = params.get("firstTouchOffer") || "";
  const recommendedService = params.get("recommendedService") || initialService;
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const submissionIdRef = useRef("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!submissionIdRef.current) submissionIdRef.current = newSubmissionId();

    const formPayload = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...formPayload,
      submissionId: submissionIdRef.current,
      source,
      medium,
      campaign,
      firstTouchOffer,
      recommendedService,
      referrer: safeReferrer(),
      landingPage: typeof window !== "undefined" ? window.location.pathname : "/contact"
    };

    setSending(true);
    setStatus("Sending your request...");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : "Please email project@getmarketechdigital.com directly.");
      setStatus("Request received. Basit will review your details and follow up.");
      form.reset();
      submissionIdRef.current = "";
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please email project@getmarketechdigital.com directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Company<input name="company" placeholder="Company name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@company.com" /></label>
        <label>Phone<input name="phone" type="tel" placeholder="Phone number" /></label>
        <label>Website<input name="website" type="url" placeholder="https://yourwebsite.com" /></label>
        <label>What do you need help with?<select name="service" defaultValue={initialService}><option value="" disabled>Select one</option>{needs.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      </div>
      <label>Message<textarea name="message" rows={5} placeholder="Tell us what you want to improve, automate, market, or build." /></label>
      <input name="companyUrl2" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }} />
      {recommendedService && <input type="hidden" name="recommendedService" value={recommendedService} />}
      {firstTouchOffer && <input type="hidden" name="firstTouchOffer" value={firstTouchOffer} />}
      <button type="submit" disabled={sending}>{sending ? "Sending..." : "Tell us what you need"}</button>
      <small>No pressure. We&apos;ll review your current setup and recommend the clearest next move.</small>
      <p className="contact-status" aria-live="polite">{status}</p>
    </form>
  );
}
