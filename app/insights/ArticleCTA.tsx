import Link from "next/link";

export default function ArticleCTA({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={compact ? "article-cta compact" : "article-cta"}>
      <div>
        <div className="services-label"><span /> Free Website Growth Audit</div>
        <h2>{compact ? "Want us to review your website?" : "Want a website that actually helps your business grow?"}</h2>
        <p>
          {compact
            ? "We’ll review your website, mobile experience, SEO basics, Google presence, lead capture, and simple automation opportunities."
            : "Marketech Digital helps local businesses improve their website, SEO, Google presence, and lead flow with premium design and simple automation."}
        </p>
      </div>
      <Link href="/audit" className="btn btn-primary">{compact ? "Get a Free Website Growth Audit" : "Request Your Free Audit"}</Link>
    </aside>
  );
}
