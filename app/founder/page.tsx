import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import MarketechDiceNav from "@/components/MarketechDiceNav";
import styles from "./founder.module.css";
import { absoluteUrl, breadcrumbJsonLd, jsonLdGraph, siteName } from "../seo";

const founderImage = "/founder.webp";

const founderNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#offers" },
  { label: "Project ledger", href: "#projects" },
  { label: "Academic foundation", href: "#education" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" }
];

const projects = [
  {
    title: "InsightFlow Analytics Platform",
    category: "Concept System for Data Intelligence",
    description:
      "An internal prototype for turning sales, customer, workflow, and operations data into one clear view. The goal is to help owners understand what needs attention without digging through scattered tools.",
    tags: ["Data analysis", "AI insights", "Business dashboards"],
    shots: ["Signal cockpit", "KPI map", "Revenue view", "Operations view", "Risk signals"]
  },
  {
    title: "AutoOps Workflow Engine",
    category: "Demo Build for Workflow Automation",
    description:
      "A demo build for intake, routing, follow ups, task assignment, and reporting. It shows how repeated admin work can become a simple flow that is easier for a team to use every week.",
    tags: ["Workflow automation", "Process mapping", "Internal tools"],
    shots: ["Intake flow", "Task routing", "Follow up engine", "Alert system", "Automation review"]
  },
  {
    title: "ClientPulse AI Assistant",
    category: "Concept System for AI Lead Capture",
    description:
      "A branded AI assistant concept for business websites. It answers common questions, collects useful details, guides visitors to the right service, and gives the business a cleaner inquiry to review.",
    tags: ["AI bot creation", "Lead capture", "Conversation design"],
    shots: ["Chat interface", "Intent map", "Lead scoring", "Escalation path", "Summary view"]
  },
  {
    title: "MarketSignal Growth System",
    category: "Internal Prototype for Growth Visibility",
    description:
      "A growth visibility system that organizes campaign activity, audience signals, conversion points, and offer feedback into a calmer view for better marketing decisions.",
    tags: ["Growth analytics", "Conversion clarity", "Marketing systems"],
    shots: ["Campaign view", "Audience signal", "Offer tracker", "Conversion map", "Growth forecast"]
  },
  {
    title: "ClarityStack Systems Build",
    category: "Concept System for Business Operations",
    description:
      "A connected systems concept that brings AI planning, automations, dashboards, and daily workflows into one practical business setup. It is built around clarity, not extra complexity.",
    tags: ["AI strategy", "Systems planning", "Operations support"],
    shots: ["System blueprint", "Tool stack", "Data layer", "Automation map", "Scale plan"]
  }
];

const stack = ["Python", "SQL", "Next.js", "React", "AI Automation", "LLMs", "RAG", "Data Analysis", "Dashboards", "Workflow Design", "Bot Creation", "APIs", "CRM Systems", "No code Automation", "Business Intelligence"];
const validations = ["BSc Computer Science, University of Hertfordshire", "AI systems and automation portfolio", "Data analysis and decision intelligence concepts", "Business workflow automation builds", "Digital growth systems and bot creation"];

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
          <div className={styles.brand}>
            <MarketechDiceNav className={styles.headerDiceNav} navItems={founderNavItems} homeHref="/" />
            <Link href="/" className={styles.brandName} aria-label="Marketech Digital home">
              Marketech Digital
            </Link>
          </div>
        </nav>

        <section className={styles.heroClassic} aria-labelledby="founder-title">
          <div className={styles.ringPortrait}>
            <Image src={founderImage} alt="Basit Abbasi, founder of Marketech Digital" width={720} height={720} priority unoptimized />
          </div>
          <div className={styles.role}>Founder · Systems Architect · Basit Abbasi</div>
          <h1 id="founder-title"><span>Basit</span><em>Abbasi.</em></h1>
          <p>
            Founder of Marketech Digital, building practical AI, web, software, automation, and data systems for businesses that want their digital work to feel clearer, more trustworthy, and easier to manage.
          </p>
          <div className={styles.heroActions}>
            <Link href="/#contact" aria-label="Start a Marketech Digital project inquiry">Start a project →</Link>
            <Link href="/#offers">View services</Link>
          </div>
        </section>

        <section className={styles.introBlock} aria-labelledby="founder-statement">
          <div className={styles.eyebrow}>Founder statement</div>
          <p id="founder-statement">
            I build digital systems that help business owners move from scattered tools and unclear workflows to calmer execution. Through Marketech Digital, my focus is practical: better websites, useful AI assistants, cleaner automations, simple dashboards, stronger SEO foundations, and digital systems that support real business growth.
          </p>
        </section>

        <section className={styles.lightBand} id="education" aria-labelledby="education-title">
          <div className={styles.lightShell}>
            <div className={styles.eyebrow}>Academic foundation</div>
            <h2 id="education-title">University of Hertfordshire.</h2>
            <h3>Bachelor&apos;s in Computer Science</h3>
            <p>
              Studying Computer Science gave me a foundation in software thinking, systems logic, structured problem solving, and technical execution. That foundation now supports Marketech Digital&apos;s work across AI automation, data intelligence, business workflows, custom web development, SEO, and digital growth systems.
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
            <h2 id="projects-title">Selected concept systems.</h2>
            <p>These are concept systems, demo builds, and internal prototypes that show the kind of thinking behind Marketech Digital: AI automation, web development, data analysis, bot creation, decision visibility, and business systems planning.</p>
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
          <h2 id="founder-cta-title">Ready to build something clearer?</h2>
          <p>Work with Marketech Digital to turn a weak website, scattered tools, repeated tasks, or unclear data into a system your business can actually use.</p>
          <div className={styles.heroActions}>
            <Link href="/#contact">Start a conversation →</Link>
            <Link href="/">Return home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
