"use client";

import { CSSProperties, useEffect, useState } from "react";
import MarketechDiceNav from "@/components/MarketechDiceNav";

type DicePosition = CSSProperties & {
  "--dice-size"?: string;
};

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
  element: HTMLElement;
  mark: HTMLElement;
  rect: DOMRect;
  textNodes: HTMLElement[];
};

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
    if (current.closest(".md-dice-root") || current.closest(".global-dice-nav-shell")) break;
    const rect = current.getBoundingClientRect();
    const text = (current.textContent || "").replace(/\s+/g, "").trim();
    const isSmallMark = rect.width <= 118 && rect.height <= 118;
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
  const directBrand = mark.closest<HTMLElement>('a[href="/"], a[aria-label*="Marketech" i], [class*="brand" i]');
  if (directBrand) return directBrand;
  return mark.parentElement;
}

function getBrandTextNodes(mark: HTMLElement) {
  const root = getBrandRoot(mark);
  if (!root) return [];

  const all = Array.from(root.querySelectorAll<HTMLElement>("span,strong,em,p,small"));
  return all.filter((node) => {
    if (node === mark || mark.contains(node) || node.contains(mark)) return false;
    if (node.closest(".md-dice-root") || node.closest(".global-dice-nav-shell")) return false;
    const text = (node.textContent || "").replace(/\s+/g, "").trim();
    return /marketech|digital/i.test(text) || text.length > 0;
  });
}

function findPrimaryLogo(): LogoTarget | null {
  const candidates = logoCandidates()
    .filter((element) => {
      if (element.closest(".md-dice-root")) return false;
      if (element.closest(".global-dice-nav-shell")) return false;
      if (element.closest(".ai-launcher")) return false;
      if (element.closest(".ai-panel")) return false;
      if (element.closest("footer")) return false;
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return (
        rect.width >= 24 &&
        rect.height >= 24 &&
        rect.width <= 130 &&
        rect.height <= 130 &&
        rect.top >= 0 &&
        rect.top < Math.min(window.innerHeight * 0.55, 340) &&
        rect.left < Math.min(window.innerWidth * 0.5, 520) &&
        style.display !== "none" &&
        style.visibility !== "hidden"
      );
    })
    .map((element) => {
      const mark = getLogoMark(element);
      return { element, mark, rect: mark.getBoundingClientRect(), textNodes: getBrandTextNodes(mark) };
    })
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

  return candidates[0] || null;
}

function makePosition(rect?: DOMRect): DicePosition {
  if (!rect) {
    return {
      position: "absolute",
      zIndex: 2147483000,
      top: "18px",
      left: "18px",
      pointerEvents: "auto",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      "--dice-size": "58px"
    };
  }

  const size = Math.min(Math.max(Math.max(rect.width, rect.height) - 10, 54), 70);
  return {
    position: "absolute",
    zIndex: 2147483000,
    top: `${Math.round(window.scrollY + rect.top + rect.height / 2 - (size + 22) / 2)}px`,
    left: `${Math.round(window.scrollX + rect.left + rect.width / 2 - (size + 22) / 2)}px`,
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "--dice-size": `${size}px`
  };
}

function storeOriginalStyle(element: HTMLElement) {
  if (element.dataset.marketechDiceStyled === "true") return;
  element.dataset.marketechDiceStyled = "true";
  element.dataset.marketechDiceBackground = element.style.background;
  element.dataset.marketechDiceBackgroundColor = element.style.backgroundColor;
  element.dataset.marketechDiceBoxShadow = element.style.boxShadow;
  element.dataset.marketechDiceBorderColor = element.style.borderColor;
  element.dataset.marketechDiceOpacity = element.style.opacity;
  element.dataset.marketechDicePointerEvents = element.style.pointerEvents;
}

function hideElement(element: HTMLElement) {
  storeOriginalStyle(element);
  element.style.opacity = "0";
  element.style.pointerEvents = "none";
  element.setAttribute("data-marketech-dice-replaced", "true");
}

