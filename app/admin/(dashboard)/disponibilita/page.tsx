import { createSlot, deleteSlot } from "@/lib/actions/slots";
import { formatDateTime } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { SubmitButton } from "@/components/SubmitButton";

export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const slots = await prisma.slot.findMany({
    orderBy: { startAt: "asc" },
    include: {
      appointments: {
        where: { status: { in: ["pending", "confirmed"] } },
        take: 1,
      },
    },
  });

  return (
    <div>
      <h1 className="font-serif text-4xl">Disponibilità</h1>
      <form
        action={createSlot}
        className="mt-8 flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-white p-5"
      >
        <label className="text-sm text-muted">
          Inizio
          <input
            type="datetime-local"
            name="startAt"
            required
            className="mt-2 block rounded-xl border border-line bg-paper px-3 py-2"
          />
        </label>
        <label className="text-sm text-muted">
          Durata (minuti)
          <input
            type="number"
            name="duration"
            min={30}
            defaultValue={50}
            className="mt-2 block w-28 rounded-xl border border-line bg-paper px-3 py-2"
          />
        </label>
        <SubmitButton className="rounded-full bg-sage px-5 py-2 text-sm text-white hover:bg-sage-dark">
          Aggiungi slot
        </SubmitButton>
      </form>

      <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {slots.map((slot) => {
          const busy = slot.appointments[0];
          return (
            <li key={slot.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p>{formatDateTime(slot.startAt)} – {formatDateTime(slot.endAt).split(", ").at(-1)}</p>
                <p className="text-sm text-muted">
                  {busy
                    ? `${busy.status === "confirmed" ? "Confermato" : "Richiesta"} · ${busy.name}`
                    : slot.isOpen
                      ? "Aperto"
                      : "Chiuso"}
                </p>
              </div>
              {!busy ? (
                <form action={deleteSlot}>
                  <input type="hidden" name="id" value={slot.id} />
                  <button type="submit" className="text-sm text-clay">
                    Elimina
                  </button>
                </form>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
