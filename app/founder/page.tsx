import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import styles from "./founder.module.css";
import { absoluteUrl, breadcrumbJsonLd, jsonLdGraph, siteName } from "../seo";

const founderImage = "/founder.webp";

const projects = [
  {
    title: "InsightFlow Analytics Platform",
    category: "Enterprise AI / Data Intelligence",
    description:
      "A decision-intelligence platform concept that turns scattered sales, customer, workflow, and operations data into one executive command layer. Built for KPI clarity, signal detection, and better decision velocity.",
    tags: ["Data analysis", "AI insights", "Executive dashboards"],
    shots: ["Signal cockpit", "KPI map", "Revenue intelligence", "Operations lens", "Risk signals"]
  },
  {
    title: "AutoOps Workflow Engine",
    category: "Automation / Internal Systems",
    description:
      "An automation build concept for intake, routing, follow-ups, task assignment, and reporting. Designed to remove repetitive manual work and create cleaner operating rhythms for growing teams.",
    tags: ["Workflow automation", "Process mapping", "Internal tools"],
    shots: ["Intake flow", "Task routing", "Follow-up engine", "Alert system", "Automation audit"]
  },
  {
    title: "ClientPulse AI Assistant",
    category: "AI Bot / Lead Capture",
    description:
      "A branded AI assistant concept for business websites that answers questions, qualifies leads, captures intent, escalates priority inquiries, and summarizes conversations for the team.",
    tags: ["AI bot creation", "Lead capture", "Conversation design"],
    shots: ["Chat interface", "Intent map", "Lead scoring", "Escalation path", "Summary view"]
  },
  {
    title: "MarketSignal Growth System",
    category: "Growth / Performance Intelligence",
    description:
      "A growth intelligence system that organizes campaign performance, audience signals, conversion points, and offer insights into a clearer operating view for better marketing decisions.",
    tags: ["Growth analytics", "Conversion clarity", "Marketing systems"],
    shots: ["Campaign view", "Audience signal", "Offer tracker", "Conversion map", "Growth forecast"]
  },
  {
    title: "ClarityStack Systems Buildout",
    category: "AI Strategy / Systems Architecture",
    description:
      "A connected systems buildout combining AI strategy, automations, dashboards, and execution workflows into one scalable business operating layer.",
    tags: ["AI strategy", "Systems architecture", "Scalable operations"],
    shots: ["System blueprint", "Tool stack", "Data layer", "Automation map", "Scale roadmap"]
  }
];

const stack = ["Python", "SQL", "Next.js", "React", "AI Automation", "LLMs", "RAG", "Data Analysis", "Dashboards", "Workflow Design", "Bot Creation", "APIs", "CRM Systems", "No-code Automation", "Business Intelligence"];
const validations = ["BSc Computer Science — University of Hertfordshire", "AI Systems & Automation Portfolio", "Data Analysis and Decision Intelligence Concepts", "Business Workflow Automation Builds", "Digital Growth Systems and Bot Creation"];

export const metadata: Metadata = {
  title: "Basit Abbasi | Founder of Marketech Digital",
  description:
    "Meet Basit Abbasi, founder of Marketech Digital. Founder profile covering AI automation, web systems, data intelligence, software thinking, workflow design, and digital growth systems.",
  alternates: { canonical: "/founder" },
  openGraph: {
    title: "Basit Abbasi | Founder of Marketech Digital",
    description:
      "Founder profile for Marketech Digital covering AI automation, workflow design, web systems, software thinking, and decision intelligence.",
    url: absoluteUrl("/founder"),
    siteName,
    type: "profile",
    images: [{ url: absoluteUrl(founderImage), width: 720, height: 720, alt: "Basit Abbasi, founder of Marketech Digital" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Basit Abbasi | Founder of Marketech Digital",
    description: "Founder profile covering AI automation, web systems, data intelligence, software thinking, workflow design, and digital growth systems.",
    images: [absoluteUrl(founderImage)]
  }
};

const structuredData = jsonLdGraph([
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Founder", path: "/founder" }
  ]),
  {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/founder")}#profile`,
    url: absoluteUrl("/founder"),
    name: "Basit Abbasi | Founder of Marketech Digital",
    about: { "@id": `${absoluteUrl("/founder")}#person` }
  },
  {
    "@type": "Person",
    "@id": `${absoluteUrl("/founder")}#person`,
    name: "Basit Abbasi",
    image: absoluteUrl(founderImage),
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: "Marketech Digital",
      url: absoluteUrl("/")
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Hertfordshire"
    },
    knowsAbout: ["AI automation", "workflow automation", "web development", "data intelligence", "software systems", "digital growth systems", "bot creation"]
  }
]);

