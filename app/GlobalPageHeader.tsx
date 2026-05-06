"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  ["Services", "/services"],
  ["Systems", "/systems"],
  ["TradePilot AI", "/tradepilot"],
  ["Work", "/work"],
  ["Insights", "/insights"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

function Soundbar() {
  return <span className="gph-soundbar" aria-hidden="true">{Array.from({ length: 7 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * 0.08}s` }} />)}</span>;
}

export default function GlobalPageHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="gph-header" aria-label="Marketech Digital site header">
      <Link href="/" className="gph-brand" aria-label="Go to Marketech Digital home">
        <img src="/logo.svg" alt="" />
        <strong>Marketech Digital</strong>
        <Soundbar />
      </Link>
      <nav className="gph-nav" aria-label="Main navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="gph-cta" href="/contact">Book a Consultation →</Link>
      <style jsx global>{`
        .gph-header{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:2147482500;width:min(1180px,calc(100vw - 32px));display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:18px;padding:10px 12px;border:1px solid rgba(255,255,255,.1);border-radius:26px;background:rgba(5,7,13,.72);box-shadow:0 24px 80px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.08);backdrop-filter:blur(18px) saturate(1.25);-webkit-backdrop-filter:blur(18px) saturate(1.25)}
        .gph-brand{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;min-width:max-content}.gph-brand img{width:44px;height:44px;border-radius:14px;display:block;object-fit:contain;background:rgba(255,255,255,.04)}.gph-brand strong{text-transform:uppercase;font-size:.86rem;letter-spacing:-.02em}.gph-nav{display:flex;align-items:center;justify-content:center;gap:16px;min-width:0}.gph-nav a{color:rgba(255,255,255,.72);text-decoration:none;font-size:.86rem;font-weight:750;white-space:nowrap}.gph-nav a:hover{color:#fff}.gph-cta{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,106,0,.36);border-radius:999px;padding:12px 15px;color:#fff;text-decoration:none;font-weight:850;background:rgba(255,106,0,.09);box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}
        .gph-soundbar{display:inline-flex;align-items:center;gap:3px;height:18px;filter:drop-shadow(0 0 10px rgba(255,106,0,.42))}.gph-soundbar i{display:block;width:3px;border-radius:999px;background:linear-gradient(180deg,#fff7ed,#ff7a1a 60%,#7c2d12);animation:gph-wave 1.28s ease-in-out infinite}.gph-soundbar i:nth-child(1),.gph-soundbar i:nth-child(7){height:6px}.gph-soundbar i:nth-child(2),.gph-soundbar i:nth-child(6){height:10px}.gph-soundbar i:nth-child(3),.gph-soundbar i:nth-child(5){height:14px}.gph-soundbar i:nth-child(4){height:18px}@keyframes gph-wave{0%,100%{transform:scaleY(.55);opacity:.55}50%{transform:scaleY(1);opacity:1}}
        @media(max-width:980px){.gph-header{top:10px;width:calc(100vw - 24px);grid-template-columns:1fr auto;padding:10px 11px;border-radius:22px}.gph-brand img{width:42px;height:42px}.gph-brand strong{font-size:.82rem}.gph-nav{grid-column:1/-1;order:3;justify-content:flex-start;overflow-x:auto;gap:14px;padding:2px 2px 4px;scrollbar-width:none}.gph-nav::-webkit-scrollbar{display:none}.gph-cta{padding:10px 12px;font-size:.82rem}.gph-soundbar{display:inline-flex}}
        @media(max-width:560px){.gph-header{grid-template-columns:1fr;gap:8px}.gph-brand{justify-content:flex-start}.gph-cta{display:none}.gph-nav a{font-size:.82rem}.gph-nav{padding-bottom:2px}}
      `}</style>
    </header>
  );
}
