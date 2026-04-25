import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import IdeaGenerator from "../IdeaGenerator";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdGraph, serviceJsonLd, siteName } from "../seo";
import { coreServicePages, servicePages, starterSystemPages } from "./service-pages";

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
  ...servicePages.map((service) => serviceJsonLd(service.name, service.metaDescription, `/services/${service.slug}`)),
  faqJsonLd("/services#faq", serviceFaq)
]);

function ServiceCard({ service }: { service: (typeof servicePages)[number] }) {
  return (
    <article className="service-card">
      <div className="service-top">
        <span>{service.priceContext}</span>
        <b>{service.price}</b>
      </div>
      <h2>{service.name}</h2>
      <p>{service.intro}</p>
      <div className="service-includes" aria-label={`${service.name} service focus`}>
        {service.builds.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
      </div>
      <Link href={`/services/${service.slug}`} aria-label={`View ${service.name} services`}>View service details →</Link>
    </article>
  );
}

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

      <section id="core-services" className="services-hero" aria-labelledby="core-services-title">
        <div className="services-label"><span /> Core services</div>
        <h2 id="core-services-title">Build the digital foundation first.</h2>
        <p>
          These are the main service areas for businesses that need stronger websites, AI automation, software systems, SEO, marketing structure, and brand clarity.
        </p>
      </section>
      <section className="services-grid" aria-label="Core Marketech Digital services">
        {coreServicePages.map((service) => <ServiceCard service={service} key={service.slug} />)}
      </section>

      <section id="starter-systems" className="services-hero" aria-labelledby="starter-services-title">
        <div className="services-label"><span /> Starter systems</div>
        <h2 id="starter-services-title">Smaller entry systems with the same premium method.</h2>
        <p>
          These focused builds help clients start with one useful system before moving into a larger operating layer. Each one now has its own detail page, pricing guidance, process, benefits, FAQs, and next step.
        </p>
      </section>
      <section className="services-grid" aria-label="Marketech Digital starter systems">
        {starterSystemPages.map((service) => <ServiceCard service={service} key={service.slug} />)}
      </section>
      <IdeaGenerator />
    </main>
  );
}
