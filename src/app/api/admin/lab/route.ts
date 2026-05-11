import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertLab, deleteLab } from "@/lib/repo/lab";
import type { UpsertLabInput } from "@/lib/repo/lab";

function revalidate() {
  revalidatePath("/lab");
  revalidatePath("/");
}

function parseBody(b: unknown): UpsertLabInput | { error: string } {
  if (!b || typeof b !== "object") return { error: "invalid body" };
  const o = b as Record<string, unknown>;
  if (!o.slug || typeof o.slug !== "string")
    return { error: "slug required" };
  if (!o.title || typeof o.title !== "string")
    return { error: "title required" };
  return {
    slug: o.slug,
    title: o.title,
    description: typeof o.description === "string" ? o.description : "",
    kind: typeof o.kind === "string" ? o.kind : "tool",
    status: typeof o.status === "string" ? o.status : "active",
    href: typeof o.href === "string" ? o.href : undefined,
    stack: Array.isArray(o.stack) ? o.stack.map(String) : [],
    visibility:
      o.visibility === "public" ||
      o.visibility === "unlisted" ||
      o.visibility === "private"
        ? o.visibility
        : "public",
    orderNum: typeof o.orderNum === "number" ? o.orderNum : 100,
  };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = parseBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  upsertLab(parsed);
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
  deleteLab(slug);
  revalidate();
  return NextResponse.json({ ok: true });
}
