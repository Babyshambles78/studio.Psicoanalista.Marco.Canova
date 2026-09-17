"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateAppointmentStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new Error("Stato non valido.");
  }

  await prisma.$transaction(async (tx) => {
    const appointment = await tx.appointment.findUnique({ where: { id } });
    if (!appointment) throw new Error("Richiesta non trovata.");
    await tx.appointment.update({ where: { id }, data: { status } });
    await tx.slot.update({
      where: { id: appointment.slotId },
      data: { isOpen: status === "cancelled" },
    });
  });

  revalidatePath("/prenota");
  revalidatePath("/admin");
  revalidatePath("/admin/appuntamenti");
  revalidatePath("/admin/disponibilita");
}
