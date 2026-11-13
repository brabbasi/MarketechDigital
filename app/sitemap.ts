import type { MetadataRoute } from "next";
import { absoluteUrl } from "./seo";
import { insights } from "./insights/insights-data";
import { servicePages } from "./services/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/services"),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/solutions/ottawa"),
      changeFrequency: "monthly",
      priority: 0.87
    },
    {
      url: absoluteUrl("/insights"),
      changeFrequency: "weekly",
      priority: 0.88
    },
    ...insights.map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}`),
      lastModified: new Date(`${article.date}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.78
    })),
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.86
    },
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.82
    })),
    {
      url: absoluteUrl("/founder"),
      changeFrequency: "monthly",
      priority: 0.75
    }
  ];
}
