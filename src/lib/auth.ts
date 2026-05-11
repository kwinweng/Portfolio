import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const COOKIE_NAME = "kwinweng_admin";
const SESSION_DAYS = 7;

function getSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ?? "dev-only-secret-do-not-use-in-production";
  if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET env var is required in production");
  }
  return new TextEncoder().encode(secret);
}

export type AdminSession = {
  user: "admin";
  iat: number;
  exp: number;
};

export async function signSession(): Promise<string> {
  return await new SignJWT({ user: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());
}

export async function verifySession(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.user !== "admin") return null;
    return payload as AdminSession;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD;
  if (hash) {
    return bcrypt.compare(input, hash);
  }
  if (plain) {
    // dev convenience — direct string compare; production should use HASH
    return input === plain;
  }
  throw new Error(
    "Neither ADMIN_PASSWORD_HASH nor ADMIN_PASSWORD env var is set"
  );
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