function restoreStyledElement(element: HTMLElement | null) {
  if (!element) return;
  element.style.background = element.dataset.marketechDiceBackground || "";
  element.style.backgroundColor = element.dataset.marketechDiceBackgroundColor || "";
  element.style.boxShadow = element.dataset.marketechDiceBoxShadow || "";
  element.style.borderColor = element.dataset.marketechDiceBorderColor || "";
  element.style.opacity = element.dataset.marketechDiceOpacity || "";
  element.style.pointerEvents = element.dataset.marketechDicePointerEvents || "";
  element.removeAttribute("data-marketech-dice-replaced");
  delete element.dataset.marketechDiceStyled;
  delete element.dataset.marketechDiceBackground;
  delete element.dataset.marketechDiceBackgroundColor;
  delete element.dataset.marketechDiceBoxShadow;
  delete element.dataset.marketechDiceBorderColor;
  delete element.dataset.marketechDiceOpacity;
  delete element.dataset.marketechDicePointerEvents;
}

export default function GlobalLogoCube() {
  const [style, setStyle] = useState<DicePosition>(makePosition());

  useEffect(() => {
    let activeElement: HTMLElement | null = null;
    let activeMark: HTMLElement | null = null;
    let activeTextNodes: HTMLElement[] = [];

    const restoreLogo = () => {
      restoreStyledElement(activeElement);
      restoreStyledElement(activeMark);
      activeTextNodes.forEach(restoreStyledElement);
      activeElement = null;
      activeMark = null;
      activeTextNodes = [];
    };

    const placeDice = () => {
      const found = findPrimaryLogo();
      if (!found) {
        restoreLogo();
        setStyle(makePosition());
        return;
      }

      if (activeElement !== found.element || activeMark !== found.mark) restoreLogo();

      hideElement(found.element);

      if (found.mark !== found.element) {
        storeOriginalStyle(found.mark);
        found.mark.style.background = "transparent";
        found.mark.style.backgroundColor = "transparent";
        found.mark.style.boxShadow = "none";
        found.mark.style.borderColor = "transparent";
        found.mark.style.pointerEvents = "none";
        found.mark.setAttribute("data-marketech-dice-replaced", "true");
      }

      found.textNodes.forEach(hideElement);
      activeElement = found.element;
      activeMark = found.mark !== found.element ? found.mark : null;
      activeTextNodes = found.textNodes;
      setStyle(makePosition(found.rect));
    };

    placeDice();
    const timers = [100, 350, 850, 1500, 2500].map((delay) => window.setTimeout(placeDice, delay));
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
  }, []);

  return (
    <div style={style} className="global-dice-nav-shell">
      <MarketechDiceNav navItems={navItems} homeHref="/" />
      <span className="global-dice-wordmark" aria-hidden="true">
        <strong>MARKETECH</strong>
        <em>DIGITAL</em>
      </span>
      <style jsx global>{`
        .global-dice-nav-shell {
          width: max-content;
        }
        .global-dice-wordmark {
          display: grid;
          gap: 3px;
          line-height: 1;
          transform: translateX(-5px);
          text-shadow: 0 0 24px rgba(255, 106, 0, .16);
          pointer-events: none;
          white-space: nowrap;
        }
        .global-dice-wordmark strong {
          color: rgba(255, 255, 255, .96);
          font-size: clamp(.82rem, 1.4vw, 1.05rem);
          font-weight: 850;
          letter-spacing: .24em;
        }
        .global-dice-wordmark em {
          color: rgba(255, 226, 210, .72);
          font-style: normal;
          font-size: clamp(.52rem, .9vw, .68rem);
          font-weight: 750;
          letter-spacing: .34em;
        }
        @media (max-width: 640px) {
          .global-dice-wordmark strong { font-size: .86rem; letter-spacing: .2em; }
          .global-dice-wordmark em { font-size: .54rem; letter-spacing: .28em; }
        }
      `}</style>
    </div>
  );
}
