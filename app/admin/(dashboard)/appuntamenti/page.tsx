import { updateAppointmentStatus } from "@/lib/actions/appointments";
import { formatDateTime } from "@/lib/dates";
import { prisma } from "@/lib/prisma";
import { appointmentStatus } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function AppointmentsAdminPage() {
  const items = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: { slot: true },
  });

  return (
    <div>
      <h1 className="font-serif text-4xl">Richieste</h1>
      <ul className="mt-8 space-y-4">
        {items.length === 0 ? (
          <li className="rounded-2xl border border-line bg-white px-5 py-6 text-muted">
            Nessuna richiesta.
          </li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="rounded-2xl border border-line bg-white px-5 py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted">{formatDateTime(item.slot.startAt)}</p>
                  <p className="mt-2 text-sm">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                    <span className="mx-2">·</span>
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </p>
                  {item.note ? <p className="mt-2 text-sm leading-6 text-muted">{item.note}</p> : null}
                </div>
                <p className="text-sm text-sage">
                  {appointmentStatus[item.status as keyof typeof appointmentStatus]}
                </p>
              </div>
              {item.status !== "cancelled" ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.status !== "confirmed" ? (
                    <StatusButton id={item.id} status="confirmed" label="Conferma" />
                  ) : null}
                  <StatusButton id={item.id} status="cancelled" label="Annulla" />
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function StatusButton({ id, status, label }: { id: string; status: string; label: string }) {
  return (
    <form action={updateAppointmentStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded-full border border-line px-4 py-2 text-sm hover:bg-paper"
      >
        {label}
      </button>
    </form>
  );
}
