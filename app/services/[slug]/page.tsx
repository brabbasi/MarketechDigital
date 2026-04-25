import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdGraph, serviceJsonLd, siteName } from "../../seo";
import { getServicePage, servicePages } from "../service-pages";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServicePage(params.slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      siteName,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription
    }
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServicePage(params.slug);
  if (!service) notFound();

  const relatedServices = service.related.map((slug) => getServicePage(slug)).filter(Boolean);
  const pagePath = `/services/${service.slug}`;
  const structuredData = jsonLdGraph([
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path: pagePath }
    ]),
    serviceJsonLd(service.name, service.metaDescription, pagePath),
    faqJsonLd(`${pagePath}#faq`, service.faqs)
  ]);

  return (
    <main className="services-page">
      <Script
        id={`marketech-${service.slug}-structured-data`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="services-hero" aria-labelledby="service-title">
        <Link href="/services" className="services-home" aria-label="Return to all Marketech Digital services">← Services</Link>
        <div className="services-label"><span /> {service.label}</div>
        <div className="service-top service-price-line"><span>{service.priceContext}</span><b>{service.price}</b></div>
        <h1 id="service-title">{service.h1}</h1>
        <p>{service.intro}</p>
        <div className="service-includes" aria-label={`${service.name} pricing guidance`}>
          {service.pricingDetails.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="starter-actions">
          <Link href="/#contact" aria-label={`Start a project for ${service.name}`}>Start a conversation →</Link>
          <Link href="/services">View all services</Link>
        </div>
      </section>

      <section className="services-grid" aria-label={`${service.name} overview`}>
        <article className="service-card">
          <div className="service-top"><span>Who it helps</span><b>{service.name}</b></div>
          <h2>Built for the teams that need this most.</h2>
          <div className="service-includes" aria-label="Who this service is for">
            {service.whoFor.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>

        <article className="service-card">
          <div className="service-top"><span>What we build</span><b>Practical systems</b></div>
          <h2>Useful work, not vague deliverables.</h2>
          <div className="service-includes" aria-label="What Marketech Digital builds">
            {service.builds.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
      </section>

      <section className="services-grid" aria-label={`${service.name} process and benefits`}>
        <article className="service-card">
          <div className="service-top"><span>Process</span><b>Clear steps</b></div>
          <h2>How the work happens.</h2>
          <div className="service-includes" aria-label="Service process">
            {service.process.map((item, index) => <span key={item}>{index + 1}. {item}</span>)}
          </div>
        </article>

        <article className="service-card">
          <div className="service-top"><span>Benefits</span><b>Business clarity</b></div>
          <h2>What should improve.</h2>
          <div className="service-includes" aria-label="Service benefits">
            {service.benefits.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
      </section>

      <section className="services-grid" id="faq" aria-label={`${service.name} frequently asked questions`}>
        {service.faqs.map((faq) => (
          <article className="service-card" key={faq.question}>
            <div className="service-top"><span>Question</span><b>Answer</b></div>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </article>
        ))}
      </section>

      <section className="services-hero" aria-labelledby="related-title">
        <div className="services-label"><span /> Related services</div>
        <h2 id="related-title">Connected work that can support this service.</h2>
        <p>
          Most serious digital systems work better when the website, content, automation, SEO, branding, and follow up path are planned together. These related services are often useful next steps.
        </p>
        <div className="starter-actions">
          {relatedServices.map((related) => (
            <Link key={related.slug} href={`/services/${related.slug}`}>{related.name}</Link>
          ))}
        </div>
      </section>

      <section className="services-hero" aria-labelledby="service-cta-title">
        <div className="services-label"><span /> Start the conversation</div>
        <h2 id="service-cta-title">Want to see what this could look like for your business?</h2>
        <p>
          Share what you want to build, fix, automate, or improve. Marketech Digital can help you decide whether this service is the right starting point or whether another system would be more useful first.
        </p>
        <div className="starter-actions">
          <Link href="/#contact">Start a project inquiry →</Link>
          <Link href="/services#idea-generator">Generate a system idea</Link>
        </div>
      </section>
    </main>
  );
}
