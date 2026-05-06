"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const needs = [
  "Starter website",
  "Premium website / SEO",
  "Lead capture",
  "TradePilot AI",
  "AI automation",
  "Custom system",
  "Not sure yet"
];

export default function ContactClient() {
  const params = useSearchParams();
  const initialService = params.get("service") || "";
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setStatus("Sending your audit request...");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : "Please email project@getmarketechdigital.com directly.");
      setStatus("Request received. Marketech Digital will review your details and follow up.");
      form.reset();
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
      <label>Message<textarea name="message" rows={5} placeholder="Tell us what you want to improve, fix, or build." /></label>
      <button type="submit" disabled={sending}>{sending ? "Sending..." : "Request a Free Digital Growth Audit"}</button>
      <small>No pressure. We&apos;ll review your current setup and recommend the clearest next move.</small>
      <p className="contact-status" aria-live="polite">{status}</p>
    </form>
  );
}
