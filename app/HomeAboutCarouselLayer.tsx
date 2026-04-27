"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function textOf(element: Element | null) {
  return (element?.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function findFounderTrustSection() {
  const existing = document.getElementById("about-us");
  if (existing) return null;

  const labelMatch = Array.from(document.querySelectorAll<HTMLElement>("section,div,span,p,h1,h2,h3")).find((element) => {
    const text = textOf(element);
    return text.includes("founder") && text.includes("trust") && text.length < 90;
  });

  if (labelMatch) {
    const section = labelMatch.closest("section") as HTMLElement | null;
    if (section) return section;

    let node: HTMLElement | null = labelMatch;
    while (node && node !== document.body) {
      const text = textOf(node);
      if (text.includes("basit abbasi") && text.includes("open profile")) return node;
      node = node.parentElement;
    }
  }

  const cardMatch = Array.from(document.querySelectorAll<HTMLElement>("section,div,article")).find((element) => {
    const text = textOf(element);
    return text.includes("basit abbasi") && text.includes("open profile") && (text.includes("founder") || text.includes("trust"));
  });

  if (!cardMatch) return null;
  const section = cardMatch.closest("section") as HTMLElement | null;
  return section || cardMatch;
}

function buildAboutCarousel() {
  const section = document.createElement("section");
  section.id = "about-us";
  section.className = "home-about-carousel";
  section.setAttribute("aria-labelledby", "home-about-title");
  section.innerHTML = `
    <div class="home-about-label"><span></span> About Us</div>
    <div class="home-about-rail" aria-label="About Us profile carousel">
      <article class="home-about-profile-card home-about-profile-card--company">
        <div class="home-about-orb">
          <div class="home-about-orb-ring home-about-orb-ring--one" aria-hidden="true"></div>
          <div class="home-about-orb-ring home-about-orb-ring--two" aria-hidden="true"></div>
          <a class="home-about-round" href="/about" aria-label="Open Marketech Digital profile">
            <img src="/logo.svg" alt="Marketech Digital logo" />
          </a>
        </div>
        <div class="home-about-profile-pill">
          <h2 id="home-about-title">Marketech Digital</h2>
          <p>Company</p>
          <a href="/about">Open profile</a>
        </div>
      </article>

      <article class="home-about-profile-card home-about-profile-card--founder">
        <div class="home-about-orb">
          <div class="home-about-orb-ring home-about-orb-ring--one" aria-hidden="true"></div>
          <div class="home-about-orb-ring home-about-orb-ring--two" aria-hidden="true"></div>
          <a class="home-about-round" href="/founder" aria-label="Open founder profile">
            <img src="/founder.webp" alt="Basit Abbasi" />
          </a>
        </div>
        <div class="home-about-profile-pill">
          <h3>Basit Abbasi</h3>
          <p>Founder</p>
          <a href="/founder">Open profile</a>
        </div>
      </article>
    </div>
  `;
  return section;
}

function installAboutCarousel() {
  if (document.getElementById("about-us")) return;
  const target = findFounderTrustSection();
  if (!target) return;
  target.replaceWith(buildAboutCarousel());
}

export default function HomeAboutCarouselLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    installAboutCarousel();
    const timers = [100, 350, 800, 1500, 2800, 4800].map((delay) => window.setTimeout(installAboutCarousel, delay));
    const observer = new MutationObserver(() => installAboutCarousel());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      timers.forEach(window.clearTimeout);
      observer.disconnect();
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <style jsx global>{`
      .home-about-carousel {
        position: relative;
        width: min(1180px, calc(100% - 28px));
        margin: clamp(58px, 9vw, 96px) auto;
        overflow: visible;
        isolation: isolate;
      }
      .home-about-label {
        display: flex;
        align-items: center;
        gap: 14px;
        margin: 0 0 28px;
        color: rgba(255,223,202,.82);
        font-size: 13px;
        font-weight: 900;
        letter-spacing: .34em;
        line-height: 1.4;
        text-transform: uppercase;
      }
      .home-about-label span {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #ff6a00;
        box-shadow: 0 0 18px rgba(255,106,0,.8);
      }
      .home-about-rail {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(330px, 520px);
        gap: 22px;
        overflow-x: auto;
        overflow-y: visible;
        scroll-snap-type: x mandatory;
        padding: 8px 4px 28px;
        scrollbar-width: thin;
      }
      .home-about-rail::-webkit-scrollbar { height: 6px; }
      .home-about-rail::-webkit-scrollbar-thumb { background: linear-gradient(90deg, #ff6a00, #59afff); border-radius: 99px; }
      .home-about-profile-card {
        position: relative;
        scroll-snap-align: center;
        min-height: 552px;
        display: grid;
        place-items: center;
        overflow: visible;
        border-radius: 38px;
      }
      .home-about-orb {
        position: relative;
        width: min(500px, 82vw);
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        overflow: visible;
      }
      .home-about-orb-ring {
        position: absolute;
        inset: 5%;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.16);
        box-shadow: 0 0 68px rgba(255,106,0,.12), inset 0 0 48px rgba(255,255,255,.03);
        background: radial-gradient(circle at 50% 50%, rgba(89,175,255,.08), transparent 62%);
      }
      .home-about-orb-ring--one { transform: rotate(-18deg); border-color: rgba(255,255,255,.18); }
      .home-about-orb-ring--two { inset: 12%; transform: rotate(24deg); border-color: rgba(255,106,0,.22); }
      .home-about-round {
        position: relative;
        z-index: 2;
        width: 74%;
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,.72);
        background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.02));
        box-shadow: 0 0 0 18px rgba(255,255,255,.025), 0 22px 90px rgba(0,0,0,.34), 0 0 80px rgba(255,106,0,.13);
        text-decoration: none;
      }
      .home-about-round img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
      }
      .home-about-profile-card--company .home-about-round {
        background: radial-gradient(circle at 50% 42%, rgba(255,106,0,.22), rgba(255,255,255,.08) 42%, rgba(2,6,12,.92) 74%);
      }
      .home-about-profile-card--company .home-about-round img {
        width: 74%;
        height: 74%;
        object-fit: contain;
        filter: drop-shadow(0 0 16px rgba(255,106,0,.3));
      }
      .home-about-profile-pill {
        position: absolute;
        z-index: 5;
        left: 50%;
        top: calc(50% + min(500px, 82vw) * .22);
        width: min(420px, calc(100% - 34px));
        transform: translateX(-50%);
        padding: 24px 22px 22px;
        border: 1px solid rgba(255,255,255,.11);
        border-radius: 32px;
        background: rgba(4,9,18,.9);
        backdrop-filter: blur(18px) saturate(1.25);
        -webkit-backdrop-filter: blur(18px) saturate(1.25);
        box-shadow: 0 24px 80px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08);
        text-align: center;
      }
      .home-about-profile-pill h2,
      .home-about-profile-pill h3 {
        margin: 0;
        color: #fff;
        font-size: clamp(1.38rem, 5.2vw, 1.9rem);
        line-height: 1.05;
        letter-spacing: -.035em;
        font-weight: 950;
        text-shadow: 0 0 24px rgba(255,255,255,.08);
      }
      .home-about-profile-pill p {
        margin: 9px auto 0;
        color: transparent;
        background: linear-gradient(90deg, rgba(255,255,255,.62), rgba(255,223,202,.94), rgba(255,255,255,.62));
        -webkit-background-clip: text;
        background-clip: text;
        font-size: 11px;
        line-height: 1.3;
        font-weight: 950;
        letter-spacing: .28em;
        text-transform: uppercase;
      }
      .home-about-profile-pill a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 18px;
        min-height: 48px;
        padding: 12px 28px;
        border: 1px solid rgba(255,106,0,.48);
        border-radius: 999px;
        background: radial-gradient(circle at 50% 0%, rgba(255,106,0,.22), rgba(255,106,0,.08) 58%, rgba(255,106,0,.04));
        color: #fff;
        text-decoration: none;
        font-size: .95rem;
        font-weight: 900;
        letter-spacing: -.01em;
        box-shadow: 0 0 30px rgba(255,106,0,.14), inset 0 1px 0 rgba(255,255,255,.08);
      }
      .home-about-profile-pill a:hover,
      .home-about-profile-pill a:focus-visible,
      .home-about-round:focus-visible {
        outline: none;
        border-color: rgba(255,106,0,.78);
        box-shadow: 0 0 44px rgba(255,106,0,.24);
      }
      @media (min-width: 980px) {
        .home-about-rail { grid-auto-columns: calc(50% - 11px); }
      }
      @media (max-width: 720px) {
        .home-about-carousel { width: min(100% - 28px, 1180px); margin: 64px auto; }
        .home-about-label { margin-left: 0; font-size: 12px; letter-spacing: .28em; }
        .home-about-rail { grid-auto-columns: minmax(86vw, 1fr); gap: 18px; padding: 0 0 22px; }
        .home-about-profile-card { min-height: 512px; }
        .home-about-orb { width: min(500px, 94vw); }
        .home-about-round { width: 72%; }
        .home-about-profile-pill { top: calc(50% + min(500px, 94vw) * .19); width: min(430px, calc(100% - 24px)); padding: 22px 16px 20px; }
      }
      @media (max-width: 390px) {
        .home-about-profile-card { min-height: 500px; }
        .home-about-profile-pill h2,
        .home-about-profile-pill h3 { font-size: 1.34rem; }
        .home-about-profile-pill p { letter-spacing: .22em; }
      }
      @media (prefers-reduced-motion: reduce) {
        .home-about-profile-pill a, .home-about-round { transition: none !important; }
      }
    `}</style>
  );
}
