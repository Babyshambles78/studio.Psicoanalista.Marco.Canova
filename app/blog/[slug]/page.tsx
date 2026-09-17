import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { formatDateTime } from "@/lib/dates";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) return { title: "Articolo" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-sage">Blog</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight">{post.title}</h1>
      {post.publishedAt ? (
        <p className="mt-3 text-sm text-muted">{formatDateTime(post.publishedAt)}</p>
      ) : null}
      <Prose className="mt-10" text={post.content} />
    </article>
  );
}
