import { getDb } from "@/lib/db";
import type { ReadingRow, ListOpts } from "@/lib/repo/types";

type ReadingDbRow = {
  id: number;
  title: string;
  author: string;
  type: "book" | "essay" | "paper";
  topic: string;
  url: string | null;
  note: string;
  finished_at: string | null;
  visibility: "public" | "unlisted" | "private";
  order_num: number;
};

function mapRow(r: ReadingDbRow): ReadingRow {
  return {
    id: r.id,
    title: r.title,
    author: r.author,
    type: r.type,
    topic: r.topic,
    url: r.url ?? undefined,
    note: r.note,
    finishedAt: r.finished_at ?? undefined,
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

export function listReading(opts: ListOpts = {}): ReadingRow[] {
  const db = getDb();
  return db
    .prepare<[], ReadingDbRow>(
      `SELECT * FROM reading_items WHERE ${visibilityClause(opts)} ORDER BY order_num ASC, id ASC`
    )
    .all()
    .map(mapRow);
}

export function getReadingById(id: number): ReadingRow | undefined {
  const db = getDb();
  const row = db
    .prepare<[number], ReadingDbRow>(
      `SELECT * FROM reading_items WHERE id = ? LIMIT 1`
    )
    .get(id);
  return row ? mapRow(row) : undefined;
}

export type UpsertReadingInput = Omit<ReadingRow, "id"> & { id?: number };

export function upsertReading(input: UpsertReadingInput): number {
  const db = getDb();
  if (input.id) {
    db.prepare(
      `UPDATE reading_items SET
        title=@title, author=@author, type=@type, topic=@topic, url=@url,
        note=@note, finished_at=@finished_at, visibility=@visibility, order_num=@order_num
       WHERE id=@id`
    ).run({
      id: input.id,
      title: input.title,
      author: input.author,
      type: input.type,
      topic: input.topic,
      url: input.url ?? null,
      note: input.note,
      finished_at: input.finishedAt ?? null,
      visibility: input.visibility,
      order_num: input.orderNum,
    });
    return input.id;
  }
  const info = db
    .prepare(
      `INSERT INTO reading_items
        (title, author, type, topic, url, note, finished_at, visibility, order_num)
       VALUES (@title, @author, @type, @topic, @url, @note, @finished_at, @visibility, @order_num)`
    )
    .run({
      title: input.title,
      author: input.author,
      type: input.type,
      topic: input.topic,
      url: input.url ?? null,
      note: input.note,
      finished_at: input.finishedAt ?? null,
      visibility: input.visibility,
      order_num: input.orderNum,
    });
  return Number(info.lastInsertRowid);
}

export function deleteReading(id: number): void {
  getDb().prepare("DELETE FROM reading_items WHERE id = ?").run(id);
}

export function countReading(): number {
  const r = getDb()
    .prepare<[], { c: number }>("SELECT COUNT(*) as c FROM reading_items")
    .get();
  return r?.c ?? 0;
}
