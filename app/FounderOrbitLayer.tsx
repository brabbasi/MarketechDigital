"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const founderSocials = [
  {
    label: "Basit Abbasi on LinkedIn",
    href: "#replace-founder-linkedin",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" /></svg>'
  },
  {
    label: "Basit Abbasi on Instagram",
    href: "#replace-founder-instagram",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25ZM17 6.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>'
  },
  {
    label: "Basit Abbasi on GitHub",
    href: "#replace-founder-github",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.793 23.387c.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.419-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.382 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.48 11.48 0 0 1 12 6.302c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.769.839 1.234 1.911 1.234 3.221 0 4.609-2.806 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.294c0 .319.192.694.801.576A12 12 0 0 0 12 .5Z" /></svg>'
  },
  {
    label: "Basit Abbasi on X",
    href: "#replace-founder-x",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>'
  },
  {
    label: "Email Basit Abbasi",
    href: "mailto:replace-founder@email.com",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.75A2.75 2.75 0 0 1 4.75 3h14.5A2.75 2.75 0 0 1 22 5.75v12.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V5.75Zm2.75-.75a.75.75 0 0 0-.75.75v.6l8 5.12 8-5.12v-.6a.75.75 0 0 0-.75-.75H4.75ZM20 8.73l-7.46 4.78a1 1 0 0 1-1.08 0L4 8.73v9.52c0 .414.336.75.75.75h14.5a.75.75 0 0 0 .75-.75V8.73Z" /></svg>'
  }
];

function enhanceFounderOrbit() {
  const portrait = document.querySelector<HTMLElement>('[class*="ringPortrait"]');
  if (!portrait || portrait.closest(".founder-dom-orbit")) return;

  const orbit = document.createElement("div");
  orbit.className = "founder-dom-orbit";
  orbit.setAttribute("aria-label", "Founder social media links");
  orbit.innerHTML = `
    <div class="founder-dom-orbit__ring" aria-hidden="true"></div>
    <div class="founder-dom-orbit__ring founder-dom-orbit__ring--inner" aria-hidden="true"></div>
    <div class="founder-dom-orbit__track">
      ${founderSocials.map((link, index) => `<a class="founder-dom-orbit__icon" style="--i:${index};--count:${founderSocials.length}" href="${link.href}" aria-label="${link.label}">${link.svg}</a>`).join("")}
    </div>
  `;

  portrait.parentElement?.insertBefore(orbit, portrait);
  orbit.appendChild(portrait);
}

export default function FounderOrbitLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/founder") return;
    enhanceFounderOrbit();
    const timers = [250, 800, 1500].map((delay) => window.setTimeout(enhanceFounderOrbit, delay));
    return () => timers.forEach(window.clearTimeout);
  }, [pathname]);

  if (pathname !== "/founder") return null;

  return (
    <style jsx global>{`
      .founder-dom-orbit {
        --orbit-size: min(420px, 80vw);
        position: relative;
        width: var(--orbit-size);
        height: var(--orbit-size);
        display: grid;
        place-items: center;
        isolation: isolate;
        margin: 0 auto;
      }
      .founder-dom-orbit [class*="ringPortrait"] {
        width: 58% !important;
        height: 58% !important;
        margin: 0 !important;
        z-index: 3;
      }
      .founder-dom-orbit__ring {
        position: absolute;
        inset: 7%;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.18);
        box-shadow: inset 0 0 46px rgba(255,255,255,.035), 0 0 54px rgba(255,106,0,.1);
      }
      .founder-dom-orbit__ring--inner {
        inset: 18%;
        border-color: rgba(255,106,0,.2);
        transform: rotate(17deg);
      }
      .founder-dom-orbit__track {
        position: absolute;
        inset: 0;
        z-index: 4;
        border-radius: 50%;
        animation: founderOrbitSpin 30s linear infinite;
      }
      .founder-dom-orbit__icon {
        --angle: calc((360deg / var(--count)) * var(--i));
        position: absolute;
        left: 50%;
        top: 50%;
        width: 54px;
        height: 54px;
        margin: -27px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #fff;
        text-decoration: none;
        border: 1px solid rgba(255,255,255,.14);
        background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.035));
        box-shadow: 0 12px 30px rgba(0,0,0,.28), 0 0 28px rgba(255,106,0,.1);
        backdrop-filter: blur(16px);
        transform: rotate(var(--angle)) translateX(calc(var(--orbit-size) * .42)) rotate(calc(-1 * var(--angle)));
        transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
      }
      .founder-dom-orbit__icon svg {
        width: 23px;
        height: 23px;
        fill: currentColor;
      }
      .founder-dom-orbit:hover .founder-dom-orbit__track,
      .founder-dom-orbit:focus-within .founder-dom-orbit__track {
        animation-play-state: paused;
      }
      .founder-dom-orbit__icon:hover,
      .founder-dom-orbit__icon:focus-visible {
        outline: none;
        border-color: rgba(255,106,0,.55);
        background: rgba(255,106,0,.16);
        box-shadow: 0 0 36px rgba(255,106,0,.2);
      }
      @keyframes founderOrbitSpin { to { transform: rotate(360deg); } }
      @media (max-width:640px) {
        .founder-dom-orbit { --orbit-size: min(340px, 88vw); }
        .founder-dom-orbit__icon { width:48px; height:48px; margin:-24px; }
        .founder-dom-orbit__icon svg { width:20px; height:20px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .founder-dom-orbit__track { animation: none !important; }
        .founder-dom-orbit__icon { transition: none !important; }
      }
    `}</style>
  );
}
