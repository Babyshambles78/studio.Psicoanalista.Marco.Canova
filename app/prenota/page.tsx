import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { formatSlot } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prenota un colloquio",
};

export default async function PrenotaPage() {
  const slots = await prisma.slot.findMany({
    where: { isOpen: true, startAt: { gte: new Date() } },
    orderBy: { startAt: "asc" },
  });

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-sage">Appuntamenti</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight">Prenota un colloquio</h1>
        <p className="mt-4 leading-8 text-muted">
          Scegli uno slot aperto e lascia nome, email, telefono e, se vuoi, una nota. La richiesta
          resta in attesa fino alla conferma dello studio. Per comunicazioni urgenti:{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
      <BookingForm
        slots={slots.map((slot) => ({
          id: slot.id,
          label: `${formatSlot(slot.startAt).label} – ${formatSlot(slot.endAt).time}`,
        }))}
      />
    </div>
  );
}
