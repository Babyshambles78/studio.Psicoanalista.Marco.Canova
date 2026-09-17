import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
          <p className="text-xs uppercase tracking-[0.22em] text-sage">Studio a Bologna</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-ink sm:text-6xl">
            Uno spazio di parola, non un protocollo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {site.name}, {site.role.toLowerCase()}. Colloqui, psicoterapia e lavoro analitico in{" "}
            {site.address}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/prenota"
              className="rounded-full bg-sage px-6 py-3 text-sm text-white hover:bg-sage-dark"
            >
              Prenota un colloquio
            </Link>
            <Link
              href="/chi-sono"
              className="rounded-full border border-line px-6 py-3 text-sm text-ink hover:bg-cream"
            >
              Chi sono
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl">Il lavoro</h2>
          <p className="mt-4 leading-8 text-muted">
            Si riceve in studio per un primo colloquio. Non si procede per questionari o percorsi
            prefissati: si ascolta una domanda, si valuta se la psicoanalisi è indicata, e si
            concordano frequenza e quadro.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-6 leading-8 text-muted">
          <p>{site.albo}</p>
          <p className="mt-2">{site.address}</p>
          <p className="mt-2">
            <a href={site.phoneHref}>{site.phone}</a>
            <span className="mx-2">·</span>
            <a href={site.emailHref}>{site.email}</a>
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-3xl">Dal blog</h2>
            <Link href="/blog" className="text-sm text-sage hover:text-sage-dark">
              Tutti gli scritti
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-line bg-paper p-5 hover:border-sage/40"
              >
                <h3 className="font-serif text-2xl leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
