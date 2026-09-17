import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "studio_admin";
const WEEK_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !password) return false;
  return safeEqual(password, expected);
}

export function createSessionToken() {
  const exp = Date.now() + WEEK_SECONDS * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !secret()) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const expected = sign(payload);
  if (!safeEqual(sig, expected)) return false;
  const [, exp] = payload.split(".");
  if (!exp || Date.now() > Number(exp)) return false;
  return payload.startsWith("admin.");
}

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  const ok = await isAdmin();
  if (!ok) {
    throw new Error("Non autorizzato");
  }
}
