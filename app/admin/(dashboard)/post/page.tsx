import Link from "next/link";
import { deletePost } from "@/lib/actions/posts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h1 className="font-serif text-4xl">Blog</h1>
        <Link
          href="/admin/post/nuovo"
          className="rounded-full bg-sage px-4 py-2 text-sm text-white hover:bg-sage-dark"
        >
          Nuovo articolo
        </Link>
      </div>
      <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-muted">{post.published ? "Pubblicato" : "Bozza"}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/post/${post.id}`} className="text-sage hover:text-sage-dark">
                Modifica
              </Link>
              <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="text-clay">
                  Elimina
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
