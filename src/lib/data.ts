import { projects } from "@/data/projects";
import { contentItems } from "@/data/content";
import type {
  Project,
  ContentItem,
  Category,
  Visibility,
} from "@/types/project";

type FilterOptions = {
  authenticated?: boolean;
};

function filterByVisibility<T extends { visibility: Visibility }>(
  items: T[],
  opts: FilterOptions = {}
): T[] {
  if (opts.authenticated) return items;
  return items.filter((item) => item.visibility === "public");
}

// Projects

export function getPublicProjects(opts: FilterOptions = {}): Project[] {
  return filterByVisibility(projects, opts).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(opts: FilterOptions = {}): Project[] {
  return getPublicProjects(opts).filter((p) => p.featured);
}

export function getProjectsByCategory(
  category: Category,
  opts: FilterOptions = {}
): Project[] {
  return getPublicProjects(opts).filter((p) =>
    p.categories.includes(category)
  );
}

export function getProjectBySlug(
  slug: string,
  opts: FilterOptions = {}
): Project | undefined {
  const all = opts.authenticated
    ? projects
    : projects.filter(
        (p) => p.visibility === "public" || p.visibility === "unlisted"
      );
  return all.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects
    .filter((p) => p.visibility === "public" || p.visibility === "unlisted")
    .map((p) => p.slug);
}

// Content

export function getPublicContent(
  type?: "article" | "log",
  opts: FilterOptions = {}
): ContentItem[] {
  let items = filterByVisibility(contentItems, opts).filter(
    (c) => c.status === "published"
  );
  if (type) items = items.filter((c) => c.type === type);
  return items.sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );
}

export function getContentBySlug(
  slug: string,
  opts: FilterOptions = {}
): ContentItem | undefined {
  const all = opts.authenticated
    ? contentItems
    : contentItems.filter(
        (c) => c.visibility === "public" || c.visibility === "unlisted"
      );
  return all.find((c) => c.slug === slug);
}
