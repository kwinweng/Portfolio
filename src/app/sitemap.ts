import type { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/data";
import { listContent } from "@/lib/content";

const SITE_URL = "https://kwinweng.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/log`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/reading`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getPublicProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const writingRoutes: MetadataRoute.Sitemap = listContent("writing").map((item) => ({
    url: `${SITE_URL}/writing/${item.slug}`,
    lastModified: item.updatedAt
      ? new Date(item.updatedAt)
      : item.publishedAt
        ? new Date(item.publishedAt)
        : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const logRoutes: MetadataRoute.Sitemap = listContent("log").map((item) => ({
    url: `${SITE_URL}/log/${item.slug}`,
    lastModified: item.updatedAt
      ? new Date(item.updatedAt)
      : item.publishedAt
        ? new Date(item.publishedAt)
        : now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes, ...logRoutes];
}
