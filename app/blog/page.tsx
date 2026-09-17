import type { Metadata } from "next";
import Link from "next/link";
import { formatDateTime } from "@/lib/dates";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.22em] text-sage">Scritti</p>
      <h1 className="mt-3 font-serif text-5xl">Blog</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        Note sullo studio, sul primo colloquio e sul lavoro analitico. Non sono consigli clinici
        generalizzati.
      </p>
      <ul className="mt-10 space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-line pb-6">
            <Link href={`/blog/${post.slug}`} className="group">
              <h2 className="font-serif text-3xl group-hover:text-sage-dark">{post.title}</h2>
              {post.publishedAt ? (
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {formatDateTime(post.publishedAt)}
                </p>
              ) : null}
              <p className="mt-3 leading-7 text-muted">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
