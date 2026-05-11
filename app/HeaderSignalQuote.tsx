"use client";

import { useEffect, useState } from "react";
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

export default function HeaderSignalQuote() {
  const pathname = usePathname();
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote((current) => pickQuote(current));
  }, [pathname]);

  if (!quote) return null;

  return (
    <div className="md-header-signal-quote" aria-hidden="true">
      <span>Signal</span>
      <strong>{quote}</strong>
      <style jsx global>{`
        .md-header-signal-quote {
          position: fixed;
          top: 14px;
          left: 50%;
          z-index: 2147483200;
          transform: translateX(-50%);
          display: none;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: min(42vw, 560px);
          min-height: 40px;
          padding: 8px 16px;
          border: 1px solid rgba(255, 106, 0, .22);
          border-radius: 999px;
          background: radial-gradient(circle at 10% 50%, rgba(255,106,0,.16), transparent 36%), linear-gradient(90deg, rgba(255,106,0,.075), rgba(89,175,255,.055), rgba(255,255,255,.028));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 18px 60px rgba(0,0,0,.26), 0 0 34px rgba(255,106,0,.08);
          backdrop-filter: blur(18px) saturate(1.25);
          -webkit-backdrop-filter: blur(18px) saturate(1.25);
          pointer-events: none;
          overflow: hidden;
          font-family: inherit;
        }
        .md-header-signal-quote::before {
          content: "";
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #ff6a00;
          box-shadow: 0 0 18px rgba(255,106,0,.75);
        }
        .md-header-signal-quote span {
          color: rgba(255,226,210,.78);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .md-header-signal-quote strong {
          min-width: 0;
          color: rgba(246,248,252,.82);
          font-size: clamp(.76rem, .88vw, .92rem);
          font-weight: 760;
          letter-spacing: .01em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 0 24px rgba(255,106,0,.12);
        }
        @media (min-width: 761px) {
          .md-header-signal-quote { display: inline-flex; }
        }
        @media (min-width: 761px) and (max-width: 1120px) {
          .md-header-signal-quote { top: 12px; width: min(52vw, 520px); }
        }
        @media (min-width: 1121px) and (max-width: 1380px) {
          .md-header-signal-quote { width: min(34vw, 460px); }
          .md-header-signal-quote span { display: none; }
        }
        @media (max-width: 760px) {
          .md-header-signal-quote { display: none !important; }
        }
      `}</style>
    </div>
  );
}
