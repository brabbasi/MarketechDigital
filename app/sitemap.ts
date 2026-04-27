import type { MetadataRoute } from "next";
import { absoluteUrl } from "./seo";
import { servicePages } from "./services/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.86
    },
    ...servicePages.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.82
    })),
    {
      url: absoluteUrl("/founder"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75
    }
  ];
}
