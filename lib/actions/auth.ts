"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkAdminPassword, createSessionToken } from "@/lib/auth";

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkAdminPassword(password)) {
    return { error: "Password non corretta." };
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
