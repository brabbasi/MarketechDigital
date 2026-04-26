"use client";

import { CSSProperties, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MarketechDiceNav from "@/components/MarketechDiceNav";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Core services", href: "/services#core-services" },
  { label: "Starter systems", href: "/services#starter-systems" },
  { label: "Idea helper", href: "/services#idea-generator" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" }
];

type DicePosition = CSSProperties & {
  "--dice-size"?: string;
};

function isAllowedStaticLogo(element: HTMLElement) {
  if (element.closest(".md-dice-root") || element.closest(".global-dice-logo-shell")) return true;

  let current: HTMLElement | null = element;
  for (let i = 0; i < 8 && current; i++) {
    const text = (current.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (text.includes("strategy, systems") && text.includes("serious growth")) return true;
    if (text.includes("clarity built for serious growth")) return true;
    current = current.parentElement;
  }

  return false;
}

function logoCandidates() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'img[src*="logo"], img[alt*="logo" i], svg[aria-label*="logo" i], header svg, nav svg, a[href="/"] svg'
    )
  );
}

function getLogoMark(element: HTMLElement) {
  let mark: HTMLElement = element;
  let current = element.parentElement;

  while (current && current !== document.body) {
    if (current.closest(".md-dice-root") || current.closest(".global-dice-logo-shell")) break;
    const rect = current.getBoundingClientRect();
    const text = (current.textContent || "").replace(/\s+/g, "").trim();
    const isSmallMark = rect.width <= 140 && rect.height <= 140;
    const isBrandTextContainer = text.length > 3 && /marketech|digital/i.test(text);

    if (isSmallMark && !isBrandTextContainer) {
      mark = current;
      current = current.parentElement;
      continue;
    }
    break;
  }

  return mark;
}

function getBrandRoot(mark: HTMLElement) {
  let current: HTMLElement | null = mark;
  let best: HTMLElement = mark;

  while (current && current !== document.body) {
    if (current.closest(".md-dice-root") || current.closest(".global-dice-logo-shell")) break;
    const rect = current.getBoundingClientRect();
    const text = (current.textContent || "").replace(/\s+/g, "").trim();
    const isReasonableBrand = rect.width <= 390 && rect.height <= 140;
    const hasBrandText = /marketech|digital/i.test(text);
    const isHomeLink = current instanceof HTMLAnchorElement && current.getAttribute("href") === "/";

    if (isReasonableBrand && (hasBrandText || isHomeLink)) best = current;
    current = current.parentElement;
  }

  return best;
}

function findHeaderLogo() {
  const candidates = logoCandidates()
    .filter((element) => {
      if (isAllowedStaticLogo(element)) return false;
      if (element.closest("footer") || element.closest(".ai-launcher") || element.closest(".ai-panel")) return false;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return (
        rect.width >= 22 &&
        rect.height >= 22 &&
        rect.width <= 150 &&
        rect.height <= 150 &&
        rect.top >= 0 &&
        rect.top < Math.min(window.innerHeight * 0.48, 260) &&
        rect.left < Math.min(window.innerWidth * 0.48, 560) &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    })
    .map((logo) => {
      const mark = getLogoMark(logo);
      const brandRoot = getBrandRoot(mark);
      return { logo, mark, brandRoot, rect: mark.getBoundingClientRect() };
    })
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

  return candidates[0] || null;
}

function positionFromRect(rect?: DOMRect): DicePosition {
  if (!rect) {
    return {
      position: "absolute",
      zIndex: 2147483000,
      top: "18px",
      left: "18px",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      pointerEvents: "auto",
      "--dice-size": "56px"
    };
  }

  const size = Math.min(Math.max(Math.max(rect.width, rect.height), 54), 66);
  return {
    position: "absolute",
    zIndex: 2147483000,
    top: `${Math.round(window.scrollY + rect.top + rect.height / 2 - (size + 22) / 2)}px`,
    left: `${Math.round(window.scrollX + rect.left + rect.width / 2 - (size + 22) / 2)}px`,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    pointerEvents: "auto",
    "--dice-size": `${size}px`
  };
}

function removeBrandTextNear(rect: DOMRect) {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("header span, header strong, header em, header p, header small, nav span, nav strong, nav em, nav p, nav small"));
  nodes.forEach((node) => {
    if (node.closest(".global-dice-logo-shell") || node.closest(".md-dice-root")) return;
    const text = (node.textContent || "").replace(/\s+/g, "").trim();
    if (!/marketech|digital/i.test(text)) return;
    const nodeRect = node.getBoundingClientRect();
    const closeVertically = Math.abs(nodeRect.top - rect.top) < 90;
    const closeHorizontally = nodeRect.left < rect.right + 330 && nodeRect.right > rect.left - 60;
    if (closeVertically && closeHorizontally && nodeRect.width < 280 && nodeRect.height < 100) node.remove();
  });
}

