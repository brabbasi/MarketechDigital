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
    const isSmallMark = rect.width <= 180 && rect.height <= 180;
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
    const isReasonableBrand = rect.width <= 460 && rect.height <= 180;
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
        rect.width >= 18 &&
        rect.height >= 18 &&
        rect.width <= 200 &&
        rect.height <= 200 &&
        rect.top >= 0 &&
        rect.top < Math.min(window.innerHeight * 0.48, 320) &&
        rect.left < Math.min(window.innerWidth * 0.55, 680) &&
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

function hideElement(element: HTMLElement | null | undefined) {
  if (!element || !element.isConnected) return;
  element.setAttribute("data-old-header-logo-hidden", "true");
  element.setAttribute("aria-hidden", "true");
  element.style.setProperty("display", "none", "important");
  element.style.setProperty("visibility", "hidden", "important");
  element.style.setProperty("pointer-events", "none", "important");
}

function hideBrandTextNear(rect: DOMRect) {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("header span, header strong, header em, header p, header small, nav span, nav strong, nav em, nav p, nav small"));
  nodes.forEach((node) => {
    if (node.closest(".global-dice-logo-shell") || node.closest(".md-dice-root")) return;
    const text = (node.textContent || "").replace(/\s+/g, "").trim();
    if (!/marketech|digital/i.test(text)) return;
    const nodeRect = node.getBoundingClientRect();
    const closeVertically = Math.abs(nodeRect.top - rect.top) < 110;
    const closeHorizontally = nodeRect.left < rect.right + 390 && nodeRect.right > rect.left - 80;
    if (closeVertically && closeHorizontally && nodeRect.width < 360 && nodeRect.height < 140) hideElement(node);
  });
}

function hideStaticLogos() {
  logoCandidates().forEach((element) => {
    if (isAllowedStaticLogo(element)) return;
    if (element.closest("footer") || element.closest(".ai-launcher") || element.closest(".ai-panel")) return;
    const rect = element.getBoundingClientRect();
    if (rect.width < 18 || rect.height < 18) return;
    if (rect.top < 0 || rect.top > Math.min(window.innerHeight * 0.48, 320)) return;
    if (rect.left > Math.min(window.innerWidth * 0.55, 680)) return;
    const mark = getLogoMark(element);
    const root = getBrandRoot(mark);
    hideElement(root || mark || element);
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
        hideElement(found.brandRoot || found.mark || found.logo);
        hideBrandTextNear(found.rect);
      }
      hideStaticLogos();
      setReady(true);
    };

    sync();
    const timers = [80, 300, 800, 1600, 2600, 4200, 6500].map((delay) => window.setTimeout(sync, delay));
    const observer = new MutationObserver(() => window.requestAnimationFrame(sync));
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class"] });
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
        Marketech Digital
      </a>
      <style jsx global>{`
        header a[href="/"]:has(img[src*="logo"]),
        nav a[href="/"]:has(img[src*="logo"]),
        header a[href="/"]:has(svg[aria-label*="logo" i]),
        nav a[href="/"]:has(svg[aria-label*="logo" i]),
        [data-old-header-logo-hidden="true"] {
          display: none !important;
          visibility: hidden !important;
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
          color: rgba(255, 255, 255, .96);
          font-family: inherit;
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          font-weight: 760;
          letter-spacing: -.02em;
          text-shadow: 0 0 24px rgba(255, 106, 0, .16);
          transition: color .18s ease, text-shadow .18s ease;
        }
        .global-dice-brand-wordmark:hover,
        .global-dice-brand-wordmark:focus-visible {
          color: rgba(255, 226, 210, .96);
          text-shadow: 0 0 28px rgba(255, 106, 0, .24);
          outline: none;
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
          .global-dice-brand-wordmark { font-size: .9rem; letter-spacing: -.01em; }
        }
      `}</style>
    </div>
  );
}
