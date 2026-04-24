import Image from "next/image";
import Link from "next/link";
import styles from "./founder.module.css";

const projects = [
  {
    title: "InsightFlow Analytics Command Center",
    description:
      "A decision-intelligence concept that converts scattered operational, sales, and customer data into a clean executive view. Built around KPI hierarchy, signal detection, and simple next-step recommendations so leaders can act faster without drowning in dashboards.",
    tags: ["Data intelligence", "KPI dashboards", "Executive reporting", "Decision systems"],
    shots: ["Signal map", "Revenue lens", "Operations view", "Risk signals", "Leadership cockpit"]
  },
  {
    title: "AutoOps Workflow Automation Layer",
    description:
      "An automation architecture for repetitive business workflows such as lead routing, intake forms, follow-ups, task assignment, internal alerts, and reporting. The goal is to reduce manual drag, improve consistency, and keep teams focused on higher-value work.",
    tags: ["Workflow automation", "AI operations", "Process design", "Internal tools"],
    shots: ["Intake flow", "Task routing", "Follow-up engine", "Alert system", "Automation audit"]
  },
  {
    title: "ClientPulse AI Support Bot",
    description:
      "A branded AI assistant concept for businesses that need faster customer responses, better qualification, and more consistent service experiences. Designed to capture intent, answer common questions, escalate serious leads, and summarize conversations for the team.",
    tags: ["AI bot creation", "Lead capture", "Customer support", "Conversation design"],
    shots: ["Chat interface", "Intent map", "Lead scoring", "Escalation path", "Conversation summary"]
  },
  {
    title: "MarketSignal Growth Intelligence System",
    description:
      "A growth strategy system that organizes campaign data, audience signals, offer performance, and conversion insights into one operating layer. Built to help businesses understand what message is working, where attention is coming from, and what to improve next.",
    tags: ["Growth analytics", "Marketing systems", "Conversion clarity", "Performance insights"],
    shots: ["Campaign view", "Audience signal", "Offer tracker", "Conversion map", "Growth forecast"]
  },
  {
    title: "ClarityStack Business Systems Buildout",
    description:
      "A full systems buildout concept connecting AI strategy, automation, analytics, and digital execution. Designed for businesses moving beyond scattered tools toward a cleaner operating system that can support scale, visibility, and repeatable growth.",
    tags: ["AI strategy", "Systems architecture", "Automation stack", "Scalable operations"],
    shots: ["System blueprint", "Tool stack", "Data layer", "Automation map", "Scale roadmap"]
  }
];

export const metadata = {
  title: "Basit Abbasi | Founder of Marketech Digital",
  description:
    "Founder profile for Basit Abbasi, founder of Marketech Digital. AI systems, workflow automation, data analytics, bot creation, and decision intelligence portfolio."
};

export default function FounderPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.brand}>
            <Image src="/logo.svg" alt="Marketech Digital logo" width={64} height={64} />
            <div>
              <strong>MARKETECH</strong>
              <span>DIGITAL</span>
            </div>
          </Link>
          <Link href="/#contact" className={styles.cta}>Book a Consultation →</Link>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.eyebrow}>Founder profile</div>
            <h1>Basit Abbasi</h1>
            <p>
              Founder of Marketech Digital — focused on AI systems, workflow automation,
              data intelligence, bot creation, and clarity-driven digital execution for modern businesses.
              The goal is simple: reduce complexity, build cleaner systems, and help businesses make faster decisions.
            </p>
            <div className={styles.heroStats}>
              <div><strong>BSc</strong><span>Computer Science</span></div>
              <div><strong>AI</strong><span>Systems focus</span></div>
              <div><strong>5+</strong><span>Portfolio builds</span></div>
            </div>
            <div className={styles.actions}>
              <Link href="/#offers" className={styles.cta}>Explore Marketech Offers</Link>
              <Link href="/#founder" className={styles.nav}>Back to Website</Link>
            </div>
          </div>

          <div className={styles.portraitWrap}>
            <Image src="/founder.webp" alt="Basit Abbasi founder portrait" fill priority />
            <div className={styles.portraitGlow} />
            <div className={styles.portraitCard}>
              <strong>Basit Abbasi</strong>
              <span>Founder · Marketech Digital</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Education / foundation</div>
              <h2>Computer science foundation. Business systems mindset.</h2>
            </div>
            <p>
              Basit studied Bachelor&apos;s in Computer Science from the University of Hertfordshire,
              developing a foundation in software thinking, problem solving, systems logic, and technical execution.
            </p>
          </div>
          <div className={styles.bioGrid}>
            <article className={styles.bioCard}>
              <h3>Technical foundation</h3>
              <p>Bachelor&apos;s in Computer Science from the University of Hertfordshire, with a focus on structured problem-solving and software-driven thinking.</p>
            </article>
            <article className={styles.bioCard}>
              <h3>Business direction</h3>
              <p>Building Marketech Digital around the intersection of AI systems, automation, analytics, and growth execution.</p>
            </article>
            <article className={styles.bioCard}>
              <h3>Founder philosophy</h3>
              <p>Technology should create clarity. The best systems reduce noise, remove repeated work, and help teams act with confidence.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Selected project concepts</div>
              <h2>Systems built around clarity, automation, and intelligence.</h2>
            </div>
            <p>
              These portfolio concepts represent the kinds of work Marketech Digital is positioned to deliver:
              data analysis, AI automation, bot creation, operating systems, and growth intelligence.
            </p>
          </div>

          <div className={styles.projectStack}>
            {projects.map((project) => (
              <article className={styles.project} key={project.title}>
                <div className={styles.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <div className={styles.carousel} aria-label={`${project.title} image carousel placeholders`}>
                  {project.shots.map((shot, index) => (
                    <div className={styles.shot} key={shot}>
                      <i />
                      <span>{String(index + 1).padStart(2, "0")} · {shot}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.eyebrow}>Working approach</div>
              <h2>How Basit thinks through digital systems.</h2>
            </div>
          </div>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}><b>1</b><div><strong>Find the real bottleneck</strong><p>Before building, identify where the business is losing time, clarity, leads, or decision speed.</p></div></div>
            <div className={styles.timelineItem}><b>2</b><div><strong>Design the intelligence layer</strong><p>Map the workflow, data points, automations, and decision views needed to make the system useful.</p></div></div>
            <div className={styles.timelineItem}><b>3</b><div><strong>Build around action</strong><p>Create systems that support execution, not just visual dashboards or disconnected tools.</p></div></div>
            <div className={styles.timelineItem}><b>4</b><div><strong>Improve and scale</strong><p>Refine the system as the business grows, adding automation, AI, or analytics only where it creates real leverage.</p></div></div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <h2>Ready to build a clearer operating system?</h2>
          <p>
            Work with Marketech Digital to turn scattered workflows, disconnected data, and repetitive tasks into a cleaner system for growth.
          </p>
          <div className={styles.actions}>
            <Link href="/#contact" className={styles.cta}>Start a conversation →</Link>
            <Link href="/" className={styles.nav}>Return to homepage</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
