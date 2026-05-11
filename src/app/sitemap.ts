import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/repo/projects";
import { listWritings } from "@/lib/repo/writings";

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

  const projectRoutes: MetadataRoute.Sitemap = listProjects().map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const writingRoutes: MetadataRoute.Sitemap = listWritings("writing").map((item) => ({
    url: `${SITE_URL}/writing/${item.slug}`,
    lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const logRoutes: MetadataRoute.Sitemap = listWritings("log").map((item) => ({
    url: `${SITE_URL}/log/${item.slug}`,
    lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes, ...logRoutes];
}
