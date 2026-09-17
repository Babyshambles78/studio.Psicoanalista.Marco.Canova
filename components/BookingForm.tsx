"use client";

import { useActionState, useState } from "react";
import { bookAppointment } from "@/lib/actions/booking";
import { SubmitButton } from "@/components/SubmitButton";

type SlotOption = { id: string; label: string };

export function BookingForm({ slots }: { slots: SlotOption[] }) {
  const [state, action] = useActionState(bookAppointment, null);
  const [slotId, setSlotId] = useState(slots[0]?.id ?? "");

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-line bg-white px-6 py-8">
        <h2 className="font-serif text-3xl text-ink">Richiesta inviata</h2>
        <p className="mt-3 leading-7 text-muted">
          La prenotazione è stata registrata. Riceverai una conferma quando lo slot sarà accettato.
          Per urgenze puoi scrivere o telefonare allo studio.
        </p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-white px-6 py-8 leading-7 text-muted">
        Al momento non ci sono slot aperti. Puoi riprovare più avanti o contattare lo studio.
      </p>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-line bg-white px-6 py-8">
      <div>
        <label htmlFor="slotId" className="mb-2 block text-sm text-muted">
          Data e ora
        </label>
        <select
          id="slotId"
          name="slotId"
          value={slotId}
          onChange={(event) => setSlotId(event.target.value)}
          className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
          required
        >
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.label}
            </option>
          ))}
        </select>
      </div>
      <Field id="name" name="name" label="Nome e cognome" required />
      <Field id="email" name="email" label="Email" type="email" required />
      <Field id="phone" name="phone" label="Telefono" required />
      <div>
        <label htmlFor="note" className="mb-2 block text-sm text-muted">
          Nota (facoltativa)
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
        />
      </div>
      {state?.error ? <p className="text-sm text-clay">{state.error}</p> : null}
      <p className="text-xs leading-5 text-muted">
        I dati servono solo a organizzare il colloquio e non vengono usati per altre finalità.
      </p>
      <SubmitButton className="rounded-full bg-sage px-6 py-3 text-sm text-white hover:bg-sage-dark disabled:opacity-60">
        Invia richiesta
      </SubmitButton>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
      />
    </div>
  );
}
