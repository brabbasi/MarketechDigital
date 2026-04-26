"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

type Props = {
  className?: string;
  navItems?: NavItem[];
  homeHref?: string;
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" }
];

const poses = [
  { transform: "rotateX(0deg) rotateY(0deg)", type: "logo" },
  { transform: "rotateX(0deg) rotateY(-90deg)", type: "menu" },
  { transform: "rotateX(-90deg) rotateY(0deg)", type: "logo" },
  { transform: "rotateX(0deg) rotateY(-180deg)", type: "menu" },
  { transform: "rotateX(0deg) rotateY(90deg)", type: "logo" },
  { transform: "rotateX(90deg) rotateY(0deg)", type: "menu" }
] as const;

const faces = [
  ["front", "logo", "translateZ(var(--half))"],
  ["right", "menu", "rotateY(90deg) translateZ(var(--half))"],
  ["top", "logo", "rotateX(90deg) translateZ(var(--half))"],
  ["back", "menu", "rotateY(180deg) translateZ(var(--half))"],
  ["left", "logo", "rotateY(-90deg) translateZ(var(--half))"],
  ["bottom", "menu", "rotateX(-90deg) translateZ(var(--half))"]
] as const;

function LogoMark() {
  return (
    <svg className="mdn-logo" viewBox="0 0 100 100" aria-hidden="true">
      <defs><linearGradient id="mdn-orange" x1="18" y1="8" x2="84" y2="90"><stop stopColor="#ffb15d"/><stop offset=".55" stopColor="#ff7a1a"/><stop offset="1" stopColor="#ff5a00"/></linearGradient></defs>
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#mdn-orange)" strokeWidth="6" strokeLinecap="round" strokeDasharray="72 20 44 28 52 30" transform="rotate(-24 50 50)"/>
      <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="50 24 38 28 30 18" transform="rotate(38 50 50)"/>
      <path d="M27 70V33.5c0-3.1 3.9-4.55 5.95-2.2L50 50.85 67.05 31.3C69.1 28.95 73 30.4 73 33.5V70H61.8V51.7L52.35 62.45a3.15 3.15 0 0 1-4.7 0L38.2 51.7V70H27Z" fill="rgba(255,255,255,.92)"/>
      <path d="M53.6 42.5h15.1V27.4l-4.8 4.8-6.3-6.3-7.55 7.55 6.3 6.3-2.75 2.75ZM42.2 70 50 54.8 57.8 70h-7.1l-.7-1.65-.7 1.65h-7.1Z" fill="url(#mdn-orange)"/>
    </svg>
  );
}

function WaveMenu() {
  return <span className="mdn-wave" aria-hidden="true">{Array.from({ length: 7 }).map((_, i) => <i key={i} style={{ animationDelay: `${i * 70}ms` }} />)}</span>;
}

