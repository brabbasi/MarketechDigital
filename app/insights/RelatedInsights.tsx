import InsightCard from "./InsightCard";
import { getRelatedInsights, type InsightArticle } from "./insights-data";

export default function RelatedInsights({ article }: { article: InsightArticle }) {
  const related = getRelatedInsights(article, 3);

  return (
    <section className="related-insights" aria-labelledby="related-insights-title">
      <div className="insights-section-head">
        <div>
          <div className="services-label"><span /> Related Insights</div>
          <h2 id="related-insights-title">Keep sharpening the growth system.</h2>
        </div>
        <p>More practical guides connected to website clarity, local SEO, lead flow, and automation.</p>
      </div>
      <div className="insights-grid related">
        {related.map((item) => <InsightCard key={item.slug} article={item} />)}
      </div>
    </section>
  );
}
