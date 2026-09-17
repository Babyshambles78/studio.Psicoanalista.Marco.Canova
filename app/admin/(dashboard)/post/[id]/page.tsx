import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 font-serif text-4xl">Modifica articolo</h1>
      <PostForm post={post} />
    </div>
  );
}
