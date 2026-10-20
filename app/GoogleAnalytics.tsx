"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// An inquiry does not require tracking. Analytics loads ONLY after an explicit
// optional visitor choice; refusal still permits all website/contact functions.
const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-JEMN04ZWC8";
const measurementId = /^G-[A-Z0-9]{6,20}$/.test(configuredId) ? configuredId : "";
const PREFERENCE_KEY = "marketech-analytics-choice-v1";
type Choice = "accepted" | "declined" | null;

export default function GoogleAnalytics() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);
  const [showChoices, setShowChoices] = useState(false);
  const choiceRef = useRef<Choice>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PREFERENCE_KEY);
      if (saved === "accepted" || saved === "declined") {
        choiceRef.current = saved;
        setChoice(saved);
      }
    } catch {
      // Storage blocked: default to no analytics, never silently opt in.
    }
    setReady(true);
    // A visitor can withdraw consent in another tab after this one has already
    // loaded the GA tag. Storage events are sent to other same-origin tabs.
    // Reloading an opted-in tab removes previously mounted GA scripts.
    function onStorage(event: StorageEvent) {
      if (event.key !== PREFERENCE_KEY && event.key !== null) return;
      let next: Choice = "declined";
      try {
        const saved = window.localStorage.getItem(PREFERENCE_KEY);
        next = saved === "accepted" || saved === "declined" ? saved : null;
      } catch {
        // If storage becomes unavailable after opt-in, stop tracking.
      }
      if (choiceRef.current === "accepted" && next !== "accepted") {
        window.location.reload();
        return;
      }
      choiceRef.current = next;
      setChoice(next);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function choose(next: "accepted" | "declined") {
    let persisted = false;
    try {
      window.localStorage.setItem(PREFERENCE_KEY, next);
      persisted = window.localStorage.getItem(PREFERENCE_KEY) === next;
    } catch {
      // Never reload back into a stale persisted "accepted" value.
    }
    if (next === "declined") {
      // Prevent further GA hits immediately, including if storage is unavailable.
      if (measurementId) {
        (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = true;
      }
      choiceRef.current = "declined";
      setChoice("declined");
      setShowChoices(false);
      // Reload only if the persisted value was successfully replaced; otherwise
      // a reload would silently restore the previously accepted preference.
      if (choice === "accepted" && persisted) window.location.reload();
      return;
    }
    // In a non-persistent browser, keep the choice local to this tab only.
    choiceRef.current = next;
    setChoice(next);
    setShowChoices(false);
  }

  return (
    <>
      {ready && choice === "accepted" && measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `
            }}
          />
        </>
      )}
      {ready && (choice === null || showChoices) && (
        <section
          role="region"
          aria-label="Optional website analytics preferences"
          style={{
            position: "fixed", left: 14, bottom: 14, width: "min(480px, calc(100vw - 28px))",
            padding: "17px 18px", borderRadius: 18, background: "#111e2b",
            color: "#f5f8fc", border: "1px solid #607589", zIndex: 2147482000,
            boxShadow: "0 12px 40px rgba(0,0,0,.5)", lineHeight: 1.5
          }}
        >
          <strong>Optional website analytics</strong>
          <p style={{ margin: "8px 0", fontSize: 14 }}>
            We use Google Analytics to measure visits if you agree. Declining does
            not affect contact forms or the site. See our{" "}
            <a href="/privacy" style={{ color: "#ffb777", textDecoration: "underline" }}>privacy notice</a>.
          </p>
          <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
            <button type="button" onClick={() => choose("accepted")}
              style={{ padding: "9px 14px", borderRadius: 10, background: "#ff9a4a", color: "#17100a", fontWeight: 750, border: 0 }}>
              Allow analytics
            </button>
            <button type="button" onClick={() => choose("declined")}
              style={{ padding: "9px 14px", borderRadius: 10, background: "#26394d", color: "#fff", fontWeight: 750, border: "1px solid #718394" }}>
              No thanks
            </button>
          </div>
        </section>
      )}
      {ready && choice !== null && !showChoices && (
        <button
          type="button"
          onClick={() => setShowChoices(true)}
          aria-label="Change optional analytics privacy preferences"
          style={{
            position: "fixed", left: 12, bottom: 10, zIndex: 2147481000,
            padding: "5px 9px", color: "#c6d1df", background: "#111e2b",
            border: "1px solid #4f6175", borderRadius: 11, fontSize: 11
          }}
        >
          Analytics choices
        </button>
      )}
    </>
  );
}
