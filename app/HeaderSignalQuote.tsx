"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

const quotes = [
  "Systems create leverage where effort used to leak.",
  "The future belongs to businesses that respond faster.",
  "Clear data turns motion into direction.",
  "Automation should protect focus, not replace judgment.",
  "Wealth follows systems that keep working after attention moves.",
  "Better infrastructure makes better decisions possible.",
  "Technology compounds when the workflow is clear.",
  "A useful system beats a busy dashboard.",
  "Speed wins attention. Clarity wins trust.",
  "The strongest businesses are built on repeatable signals.",
  "Your website should be an operating asset, not a brochure.",
  "Future-ready companies remove friction before they scale.",
  "Every bottleneck is a system asking to be redesigned.",
  "The best tech disappears into a better process.",
  "Decision clarity is a competitive advantage."
];

function pickQuote(previous?: string) {
  if (quotes.length === 1) return quotes[0];
  let next = quotes[Math.floor(Math.random() * quotes.length)];
  while (next === previous) next = quotes[Math.floor(Math.random() * quotes.length)];
  return next;
}

function findHeaderTarget() {
  const standardHeader = document.querySelector<HTMLElement>(".standard-page-header");
  if (standardHeader) return standardHeader;

  const navLinks = document.querySelector<HTMLElement>(".nav-links");
  if (navLinks) {
    let node: HTMLElement | null = navLinks.parentElement;
    while (node && node !== document.body) {
      const rect = node.getBoundingClientRect();
      const text = (node.textContent || "").toLowerCase();
      if (rect.top < 240 && rect.width > 260 && rect.height >= 34 && rect.height <= 180 && (text.includes("services") || text.includes("book a consultation") || text.includes("offers"))) return node;
      node = node.parentElement;
    }
  }

  return document.querySelector<HTMLElement>("header") || document.querySelector<HTMLElement>("nav");
}

export default function HeaderSignalQuote() {
  const pathname = usePathname();
  const [quote, setQuote] = useState("");
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setQuote((current) => pickQuote(current));
  }, [pathname]);

  useEffect(() => {
    let mounted = true;
    const sync = () => {
      const header = findHeaderTarget();
      if (!header || !mounted) return;

      let portalHost = header.querySelector<HTMLElement>("[data-md-signal-quote-host='true']");
      if (!portalHost) {
        portalHost = document.createElement("div");
        portalHost.setAttribute("data-md-signal-quote-host", "true");
        portalHost.className = "md-header-signal-quote-host";

        const brand = header.querySelector("[data-md-dice-brand='true'], .standard-page-brand");
        if (brand?.nextSibling) header.insertBefore(portalHost, brand.nextSibling);
        else header.appendChild(portalHost);
      }

      setHost(portalHost);
    };

    sync();
    const timers = [100, 350, 900].map((delay) => window.setTimeout(sync, delay));
    window.addEventListener("resize", sync);
    return () => {
      mounted = false;
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  if (!quote || !host) return null;

  return createPortal(
    <>
      <div className="md-header-signal-quote" aria-hidden="true">
        <span>Signal</span>
        <strong>{quote}</strong>
      </div>
      <style jsx global>{`
        .md-header-signal-quote-host {
          display: none !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 1 1 auto !important;
          min-width: 0 !important;
          max-width: 100% !important;
          margin: 0 clamp(10px, 2vw, 24px) !important;
          pointer-events: none !important;
        }
        .md-header-signal-quote {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: min(100%, 560px);
          min-height: 34px;
          padding: 7px 14px;
          border: 1px solid rgba(255, 106, 0, .22);
          border-radius: 999px;
          background: radial-gradient(circle at 10% 50%, rgba(255,106,0,.14), transparent 36%), linear-gradient(90deg, rgba(255,106,0,.065), rgba(89,175,255,.045), rgba(255,255,255,.024));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 0 28px rgba(255,106,0,.06);
          backdrop-filter: blur(14px) saturate(1.18);
          -webkit-backdrop-filter: blur(14px) saturate(1.18);
          overflow: hidden;
          font-family: inherit;
        }
        .md-header-signal-quote::before {
          content: "";
          width: 6px;
          height: 6px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #ff6a00;
          box-shadow: 0 0 16px rgba(255,106,0,.76);
        }
        .md-header-signal-quote span {
          color: rgba(255,226,210,.78);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .md-header-signal-quote strong {
          min-width: 0;
          color: rgba(246,248,252,.8);
          font-size: clamp(.68rem, .78vw, .86rem);
          font-weight: 760;
          letter-spacing: .01em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 0 22px rgba(255,106,0,.12);
        }
        @media (min-width: 761px) {
          .md-header-signal-quote-host { display: inline-flex !important; }
        }
        @media (min-width: 761px) and (max-width: 1180px) {
          .md-header-signal-quote-host { margin: 0 10px !important; }
          .md-header-signal-quote { max-width: 430px; min-height: 30px; padding: 6px 12px; }
          .md-header-signal-quote span { display: none; }
          .md-header-signal-quote strong { font-size: .66rem; }
        }
        @media (max-width: 760px) {
          .md-header-signal-quote-host { display: none !important; }
        }
      `}</style>
    </>,
    host
  );
}
