import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import IdeaGenerator from "../IdeaGenerator";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdGraph, serviceJsonLd, siteName } from "../seo";

const services = [
  {
    name: "AI Agent Website Bot",
    price: "$750 to $2,500 CAD to start",
    advanced: "$3,500 to $8,000+ CAD for a deeper system",
    description: "A website assistant that welcomes visitors, answers common questions, captures serious inquiries, guides people to the right service, and sends cleaner project details to your team.",
    includes: ["Website chat assistant", "Service guidance", "Lead qualification", "Email and contact handoff", "Conversation copy written for your business"]
  },
  {
    name: "AI Strategy Sprint",
    price: "$500 to $1,500 CAD",
    advanced: "Clarity before you build",
    description: "A focused planning session for business owners who know AI could help, but want a clear and sensible plan before spending money on tools or development.",
    includes: ["Business workflow review", "AI opportunity map", "Priority plan", "Tool recommendations", "Clear next steps"]
  },
  {
    name: "Workflow Automation Build",
    price: "$1,500 to $6,000+ CAD",
    advanced: "Scope depends on your tools",
    description: "A practical build that removes repeated admin work, connects forms and follow ups, improves handoffs, and helps your team spend less time chasing the same tasks.",
    includes: ["Workflow mapping", "Automation plan", "Tool connection", "Testing and refinement", "Simple handoff notes"]
  },
  {
    name: "Decision Intelligence Dashboard",
    price: "$2,000 to $8,000+ CAD",
    advanced: "Data quality affects scope",
    description: "A clear reporting view for owners and teams who need to understand leads, sales, operations, campaigns, and business activity without digging through scattered tools.",
    includes: ["KPI structure", "Dashboard design", "Data cleanup plan", "Reporting logic", "Decision views"]
  },
  {
    name: "Growth Systems Stack",
    price: "$4,000 to $15,000+ CAD",
    advanced: "Premium connected build",
    description: "A larger build for businesses that want their website, automation, lead capture, analytics, SEO, and growth work to feel connected instead of scattered.",
    includes: ["Systems blueprint", "Automation stack", "Data visibility", "AI assistant layer", "Growth workflow design"]
  }
];

const serviceFaq = [
  {
    question: "What services does Marketech Digital offer?",
    answer: "Marketech Digital helps with websites, AI assistants, workflow automation, software systems, dashboards, SEO, landing pages, branding, and practical digital growth systems for businesses in Ottawa and across Canada."
  },
  {
    question: "Are the prices final quotes?",
    answer: "No. The ranges are there to help you understand where a project may start. A final quote depends on your tools, integrations, timeline, data quality, number of pages or workflows, and how custom the system needs to be."
  },
  {
    question: "Can I start small before a larger build?",
    answer: "Yes. Many clients should start with one useful system first, such as an assistant, an automation review, a dashboard starter, or a better lead capture path. That keeps the first step clear and useful."
  }
];

export const metadata: Metadata = {
  title: "Services & Starter Systems | Marketech Digital",
  description: "Explore Marketech Digital services including AI agent bots, AI strategy, workflow automation, decision intelligence dashboards, web development, SEO, landing pages, and growth systems.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Starter Systems | Marketech Digital",
    description: "AI automation, workflow automation, decision intelligence, web development, SEO, landing pages, and growth systems from Marketech Digital.",
    url: absoluteUrl("/services"),
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Starter Systems | Marketech Digital",
    description: "AI agent bots, workflow automation, decision intelligence dashboards, web development, SEO, landing pages, and growth systems."
  }
};

const structuredData = jsonLdGraph([
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" }
  ]),
  ...services.map((service) => serviceJsonLd(service.name, service.description, "/services")),
  faqJsonLd("/services#faq", serviceFaq)
]);

export default function ServicesPage() {
  return (
    <main className="services-page">
      <Script
        id="marketech-services-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="services-hero" aria-labelledby="services-title">
        <Link href="/" className="services-home" aria-label="Return to Marketech Digital homepage">← Marketech Digital</Link>
        <div className="services-label"><span /> Starter systems and premium builds</div>
        <h1 id="services-title">Clear starting points for serious business systems.</h1>
        <p>
          Explore AI automation, workflow automation, decision dashboards, web development, SEO, landing pages, and growth systems. The right starting point depends on your tools,
          your business goal, the workflows involved, and how much support the system needs behind the scenes.
        </p>
      </section>
      <section className="services-grid" aria-label="Marketech Digital service options">
        {services.map((service) => (
          <article className="service-card" key={service.name}>
            <div className="service-top">
              <span>{service.advanced}</span>
              <b>{service.price}</b>
            </div>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <div className="service-includes" aria-label={`${service.name} includes`}>
              {service.includes.map((item) => <span key={item}>{item}</span>)}
            </div>
            <Link href="/#contact" aria-label={`Start a project for ${service.name}`}>Start this project →</Link>
          </article>
        ))}
      </section>
      <IdeaGenerator />
    </main>
  );
}
