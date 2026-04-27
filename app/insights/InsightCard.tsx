import Link from "next/link";
import type { InsightArticle } from "./insights-data";

export default function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <article className="insight-card">
      <div className="insight-card-glow" aria-hidden="true" />
      <div className="insight-card-top">
        <span>{article.category}</span>
        <time dateTime={article.date}>{new Date(`${article.date}T12:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</time>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="insight-card-meta">
        <span>{article.readTime}</span>
        {article.updatedFor2026 ? <span>Updated for 2026</span> : null}
      </div>
      <Link href={`/insights/${article.slug}`} aria-label={`Read insight: ${article.title}`}>Read Insight →</Link>
    </article>
  );
}
