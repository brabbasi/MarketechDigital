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

type DicePosition = CSSProperties & { "--dice-size"?: string };

const hiddenSelector = "[data-md-old-brand-hidden='true']";

function rectOverlaps(a: DOMRect, b: DOMRect) {
  return a.bottom > b.top && a.top < b.bottom;
}

function findMainHeader() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("header, nav, [class*='header' i], [class*='nav' i]"))
    .filter((el) => {
      if (el.closest(".global-dice-logo-shell") || el.closest(".md-dice-root")) return false;
      const rect = el.getBoundingClientRect();
      const text = (el.textContent || "").toLowerCase();
      const hasMenu = ["offers", "process", "founder", "faq", "services", "contact"].filter((word) => text.includes(word)).length >= 3;
      const hasCta = text.includes("book a consultation") || text.includes("start a conversation");
      return rect.top >= -8 && rect.top < 160 && rect.width > 260 && rect.height >= 36 && rect.height < 130 && (hasMenu || hasCta);
    })
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().height - b.getBoundingClientRect().height);

  return candidates[0] || document.querySelector<HTMLElement>("header") || document.querySelector<HTMLElement>("nav");
}

function headerPosition(header?: HTMLElement | null): DicePosition {
  const rect = header?.getBoundingClientRect();
  if (!rect) {
    return {
      position: "fixed",
      zIndex: 2147483000,
      top: "12px",
      left: "14px",
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      pointerEvents: "auto",
      "--dice-size": "52px"
    };
  }

  const size = Math.round(Math.min(Math.max(rect.height - 18, window.innerWidth < 700 ? 50 : 38), window.innerWidth < 700 ? 56 : 48));
  return {
    position: "fixed",
    zIndex: 2147483000,
    top: `${Math.round(rect.top + rect.height / 2 - (size + 22) / 2)}px`,
    left: `${Math.round(rect.left + 10)}px`,
    display: "inline-flex",
    alignItems: "center",
    gap: window.innerWidth < 700 ? "8px" : "9px",
    pointerEvents: "auto",
    "--dice-size": `${size}px`
  };
}

function hideElement(element?: HTMLElement | null) {
  if (!element || !element.isConnected || element.closest(".global-dice-logo-shell") || element.closest(".md-dice-root")) return;
  element.setAttribute("data-md-old-brand-hidden", "true");
  element.setAttribute("aria-hidden", "true");
  element.style.setProperty("display", "none", "important");
  element.style.setProperty("visibility", "hidden", "important");
  element.style.setProperty("opacity", "0", "important");
  element.style.setProperty("pointer-events", "none", "important");
}

function hideOldBrand(header?: HTMLElement | null) {
  if (!header) return;
  const headerRect = header.getBoundingClientRect();
  const leftLimit = headerRect.left + Math.min(headerRect.width * 0.36, window.innerWidth < 700 ? 260 : 185);
  const elements = Array.from(header.querySelectorAll<HTMLElement>("a, div, span, strong, em, small, p, img, svg, picture"));

  elements.forEach((el) => {
    if (el.closest(".global-dice-logo-shell") || el.closest(".md-dice-root") || el.matches(hiddenSelector)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 8 || rect.height < 8) return;
    if (!rectOverlaps(rect, headerRect)) return;
    if (rect.left > leftLimit) return;

    const text = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    const hasLogoMedia = el.tagName === "IMG" || el.tagName === "SVG" || !!el.querySelector("img,svg,picture");
    const looksLikeBrandText = text.includes("marketech") || text === "digital" || text.includes("marketech digital");
    const isLeftBrandBox = rect.left < headerRect.left + 150 && rect.width <= 230 && rect.height <= headerRect.height + 30;
    const isHomeBrandLink = el instanceof HTMLAnchorElement && (el.getAttribute("href") === "/" || el.getAttribute("href") === "#") && rect.width <= 260;

    if (hasLogoMedia || looksLikeBrandText || isHomeBrandLink || isLeftBrandBox) hideElement(el);
  });

  Array.from(document.querySelectorAll<HTMLElement>("img[src*='logo'], img[alt*='logo' i], svg[aria-label*='logo' i]")).forEach((el) => {
    if (el.closest("footer") || el.closest(".global-dice-logo-shell") || el.closest(".md-dice-root")) return;
    const rect = el.getBoundingClientRect();
    if (rect.top >= -8 && rect.top < 170 && rect.left < leftLimit + 80) hideElement(el.closest("a,div,span") as HTMLElement || el);
  });
}

export default function GlobalLogoCube() {
  const pathname = usePathname();
  const [position, setPosition] = useState<DicePosition>(headerPosition());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/founder") {
      setReady(false);
      return;
    }

    const sync = () => {
      const header = findMainHeader();
      setPosition(headerPosition(header));
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
        ${hiddenSelector} {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        .global-dice-logo-shell {
          width: max-content;
          isolation: isolate;
        }
        .global-dice-logo-shell .header-dice-nav {
          --dice-size: var(--dice-size) !important;
          flex: 0 0 auto;
        }
        .global-dice-brand-wordmark {
          display: inline-flex;
          align-items: center;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          color: rgba(255,255,255,.96);
          font-family: inherit;
          font-size: clamp(.78rem, 1.05vw, 1rem);
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
          top: calc(var(--header-menu-top, 70px)) !important;
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
