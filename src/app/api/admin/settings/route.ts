import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  setSettings,
  SETTING_DEFAULTS,
  type SettingKey,
  type SiteSettings,
} from "@/lib/repo/settings";

function parseBody(b: unknown): Partial<SiteSettings> | { error: string } {
  if (!b || typeof b !== "object") return { error: "invalid body" };
  const o = b as Record<string, unknown>;
  const patch: Partial<SiteSettings> = {};
  for (const key of Object.keys(SETTING_DEFAULTS) as SettingKey[]) {
    const v = o[key];
    if (typeof v === "string") patch[key] = v;
  }
  return patch;
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = parseBody(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  setSettings(parsed);
  revalidatePath("/");
  revalidatePath("/about");
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  return PUT(req);
}
