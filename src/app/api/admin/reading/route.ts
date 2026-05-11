import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { upsertReading, deleteReading } from "@/lib/repo/reading";
import type { UpsertReadingInput } from "@/lib/repo/reading";

function revalidate() {
  revalidatePath("/reading");
  revalidatePath("/");
}

function parseBody(b: unknown): UpsertReadingInput | { error: string } {
  if (!b || typeof b !== "object") return { error: "invalid body" };
  const o = b as Record<string, unknown>;
  if (!o.title || typeof o.title !== "string")
    return { error: "title required" };
  if (!o.topic || typeof o.topic !== "string")
    return { error: "topic required" };
  return {
    id: typeof o.id === "number" ? o.id : undefined,
    title: o.title,
    author: typeof o.author === "string" ? o.author : "",
    type:
      o.type === "book" || o.type === "essay" || o.type === "paper"
        ? o.type
        : "book",
    topic: o.topic,
    url: typeof o.url === "string" ? o.url : undefined,
    note: typeof o.note === "string" ? o.note : "",
    finishedAt: typeof o.finishedAt === "string" ? o.finishedAt : undefined,
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
  const id = upsertReading(parsed);
  revalidate();
  return NextResponse.json({ ok: true, id });
}

export async function PUT(req: Request) {
  return POST(req);
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const { id } = body as { id?: number };
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  deleteReading(id);
  revalidate();
  return NextResponse.json({ ok: true });
}
