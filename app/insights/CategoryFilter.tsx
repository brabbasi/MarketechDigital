"use client";

import { useMemo, useState } from "react";
import InsightCard from "./InsightCard";
import { insightCategories, insights, type InsightCategory } from "./insights-data";

export default function CategoryFilter() {
  const [active, setActive] = useState<"All" | InsightCategory>("All");
  const filtered = useMemo(
    () => active === "All" ? insights : insights.filter((article) => article.category === active),
    [active]
  );

  return (
    <section id="articles" className="insights-section insights-article-system" aria-labelledby="all-insights-title">
      <div className="insights-section-head">
        <div>
          <div className="services-label"><span /> Explore Growth Guides</div>
          <h2 id="all-insights-title">Insights built for local business growth.</h2>
        </div>
        <p>Filter by website design, local SEO, Google Business Profile, lead generation, AI automation, or industry-specific guidance.</p>
      </div>
      <div className="insight-filter-row" aria-label="Insight category filters">
        {insightCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={active === category ? "active" : ""}
            onClick={() => setActive(category)}
            aria-pressed={active === category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="insights-grid" aria-live="polite">
        {filtered.map((article) => <InsightCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
