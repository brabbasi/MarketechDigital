"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import MarketechDiceNav from "@/components/MarketechDiceNav";
import styles from "./about.module.css";

type SocialIcon = "linkedin" | "instagram" | "facebook" | "github" | "x" | "email";

type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Offers", href: "/#offers" },
  { label: "Process", href: "/#process" },
  { label: "Founder", href: "/about?slide=founder" },
  { label: "Contact", href: "/#contact" }
];

const companySocials: SocialLink[] = [
  { label: "Marketech Digital on LinkedIn", href: "#replace-marketech-linkedin", icon: "linkedin" },
  { label: "Marketech Digital on Instagram", href: "#replace-marketech-instagram", icon: "instagram" },
  { label: "Marketech Digital on Facebook", href: "#replace-marketech-facebook", icon: "facebook" },
  { label: "Email Marketech Digital", href: "mailto:replace@marketechdigital.ai", icon: "email" }
];

const founderSocials: SocialLink[] = [
  { label: "Basit Abbasi on LinkedIn", href: "#replace-founder-linkedin", icon: "linkedin" },
  { label: "Basit Abbasi on Instagram", href: "#replace-founder-instagram", icon: "instagram" },
  { label: "Basit Abbasi on GitHub", href: "#replace-founder-github", icon: "github" },
  { label: "Basit Abbasi on X", href: "#replace-founder-x", icon: "x" },
  { label: "Email Basit Abbasi", href: "mailto:replace-founder@email.com", icon: "email" }
];

const trustCards = [
  "Founder-led execution",
  "Built for local businesses",
  "Website + SEO + automation focus",
  "Conversion-first digital systems"
];

const founderFocus = [
  "Digital strategy",
  "Software and web systems",
  "AI automation",
  "Branding",
  "SEO",
  "Client acquisition systems",
  "Practical business growth"
];

function Icon({ type }: { type: SocialIcon }) {
  if (type === "linkedin") return <svg viewBox="0 0 24 24"><path d="M6.8 20.4H3.4V9h3.4v11.4ZM5.1 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM20.6 20.4h-3.4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.9V9h3.2v1.6h.1c.4-.8 1.5-1.8 3.1-1.8 3.4 0 4 2.2 4 5.1v6.5h.3Z" /></svg>;
  if (type === "instagram") return <svg viewBox="0 0 24 24"><path d="M7.5 2.8h9A4.7 4.7 0 0 1 21.2 7.5v9a4.7 4.7 0 0 1-4.7 4.7h-9a4.7 4.7 0 0 1-4.7-4.7v-9a4.7 4.7 0 0 1 4.7-4.7Zm0 2A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm4.5 3.1a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2Zm0 2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm4.4-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" /></svg>;
  if (type === "facebook") return <svg viewBox="0 0 24 24"><path d="M14.4 8.2V6.8c0-.7.5-.9 1-.9h2.5V2.8l-3.4-.1c-3.4 0-4.2 2.1-4.2 4.1v1.4H7.6v3.5h2.7v9.5h4.1v-9.5h3.1l.5-3.5h-3.6Z" /></svg>;
  if (type === "github") return <svg viewBox="0 0 24 24"><path d="M12 2.6a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a9.8 9.8 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.8 0 4-2.4 4.8-4.7 5.1.4.3.7 1 .7 2v2.4c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.6Z" /></svg>;
  if (type === "x") return <svg viewBox="0 0 24 24"><path d="M14.2 10.3 21.7 2h-1.8L13.4 9.2 8.2 2h-6l7.9 10.9L2.2 22h1.8l6.9-7.7 5.5 7.7h6l-8.2-11.7Zm-2.4 2.7-.8-1.1L4.7 3.3h2.7l5.1 7.1.8 1.1 6.6 9.2h-2.7L11.8 13Z" /></svg>;
  return <svg viewBox="0 0 24 24"><path d="M3.5 5.2h17c.8 0 1.5.7 1.5 1.5v10.6c0 .8-.7 1.5-1.5 1.5h-17c-.8 0-1.5-.7-1.5-1.5V6.7c0-.8.7-1.5 1.5-1.5Zm8.5 7.3 7.1-5.2H4.9l7.1 5.2Zm-8-4v8.3h16V8.5l-8 5.8-8-5.8Z" /></svg>;
}

function MarketechLogoMark() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 100 100" aria-label="Marketech Digital logo">
      <defs>
        <linearGradient id="about-orange" x1="18" y1="10" x2="82" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffb15d" />
          <stop offset="0.48" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#ff5a00" />
        </linearGradient>
        <linearGradient id="about-ink" x1="24" y1="20" x2="76" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#about-orange)" strokeWidth="6.2" strokeLinecap="round" strokeDasharray="72 18 40 30 52 28" transform="rotate(-24 50 50)" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(255,255,255,.78)" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="50 24 38 28 30 18" transform="rotate(38 50 50)" opacity=".8" />
      <path d="M27 70V33.5c0-3.1 3.9-4.55 5.95-2.2L50 50.85 67.05 31.3C69.1 28.95 73 30.4 73 33.5V70h-11.2V51.7L52.35 62.45a3.15 3.15 0 0 1-4.7 0L38.2 51.7V70H27Z" fill="url(#about-ink)" />
      <path d="M53.6 42.5h15.1V27.4l-4.8 4.8-6.3-6.3-7.55 7.55 6.3 6.3-2.75 2.75Z" fill="url(#about-orange)" />
      <path d="M42.2 70 50 54.8 57.8 70h-7.1l-.7-1.65-.7 1.65h-7.1Z" fill="url(#about-orange)" opacity=".92" />
    </svg>
  );
}

