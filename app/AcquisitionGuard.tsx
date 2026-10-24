"use client";

import { useEffect } from "react";

function newSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function safeReferrer() {
  if (!document.referrer) return "";
  try {
    const referrer = new URL(document.referrer);
    return `${referrer.origin}${referrer.pathname}`;
  } catch {
    return "";
  }
}

export default function AcquisitionGuard() {
  useEffect(() => {
    async function handleSubmit(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLFormElement) || !target.matches(".contact-popup-form")) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (target.dataset.acquisitionSending === "true") return;
      target.dataset.acquisitionSending = "true";
      if (!target.dataset.submissionId) target.dataset.submissionId = newSubmissionId();

      const status = target.parentElement?.querySelector<HTMLElement>(".contact-popup-status");
      if (status) status.textContent = "Sending your inquiry...";

      const data = Object.fromEntries(new FormData(target).entries());
      const payload = {
        ...data,
        companyUrl2: "",
        submissionId: target.dataset.submissionId,
        source: "website-contact-popup",
        medium: "website",
        campaign: "site-contact-popup",
        referrer: safeReferrer(),
        landingPage: window.location.pathname
      };

      try {
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : "Please email project@getmarketechdigital.com directly.");

        if (status) status.textContent = "Thank you. Basit will review your inquiry and follow up.";
        target.reset();
        delete target.dataset.submissionId;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Please email project@getmarketechdigital.com directly.";
        if (status) status.textContent = `The form had trouble sending. ${message}`;
      } finally {
        delete target.dataset.acquisitionSending;
      }
    }

    // Capture phase intentionally wins over the legacy popup handler in UXFixLayer.
    // The AI assistant itself now links directly to /contact and no longer needs a
    // document-level click interceptor here.
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
