"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import MarketechDiceNav from "@/components/MarketechDiceNav";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Free Audit", href: "/audit" },
  { label: "About", href: "/about" },
  { label: "Offers", href: "/#offers" },
  { label: "Process", href: "/#process" },
  { label: "Founder", href: "/about?slide=founder" },
  { label: "FAQ", href: "/#faq" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/#contact" }
];

function findHeader() {
  const navLinks = document.querySelector<HTMLElement>(".nav-links");
  if (navLinks) {
    let node: HTMLElement | null = navLinks.parentElement;
    while (node && node !== document.body) {
      const rect = node.getBoundingClientRect();
      const text = (node.textContent || "").toLowerCase();
      if (rect.top < 220 && rect.width > 260 && rect.height >= 34 && rect.height <= 180 && (text.includes("offers") || text.includes("book a consultation"))) return node;
      node = node.parentElement;
    }
  }
  return document.querySelector<HTMLElement>("header") || document.querySelector<HTMLElement>("nav");
}

function hideOldFirstBrand(header: HTMLElement, host: HTMLElement) {
  const children = Array.from(header.children) as HTMLElement[];
  for (const child of children) {
    if (child === host) continue;
    if (child.classList.contains("nav-links") || child.querySelector(".nav-links")) continue;
    if ((child.textContent || "").toLowerCase().includes("book a consultation")) continue;
    child.setAttribute("data-md-old-logo", "hidden");
    child.setAttribute("aria-hidden", "true");
    child.style.setProperty("display", "none", "important");
    child.style.setProperty("visibility", "hidden", "important");
    child.style.setProperty("opacity", "0", "important");
    child.style.setProperty("pointer-events", "none", "important");
    break;
  }
}

export default function GlobalLogoCube() {
  const pathname = usePathname();
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname === "/founder" || pathname === "/about") return;

    let mounted = true;

    const sync = () => {
      const header = findHeader();
      if (!header || !mounted) return;

      let portalHost = header.querySelector<HTMLElement>("[data-md-dice-brand='true']");
      if (!portalHost) {
        portalHost = document.createElement("div");
        portalHost.setAttribute("data-md-dice-brand", "true");
        header.insertBefore(portalHost, header.firstChild);
      }

      portalHost.className = "md-header-dice-brand";
      portalHost.style.setProperty("display", "inline-flex", "important");
      portalHost.style.setProperty("align-items", "center", "important");
      portalHost.style.setProperty("gap", "10px", "important");
      portalHost.style.setProperty("position", "relative", "important");
      portalHost.style.setProperty("z-index", "60", "important");
      portalHost.style.setProperty("flex", "0 0 auto", "important");
      portalHost.style.setProperty("min-width", "max-content", "important");
      portalHost.style.setProperty("visibility", "visible", "important");
      portalHost.style.setProperty("opacity", "1", "important");
      portalHost.style.setProperty("pointer-events", "auto", "important");

      hideOldFirstBrand(header, portalHost);
      setHost(portalHost);
    };

    sync();
    const timers = [100, 400, 1000, 2200, 5000].map((delay) => window.setTimeout(sync, delay));
    const observer = new MutationObserver(() => window.requestAnimationFrame(sync));
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", sync);

    return () => {
      mounted = false;
      timers.forEach(window.clearTimeout);
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  if (pathname === "/founder" || pathname === "/about" || !host) return null;

  return createPortal(
    <>
      <MarketechDiceNav className="md-header-dice-nav" navItems={navItems} homeHref="/" />
      <a className="md-header-brand-text" href="/" aria-label="Marketech Digital home">Marketech Digital</a>
      <style jsx global>{`
        [data-md-old-logo="hidden"] { display:none!important; visibility:hidden!important; opacity:0!important; pointer-events:none!important; }
        .md-header-dice-brand { display:inline-flex!important; align-items:center!important; gap:10px!important; min-width:max-content!important; visibility:visible!important; opacity:1!important; pointer-events:auto!important; }
        .md-header-dice-brand .md-header-dice-nav { --dice-size:52px!important; display:inline-flex!important; visibility:visible!important; opacity:1!important; }
        .md-header-brand-text { display:inline-flex!important; align-items:center!important; color:rgba(255,255,255,.96)!important; font-size:.95rem!important; font-weight:760!important; line-height:1!important; letter-spacing:-.02em!important; text-decoration:none!important; white-space:nowrap!important; text-shadow:0 0 24px rgba(255,106,0,.16)!important; }
        @media (min-width:701px) { .md-header-dice-brand .md-header-dice-nav { --dice-size:42px!important; } .md-header-brand-text { font-size:clamp(.82rem,1.05vw,1rem)!important; } }
        @media (max-width:700px) { .md-header-dice-brand { gap:8px!important; } .md-header-brand-text { font-size:.9rem!important; } }
      `}</style>
    </>,
    host
  );
}
