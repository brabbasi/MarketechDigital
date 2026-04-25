"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

export default function GlobalLogoCube() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
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
    <div ref={navRef} className={`global-cube-nav${open ? " is-open" : ""}${isHome ? " is-home" : ""}`}>
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
        <span className="cube-text">
          <strong>Marketech</strong>
          <span>Digital</span>
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
