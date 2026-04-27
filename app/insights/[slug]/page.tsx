import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCTA from "../ArticleCTA";
import RelatedInsights from "../RelatedInsights";
import { getInsightBySlug, insights } from "../insights-data";
import { absoluteUrl, breadcrumbJsonLd, jsonLdGraph, siteName } from "../../seo";

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getInsightBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: absoluteUrl(`/insights/${article.slug}`),
      siteName,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedFor2026 ? "2026-04-27" : article.date,
      authors: [siteName]
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription
    }
  };
}

export default function InsightArticlePage({ params }: { params: { slug: string } }) {
  const article = getInsightBySlug(params.slug);
  if (!article) notFound();

  const midpoint = Math.max(1, Math.floor(article.sections.length * 0.42));
  const structuredData = jsonLdGraph([
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: article.title, path: `/insights/${article.slug}` }
    ]),
    {
      "@type": "Article",
      "@id": absoluteUrl(`/insights/${article.slug}#article`),
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.date,
      dateModified: article.updatedFor2026 ? "2026-04-27" : article.date,
      author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
      publisher: { "@id": absoluteUrl("/#organization") },
      mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
      articleSection: article.category,
      inLanguage: "en-CA",
      keywords: [
        "Ottawa website design",
        "small business website design Ottawa",
        "local SEO Ottawa",
        "Google Business Profile optimization",
        "lead generation website",
        "website audit Ottawa",
        "AI automation for small businesses",
        "Kanata business website design",
        "Barrhaven local SEO"
      ]
    }
  ]);

  return (
    <main className="insights-page article-page">
      <Script
        id={`marketech-insight-${article.slug}-structured-data`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="article-shell">
        <header className="article-hero">
          <Link href="/insights" className="services-home">← Back to Insights</Link>
          <div className="article-kicker">
            <span>{article.category}</span>
            {article.updatedFor2026 ? <b>Updated for 2026</b> : null}
          </div>
          <h1>{article.title}</h1>
          <p>{article.intro}</p>
          <div className="article-meta-line">
            <time dateTime={article.date}>{new Date(`${article.date}T12:00:00`).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</time>
            <span>{article.readTime}</span>
          </div>
          <div className="article-service-links" aria-label="Related Marketech Digital services">
            {article.serviceLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/audit">Free Website Growth Audit</Link>
          </div>
        </header>

        <div className="article-content">
          {article.sections.map((section, index) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
              {index + 1 === midpoint ? <ArticleCTA compact /> : null}
            </section>
          ))}
          <ArticleCTA />
        </div>
      </article>
      <RelatedInsights article={article} />
    </main>
  );
}
