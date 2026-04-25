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

type CubeAnchor = CSSProperties & {
  "--cube-size"?: string;
  "--cube-depth"?: string;
  "--cube-depth-neg"?: string;
};

function CubeLogoFace() {
  return <img src="/logo.svg" alt="Marketech Digital logo" draggable="false" />;
}

function CubeMenuFace() {
  return (
    <span className="cube-soundwave" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function findHeaderLogo() {
  const logos = Array.from(document.querySelectorAll<HTMLImageElement>('img[src*="logo"]'))
    .filter((img) => !img.closest(".global-cube-nav") && !img.closest(".ai-launcher") && !img.closest(".ai-panel"));

  const visible = logos
    .map((img) => ({ img, rect: img.getBoundingClientRect() }))
    .filter(({ img, rect }) => {
      const style = window.getComputedStyle(img);
      return rect.width >= 30 && rect.height >= 30 && rect.top >= 0 && rect.top < Math.min(window.innerHeight * 0.46, 280) && style.display !== "none";
    });

  visible.sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
  return visible[0] || null;
}

function makeAnchor(rect: DOMRect): CubeAnchor {
  const size = Math.min(Math.max(Math.max(rect.width, rect.height), 50), 70);
  const depth = size / 2;
  return {
    position: "fixed",
    top: Math.round(rect.top + rect.height / 2 - size / 2),
    left: Math.round(rect.left + rect.width / 2 - size / 2),
    width: size,
    height: size,
    "--cube-size": `${size}px`,
    "--cube-depth": `${depth}px`,
    "--cube-depth-neg": `-${depth}px`
  };
}

export default function GlobalLogoCube() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<CubeAnchor | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const anchorToHeaderLogo = () => {
      const found = findHeaderLogo();
      if (!found) {
        setAnchor(null);
        return;
      }
      setAnchor(makeAnchor(found.rect));
    };

    anchorToHeaderLogo();
    const timers = [120, 420, 900, 1600].map((delay) => window.setTimeout(anchorToHeaderLogo, delay));
    window.addEventListener("resize", anchorToHeaderLogo);
    window.addEventListener("orientationchange", anchorToHeaderLogo);
    window.addEventListener("pageshow", anchorToHeaderLogo);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", anchorToHeaderLogo);
      window.removeEventListener("orientationchange", anchorToHeaderLogo);
      window.removeEventListener("pageshow", anchorToHeaderLogo);
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
    <div ref={navRef} style={anchor || undefined} className={`global-cube-nav${open ? " is-open" : ""}${anchor ? " is-anchored" : ""}`}>
      <button
        type="button"
        className="global-cube-trigger"
        aria-label="Open Marketech Digital navigation"
        aria-expanded={open}
        aria-controls="global-cube-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="cube-scene" aria-hidden="true">
          <span className="cube-core">
            <span className="cube-face cube-front"><CubeLogoFace /></span>
            <span className="cube-face cube-back"><CubeMenuFace /></span>
            <span className="cube-face cube-right"><CubeLogoFace /></span>
            <span className="cube-face cube-left"><CubeMenuFace /></span>
            <span className="cube-face cube-top"><CubeLogoFace /></span>
            <span className="cube-face cube-bottom"><CubeMenuFace /></span>
          </span>
        </span>
      </button>

      <div id="global-cube-menu" className="global-cube-menu" role="menu" aria-label="Marketech Digital navigation">
        <div className="cube-menu-top">
          <span>Live navigation</span>
          <strong>Choose your path</strong>
        </div>
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
