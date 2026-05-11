import { getDb } from "@/lib/db";
import type { ProjectRow, ListOpts } from "@/lib/repo/types";

type ProjectDbRow = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string;
  priority: string;
  status: string;
  visibility: "public" | "unlisted" | "private";
  featured: number;
  stack: string;
  links: string;
  metrics: string;
  roadmap: string;
  order_num: number;
  updated_at: string;
};

function mapRow(r: ProjectDbRow): ProjectRow {
  return {
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    description: r.description,
    categories: JSON.parse(r.categories) as string[],
    priority: r.priority,
    status: r.status,
    visibility: r.visibility,
    featured: r.featured === 1,
    stack: JSON.parse(r.stack) as string[],
    links: JSON.parse(r.links),
    metrics: JSON.parse(r.metrics),
    roadmap: JSON.parse(r.roadmap) as string[],
    orderNum: r.order_num,
    updatedAt: r.updated_at,
  };
}

function visibilityClause(opts: ListOpts): string {
  const vis = ["'public'"];
  if (opts.includeUnlisted) vis.push("'unlisted'");
  if (opts.includePrivate) vis.push("'private'");
  return `visibility IN (${vis.join(",")})`;
}

export function listProjects(opts: ListOpts = {}): ProjectRow[] {
  const db = getDb();
  const stmt = db.prepare<[], ProjectDbRow>(
    `SELECT * FROM projects WHERE ${visibilityClause(opts)} ORDER BY order_num ASC`
  );
  return stmt.all().map(mapRow);
}

export function getProject(
  slug: string,
  opts: ListOpts = {}
): ProjectRow | undefined {
  const db = getDb();
  const stmt = db.prepare<[string], ProjectDbRow>(
    `SELECT * FROM projects WHERE slug = ? AND ${visibilityClause(opts)} LIMIT 1`
  );
  const row = stmt.get(slug);
  return row ? mapRow(row) : undefined;
}

export function listAllProjectsForAdmin(): ProjectRow[] {
  const db = getDb();
  const stmt = db.prepare<[], ProjectDbRow>(
    `SELECT * FROM projects ORDER BY order_num ASC`
  );
  return stmt.all().map(mapRow);
}

export type UpsertProjectInput = Omit<ProjectRow, "updatedAt">;

export function upsertProject(input: UpsertProjectInput): void {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO projects
       (slug, title, subtitle, description, categories, priority, status, visibility, featured, stack, links, metrics, roadmap, order_num, updated_at)
     VALUES
       (@slug, @title, @subtitle, @description, @categories, @priority, @status, @visibility, @featured, @stack, @links, @metrics, @roadmap, @order_num, @updated_at)
     ON CONFLICT(slug) DO UPDATE SET
       title=excluded.title,
       subtitle=excluded.subtitle,
       description=excluded.description,
       categories=excluded.categories,
       priority=excluded.priority,
       status=excluded.status,
       visibility=excluded.visibility,
       featured=excluded.featured,
       stack=excluded.stack,
       links=excluded.links,
       metrics=excluded.metrics,
       roadmap=excluded.roadmap,
       order_num=excluded.order_num,
       updated_at=excluded.updated_at`
  ).run({
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    categories: JSON.stringify(input.categories),
    priority: input.priority,
    status: input.status,
    visibility: input.visibility,
    featured: input.featured ? 1 : 0,
    stack: JSON.stringify(input.stack),
    links: JSON.stringify(input.links),
    metrics: JSON.stringify(input.metrics),
    roadmap: JSON.stringify(input.roadmap),
    order_num: input.orderNum,
    updated_at: now,
  });
}

export function deleteProject(slug: string): void {
  getDb().prepare("DELETE FROM projects WHERE slug = ?").run(slug);
}

export function countProjects(): number {
  const r = getDb()
    .prepare<[], { c: number }>("SELECT COUNT(*) as c FROM projects")
    .get();
  return r?.c ?? 0;
}
