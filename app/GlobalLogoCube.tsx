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

function logoCandidates() {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      'img[src*="logo"], img[alt*="logo" i], svg[aria-label*="logo" i], header svg, nav svg, a[href="/"] svg'
    )
  );
}

function findPrimaryLogo() {
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
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
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
      "--dice-size": "58px"
    };
  }

  const size = Math.min(Math.max(Math.max(rect.width, rect.height), 58), 76);
  return {
    position: "absolute",
    zIndex: 2147483000,
    top: `${Math.round(window.scrollY + rect.top + rect.height / 2 - (size + 22) / 2)}px`,
    left: `${Math.round(window.scrollX + rect.left + rect.width / 2 - (size + 22) / 2)}px`,
    pointerEvents: "auto",
    "--dice-size": `${size}px`
  };
}

export default function GlobalLogoCube() {
  const [style, setStyle] = useState<DicePosition>(makePosition());

  useEffect(() => {
    let activeLogo: HTMLElement | null = null;

    const restoreLogo = () => {
      if (!activeLogo) return;
      activeLogo.style.opacity = "";
      activeLogo.style.pointerEvents = "";
      activeLogo.removeAttribute("data-marketech-dice-replaced");
      activeLogo = null;
    };

    const placeDice = () => {
      const found = findPrimaryLogo();
      if (!found) {
        restoreLogo();
        setStyle(makePosition());
        return;
      }

      if (activeLogo !== found.element) restoreLogo();
      found.element.style.opacity = "0";
      found.element.style.pointerEvents = "none";
      found.element.setAttribute("data-marketech-dice-replaced", "true");
      activeLogo = found.element;
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
    </div>
  );
}
