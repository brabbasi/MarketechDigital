import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import InsightCard from "./InsightCard";
import { featuredInsight, insights } from "./insights-data";
import { absoluteUrl, breadcrumbJsonLd, jsonLdGraph, siteName } from "../seo";

export const metadata: Metadata = {
  title: "Local Business Growth Insights | Marketech Digital",
  description: "Practical website, SEO, Google Business Profile, lead generation, and AI automation advice for Ottawa businesses that want more leads without wasting money on ads.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Local Business Growth Insights | Marketech Digital",
    description: "Practical website, SEO, and automation advice for Ottawa businesses that want more leads without wasting money on ads.",
    url: absoluteUrl("/insights"),
    siteName,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Business Growth Insights | Marketech Digital",
    description: "Website, local SEO, lead generation, Google Business Profile, and AI automation guides for Ottawa small businesses."
  }
};

const structuredData = jsonLdGraph([
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" }
  ]),
  {
    "@type": "CollectionPage",
    "@id": absoluteUrl("/insights#collection"),
    name: "Local Business Growth Insights",
    url: absoluteUrl("/insights"),
    description: metadata.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: ["Ottawa website design", "local SEO Ottawa", "Google Business Profile optimization", "lead generation website", "AI automation for small businesses"],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: insights.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/insights/${article.slug}`),
        name: article.title
      }))
    }
  }
]);

export default function InsightsPage() {
  return (
    <main className="insights-page">
      <Script
        id="marketech-insights-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="insights-hero" aria-labelledby="insights-title">
        <div className="insights-orb one" aria-hidden="true" />
        <div className="insights-orb two" aria-hidden="true" />
        <Link href="/" className="services-home" aria-label="Return to Marketech Digital homepage">← Marketech Digital</Link>
        <div className="services-label"><span /> Strategic content hub</div>
        <h1 id="insights-title">Local Business Growth Insights</h1>
        <p>Practical website, SEO, and automation advice for Ottawa businesses that want more leads without wasting money on ads.</p>
        <div className="insights-actions">
          <Link href="/audit" className="btn btn-primary">Get a Free Website Growth Audit</Link>
          <Link href="#articles" className="btn btn-secondary">Explore Growth Guides</Link>
        </div>
        <div className="insights-hero-grid" aria-hidden="true">
          <span /> <span /> <span /> <span />
        </div>
      </section>

      <section className="featured-insight" aria-labelledby="featured-insight-title">
        <div className="featured-copy">
          <div className="services-label"><span /> Featured Insight</div>
          <h2 id="featured-insight-title">Start with the problems quietly costing local businesses leads.</h2>
          <p>Most businesses do not need more random tactics first. They need a clearer website, stronger local trust, and a lead path that actually works.</p>
        </div>
        <article className="featured-card">
          <div className="insight-card-top">
            <span>{featuredInsight.category}</span>
            <time dateTime={featuredInsight.date}>{new Date(`${featuredInsight.date}T12:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</time>
          </div>
          <h3>{featuredInsight.title}</h3>
          <p>{featuredInsight.excerpt}</p>
          <div className="insight-card-meta">
            <span>{featuredInsight.readTime}</span>
            <span>Updated for 2026</span>
          </div>
          <Link href={`/insights/${featuredInsight.slug}`}>Read Insight →</Link>
        </article>
      </section>

      <CategoryFilter />

      <section className="insights-bottom-cta" aria-labelledby="insights-bottom-title">
        <div>
          <div className="services-label"><span /> Free growth review</div>
          <h2 id="insights-bottom-title">Not sure what is holding your website back?</h2>
          <p>Get a free Marketech Digital growth audit. We’ll review your website, Google presence, lead flow, and automation opportunities — then show you what can be improved.</p>
        </div>
        <Link href="/audit" className="btn btn-primary">Request Free Audit</Link>
      </section>
    </main>
  );
}
