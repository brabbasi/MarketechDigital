"use client";

import { usePathname } from "next/navigation";
import MarketechDiceNav from "@/components/MarketechDiceNav";

const pageNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Systems", href: "/systems" },
  { label: "TradePilot AI", href: "/tradepilot" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/contact" }
];

export default function GlobalPageHeader() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/about" || pathname === "/founder") return null;

  return (
    <header className="standard-page-header-shell">
      <nav className="standard-page-header" aria-label="Marketech Digital page navigation">
        <div className="standard-page-brand">
          <MarketechDiceNav className="standard-page-dice" navItems={pageNavItems} homeHref="/" />
          <span className="standard-page-brand-text">Marketech Digital</span>
          <span className="standard-page-soundbar" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />)}
          </span>
        </div>
      </nav>
      <style jsx global>{`
        .standard-page-header-shell {
          position: sticky !important;
          top: 0 !important;
          z-index: 2147482000 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 10px max(14px, env(safe-area-inset-left)) 10px max(14px, env(safe-area-inset-right)) !important;
          background: linear-gradient(180deg, rgba(4,7,13,.96), rgba(4,7,13,.72)) !important;
          border-bottom: 1px solid rgba(255,255,255,.07) !important;
          backdrop-filter: blur(18px) saturate(1.25) !important;
          -webkit-backdrop-filter: blur(18px) saturate(1.25) !important;
          overflow: visible !important;
        }
        .standard-page-header {
          width: min(1240px, calc(100vw - 28px)) !important;
          margin: 0 auto !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          min-width: 0 !important;
          overflow: visible !important;
        }
        .standard-page-brand {
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          min-width: 0 !important;
          max-width: 100% !important;
          position: relative !important;
          z-index: 2147482500 !important;
        }
        .standard-page-dice {
          --dice-size: 52px !important;
          flex: 0 0 auto !important;
        }
        .standard-page-brand-text {
          color: rgba(255,255,255,.96) !important;
          font-size: clamp(.88rem, 1.2vw, 1rem) !important;
          font-weight: 820 !important;
          line-height: 1 !important;
          letter-spacing: .11em !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          text-shadow: 0 0 24px rgba(255,106,0,.16) !important;
        }
        .standard-page-soundbar {
          display: inline-flex !important;
          align-items: center !important;
          gap: 3px !important;
          height: 18px !important;
          flex: 0 0 auto !important;
          filter: drop-shadow(0 0 10px rgba(255,106,0,.42)) !important;
        }
        .standard-page-soundbar i {
          display: block !important;
          width: 3px !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg,#fff7ed,#ff7a1a 60%,#7c2d12) !important;
          animation: md-standard-header-wave 1.28s ease-in-out infinite !important;
        }
        .standard-page-soundbar i:nth-child(1), .standard-page-soundbar i:nth-child(7) { height: 6px !important; }
        .standard-page-soundbar i:nth-child(2), .standard-page-soundbar i:nth-child(6) { height: 10px !important; }
        .standard-page-soundbar i:nth-child(3), .standard-page-soundbar i:nth-child(5) { height: 14px !important; }
        .standard-page-soundbar i:nth-child(4) { height: 18px !important; }
        @keyframes md-standard-header-wave { 0%,100% { transform: scaleY(.55); opacity: .55; } 50% { transform: scaleY(1); opacity: 1; } }
        .standard-page-header-shell .md-dice-root,
        .standard-page-header-shell .md-dice-menu {
          z-index: 2147483000 !important;
        }
        @media (max-width: 700px) {
          .standard-page-header-shell { padding-top: 8px !important; padding-bottom: 8px !important; }
          .standard-page-header { width: min(100%, calc(100vw - 20px)) !important; }
          .standard-page-brand { gap: 8px !important; }
          .standard-page-dice { --dice-size: 50px !important; }
          .standard-page-brand-text { max-width: calc(100vw - 150px) !important; font-size: .82rem !important; letter-spacing: .08em !important; }
          .standard-page-soundbar { display: none !important; }
        }
      `}</style>
    </header>
  );
}