function SocialOrbit({ children, links, label }: { children: React.ReactNode; links: SocialLink[]; label: string }) {
  return (
    <div className={styles.orbitSystem} aria-label={label}>
      <div className={styles.orbitRing} aria-hidden="true" />
      <div className={styles.orbitRingTwo} aria-hidden="true" />
      <div className={styles.orbitCenter}>{children}</div>
      <div className={styles.orbitTrack}>
        {links.map((link, index) => (
          <a
            key={link.label}
            className={styles.orbitIcon}
            style={{ "--i": index, "--count": links.length } as React.CSSProperties}
            href={link.href}
            aria-label={link.label}
          >
            <Icon type={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}

function CompanyVisual() {
  return (
    <SocialOrbit links={companySocials} label="Marketech Digital social links">
      <div className={styles.logoPlate}>
        <MarketechLogoMark />
      </div>
    </SocialOrbit>
  );
}

function FounderVisual() {
  return (
    <SocialOrbit links={founderSocials} label="Founder social links">
      <div className={styles.portraitPlate}>
        <Image src="/founder.webp" alt="Basit Abbasi, founder of Marketech Digital" width={720} height={720} priority unoptimized />
      </div>
    </SocialOrbit>
  );
}

function CompanySlide() {
  return (
    <section className={styles.slideGrid} aria-labelledby="about-company-title">
      <div className={styles.visualColumn}><CompanyVisual /></div>
      <div className={styles.copyColumn}>
        <div className={styles.eyebrow}>Marketech Digital</div>
        <h2 id="about-company-title">Small businesses should not have to look small online.</h2>
        <p className={styles.lead}>Marketech Digital is a founder-led digital studio built to help local and growing businesses look premium, capture more leads, automate repetitive work, and compete online with bigger companies.</p>
        <p>The studio combines premium website design, software development, AI automation, SEO optimization, lead capture systems, brand strategy, workflow automation, and digital growth systems into one clear execution layer.</p>
        <p>It is designed for small businesses that need serious digital execution without agency bloat: practical strategy, clean design, useful systems, and a website presence customers can trust.</p>
        <div className={styles.trustGrid}>
          {trustCards.map((card) => <span key={card}>{card}</span>)}
        </div>
      </div>
    </section>
  );
}

function FounderSlide() {
  return (
    <section className={styles.slideGrid} aria-labelledby="about-founder-title">
      <div className={styles.visualColumn}><FounderVisual /></div>
      <div className={styles.copyColumn}>
        <div className={styles.eyebrow}>Founder</div>
        <h2 id="about-founder-title">Built by Basit Abbasi for businesses that need clarity, trust, and momentum.</h2>
        <p className={styles.lead}>Marketech Digital was founded by Basit Abbasi with the goal of helping businesses combine design, technology, marketing, and automation into one clear growth system.</p>
        <p>The inspiration came from seeing how many small businesses offer great services but lose customers because their online presence feels outdated, unclear, or hard to trust.</p>
        <p>The focus is practical: better websites, cleaner automations, useful AI assistants, stronger SEO foundations, and digital systems that support real business growth.</p>
        <div className={styles.focusGrid}>
          {founderFocus.map((item) => <span key={item}>{item}</span>)}
        </div>
        <Link className={styles.inlineLink} href="/founder">View full founder profile →</Link>
      </div>
    </section>
  );
}

export default function AboutCarousel() {
  const slides = useMemo(() => [
    { key: "company", label: "Marketech Digital", component: <CompanySlide /> },
    { key: "founder", label: "Founder", component: <FounderSlide /> }
  ], []);
  const [active, setActive] = useState(0);
  const activeSlide = slides[active];

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.navbar} aria-label="About page navigation">
          <div className={styles.brand}>
            <MarketechDiceNav className={styles.headerDiceNav} navItems={navItems} homeHref="/" />
            <Link href="/" className={styles.brandName} aria-label="Marketech Digital home">Marketech Digital</Link>
          </div>
        </nav>

        <header className={styles.hero} aria-labelledby="about-title">
          <div className={styles.role}>Founder-led digital studio · Ottawa digital agency · AI, web, SEO and automation</div>
          <h1 id="about-title"><span>About</span><em>Us.</em></h1>
          <p>Meet the company and founder behind Marketech Digital: a serious, practical, premium digital growth studio built for local businesses that want stronger trust, better leads, and clearer systems.</p>
        </header>

        <section className={styles.carouselShell} aria-label="About Us carousel">
          <div className={styles.carouselTop}>
            <div className={styles.tabs} role="tablist" aria-label="About Us slides">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  className={active === index ? styles.tabActive : ""}
                  onClick={() => setActive(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>{slide.label}
                </button>
              ))}
            </div>
            <div className={styles.controls}>
              <button type="button" onClick={() => move(-1)} aria-label="Previous About Us slide">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Next About Us slide">→</button>
            </div>
          </div>
          <div className={styles.slideFrame} role="tabpanel" aria-label={activeSlide.label} key={activeSlide.key}>{activeSlide.component}</div>
        </section>

        <section className={styles.finalCta} aria-labelledby="about-cta-title">
          <h2 id="about-cta-title">Ready to make your business look more trusted online?</h2>
          <p>Start with a focused conversation about your website, SEO, lead capture, automation, branding, or digital growth system.</p>
          <div className={styles.heroActions}>
            <Link href="/#contact">Start a conversation →</Link>
            <Link href="/services">View services</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
