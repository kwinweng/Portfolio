import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "writing" | "log";

export type ContentMeta = {
  slug: string;
  type: ContentType;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  projectSlug?: string;
  draft?: boolean;
  readingMinutes: number;
  wordCount: number;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function toIsoDate(value: unknown): string {
  if (!value) return "";
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  const s = String(value);
  // already ISO yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return s;
}

function readWordCount(raw: string): number {
  const stripped = raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[.*?\]\(.*?\)/g, " ")
    .replace(/[#>*_~\-]/g, " ");

  const ascii = stripped.match(/[A-Za-z0-9]+/g) ?? [];
  const cjk = stripped.match(/[一-鿿]/g) ?? [];
  return ascii.length + Math.ceil(cjk.length / 2);
}

function estimateReadingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 250));
}

function readDir(type: ContentType): ContentMeta[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const words = readWordCount(content);

      return {
        slug,
        type,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        publishedAt: toIsoDate(data.publishedAt),
        updatedAt: data.updatedAt ? toIsoDate(data.updatedAt) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        projectSlug: data.projectSlug ? String(data.projectSlug) : undefined,
        draft: Boolean(data.draft),
        readingMinutes: estimateReadingMinutes(words),
        wordCount: words,
      } satisfies ContentMeta;
    });
}

function sortDesc(items: ContentMeta[]): ContentMeta[] {
  return [...items].sort((a, b) => {
    if (!a.publishedAt) return 1;
    if (!b.publishedAt) return -1;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export function listContent(
  type: ContentType,
  opts: { includeDrafts?: boolean } = {}
): ContentMeta[] {
  const items = readDir(type).filter(
    (item) => opts.includeDrafts || !item.draft
  );
  return sortDesc(items);
}

export function getContentMeta(
  type: ContentType,
  slug: string
): ContentMeta | undefined {
  return readDir(type).find((item) => item.slug === slug);
}

export function getAdjacentContent(
  type: ContentType,
  slug: string
): { prev?: ContentMeta; next?: ContentMeta } {
  const items = listContent(type);
  const i = items.findIndex((item) => item.slug === slug);
  if (i === -1) return {};
  return {
    prev: i + 1 < items.length ? items[i + 1] : undefined,
    next: i - 1 >= 0 ? items[i - 1] : undefined,
  };
}

export function listAllContent(opts: { includeDrafts?: boolean } = {}): ContentMeta[] {
  return sortDesc([...listContent("writing", opts), ...listContent("log", opts)]);
}
