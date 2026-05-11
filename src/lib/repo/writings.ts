import { getDb } from "@/lib/db";
import type {
  WritingRow,
  ContentType,
  ListOpts,
} from "@/lib/repo/types";

type WritingDbRow = {
  slug: string;
  type: ContentType;
  title: string;
  summary: string;
  body: string;
  tags: string;
  project_slug: string | null;
  visibility: "public" | "unlisted" | "private";
  status: "draft" | "published" | "archived";
  published_at: string | null;
  updated_at: string;
  created_at: string;
};

function mapRow(r: WritingDbRow): WritingRow {
  return {
    slug: r.slug,
    type: r.type,
    title: r.title,
    summary: r.summary,
    body: r.body,
    tags: JSON.parse(r.tags) as string[],
    projectSlug: r.project_slug ?? undefined,
    visibility: r.visibility,
    status: r.status,
    publishedAt: r.published_at ?? undefined,
    updatedAt: r.updated_at,
    createdAt: r.created_at,
  };
}

function visibilityClause(opts: ListOpts): string {
  const vis = ["'public'"];
  if (opts.includeUnlisted) vis.push("'unlisted'");
  if (opts.includePrivate) vis.push("'private'");
  return `visibility IN (${vis.join(",")})`;
}

export function listWritings(
  type: ContentType,
  opts: ListOpts = {}
): WritingRow[] {
  const db = getDb();
  const visFilter = visibilityClause(opts);
  const statusFilter = opts.includeDrafts
    ? ""
    : "AND status = 'published'";
  const stmt = db.prepare<[ContentType], WritingDbRow>(
    `SELECT * FROM writings
     WHERE type = ? AND ${visFilter} ${statusFilter}
     ORDER BY COALESCE(published_at, updated_at) DESC`
  );
  return stmt.all(type).map(mapRow);
}

export function getWriting(
  type: ContentType,
  slug: string,
  opts: ListOpts = {}
): WritingRow | undefined {
  const db = getDb();
  const visFilter = visibilityClause(opts);
  const stmt = db.prepare<[ContentType, string], WritingDbRow>(
    `SELECT * FROM writings WHERE type = ? AND slug = ? AND ${visFilter} LIMIT 1`
  );
  const row = stmt.get(type, slug);
  return row ? mapRow(row) : undefined;
}

export function getAdjacentWritings(
  type: ContentType,
  slug: string,
  opts: ListOpts = {}
): { prev?: WritingRow; next?: WritingRow } {
  const all = listWritings(type, opts);
  const i = all.findIndex((w) => w.slug === slug);
  if (i === -1) return {};
  return {
    prev: i + 1 < all.length ? all[i + 1] : undefined,
    next: i - 1 >= 0 ? all[i - 1] : undefined,
  };
}

export function listAllForAdmin(): WritingRow[] {
  const db = getDb();
  const stmt = db.prepare<[], WritingDbRow>(
    `SELECT * FROM writings ORDER BY COALESCE(published_at, updated_at) DESC`
  );
  return stmt.all().map(mapRow);
}

export type UpsertWritingInput = {
  slug: string;
  type: ContentType;
  title: string;
  summary?: string;
  body: string;
  tags?: string[];
  projectSlug?: string | null;
  visibility?: "public" | "unlisted" | "private";
  status?: "draft" | "published" | "archived";
  publishedAt?: string | null;
};

export function upsertWriting(input: UpsertWritingInput): void {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO writings
       (slug, type, title, summary, body, tags, project_slug, visibility, status, published_at, updated_at)
     VALUES
       (@slug, @type, @title, @summary, @body, @tags, @project_slug, @visibility, @status, @published_at, @updated_at)
     ON CONFLICT(type, slug) DO UPDATE SET
       type=excluded.type,
       title=excluded.title,
       summary=excluded.summary,
       body=excluded.body,
       tags=excluded.tags,
       project_slug=excluded.project_slug,
       visibility=excluded.visibility,
       status=excluded.status,
       published_at=excluded.published_at,
       updated_at=excluded.updated_at`
  ).run({
    slug: input.slug,
    type: input.type,
    title: input.title,
    summary: input.summary ?? "",
    body: input.body,
    tags: JSON.stringify(input.tags ?? []),
    project_slug: input.projectSlug ?? null,
    visibility: input.visibility ?? "public",
    status: input.status ?? "draft",
    published_at: input.publishedAt ?? null,
    updated_at: now,
  });
}

export function deleteWriting(type: ContentType, slug: string): void {
  getDb()
    .prepare("DELETE FROM writings WHERE type = ? AND slug = ?")
    .run(type, slug);
}

export function countWritings(): { writing: number; log: number } {
  const db = getDb();
  const writing = db
    .prepare<[], { c: number }>(
      "SELECT COUNT(*) as c FROM writings WHERE type='writing'"
    )
    .get();
  const log = db
    .prepare<[], { c: number }>(
      "SELECT COUNT(*) as c FROM writings WHERE type='log'"
    )
    .get();
  return { writing: writing?.c ?? 0, log: log?.c ?? 0 };
}
