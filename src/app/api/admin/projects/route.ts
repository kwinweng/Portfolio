import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertProject, deleteProject } from "@/lib/repo/projects";
import type { UpsertProjectInput } from "@/lib/repo/projects";

function revalidate() {
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/");
}

function parseBody(b: unknown): UpsertProjectInput | { error: string } {
  if (!b || typeof b !== "object") return { error: "invalid body" };
  const o = b as Record<string, unknown>;
  if (!o.slug || typeof o.slug !== "string")
    return { error: "slug required" };
  if (!o.title || typeof o.title !== "string")
    return { error: "title required" };
  return {
    slug: o.slug,
    title: o.title,
    subtitle: typeof o.subtitle === "string" ? o.subtitle : "",
    description: typeof o.description === "string" ? o.description : "",
    categories: Array.isArray(o.categories) ? o.categories.map(String) : [],
    priority: typeof o.priority === "string" ? o.priority : "B",
    status: typeof o.status === "string" ? o.status : "building",
    visibility:
      o.visibility === "public" ||
      o.visibility === "unlisted" ||
      o.visibility === "private"
        ? o.visibility
        : "public",
    featured: Boolean(o.featured),
    stack: Array.isArray(o.stack) ? o.stack.map(String) : [],
    links:
      o.links && typeof o.links === "object"
        ? (o.links as { demo?: string; github?: string; notes?: string })
        : {},
    metrics: Array.isArray(o.metrics)
      ? o.metrics.map((m) => ({
          label: String((m as { label?: string }).label ?? ""),
          value: String((m as { value?: string }).value ?? ""),
        }))
      : [],
    roadmap: Array.isArray(o.roadmap) ? o.roadmap.map(String) : [],
    orderNum: typeof o.orderNum === "number" ? o.orderNum : 100,
  };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = parseBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  upsertProject(parsed);
  revalidate();
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
  const { slug } = body as { slug?: string };
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }
  deleteProject(slug);
  revalidate();
  return NextResponse.json({ ok: true });
}
