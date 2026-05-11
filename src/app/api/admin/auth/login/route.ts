import { NextResponse } from "next/server";
import { signSession, setSessionCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (!body.password) {
    return NextResponse.json({ error: "password required" }, { status: 400 });
  }
  const ok = await verifyPassword(body.password);
  if (!ok) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 });
  }
  const token = await signSession();
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
