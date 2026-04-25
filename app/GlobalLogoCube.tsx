"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

function findLogoHost() {
  const logos = Array.from(document.querySelectorAll<HTMLImageElement>('img[src*="logo"]'))
    .filter((img) => !img.closest(".global-cube-nav") && !img.closest(".ai-launcher") && !img.closest(".ai-panel") && !img.closest("footer"));

  const visible = logos
    .map((img) => ({ img, rect: img.getBoundingClientRect() }))
    .filter(({ img, rect }) => {
      const style = window.getComputedStyle(img);
      return rect.width >= 28 && rect.height >= 28 && rect.top >= 0 && rect.top < Math.min(window.innerHeight * 0.55, 340) && style.display !== "none";
    });

  visible.sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);
  const found = visible[0];
  if (!found) return null;

  const parent = found.img.parentElement;
  if (!parent) return null;

  const parentRect = parent.getBoundingClientRect();
  const host = parentRect.width <= 110 && parentRect.height <= 110 ? parent : found.img;
  const rect = host.getBoundingClientRect();
  return { host: host as HTMLElement, rect };
}

function cubeVars(size: number): CubeStyle {
  const safeSize = Math.min(Math.max(size, 46), 72);
  const depth = Math.round(safeSize * 0.41);
  return {
    "--cube-size": `${safeSize}px`,
    "--cube-depth": `${depth}px`,
    "--cube-depth-neg": `-${depth}px`
  };
}

function CubeMarkup({ open, setOpen, navRef, embedded, style }: { open: boolean; setOpen: (value: boolean | ((current: boolean) => boolean)) => void; navRef: React.RefObject<HTMLDivElement | null>; embedded: boolean; style?: CubeStyle }) {
  return (
    <div ref={navRef} style={style} className={`global-cube-nav${open ? " is-open" : ""}${embedded ? " is-embedded" : " is-floating"}`}>
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

export default function GlobalLogoCube() {
  const [open, setOpen] = useState(false);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [hostSize, setHostSize] = useState(58);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let activeHost: HTMLElement | null = null;

    const cleanHost = () => {
      if (activeHost) {
        activeHost.classList.remove("logo-dice-host");
        activeHost.style.position = activeHost.getAttribute("data-original-position") || "";
        activeHost.removeAttribute("data-original-position");
        activeHost = null;
      }
    };

    const attachToLogo = () => {
      const found = findLogoHost();
      if (!found) {
        cleanHost();
        setHost(null);
        return;
      }

      if (activeHost !== found.host) {
        cleanHost();
        const existingPosition = found.host.style.position;
        found.host.setAttribute("data-original-position", existingPosition);
        if (window.getComputedStyle(found.host).position === "static") found.host.style.position = "relative";
        found.host.classList.add("logo-dice-host");
        activeHost = found.host;
      }

      setHost(found.host);
      setHostSize(Math.max(found.rect.width, found.rect.height));
    };

    attachToLogo();
    const timers = [120, 420, 900, 1600].map((delay) => window.setTimeout(attachToLogo, delay));
    window.addEventListener("resize", attachToLogo);
    window.addEventListener("orientationchange", attachToLogo);
    window.addEventListener("pageshow", attachToLogo);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", attachToLogo);
      window.removeEventListener("orientationchange", attachToLogo);
      window.removeEventListener("pageshow", attachToLogo);
      cleanHost();
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

  const cube = (
    <CubeMarkup
      open={open}
      setOpen={setOpen}
      navRef={navRef}
      embedded={Boolean(host)}
      style={host ? cubeVars(hostSize) : { ...cubeVars(58) }}
    />
  );

  if (host) return createPortal(cube, host) as ReactNode;
  return cube;
}
