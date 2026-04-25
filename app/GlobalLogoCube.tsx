"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

type LogoTarget = {
  logo: HTMLElement;
  mark: HTMLElement;
  brandRoot: HTMLElement;
};

function logoCandidates() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'img[src*="logo"], img[alt*="logo" i], svg[aria-label*="logo" i], header svg, nav svg, a[href="/"] svg'
    )
  );
}

function isAllowedStaticLogo(element: HTMLElement) {
  if (element.closest(".md-dice-root") || element.closest(".global-dice-brand-host")) return true;

  let current: HTMLElement | null = element;
  for (let i = 0; i < 7 && current; i++) {
    const text = (current.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (text.includes("strategy, systems") && text.includes("serious growth")) return true;
    if (text.includes("clarity built for serious growth")) return true;
    current = current.parentElement;
  }

  return false;
}

function getLogoMark(element: HTMLElement) {
  let mark: HTMLElement = element;
  let current = element.parentElement;

  while (current && current !== document.body) {
    if (current.closest(".md-dice-root") || current.closest(".global-dice-brand-host")) break;
    const rect = current.getBoundingClientRect();
    const text = (current.textContent || "").replace(/\s+/g, "").trim();
    const isSmallMark = rect.width <= 126 && rect.height <= 126;
    const isTextContainer = text.length > 3 && /marketech|digital/i.test(text);

    if (isSmallMark && !isTextContainer) {
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
    if (current.closest(".md-dice-root") || current.closest(".global-dice-brand-host")) break;
    const rect = current.getBoundingClientRect();
    const text = (current.textContent || "").replace(/\s+/g, "").trim();
    const isReasonableBrand = rect.width <= 360 && rect.height <= 130;
    const hasBrandText = /marketech|digital/i.test(text);
    const isHomeLink = current instanceof HTMLAnchorElement && current.getAttribute("href") === "/";

    if (isReasonableBrand && (hasBrandText || isHomeLink)) best = current;
    current = current.parentElement;
  }

  return best;
}

function findHeaderLogo(): LogoTarget | null {
  const candidates = logoCandidates()
    .filter((element) => {
      if (isAllowedStaticLogo(element)) return false;
      if (element.closest("footer") || element.closest(".ai-launcher") || element.closest(".ai-panel")) return false;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return (
        rect.width >= 24 &&
        rect.height >= 24 &&
        rect.width <= 140 &&
        rect.height <= 140 &&
        rect.top >= 0 &&
        rect.top < Math.min(window.innerHeight * 0.5, 260) &&
        rect.left < Math.min(window.innerWidth * 0.45, 520) &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    })
    .map((logo) => {
      const mark = getLogoMark(logo);
      return { logo, mark, brandRoot: getBrandRoot(mark), rect: mark.getBoundingClientRect() };
    })
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

  return candidates[0] || null;
}

function removeNearbyBrandText(rect: DOMRect) {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("header span, header strong, header em, header p, header small, nav span, nav strong, nav em, nav p, nav small"));
  nodes.forEach((node) => {
    if (node.closest(".global-dice-brand-host") || node.closest(".md-dice-root")) return;
    const text = (node.textContent || "").replace(/\s+/g, "").trim();
    if (!/marketech|digital/i.test(text)) return;

    const nodeRect = node.getBoundingClientRect();
    const closeVertically = Math.abs(nodeRect.top - rect.top) < 80;
    const closeHorizontally = nodeRect.left < rect.right + 320 && nodeRect.right > rect.left - 40;
    if (closeVertically && closeHorizontally && nodeRect.width < 260 && nodeRect.height < 90) {
      node.remove();
    }
  });
}

function removeExtraLogos(except?: HTMLElement | null) {
  logoCandidates().forEach((element) => {
    if (except && (element === except || except.contains(element) || element.contains(except))) return;
    if (isAllowedStaticLogo(element)) return;
    if (element.closest("footer") || element.closest(".ai-launcher") || element.closest(".ai-panel")) return;

    const rect = element.getBoundingClientRect();
    if (rect.width < 18 || rect.height < 18) return;

    const mark = getLogoMark(element);
    if (mark.isConnected) mark.remove();
    else if (element.isConnected) element.remove();
  });
}

function findFounderMenuButton() {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("button, summary, [role='button'], details"));
  return candidates
    .filter((element) => !element.closest(".md-dice-root") && !element.closest(".global-dice-brand-host"))
    .map((element) => ({ element, rect: element.getBoundingClientRect(), text: (element.textContent || element.getAttribute("aria-label") || "").toLowerCase() }))
    .filter(({ rect, text }) => {
      const topRight = rect.width >= 34 && rect.height >= 34 && rect.top >= 0 && rect.top < 170 && rect.left > window.innerWidth * 0.55;
      const notConsultation = !text.includes("consult") && !text.includes("book") && !text.includes("start") && !text.includes("service");
      return topRight && notConsultation;
    })
    .sort((a, b) => b.rect.right - a.rect.right)[0] || null;
}

function installFounderCta(pathname: string, existingHost: HTMLElement | null) {
  if (pathname !== "/founder") return null;
  if (existingHost?.isConnected) return existingHost;

  const menu = findFounderMenuButton();
  if (!menu?.element.parentElement) return null;

  const host = document.createElement("span");
  host.className = "founder-consultation-host";
  menu.element.parentElement.insertBefore(host, menu.element);
  menu.element.remove();
  return host;
}

function installDiceBrand(existingHost: HTMLElement | null) {
  if (existingHost?.isConnected) {
    removeExtraLogos(existingHost);
    return existingHost;
  }

  const found = findHeaderLogo();
  if (!found) return null;

  const host = document.createElement("span");
  host.className = "global-dice-brand-host";

  const parent = found.brandRoot.parentElement || found.mark.parentElement;
  const replaceTarget = found.brandRoot || found.mark;
  if (!parent) return null;

  parent.insertBefore(host, replaceTarget);
  const rect = found.mark.getBoundingClientRect();
  replaceTarget.remove();
  removeNearbyBrandText(rect);
  removeExtraLogos(host);

  return host;
}

export default function GlobalLogoCube() {
  const [brandHost, setBrandHost] = useState<HTMLElement | null>(null);
  const [founderCtaHost, setFounderCtaHost] = useState<HTMLElement | null>(null);
  const brandHostRef = useRef<HTMLElement | null>(null);
  const founderHostRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const sync = () => {
      const nextBrandHost = installDiceBrand(brandHostRef.current);
      if (nextBrandHost !== brandHostRef.current) {
        brandHostRef.current = nextBrandHost;
        setBrandHost(nextBrandHost);
      }

      const nextFounderHost = installFounderCta(pathname, founderHostRef.current);
      if (pathname !== "/founder" && founderHostRef.current?.isConnected) {
        founderHostRef.current.remove();
        founderHostRef.current = null;
        setFounderCtaHost(null);
      } else if (nextFounderHost !== founderHostRef.current) {
        founderHostRef.current = nextFounderHost;
        setFounderCtaHost(nextFounderHost);
      }
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

  return (
    <>
      {brandHost
        ? createPortal(
            <span className="global-dice-brand-shell">
              <MarketechDiceNav className="header-dice-nav" navItems={navItems} homeHref="/" />
              <a className="global-dice-brand-wordmark" href="/" aria-label="Marketech Digital home">
                <strong>MARKETECH</strong>
                <em>DIGITAL</em>
              </a>
            </span>,
            brandHost
          )
        : null}
      {founderCtaHost
        ? createPortal(
            <a className="founder-consultation-replacement" href="/#contact">
              Book a Consultation →
            </a>,
            founderCtaHost
          )
        : null}
      <style jsx global>{`
        .global-dice-brand-host,
        .global-dice-brand-shell {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          min-width: 0;
          isolation: isolate;
        }
        .global-dice-brand-shell .header-dice-nav {
          --dice-size: clamp(50px, 4.3vw, 62px) !important;
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
          .global-dice-brand-shell .md-dice-menu {
            position: fixed !important;
            top: 92px !important;
            left: 22px !important;
            transform: translateY(-8px) scale(.96) !important;
            transform-origin: top left !important;
          }
          .global-dice-brand-shell .md-dice-menu.md-menu-open {
            transform: translateY(0) scale(1) !important;
          }
        }
        .founder-consultation-host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .founder-consultation-replacement {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(255, 106, 0, .48);
          background: rgba(255, 106, 0, .14);
          box-shadow: 0 0 34px rgba(255, 106, 0, .15), inset 0 1px 0 rgba(255, 255, 255, .08);
          color: rgba(255, 255, 255, .95);
          text-decoration: none;
          font-size: .76rem;
          font-weight: 860;
          letter-spacing: .08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .founder-consultation-replacement:hover,
        .founder-consultation-replacement:focus-visible {
          border-color: rgba(255, 106, 0, .82);
          background: rgba(255, 106, 0, .22);
          outline: none;
        }
        @media (max-width: 640px) {
          .global-dice-brand-host,
          .global-dice-brand-shell { gap: 8px; }
          .global-dice-brand-shell .header-dice-nav { --dice-size: 54px !important; }
          .global-dice-brand-wordmark strong { font-size: .78rem; letter-spacing: .18em; }
          .global-dice-brand-wordmark em { font-size: .48rem; letter-spacing: .25em; }
          .founder-consultation-replacement {
            min-height: 42px;
            padding: 0 14px;
            font-size: .64rem;
            letter-spacing: .045em;
          }
        }
      `}</style>
    </>
  );
}
