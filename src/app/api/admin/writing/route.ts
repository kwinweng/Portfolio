import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertWriting, deleteWriting } from "@/lib/repo/writings";
import type { UpsertWritingInput } from "@/lib/repo/writings";

function revalidate(type: "writing" | "log") {
  revalidatePath(`/${type}`);
  revalidatePath(`/${type}/[slug]`, "page");
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");
  revalidatePath("/");
}

function parseBody(b: unknown): UpsertWritingInput | { error: string } {
  if (!b || typeof b !== "object") return { error: "invalid body" };
  const o = b as Record<string, unknown>;
  if (o.type !== "writing" && o.type !== "log")
    return { error: "type must be 'writing' or 'log'" };
  if (!o.slug || typeof o.slug !== "string")
    return { error: "slug required" };
  if (!o.title || typeof o.title !== "string")
    return { error: "title required" };
  return {
    slug: o.slug,
    type: o.type,
    title: o.title,
    summary: typeof o.summary === "string" ? o.summary : "",
    body: typeof o.body === "string" ? o.body : "",
    tags: Array.isArray(o.tags) ? o.tags.map(String) : [],
    projectSlug: typeof o.projectSlug === "string" ? o.projectSlug : null,
    visibility:
      o.visibility === "public" ||
      o.visibility === "unlisted" ||
      o.visibility === "private"
        ? o.visibility
        : "public",
    status:
      o.status === "draft" ||
      o.status === "published" ||
      o.status === "archived"
        ? o.status
        : "draft",
    publishedAt: typeof o.publishedAt === "string" ? o.publishedAt : null,
  };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = parseBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  upsertWriting(parsed);
  revalidate(parsed.type);
  return NextResponse.json({ ok: true, slug: parsed.slug });
}

export async function PUT(req: Request) {
  return POST(req);
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const { type, slug } = body as { type?: string; slug?: string };
  if (type !== "writing" && type !== "log") {
    return NextResponse.json({ error: "invalid type" }, { status: 400 });
  }
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  deleteWriting(type, slug);
  revalidate(type);
  return NextResponse.json({ ok: true });
}
