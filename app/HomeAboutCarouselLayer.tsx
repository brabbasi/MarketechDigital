"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function findFounderTrustSection() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>("h1,h2,h3"));
  const match = headings.find((heading) => {
    const text = (heading.textContent || "").toLowerCase();
    return text.includes("founder") || text.includes("trust");
  });

  if (!match) return null;

  let section: HTMLElement | null = match.closest("section") as HTMLElement | null;
  if (!section) section = match.parentElement;
  return section;
}

function buildAboutCarousel() {
  const section = document.createElement("section");
  section.id = "about-us";
  section.className = "home-about-carousel";
  section.setAttribute("aria-labelledby", "home-about-title");
  section.innerHTML = `
    <div class="home-about-head">
      <div class="home-about-kicker"><span></span> Company trust layer</div>
      <h2 id="home-about-title">About Us</h2>
      <p>Meet the company and the founder behind Marketech Digital. Open each profile for the full page, story, and social orbit.</p>
    </div>

    <div class="home-about-rail" aria-label="About Us profile carousel">
      <article class="home-about-card home-about-card--company">
        <a class="home-about-visual" href="/about" aria-label="Open Marketech Digital profile">
          <img src="/logo.svg" alt="Marketech Digital logo" />
        </a>
        <div class="home-about-copy">
          <div class="home-about-meta">01 · Company profile</div>
          <h3>Marketech Digital</h3>
          <p>A founder-led digital studio helping local and growing businesses look premium, capture better leads, improve SEO, and automate repetitive work.</p>
          <div class="home-about-tags"><span>Web design</span><span>AI automation</span><span>SEO</span><span>Lead systems</span></div>
          <a class="home-about-button" href="/about">Open profile →</a>
        </div>
      </article>

      <article class="home-about-card home-about-card--founder">
        <a class="home-about-visual" href="/founder" aria-label="Open founder profile">
          <img src="/founder.webp" alt="Basit Abbasi, founder of Marketech Digital" />
        </a>
        <div class="home-about-copy">
          <div class="home-about-meta">02 · Founder profile</div>
          <h3>Basit Abbasi</h3>
          <p>Founder of Marketech Digital, focused on practical web systems, AI automation, SEO, branding, digital strategy, and business growth workflows.</p>
          <div class="home-about-tags"><span>Founder</span><span>Systems</span><span>Automation</span><span>Strategy</span></div>
          <a class="home-about-button" href="/founder">Open profile →</a>
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
  const replacement = buildAboutCarousel();
  target.replaceWith(replacement);
}

export default function HomeAboutCarouselLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    installAboutCarousel();
    const timers = [300, 900, 1800].map((delay) => window.setTimeout(installAboutCarousel, delay));
    return () => timers.forEach(window.clearTimeout);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <style jsx global>{`
      .home-about-carousel {
        position: relative;
        width: min(1180px, calc(100% - 28px));
        margin: 84px auto;
        padding: 28px;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 42px;
        background: radial-gradient(circle at 18% 18%, rgba(255,106,0,.12), transparent 32%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.025));
        box-shadow: 0 30px 90px rgba(0,0,0,.34);
        overflow: hidden;
      }
      .home-about-carousel:before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 80% 20%, rgba(89,175,255,.08), transparent 34%);
        pointer-events: none;
      }
      .home-about-head {
        position: relative;
        z-index: 1;
        text-align: center;
        max-width: 820px;
        margin: 0 auto 26px;
      }
      .home-about-kicker {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: rgba(255,223,202,.78);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .32em;
        text-transform: uppercase;
      }
      .home-about-kicker span {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #ff6a00;
        box-shadow: 0 0 18px rgba(255,106,0,.7);
      }
      .home-about-head h2 {
        margin: 18px 0 0;
        font-size: clamp(3.4rem, 11vw, 7.8rem);
        line-height: .84;
        letter-spacing: -.08em;
        text-transform: uppercase;
        color: #fff;
      }
      .home-about-head p {
        margin: 18px auto 0;
        color: rgba(255,255,255,.62);
        line-height: 1.75;
        font-weight: 750;
        text-transform: uppercase;
      }
      .home-about-rail {
        position: relative;
        z-index: 1;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(320px, 1fr);
        gap: 18px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 10px;
      }
      .home-about-rail::-webkit-scrollbar { height: 6px; }
      .home-about-rail::-webkit-scrollbar-thumb { background: linear-gradient(90deg, #ff6a00, #59afff); border-radius: 99px; }
      .home-about-card {
        scroll-snap-align: start;
        display: grid;
        grid-template-columns: minmax(160px, .62fr) minmax(0, 1fr);
        align-items: center;
        gap: 22px;
        min-height: 430px;
        padding: 24px;
        border: 1px solid rgba(255,255,255,.11);
        border-radius: 34px;
        background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025));
        box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 24px 70px rgba(0,0,0,.24);
      }
      .home-about-visual {
        position: relative;
        width: min(260px, 52vw);
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        justify-self: center;
        border-radius: 50%;
        padding: 10px;
        border: 2px solid rgba(255,255,255,.68);
        background: radial-gradient(circle, rgba(255,255,255,.18), transparent 65%);
        box-shadow: 0 0 0 22px rgba(255,255,255,.025), 0 0 70px rgba(255,255,255,.12), 0 0 70px rgba(255,106,0,.12);
        overflow: hidden;
        text-decoration: none;
      }
      .home-about-card--company .home-about-visual {
        background: radial-gradient(circle at 50% 44%, rgba(255,106,0,.22), rgba(255,255,255,.08) 40%, rgba(2,6,12,.9) 72%);
      }
      .home-about-visual img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .home-about-card--company .home-about-visual img {
        width: 74%;
        height: 74%;
        object-fit: contain;
      }
      .home-about-meta {
        color: rgba(255,255,255,.36);
        letter-spacing: .28em;
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 900;
      }
      .home-about-copy h3 {
        margin: 14px 0 0;
        color: #fff;
        font-size: clamp(2.4rem, 5vw, 4.6rem);
        line-height: .9;
        letter-spacing: -.07em;
        text-transform: uppercase;
      }
      .home-about-copy p {
        color: rgba(255,255,255,.64);
        line-height: 1.78;
        margin: 18px 0 0;
        font-weight: 650;
      }
      .home-about-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 20px;
      }
      .home-about-tags span {
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 999px;
        padding: 9px 11px;
        color: rgba(255,255,255,.7);
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .home-about-button {
        display: inline-flex;
        margin-top: 22px;
        border: 1px solid rgba(255,106,0,.38);
        border-radius: 999px;
        padding: 13px 18px;
        background: rgba(255,106,0,.12);
        color: #fff;
        text-decoration: none;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .09em;
        text-transform: uppercase;
        box-shadow: 0 0 38px rgba(255,106,0,.14);
      }
      .home-about-button:hover,
      .home-about-button:focus-visible,
      .home-about-visual:focus-visible {
        outline: none;
        border-color: rgba(255,106,0,.7);
        box-shadow: 0 0 44px rgba(255,106,0,.22);
      }
      @media (min-width: 980px) {
        .home-about-rail { grid-auto-columns: calc(50% - 9px); }
      }
      @media (max-width: 720px) {
        .home-about-carousel { margin: 56px auto; padding: 18px; border-radius: 32px; }
        .home-about-head p { text-transform: none; }
        .home-about-rail { grid-auto-columns: minmax(86vw, 1fr); }
        .home-about-card { grid-template-columns: 1fr; min-height: auto; padding: 22px 18px; }
        .home-about-visual { width: min(230px, 66vw); }
      }
    `}</style>
  );
}
