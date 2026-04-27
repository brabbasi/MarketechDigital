import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketechDiceNav from "@/components/MarketechDiceNav";
import ProfileSocialOrbit, { type ProfileSocialLink } from "../ProfileSocialOrbit";
import styles from "../founder/founder.module.css";

const companySocials: ProfileSocialLink[] = [
  { label: "Marketech Digital on LinkedIn", href: "#replace-marketech-linkedin", icon: "linkedin" },
  { label: "Marketech Digital on Instagram", href: "#replace-marketech-instagram", icon: "instagram" },
  { label: "Marketech Digital on Facebook", href: "#replace-marketech-facebook", icon: "facebook" },
  { label: "Email Marketech Digital", href: "mailto:replace@marketechdigital.ai", icon: "email" }
];

const aboutNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Services", href: "/services" },
  { label: "Offers", href: "/#offers" },
  { label: "Contact", href: "/#contact" }
];

const focusAreas = [
  "Premium website design",
  "Software development",
  "AI automation",
  "SEO optimization",
  "Lead capture systems",
  "Brand strategy",
  "Workflow automation",
  "Digital growth systems"
];

const trustSignals = [
  "Founder-led execution",
  "Built for local businesses",
  "Website + SEO + automation focus",
  "Conversion-first digital systems"
];

export const metadata: Metadata = {
  title: "About Marketech Digital | Founder-Led Ottawa Digital Studio",
  description: "Learn about Marketech Digital, a founder-led Ottawa digital studio for website design, AI automation, SEO, software development, branding, lead generation, and digital growth systems.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.navbar} aria-label="About page navigation">
          <div className={styles.brand}>
            <MarketechDiceNav className={styles.headerDiceNav} navItems={aboutNavItems} homeHref="/" />
            <Link href="/" className={styles.brandName} aria-label="Marketech Digital home">Marketech Digital</Link>
          </div>
        </nav>

        <section className={styles.heroClassic} aria-labelledby="about-title">
          <ProfileSocialOrbit className="marketech-profile-orbit" links={companySocials} label="Marketech Digital social media links">
            <div className="marketech-orbit-logo">
              <Image src="/logo.svg" alt="Marketech Digital logo" width={720} height={720} priority />
            </div>
          </ProfileSocialOrbit>
          <div className={styles.role}>Founder-led studio · Ottawa digital agency · Websites, AI, SEO and automation</div>
          <h1 id="about-title"><span>Marketech</span><em>Digital.</em></h1>
          <p>
            A premium digital studio built to help local and growing businesses look trusted online, capture better leads, automate repetitive work, and compete with bigger companies.
          </p>
          <div className={styles.heroActions}>
            <Link href="/#contact">Start a project →</Link>
            <Link href="/founder">Meet the founder</Link>
          </div>
        </section>

        <section className={styles.introBlock} aria-labelledby="marketech-story">
          <div className={styles.eyebrow}>Company story</div>
          <p id="marketech-story">
            Marketech Digital was created from a simple belief: small businesses should not have to look small online. The goal is to give business owners the kind of website presence, automation, lead capture, SEO foundation, and digital growth system that makes customers feel more confident before they ever reach out.
          </p>
        </section>

        <section className={styles.lightBand} aria-labelledby="marketech-focus-title">
          <div className={styles.lightShell}>
            <div className={styles.eyebrow}>What we build</div>
            <h2 id="marketech-focus-title">Clear systems for serious growth.</h2>
            <p>
              Marketech Digital combines design, technology, marketing, and automation into practical systems. The work is intentionally founder-led and lean, built for small businesses that need serious digital execution without agency bloat.
            </p>
            <div className={styles.stackCard}>
              <h4>Core focus areas</h4>
              <div className={styles.stackGrid}>{focusAreas.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
        </section>

        <section className={styles.sectionDark} aria-labelledby="trust-title">
          <div className={styles.sectionHeadCenter}>
            <div className={styles.eyebrow}>Trust layer</div>
            <h2 id="trust-title">Built honestly, not inflated.</h2>
            <p>
              Marketech Digital does not need fake staff numbers or exaggerated claims. It is positioned as a founder-led studio with practical execution, strong design sense, AI and software thinking, and a clear focus on helping local businesses modernize.
            </p>
          </div>
          <div className={styles.validationList}>
            {trustSignals.map((item) => <div key={item}><strong>{item}</strong><span>⌁</span></div>)}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="about-cta-title">
          <h2 id="about-cta-title">Ready to make your business look more trusted?</h2>
          <p>Work with Marketech Digital to improve your website, SEO, lead capture, brand clarity, AI automation, or internal workflow systems.</p>
          <div className={styles.heroActions}>
            <Link href="/#contact">Start a conversation →</Link>
            <Link href="/services">View services</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
