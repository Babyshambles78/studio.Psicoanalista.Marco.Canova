import Link from "next/link";
import { formatDateTime } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { appointmentStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [posts, pending, upcoming] = await Promise.all([
    prisma.post.count(),
    prisma.appointment.count({ where: { status: "pending" } }),
    prisma.slot.count({ where: { isOpen: true, startAt: { gte: new Date() } } }),
  ]);

  const latest = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { slot: true },
  });

  return (
    <div>
      <h1 className="font-serif text-4xl">Quadro</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat href="/admin/post" label="Articoli" value={posts} />
        <Stat href="/admin/appuntamenti" label="Richieste in attesa" value={pending} />
        <Stat href="/admin/disponibilita" label="Slot aperti" value={upcoming} />
      </div>
      <h2 className="mt-12 font-serif text-2xl">Ultime richieste</h2>
      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
        {latest.length === 0 ? (
          <li className="px-5 py-6 text-muted">Nessuna richiesta per ora.</li>
        ) : (
          latest.map((item) => (
            <li key={item.id} className="px-5 py-4">
              <p className="font-medium">
                {item.name}{" "}
                <span className="text-sm font-normal text-muted">
                  · {appointmentStatus[item.status as keyof typeof appointmentStatus]}
                </span>
              </p>
              <p className="text-sm text-muted">{formatDateTime(item.slot.startAt)}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function Stat({ href, label, value }: { href: string; label: string; value: number }) {
  return (
    <Link href={href} className="rounded-2xl border border-line bg-white p-5 hover:border-sage/40">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-serif text-4xl">{value}</p>
    </Link>
  );
}
