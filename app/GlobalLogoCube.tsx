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

type CubeStyle = CSSProperties & {
  "--cube-size"?: string;
  "--cube-depth"?: string;
  "--cube-depth-neg"?: string;
};

function CubeLogoFace() {
  return <img src="/logo.svg" alt="Marketech Digital logo" draggable="false" />;
}

function CubeMenuFace() {
  return <span className="cube-soundwave" aria-hidden="true"><i /><i /><i /><i /><i /></span>;
}

function cubeVars(size: number): CubeStyle {
  const safeSize = Math.min(Math.max(size, 50), 68);
  const depth = Math.round(safeSize * 0.41);
  return {
    "--cube-size": `${safeSize}px`,
    "--cube-depth": `${depth}px`,
    "--cube-depth-neg": `-${depth}px`
  };
}

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

export default function GlobalLogoCube() {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CubeStyle>({ ...cubeVars(58), top: "18px", left: "18px" });
  const navRef = useRef<HTMLDivElement | null>(null);
  const replacedLogoRef = useRef<HTMLImageElement | null>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const restoreLogo = () => {
      if (!replacedLogoRef.current) return;
      replacedLogoRef.current.style.opacity = "";
      replacedLogoRef.current.style.pointerEvents = "";
      replacedLogoRef.current = null;
    };

    const placeDice = () => {
      const found = findPrimaryLogo();
      if (!found) {
        restoreLogo();
        setStyle({ ...cubeVars(58), top: "calc(env(safe-area-inset-top, 0px) + 18px)", left: "calc(env(safe-area-inset-left, 0px) + 18px)" });
        return;
      }
      if (replacedLogoRef.current !== found.img) restoreLogo();
      found.img.style.opacity = "0";
      found.img.style.pointerEvents = "none";
      replacedLogoRef.current = found.img;

      const size = Math.min(Math.max(Math.max(found.rect.width, found.rect.height), 50), 68);
      setStyle({
        ...cubeVars(size),
        top: `${Math.round(found.rect.top + found.rect.height / 2 - size / 2)}px`,
        left: `${Math.round(found.rect.left + found.rect.width / 2 - size / 2)}px`
      });
    };

    placeDice();
    const timers = [120, 420, 900, 1600].map((delay) => window.setTimeout(placeDice, delay));
    window.addEventListener("resize", placeDice);
    window.addEventListener("orientationchange", placeDice);
    window.addEventListener("pageshow", placeDice);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", placeDice);
      window.removeEventListener("orientationchange", placeDice);
      window.removeEventListener("pageshow", placeDice);
      restoreLogo();
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
      <button type="button" className="global-cube-trigger" aria-label="Open Marketech Digital navigation" aria-expanded={open} aria-controls="global-cube-menu" onClick={() => setOpen((value) => !value)}>
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
        <div className="cube-menu-top"><span>Live navigation</span><strong>Choose your path</strong></div>
        {navItems.map((item) => <Link key={item.href} href={item.href} role="menuitem" onClick={() => setOpen(false)}><span>{item.label}</span><em>{item.detail}</em></Link>)}
      </div>
    </div>
  );
}
