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

function findPrimaryLogo() {
  const logos = Array.from(document.querySelectorAll<HTMLImageElement>('img[src*="logo"]'));
  const candidates = logos
    .filter((img) => !img.closest(".md-dice-root") && !img.closest(".ai-launcher") && !img.closest(".ai-panel") && !img.closest("footer"))
    .map((img) => ({ img, rect: img.getBoundingClientRect() }))
    .filter(({ img, rect }) => {
      const style = window.getComputedStyle(img);
      return rect.width >= 28 && rect.height >= 28 && rect.top >= 0 && rect.top < Math.min(window.innerHeight * 0.55, 340) && style.display !== "none";
    })
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

  return candidates[0] || null;
}

function makePosition(rect?: DOMRect): DicePosition {
  if (!rect) {
    return {
      position: "fixed",
      top: "calc(env(safe-area-inset-top, 0px) + 18px)",
      left: "calc(env(safe-area-inset-left, 0px) + 18px)",
      "--dice-size": "58px"
    };
  }

  const size = Math.min(Math.max(Math.max(rect.width, rect.height), 58), 76);
  return {
    position: "fixed",
    top: `${Math.round(rect.top + rect.height / 2 - (size + 22) / 2)}px`,
    left: `${Math.round(rect.left + rect.width / 2 - (size + 22) / 2)}px`,
    "--dice-size": `${size}px`
  };
}

export default function GlobalLogoCube() {
  const [style, setStyle] = useState<DicePosition>(makePosition());

  useEffect(() => {
    let activeLogo: HTMLImageElement | null = null;

    const restoreLogo = () => {
      if (!activeLogo) return;
      activeLogo.style.opacity = "";
      activeLogo.style.pointerEvents = "";
      activeLogo = null;
    };

    const placeDice = () => {
      const found = findPrimaryLogo();
      if (!found) {
        restoreLogo();
        setStyle(makePosition());
        return;
      }

      if (activeLogo !== found.img) restoreLogo();
      found.img.style.opacity = "0";
      found.img.style.pointerEvents = "none";
      activeLogo = found.img;
      setStyle(makePosition(found.rect));
    };

    placeDice();
    const timers = [100, 350, 850, 1500].map((delay) => window.setTimeout(placeDice, delay));
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
