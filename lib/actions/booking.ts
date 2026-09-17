"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return /^[0-9+\s().-]{8,20}$/.test(value);
}

export async function bookAppointment(_prev: { error?: string; ok?: boolean } | null, formData: FormData) {
  const slotId = String(formData.get("slotId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!slotId) return { error: "Seleziona uno slot disponibile." };
  if (name.length < 2) return { error: "Indica nome e cognome." };
  if (!isEmail(email)) return { error: "Indica un’email valida." };
  if (!isPhone(phone)) return { error: "Indica un telefono valido." };
  if (note.length > 1000) return { error: "La nota è troppo lunga." };

  try {
    await prisma.$transaction(async (tx) => {
      const slot = await tx.slot.findUnique({ where: { id: slotId } });
      if (!slot || !slot.isOpen || slot.startAt < new Date()) {
        throw new Error("SLOT");
      }
      await tx.appointment.create({
        data: { slotId, name, email, phone, note, status: "pending" },
      });
      await tx.slot.update({ where: { id: slotId }, data: { isOpen: false } });
    });
  } catch {
    return { error: "Lo slot non è più disponibile. Scegline un altro." };
  }

  revalidatePath("/prenota");
  revalidatePath("/admin");
  revalidatePath("/admin/appuntamenti");
  revalidatePath("/admin/disponibilita");
  return { ok: true };
}
