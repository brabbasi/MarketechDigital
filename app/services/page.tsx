import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import IdeaGenerator from "../IdeaGenerator";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdGraph, serviceJsonLd, siteName } from "../seo";

const services = [
  {
    name: "AI Agent Website Bot",
    price: "$750–$2,500 CAD starter",
    advanced: "$3,500–$8,000+ CAD advanced",
    description: "A guided AI assistant for websites that answers questions, captures leads, qualifies inquiries, recommends services, and routes serious prospects to the right next step.",
    includes: ["Website chat assistant", "FAQ and service guidance", "Lead qualification prompts", "Email/contact handoff", "Conversation-ready sales copy"]
  },
  {
    name: "AI Strategy Sprint",
    price: "$500–$1,500 CAD",
    advanced: "Roadmap before buildout",
    description: "A focused strategy engagement that identifies where AI should create leverage, what should be automated first, and what system should be built next.",
    includes: ["Business workflow review", "AI opportunity map", "Priority roadmap", "Tool recommendations", "Implementation plan"]
  },
  {
    name: "Workflow Automation Build",
    price: "$1,500–$6,000+ CAD",
    advanced: "Depends on integrations",
    description: "A practical automation build for repetitive admin, intake, follow-ups, internal alerts, CRM updates, reporting flows, and task routing.",
    includes: ["Workflow mapping", "Automation architecture", "Tool integration", "Testing and refinement", "Handoff documentation"]
  },
  {
    name: "Decision Intelligence Dashboard",
    price: "$2,000–$8,000+ CAD",
    advanced: "Data quality affects scope",
    description: "A cleaner visibility layer for leaders who need actionable reporting, KPI tracking, decision views, and clearer performance signals.",
    includes: ["KPI structure", "Dashboard design", "Data cleanup plan", "Reporting logic", "Decision-support views"]
  },
  {
    name: "Growth Systems Stack",
    price: "$4,000–$15,000+ CAD",
    advanced: "Premium buildout",
    description: "A broader operating layer connecting AI strategy, automation, analytics, lead capture, content flow, and growth execution into one scalable system.",
    includes: ["Systems blueprint", "Automation stack", "Data visibility", "AI assistant layer", "Growth workflow design"]
  }
];

const serviceFaq = [
  {
    question: "What services does Marketech Digital offer?",
    answer: "Marketech Digital offers AI agent bots, AI strategy, workflow automation, decision intelligence dashboards, web development, SEO, landing pages, and growth systems for businesses in Ottawa and across Canada."
  },
  {
    question: "Are the prices final quotes?",
    answer: "No. The listed ranges are guidance ranges. Final pricing depends on integrations, backend needs, workflow complexity, data quality, and the level of intelligence required."
  },
  {
    question: "Can I start small before a larger build?",
    answer: "Yes. Starter systems are designed to create a practical first step before a larger premium buildout or connected growth system."
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
        <div className="services-label"><span /> Starter systems / premium buildouts</div>
        <h1 id="services-title">Clear starting points for serious business systems.</h1>
        <p>
          Explore AI automation, workflow automation, decision intelligence, web development, SEO, landing page, and growth system starting points. Final quotes depend on integrations,
          backend needs, workflow complexity, data quality, and how much intelligence the system needs.
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
