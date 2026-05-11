/**
 * One-shot seed: filesystem MDX + TS data → SQLite.
 * Idempotent — uses upsert so re-running keeps the DB current.
 * Usage:
 *   npx tsx scripts/seed.ts                  # local
 *   DATABASE_PATH=/path/db.sqlite npx tsx scripts/seed.ts
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDb } from "../src/lib/db";
import { upsertWriting } from "../src/lib/repo/writings";
import { upsertProject } from "../src/lib/repo/projects";
import { upsertReading } from "../src/lib/repo/reading";
import { upsertLab } from "../src/lib/repo/lab";
import { projects as projectSeed } from "../src/data/projects";
import { readingItems as readingSeed } from "../src/data/reading";
import { labItems as labSeed } from "../src/data/lab";

const ROOT = process.cwd();

function toIso(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
}

function seedMdxDir(dir: "writing" | "log") {
  const full = path.join(ROOT, "content", dir);
  if (!fs.existsSync(full)) return 0;
  const files = fs.readdirSync(full).filter((f) => f.match(/\.mdx?$/));
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(full, file), "utf8");
    const { data, content } = matter(raw);
    upsertWriting({
      slug,
      type: dir,
      title: String(data.title ?? slug),
      summary: String(data.summary ?? ""),
      body: content.trim(),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      projectSlug: data.projectSlug ? String(data.projectSlug) : null,
      visibility:
        data.visibility === "unlisted" || data.visibility === "private"
          ? data.visibility
          : "public",
      status: data.draft ? "draft" : "published",
      publishedAt: toIso(data.publishedAt) ?? null,
    });
  }
  return files.length;
}

function main() {
  console.log(`DB → ${process.env.DATABASE_PATH ?? path.join(ROOT, ".data/db.sqlite")}`);
  getDb(); // ensure schema

  const w = seedMdxDir("writing");
  const l = seedMdxDir("log");
  console.log(`writing  : ${w}`);
  console.log(`log      : ${l}`);

  let p = 0;
  for (const proj of projectSeed) {
    upsertProject({
      slug: proj.slug,
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      categories: [...proj.categories],
      priority: proj.priority,
      status: proj.status,
      visibility: proj.visibility,
      featured: proj.featured,
      stack: [...proj.stack],
      links: proj.links,
      metrics: proj.metrics ? [...proj.metrics] : [],
      roadmap: proj.roadmap ? [...proj.roadmap] : [],
      orderNum: proj.order,
    });
    p++;
  }
  console.log(`projects : ${p}`);

  let r = 0;
  // Clear and reseed reading since it uses autoincrement ids
  const db = getDb();
  db.prepare("DELETE FROM reading_items").run();
  for (let i = 0; i < readingSeed.length; i++) {
    const item = readingSeed[i];
    upsertReading({
      title: item.title,
      author: item.author,
      type: item.type,
      topic: item.topic,
      url: item.url,
      note: item.note,
      finishedAt: item.finishedAt,
      visibility: "public",
      orderNum: (i + 1) * 10,
    });
    r++;
  }
  console.log(`reading  : ${r}`);

  let lab = 0;
  for (let i = 0; i < labSeed.length; i++) {
    const item = labSeed[i];
    upsertLab({
      slug: item.slug,
      title: item.title,
      description: item.description,
      kind: item.kind,
      status: item.status,
      href: item.href,
      stack: item.stack ? [...item.stack] : [],
      visibility: "public",
      orderNum: (i + 1) * 10,
    });
    lab++;
  }
  console.log(`lab      : ${lab}`);
  console.log("✓ seed done");
}

main();
