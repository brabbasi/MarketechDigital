"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", detail: "Main page" },
  { href: "/services", label: "Services", detail: "Full service hub" },
  { href: "/services#core-services", label: "Core services", detail: "Web, AI, software, SEO" },
  { href: "/services#starter-systems", label: "Starter systems", detail: "Focused entry builds" },
  { href: "/services#idea-generator", label: "Idea helper", detail: "Find the first useful step" },
  { href: "/founder", label: "Founder", detail: "Basit Abbasi profile" },
  { href: "/#contact", label: "Contact", detail: "Start a conversation" }
];

type DiceStyle = CSSProperties & {
  "--cube-size"?: string;
  "--cube-menu-top"?: string;
  "--cube-menu-left"?: string;
};

function findPrimaryLogo() {
  const logos = Array.from(document.querySelectorAll<HTMLImageElement>('img[src*="logo"]'));
  const candidates = logos
    .filter((img) => !img.closest(".global-cube-nav") && !img.closest(".ai-launcher") && !img.closest(".ai-panel") && !img.closest("footer"))
    .map((img) => ({ img, rect: img.getBoundingClientRect() }))
    .filter(({ img, rect }) => {
      const style = window.getComputedStyle(img);
      return rect.width >= 28 && rect.height >= 28 && rect.top >= 0 && rect.top < Math.min(window.innerHeight * 0.55, 340) && style.display !== "none";
    })
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

  return candidates[0] || null;
}

function makeStyle(rect?: DOMRect): DiceStyle {
  if (!rect) {
    return {
      top: "calc(env(safe-area-inset-top, 0px) + 18px)",
      left: "calc(env(safe-area-inset-left, 0px) + 18px)",
      "--cube-size": "58px",
      "--cube-menu-top": "82px",
      "--cube-menu-left": "18px"
    };
  }

  const size = Math.min(Math.max(Math.max(rect.width, rect.height), 54), 70);
  const top = Math.round(rect.top + rect.height / 2 - size / 2);
  const left = Math.round(rect.left + rect.width / 2 - size / 2);

  return {
    top: `${top}px`,
    left: `${left}px`,
    "--cube-size": `${size}px`,
    "--cube-menu-top": `${top + size + 12}px`,
    "--cube-menu-left": `${Math.max(12, Math.min(left, window.innerWidth - 324))}px`
  };
}

export default function GlobalLogoCube() {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<DiceStyle>(makeStyle());
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const placeDice = () => {
      const found = findPrimaryLogo();
      setStyle(makeStyle(found?.rect));
    };

    placeDice();
    const timers = [100, 350, 850, 1500].map((delay) => window.setTimeout(placeDice, delay));
    window.addEventListener("resize", placeDice);
    window.addEventListener("orientationchange", placeDice);
    window.addEventListener("pageshow", placeDice);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", placeDice);
      window.removeEventListener("orientationchange", placeDice);
      window.removeEventListener("pageshow", placeDice);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={navRef} style={style} className={`global-cube-nav${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="global-cube-trigger"
        aria-label="Open Marketech Digital navigation"
        aria-expanded={open}
        aria-controls="global-cube-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="logo-dice" aria-hidden="true">
          <span className="dice-face dice-logo-face"><img src="/logo.svg" alt="" draggable="false" /></span>
          <span className="dice-face dice-wave-face"><span className="cube-soundwave"><i /><i /><i /><i /><i /></span></span>
          <span className="dice-edge dice-edge-one" />
          <span className="dice-edge dice-edge-two" />
        </span>
      </button>

      <div id="global-cube-menu" className="global-cube-menu" role="menu" aria-label="Marketech Digital navigation">
        <div className="cube-menu-top"><span>Live navigation</span><strong>Choose your path</strong></div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} role="menuitem" onClick={() => setOpen(false)}>
            <span>{item.label}</span>
            <em>{item.detail}</em>
          </Link>
        ))}
      </div>
    </div>
  );
}
