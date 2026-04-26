"use client";

import { CSSProperties, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MarketechDiceNav from "@/components/MarketechDiceNav";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Offers", href: "/#offers" },
  { label: "Process", href: "/#process" },
  { label: "Founder", href: "/founder" },
  { label: "FAQ", href: "/#faq" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/#contact" }
];

type DicePosition = CSSProperties & { "--header-dice-size"?: string };

function findMainHeader() {
  const navLinks = document.querySelector<HTMLElement>(".nav-links");
  if (navLinks) {
    let current: HTMLElement | null = navLinks.parentElement;
    while (current && current !== document.body) {
      const rect = current.getBoundingClientRect();
      const text = (current.textContent || "").toLowerCase();
      if (rect.top < 180 && rect.width > 260 && rect.height >= 34 && rect.height <= 150 && (text.includes("book a consultation") || text.includes("offers"))) return current;
      current = current.parentElement;
    }
  }
  return document.querySelector<HTMLElement>("header") || document.querySelector<HTMLElement>("nav");
}

function positionFromHeader(header?: HTMLElement | null): DicePosition {
  const mobile = window.innerWidth < 700;
  const size = mobile ? 52 : 42;
  const rect = header?.getBoundingClientRect();
  return {
    position: "fixed",
    zIndex: 2147483000,
    top: rect && rect.top < 220 ? `${Math.round(rect.top + rect.height / 2 - (size + 22) / 2)}px` : mobile ? "10px" : "14px",
    left: rect && rect.left >= 0 ? `${Math.round(rect.left + (mobile ? 10 : 16))}px` : mobile ? "14px" : "18px",
    display: "inline-flex",
    alignItems: "center",
    gap: mobile ? "8px" : "10px",
    pointerEvents: "auto",
    "--header-dice-size": `${size}px`
  };
}

function hideNode(node?: HTMLElement | null) {
  if (!node || !node.isConnected) return;
  if (node.closest(".global-dice-logo-shell") || node.closest(".md-dice-root") || node.closest(".nav-links")) return;
  node.setAttribute("data-md-old-brand-hidden", "true");
  node.setAttribute("aria-hidden", "true");
  node.style.setProperty("display", "none", "important");
  node.style.setProperty("visibility", "hidden", "important");
  node.style.setProperty("opacity", "0", "important");
  node.style.setProperty("pointer-events", "none", "important");
}

function directChildOf(parent: HTMLElement, node: HTMLElement) {
  let current: HTMLElement | null = node;
  let child = node;
  while (current && current !== parent && current.parentElement) {
    child = current;
    current = current.parentElement;
  }
  return current === parent ? child : node;
}

function hideOldBrand(header?: HTMLElement | null) {
  if (!header) return;
  const headerRect = header.getBoundingClientRect();
  const navLinks = header.querySelector<HTMLElement>(".nav-links");
  const navRect = navLinks?.getBoundingClientRect();
  const stopX = navRect && navRect.width > 5 ? navRect.left : headerRect.left + Math.min(headerRect.width * 0.42, 300);

  Array.from(header.querySelectorAll<HTMLElement>("img,svg,picture,a,div,span,strong,em,p,small")).forEach((el) => {
    if (el.closest(".global-dice-logo-shell") || el.closest(".md-dice-root") || el.closest(".nav-links")) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) return;
    if (rect.left > stopX + 18 || rect.top > headerRect.bottom || rect.bottom < headerRect.top) return;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const hasLogo = el.tagName === "IMG" || el.tagName === "SVG" || el.tagName === "PICTURE" || !!el.querySelector("img,svg,picture");
    const hasBrand = text.includes("marketech") || text.includes("digital");
    const isLeftBrandArea = rect.left < headerRect.left + Math.min(190, headerRect.width * 0.35) && rect.width < 300;
    if (hasLogo || hasBrand || isLeftBrandArea) hideNode(directChildOf(header, el));
  });
}

export default function GlobalLogoCube() {
  const pathname = usePathname();
  const [position, setPosition] = useState<DicePosition>(positionFromHeader());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/founder") {
      setReady(false);
      return;
    }

    const sync = () => {
      const header = findMainHeader();
      setPosition(positionFromHeader(header));
      hideOldBrand(header);
      setReady(true);
    };

    sync();
    const timers = [60, 180, 400, 900, 1600, 2800, 5000, 8000].map((delay) => window.setTimeout(sync, delay));
    const observer = new MutationObserver(() => window.requestAnimationFrame(sync));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    window.addEventListener("pageshow", sync);

    return () => {
      timers.forEach(window.clearTimeout);
      observer.disconnect();
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, [pathname]);

  if (pathname === "/founder" || !ready) return null;

  return (
    <div className="global-dice-logo-shell" style={position}>
      <MarketechDiceNav className="header-dice-nav" navItems={navItems} homeHref="/" />
      <a className="global-dice-brand-wordmark" href="/" aria-label="Marketech Digital home">Marketech Digital</a>
      <style jsx global>{`
        [data-md-old-brand-hidden="true"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        .global-dice-logo-shell {
          width: max-content !important;
          isolation: isolate;
        }
        .global-dice-logo-shell .header-dice-nav {
          --dice-size: var(--header-dice-size) !important;
          flex: 0 0 auto !important;
          display: inline-flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        .global-dice-logo-shell .header-dice-nav .md-dice-button,
        .global-dice-logo-shell .header-dice-nav .md-dice-scene,
        .global-dice-logo-shell .header-dice-nav .md-dice-cube {
          display: inline-flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        .global-dice-brand-wordmark {
          display: inline-flex !important;
          align-items: center;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          color: rgba(255,255,255,.96);
          font-family: inherit;
          font-size: clamp(.84rem, 1.05vw, 1rem);
          font-weight: 760;
          letter-spacing: -.02em;
          text-shadow: 0 0 24px rgba(255,106,0,.16);
        }
        .global-dice-brand-wordmark:hover,
        .global-dice-brand-wordmark:focus-visible {
          color: rgba(255,226,210,.96);
          outline: none;
        }
        .global-dice-logo-shell .md-dice-menu {
          position: fixed !important;
          top: 78px !important;
          left: 14px !important;
          transform: translateY(-8px) scale(.96) !important;
          transform-origin: top left !important;
        }
        .global-dice-logo-shell .md-dice-menu.md-menu-open {
          transform: translateY(0) scale(1) !important;
        }
        @media (max-width: 700px) {
          .global-dice-brand-wordmark { font-size: .9rem; }
        }
      `}</style>
    </div>
  );
}