function removeStaticLogos() {
  logoCandidates().forEach((element) => {
    if (isAllowedStaticLogo(element)) return;
    if (element.closest("footer") || element.closest(".ai-launcher") || element.closest(".ai-panel")) return;
    const rect = element.getBoundingClientRect();
    if (rect.width < 18 || rect.height < 18) return;
    const mark = getLogoMark(element);
    const root = getBrandRoot(mark);
    const target = root || mark || element;
    if (target.isConnected) target.remove();
  });
}

export default function GlobalLogoCube() {
  const pathname = usePathname();
  const [position, setPosition] = useState<DicePosition>(positionFromRect());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/founder") {
      setReady(false);
      return;
    }

    const sync = () => {
      const found = findHeaderLogo();
      if (found) {
        setPosition(positionFromRect(found.rect));
        const rect = found.rect;
        const target = found.brandRoot || found.mark || found.logo;
        if (target?.isConnected) target.remove();
        removeBrandTextNear(rect);
      }
      removeStaticLogos();
      setReady(true);
    };

    sync();
    const timers = [80, 300, 800, 1600, 2600].map((delay) => window.setTimeout(sync, delay));
    const observer = new MutationObserver(() => window.requestAnimationFrame(sync));
    observer.observe(document.body, { childList: true, subtree: true });
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
      <a className="global-dice-brand-wordmark" href="/" aria-label="Marketech Digital home">
        <strong>MARKETECH</strong>
        <em>DIGITAL</em>
      </a>
      <style jsx global>{`
        .global-dice-logo-shell {
          width: max-content;
          isolation: isolate;
        }
        .global-dice-logo-shell .header-dice-nav {
          --dice-size: var(--dice-size) !important;
          flex: 0 0 auto;
        }
        .global-dice-brand-wordmark {
          display: grid;
          gap: 4px;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          text-shadow: 0 0 24px rgba(255, 106, 0, .16);
        }
        .global-dice-brand-wordmark strong {
          color: rgba(255, 255, 255, .96);
          font-size: clamp(.78rem, 1.18vw, 1rem);
          font-weight: 900;
          letter-spacing: .24em;
        }
        .global-dice-brand-wordmark em {
          color: rgba(255, 226, 210, .76);
          font-style: normal;
          font-size: clamp(.48rem, .78vw, .64rem);
          font-weight: 760;
          letter-spacing: .36em;
        }
        @media (min-width: 641px) {
          .global-dice-logo-shell .md-dice-menu {
            position: fixed !important;
            top: 92px !important;
            left: 22px !important;
            transform: translateY(-8px) scale(.96) !important;
            transform-origin: top left !important;
          }
          .global-dice-logo-shell .md-dice-menu.md-menu-open {
            transform: translateY(0) scale(1) !important;
          }
        }
        @media (max-width: 640px) {
          .global-dice-logo-shell { gap: 8px !important; }
          .global-dice-logo-shell .header-dice-nav { --dice-size: 54px !important; }
          .global-dice-brand-wordmark strong { font-size: .78rem; letter-spacing: .18em; }
          .global-dice-brand-wordmark em { font-size: .48rem; letter-spacing: .25em; }
        }
      `}</style>
    </div>
  );
}