export default function FounderPage() {
  return (
    <main className={styles.page}>
      <Script
        id="marketech-founder-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={styles.shell}>
        <nav className={styles.navbar} aria-label="Founder page navigation">
          <Link href="/" className={styles.brand} aria-label="Marketech Digital home">
            <span className={styles.logoPlate}><Image src="/logo.svg" alt="Marketech Digital logo" width={64} height={64} /></span>
            <span className={styles.brandWords}><strong>MARKETECH</strong><em>DIGITAL</em></span>
          </Link>
          <details className={styles.menuBox}>
            <summary className={styles.menuIcon} aria-label="Open founder page menu"><span /><span /><span /></summary>
            <div className={styles.menuPanel}>
              <Link href="/">Home</Link>
              <a href="#projects">Project ledger</a>
              <a href="#education">Academic foundation</a>
              <Link href="/#contact">Start a project</Link>
            </div>
          </details>
        </nav>

        <section className={styles.heroClassic} aria-labelledby="founder-title">
          <div className={styles.ringPortrait}>
            <Image src={founderImage} alt="Basit Abbasi, founder of Marketech Digital" width={720} height={720} priority unoptimized />
          </div>
          <div className={styles.role}>Founder · Systems Architect // Basit Abbasi</div>
          <h1 id="founder-title"><span>Basit</span><em>Abbasi.</em></h1>
          <p>
            AI-focused founder building Marketech Digital around workflow automation, data intelligence,
            business systems, web development, and practical AI execution for companies that want clarity instead of noise.
          </p>
          <div className={styles.heroActions}>
            <Link href="/#contact" aria-label="Start a Marketech Digital project inquiry">Start a project →</Link>
            <Link href="/#offers">View services</Link>
          </div>
        </section>

        <section className={styles.introBlock} aria-labelledby="founder-statement">
          <div className={styles.eyebrow}>Founder statement</div>
          <p id="founder-statement">
            I build systems that help businesses move from scattered work to clearer execution. Through Marketech Digital,
            my focus is on practical AI systems, workflow automation, custom web systems, data analysis, bot creation, and decision-support layers
            that make business operations easier to understand and easier to scale.
          </p>
        </section>

        <section className={styles.lightBand} id="education" aria-labelledby="education-title">
          <div className={styles.lightShell}>
            <div className={styles.eyebrow}>Academic foundation</div>
            <h2 id="education-title">The University of Hertfordshire.</h2>
            <h3>Bachelor&apos;s in Computer Science</h3>
            <p>
              Studied Computer Science at the University of Hertfordshire, building a foundation in software thinking,
              systems logic, structured problem-solving, and technical execution. That foundation now supports Marketech Digital&apos;s
              work across AI automation, data intelligence, business workflows, custom web development, and digital growth systems.
            </p>

            <div className={styles.stackCard}>
              <h4>Core technical stack</h4>
              <div className={styles.stackGrid}>{stack.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
          </div>
        </section>

        <section className={styles.sectionDark} id="projects" aria-labelledby="projects-title">
          <div className={styles.sectionHeadCenter}>
            <div className={styles.eyebrow}>Project ledger</div>
            <h2 id="projects-title">Selected build concepts.</h2>
            <p>Portfolio-style project concepts designed around the services Marketech Digital offers: AI automation, web development, data analysis, bot creation, decision intelligence, and systems architecture.</p>
          </div>
          <div className={styles.projectLedger}>
            {projects.map((project) => (
              <article className={styles.projectCard} key={project.title}>
                <div className={styles.projectShots} aria-hidden="true">
                  {project.shots.map((shot, index) => (
                    <div className={styles.projectShot} key={shot}>
                      <span>{project.tags[index % project.tags.length]}</span>
                      <strong>{shot}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.projectMeta}>{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectTags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Link href="/#contact" className={styles.projectArrow} aria-label={`Start a project like ${project.title}`}>↗</Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.lightBand} aria-labelledby="validation-title"> 
          <div className={styles.lightShell}>
            <div className={styles.eyebrow}>Validation vault</div>
            <h2 id="validation-title" className="sr-only">Founder credentials and validation</h2>
            <div className={styles.validationList}>
              {validations.map((item) => <div key={item}><strong>{item}</strong><span>⌁</span></div>)}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="founder-cta-title">
          <h2 id="founder-cta-title">Ready to build a clearer system?</h2>
          <p>Work with Marketech Digital to turn scattered workflows, disconnected data, repetitive tasks, and underperforming websites into a cleaner operating layer.</p>
          <div className={styles.heroActions}>
            <Link href="/#contact">Start a conversation →</Link>
            <Link href="/">Return home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