export default function MarketechDiceNavFixed({ className = "", navItems = DEFAULT_NAV_ITEMS, homeHref = "/" }: Props) {
  const [pose, setPose] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) return;
    const id = window.setInterval(() => setPose((p) => (p + 1) % poses.length), 4000);
    return () => window.clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("pointerdown", outside);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.location.href = href;
  };

  const clickDice = () => {
    if (open) return setOpen(false);
    if (poses[pose].type === "logo") return go(homeHref);
    setOpen(true);
  };

  return (
    <div ref={rootRef} className={`mdn-root ${className}`.trim()}>
      <button className="mdn-button" type="button" onClick={clickDice} aria-label={poses[pose].type === "logo" ? "Go to Marketech Digital home" : "Open Marketech Digital menu"} aria-expanded={open} aria-haspopup="menu">
        <span className="mdn-aura" />
        <span className="mdn-scene"><span className="mdn-cube" style={{ transform: poses[pose].transform }}>{faces.map(([id, type, transform]) => <span key={id} className={`mdn-face mdn-${type}`} style={{ transform }}>{type === "logo" ? <LogoMark /> : <WaveMenu />}</span>)}</span></span>
      </button>
      <nav className={`mdn-panel ${open ? "is-open" : ""}`} aria-label="Marketech Digital navigation">
        <div className="mdn-panel-head"><span>Marketech Digital</span><button type="button" onClick={() => setOpen(false)} aria-label="Close menu">×</button></div>
        {navItems.map((item, index) => <a key={`${item.href}-${item.label}`} href={item.href} onClick={(e) => { e.preventDefault(); go(item.href); }}><small>{String(index + 1).padStart(2, "0")}</small>{item.label}<b>→</b></a>)}
      </nav>
      <style jsx>{`
        .mdn-root{--dice-size:clamp(58px,5vw,76px);--half:calc(var(--dice-size)/2);position:relative;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center}.mdn-button{position:relative;width:calc(var(--dice-size) + 22px);height:calc(var(--dice-size) + 22px);border:0;background:transparent;padding:0;cursor:pointer}.mdn-button:focus-visible{outline:2px solid rgba(255,122,26,.95);outline-offset:6px;border-radius:20px}.mdn-aura{position:absolute;inset:4px;border-radius:999px;background:radial-gradient(circle,rgba(255,122,26,.24),transparent 58%);filter:blur(10px)}.mdn-scene{width:var(--dice-size);height:var(--dice-size);display:block;perspective:760px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.36))}.mdn-cube{position:relative;width:100%;height:100%;display:block;transform-style:preserve-3d;transition:transform 1120ms cubic-bezier(.2,.84,.18,1)}.mdn-face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:18px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.025) 38%,rgba(0,0,0,.22)),radial-gradient(circle at 25% 18%,rgba(255,122,26,.2),transparent 36%),linear-gradient(180deg,rgba(15,23,42,.96),rgba(5,8,15,.96));box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -18px 38px rgba(0,0,0,.42),0 0 28px rgba(255,122,26,.13);backface-visibility:hidden}.mdn-menu{background:linear-gradient(145deg,rgba(255,122,26,.2),rgba(255,255,255,.025) 36%,rgba(0,0,0,.24)),linear-gradient(180deg,rgba(10,16,28,.98),rgba(3,6,13,.98))}.mdn-logo{width:76%;height:76%;filter:drop-shadow(0 0 8px rgba(255,122,26,.22))}.mdn-wave{width:62%;height:48%;display:flex;align-items:center;justify-content:center;gap:4px;filter:drop-shadow(0 0 10px rgba(255,122,26,.58))}.mdn-wave i{display:block;width:6px;min-height:8px;border-radius:999px;background:linear-gradient(180deg,#fff7ed,#ff7a1a 54%,#7c2d12);animation:wave 1.28s ease-in-out infinite}.mdn-wave i:nth-child(1),.mdn-wave i:nth-child(7){height:26%}.mdn-wave i:nth-child(2),.mdn-wave i:nth-child(6){height:46%}.mdn-wave i:nth-child(3),.mdn-wave i:nth-child(5){height:74%}.mdn-wave i:nth-child(4){height:100%}@keyframes wave{0%,100%{transform:scaleY(.58);opacity:.58}50%{transform:scaleY(1);opacity:1}}.mdn-panel{position:absolute;top:calc(100% + 10px);left:50%;min-width:286px;max-width:min(90vw,360px);padding:12px;border:1px solid rgba(255,122,26,.28);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.09),transparent 34%),radial-gradient(circle at 18% 12%,rgba(255,122,26,.2),transparent 42%),rgba(4,8,16,.9);box-shadow:0 24px 80px rgba(0,0,0,.48),0 0 38px rgba(255,122,26,.12),inset 0 1px 0 rgba(255,255,255,.12);backdrop-filter:blur(18px);opacity:0;visibility:hidden;pointer-events:none;transform:translateX(-50%) translateY(-8px) scale(.96);transform-origin:top center;transition:.28s}.mdn-panel.is-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0) scale(1)}.mdn-panel-head{display:flex;align-items:center;justify-content:space-between;padding:8px 8px 10px;border-bottom:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.56);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.mdn-panel-head button{width:34px;height:34px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.045);color:#fff;font-size:22px;cursor:pointer}.mdn-panel a{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:10px;min-height:46px;padding:9px 10px;border-radius:16px;color:rgba(255,255,255,.82);text-decoration:none;font-weight:750}.mdn-panel a:hover,.mdn-panel a:focus-visible{color:#fff;background:rgba(255,122,26,.09);outline:none}.mdn-panel small{color:rgba(255,122,26,.76);font-weight:900}.mdn-panel b{color:rgba(255,255,255,.38)}@media(max-width:640px){.mdn-root{--dice-size:54px}.mdn-panel{position:fixed;top:82px;left:50%;width:min(calc(100vw - 28px),360px);min-width:0}}@media(prefers-reduced-motion:reduce){.mdn-cube,.mdn-panel{transition-duration:1ms}.mdn-wave i{animation:none}}
      `}</style>
    </div>
  );
}
