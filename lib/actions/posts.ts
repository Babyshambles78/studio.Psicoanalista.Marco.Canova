"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

async function uniqueSlug(base: string, excludeId?: string) {
  const root = slugify(base) || "post";
  let slug = root;
  let n = 2;
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${root}-${n}`;
    n += 1;
  }
}

export async function savePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const published = formData.get("published") === "on";
  const requestedSlug = String(formData.get("slug") ?? "").trim();

  if (!title || !excerpt || !content) {
    throw new Error("Titolo, estratto e testo sono obbligatori.");
  }

  const slug = await uniqueSlug(requestedSlug || title, id || undefined);
  const data = {
    title,
    slug,
    excerpt,
    content,
    published,
    publishedAt: published ? new Date() : null,
  };

  if (id) {
    const current = await prisma.post.findUnique({ where: { id } });
    if (!current) throw new Error("Articolo non trovato.");
    await prisma.post.update({
      where: { id },
      data: {
        ...data,
        publishedAt: published ? current.publishedAt ?? new Date() : null,
      },
    });
  } else {
    await prisma.post.create({ data });
  }

  revalidatePath("/blog");
  revalidatePath("/admin/post");
  redirect("/admin/post");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/post");
}
