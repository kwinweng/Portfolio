import { getDb } from "@/lib/db";
import type { LabRow, ListOpts } from "@/lib/repo/types";

type LabDbRow = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  status: string;
  href: string | null;
  stack: string;
  visibility: "public" | "unlisted" | "private";
  order_num: number;
};

function mapRow(r: LabDbRow): LabRow {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    kind: r.kind,
    status: r.status,
    href: r.href ?? undefined,
    stack: JSON.parse(r.stack) as string[],
    visibility: r.visibility,
    orderNum: r.order_num,
  };
}

function visibilityClause(opts: ListOpts): string {
  const vis = ["'public'"];
  if (opts.includeUnlisted) vis.push("'unlisted'");
  if (opts.includePrivate) vis.push("'private'");
  return `visibility IN (${vis.join(",")})`;
}

export function listLab(opts: ListOpts = {}): LabRow[] {
  const db = getDb();
  return db
    .prepare<[], LabDbRow>(
      `SELECT * FROM lab_items WHERE ${visibilityClause(opts)} ORDER BY order_num ASC, slug ASC`
    )
    .all()
    .map(mapRow);
}

export function getLab(slug: string): LabRow | undefined {
  const db = getDb();
  const row = db
    .prepare<[string], LabDbRow>(
      `SELECT * FROM lab_items WHERE slug = ? LIMIT 1`
    )
    .get(slug);
  return row ? mapRow(row) : undefined;
}

export type UpsertLabInput = LabRow;

export function upsertLab(input: UpsertLabInput): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO lab_items
       (slug, title, description, kind, status, href, stack, visibility, order_num)
     VALUES (@slug, @title, @description, @kind, @status, @href, @stack, @visibility, @order_num)
     ON CONFLICT(slug) DO UPDATE SET
       title=excluded.title,
       description=excluded.description,
       kind=excluded.kind,
       status=excluded.status,
       href=excluded.href,
       stack=excluded.stack,
       visibility=excluded.visibility,
       order_num=excluded.order_num`
  ).run({
    slug: input.slug,
    title: input.title,
    description: input.description,
    kind: input.kind,
    status: input.status,
    href: input.href ?? null,
    stack: JSON.stringify(input.stack),
    visibility: input.visibility,
    order_num: input.orderNum,
  });
}

export function deleteLab(slug: string): void {
  getDb().prepare("DELETE FROM lab_items WHERE slug = ?").run(slug);
}

export function countLab(): number {
  const r = getDb()
    .prepare<[], { c: number }>("SELECT COUNT(*) as c FROM lab_items")
    .get();
  return r?.c ?? 0;
}
