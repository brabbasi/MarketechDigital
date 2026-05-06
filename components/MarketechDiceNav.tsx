"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

type MarketechDiceNavProps = {
  className?: string;
  navItems?: NavItem[];
  homeHref?: string;
  onNavigate?: (href: string) => void;
};

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Systems", href: "/systems" },
  { label: "TradePilot AI", href: "/tradepilot" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const POSES = [
  "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
  "rotateX(0deg) rotateY(-90deg) rotateZ(0deg)",
  "rotateX(-90deg) rotateY(-90deg) rotateZ(0deg)",
  "rotateX(-90deg) rotateY(-180deg) rotateZ(0deg)",
  "rotateX(0deg) rotateY(90deg) rotateZ(0deg)",
  "rotateX(90deg) rotateY(90deg) rotateZ(0deg)"
];

const ACTIVE_FACE_TYPES = ["logo", "menu", "logo", "menu", "logo", "menu"] as const;
const FACES = [
  { id: "front", type: "logo", transform: "translateZ(var(--md-cube-half))" },
  { id: "back", type: "menu", transform: "rotateY(180deg) translateZ(var(--md-cube-half))" },
  { id: "right", type: "menu", transform: "rotateY(90deg) translateZ(var(--md-cube-half))" },
  { id: "left", type: "logo", transform: "rotateY(-90deg) translateZ(var(--md-cube-half))" },
  { id: "top", type: "logo", transform: "rotateX(90deg) translateZ(var(--md-cube-half))" },
  { id: "bottom", type: "menu", transform: "rotateX(-90deg) translateZ(var(--md-cube-half))" }
] as const;

function MarketechLogoMark() {
  return (
    <svg className="md-logo-svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="md-dice-orange" x1="18" y1="10" x2="82" y2="90" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffb15d" /><stop offset="0.48" stopColor="#ff7a1a" /><stop offset="1" stopColor="#ff5a00" /></linearGradient>
        <linearGradient id="md-dice-ink" x1="24" y1="20" x2="76" y2="84" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f8fafc" /><stop offset="1" stopColor="#111827" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#md-dice-orange)" strokeWidth="6.2" strokeLinecap="round" strokeDasharray="72 18 40 30 52 28" transform="rotate(-24 50 50)" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,.78)" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="50 24 38 28 30 18" transform="rotate(38 50 50)" opacity=".8" />
      <path d="M27 70V33.5c0-3.1 3.9-4.55 5.95-2.2L50 50.85 67.05 31.3C69.1 28.95 73 30.4 73 33.5V70h-11.2V51.7L52.35 62.45a3.15 3.15 0 0 1-4.7 0L38.2 51.7V70H27Z" fill="url(#md-dice-ink)" />
      <path d="M53.6 42.5h15.1V27.4l-4.8 4.8-6.3-6.3-7.55 7.55 6.3 6.3-2.75 2.75Z" fill="url(#md-dice-orange)" />
      <path d="M42.2 70 50 54.8 57.8 70h-7.1l-.7-1.65-.7 1.65h-7.1Z" fill="url(#md-dice-orange)" opacity=".92" />
    </svg>
  );
}

function SoundWaveMenuIcon({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "md-wave-icon md-wave-compact" : "md-wave-icon"} aria-hidden="true">{Array.from({ length: 7 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * 0.07}s` }} />)}</span>;
}

export default function MarketechDiceNav({ className = "", navItems = DEFAULT_NAV_ITEMS, homeHref = "/", onNavigate }: MarketechDiceNavProps) {
  const [poseIndex, setPoseIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const activeFaceType = ACTIVE_FACE_TYPES[poseIndex];

  useEffect(() => {
    if (menuOpen) return;
    const timer = window.setInterval(() => setPoseIndex((current) => (current + 1) % POSES.length), 4000);
    return () => window.clearInterval(timer);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOutside = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeEscape);
    return () => { window.removeEventListener("pointerdown", closeOutside); window.removeEventListener("keydown", closeEscape); };
  }, [menuOpen]);

  const navigateTo = (href: string) => {
    setMenuOpen(false);
    if (onNavigate) return onNavigate(href);
    window.location.href = href;
  };

  const handleDiceClick = () => {
    if (menuOpen) return setMenuOpen(false);
    if (activeFaceType === "logo") return navigateTo(homeHref);
    setMenuOpen(true);
  };

  return (
    <div ref={rootRef} className={`md-dice-root ${className}`.trim()}>
      <button type="button" className={`md-dice-button ${menuOpen ? "md-menu-is-open" : ""}`} aria-label={activeFaceType === "logo" ? "Go to Marketech Digital home" : "Open Marketech Digital navigation menu"} aria-haspopup="menu" aria-expanded={menuOpen} onClick={handleDiceClick}>
        <span className="md-dice-aura" />
        <span className="md-dice-scene"><span className="md-dice-cube" style={{ transform: POSES[poseIndex] }}>{FACES.map((face) => <span key={face.id} className={`md-dice-face md-face-${face.type}`} style={{ transform: face.transform }}><span className="md-face-shine" /><span className="md-face-grid" />{face.type === "logo" ? <><MarketechLogoMark /><SoundWaveMenuIcon compact /></> : <SoundWaveMenuIcon />}</span>)}</span></span>
      </button>
      <nav className={`md-dice-menu ${menuOpen ? "md-menu-open" : ""}`} aria-label="Marketech Digital main navigation">
        <div className="md-menu-header"><span className="md-menu-kicker">Marketech Digital</span><button type="button" className="md-menu-close" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}><span /><span /></button></div>
        <div className="md-menu-links" role="menu">{navItems.map((item, index) => <a key={item.href} href={item.href} role="menuitem" onClick={(event) => { event.preventDefault(); navigateTo(item.href); }}><span className="md-menu-index">{String(index + 1).padStart(2, "0")}</span><span className="md-menu-label">{item.label}</span><span className="md-menu-arrow">→</span></a>)}</div>
      </nav>
      <style>{`
        .md-dice-root{--dice-size:clamp(58px,5vw,76px);--md-cube-half:calc(var(--dice-size)/2);position:relative;z-index:2147483000;display:inline-flex;align-items:center;justify-content:center}.md-dice-button{position:relative;width:calc(var(--dice-size) + 22px);height:calc(var(--dice-size) + 22px);display:inline-flex;align-items:center;justify-content:center;border:0;background:transparent;padding:0;cursor:pointer;isolation:isolate;-webkit-tap-highlight-color:transparent}.md-dice-button:focus-visible{outline:2px solid rgba(255,122,26,.95);outline-offset:6px;border-radius:20px}.md-dice-aura{position:absolute;inset:4px;border-radius:999px;background:radial-gradient(circle at 50% 48%,rgba(255,122,26,.22),transparent 48%),radial-gradient(circle at 68% 22%,rgba(255,255,255,.13),transparent 32%);filter:blur(10px);opacity:.72;transform:scale(.92);transition:opacity .32s ease,transform .32s ease;pointer-events:none}.md-dice-button:hover .md-dice-aura,.md-menu-is-open .md-dice-aura{opacity:1;transform:scale(1.06)}.md-dice-scene{width:var(--dice-size);height:var(--dice-size);display:block;perspective:780px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.36))}.md-dice-cube{position:relative;width:100%;height:100%;display:block;transform-style:preserve-3d;transition:transform 1120ms cubic-bezier(.2,.84,.18,1);will-change:transform}.md-dice-face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:18px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.025) 38%,rgba(0,0,0,.22)),radial-gradient(circle at 25% 18%,rgba(255,122,26,.2),transparent 36%),linear-gradient(180deg,rgba(15,23,42,.96),rgba(5,8,15,.96));box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -18px 38px rgba(0,0,0,.42),0 0 28px rgba(255,122,26,.13);backface-visibility:hidden}.md-face-menu{background:linear-gradient(145deg,rgba(255,122,26,.2),rgba(255,255,255,.025) 36%,rgba(0,0,0,.24)),radial-gradient(circle at 62% 22%,rgba(255,122,26,.24),transparent 34%),linear-gradient(180deg,rgba(10,16,28,.98),rgba(3,6,13,.98))}.md-face-shine,.md-face-grid{position:absolute;inset:0;pointer-events:none}.md-face-shine{background:linear-gradient(120deg,transparent 12%,rgba(255,255,255,.18) 20%,transparent 36%),radial-gradient(circle at 18% 12%,rgba(255,255,255,.16),transparent 38%);mix-blend-mode:screen;opacity:.72}.md-face-grid{background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:13px 13px;mask-image:radial-gradient(circle at 50% 50%,black,transparent 74%);opacity:.38}.md-logo-svg{width:74%;height:74%;display:block;position:relative;z-index:2;filter:drop-shadow(0 0 8px rgba(255,122,26,.22))}.md-wave-icon{width:62%;height:48%;position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:4px;filter:drop-shadow(0 0 10px rgba(255,122,26,.58))}.md-wave-icon i{display:block;width:6px;min-height:8px;border-radius:999px;background:linear-gradient(180deg,#fff7ed,#ff7a1a 54%,#7c2d12);animation:md-wave-breathe 1.28s ease-in-out infinite;opacity:.92}.md-wave-icon i:nth-child(1),.md-wave-icon i:nth-child(7){height:26%}.md-wave-icon i:nth-child(2),.md-wave-icon i:nth-child(6){height:46%}.md-wave-icon i:nth-child(3),.md-wave-icon i:nth-child(5){height:74%}.md-wave-icon i:nth-child(4){height:100%}.md-wave-compact{position:absolute;right:9%;bottom:9%;width:34%;height:22%;gap:2px;background:rgba(3,6,13,.52);border:1px solid rgba(255,122,26,.22);border-radius:999px;padding:4px 6px;box-shadow:0 0 18px rgba(255,122,26,.2);backdrop-filter:blur(5px)}.md-wave-compact i{width:2px;min-height:4px}@keyframes md-wave-breathe{0%,100%{transform:scaleY(.58);opacity:.58}50%{transform:scaleY(1);opacity:1}}
        .md-dice-menu{position:absolute;top:calc(100% + 10px);left:0;min-width:286px;max-width:min(90vw,360px);padding:12px;border:1px solid rgba(255,122,26,.28);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.09),transparent 34%),radial-gradient(circle at 18% 12%,rgba(255,122,26,.2),transparent 42%),rgba(4,8,16,.88);box-shadow:0 24px 80px rgba(0,0,0,.48),0 0 38px rgba(255,122,26,.12),inset 0 1px 0 rgba(255,255,255,.12);backdrop-filter:blur(18px) saturate(1.35);-webkit-backdrop-filter:blur(18px) saturate(1.35);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-8px) scale(.96);transform-origin:top left;transition:opacity .22s ease,visibility .22s ease,transform .32s cubic-bezier(.2,.84,.18,1)}.md-menu-open{opacity:1;visibility:visible;pointer-events:auto;transform:translateY(0) scale(1)}.md-menu-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 8px 10px;border-bottom:1px solid rgba(255,255,255,.08)}.md-menu-kicker{color:rgba(255,255,255,.56);font-size:11px;font-weight:700;letter-spacing:.16em;line-height:1;text-transform:uppercase}.md-menu-close{width:34px;height:34px;position:relative;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.045);cursor:pointer;transition:transform .18s ease,border-color .18s ease,background .18s ease}.md-menu-close:hover,.md-menu-close:focus-visible{transform:rotate(90deg);border-color:rgba(255,122,26,.58);background:rgba(255,122,26,.1);outline:none}.md-menu-close span{position:absolute;left:50%;top:50%;width:15px;height:2px;border-radius:999px;background:rgba(255,255,255,.78);transform:translate(-50%,-50%) rotate(45deg)}.md-menu-close span:last-child{transform:translate(-50%,-50%) rotate(-45deg)}.md-menu-links{display:grid;gap:4px;padding-top:10px}.md-menu-links a{position:relative;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:10px;min-height:46px;padding:9px 10px;border-radius:16px;color:rgba(255,255,255,.82);text-decoration:none;overflow:hidden;transition:color .18s ease,background .18s ease,transform .18s ease}.md-menu-links a::before{content:"";position:absolute;left:8px;top:50%;width:3px;height:0;border-radius:999px;background:linear-gradient(180deg,#ffb15d,#ff7a1a);box-shadow:0 0 14px rgba(255,122,26,.72);transform:translateY(-50%);transition:height .18s ease}.md-menu-links a:hover,.md-menu-links a:focus-visible{color:#fff;background:rgba(255,122,26,.09);transform:translateX(3px);outline:none}.md-menu-links a:hover::before,.md-menu-links a:focus-visible::before{height:24px}.md-menu-index{color:rgba(255,122,26,.76);font-size:11px;font-weight:800;letter-spacing:.08em}.md-menu-label{font-size:14px;font-weight:700;letter-spacing:-.01em}.md-menu-arrow{color:rgba(255,255,255,.38);transition:color .18s ease,transform .18s ease}.md-menu-links a:hover .md-menu-arrow,.md-menu-links a:focus-visible .md-menu-arrow{color:rgba(255,122,26,.95);transform:translateX(2px)}
        @media(max-width:640px){.md-dice-root{--dice-size:60px}.md-dice-menu{position:fixed;top:82px;left:14px;right:14px;width:auto;max-width:none;min-width:0;transform:translateY(-8px) scale(.96);transform-origin:top left}.md-menu-open{transform:translateY(0) scale(1)}.md-menu-links a{min-height:50px}}
        @media(prefers-reduced-motion:reduce){.md-dice-cube,.md-dice-menu,.md-menu-links a,.md-dice-aura,.md-menu-close,.md-menu-arrow{transition-duration:1ms!important}.md-wave-icon i{animation:none!important;opacity:.9;transform:scaleY(.82)}}
      `}</style>
    </div>
  );
}
