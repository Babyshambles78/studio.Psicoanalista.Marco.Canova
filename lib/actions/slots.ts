"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { parseDateTimeLocal } from "@/lib/dates";
import { prisma } from "@/lib/prisma";

export async function createSlot(formData: FormData) {
  await requireAdmin();
  const start = parseDateTimeLocal(String(formData.get("startAt") ?? ""));
  const duration = Number(formData.get("duration") ?? 50);
  if (!start) throw new Error("Data e ora non valide.");
  const minutes = Number.isFinite(duration) && duration >= 30 ? duration : 50;
  const endAt = new Date(start.getTime() + minutes * 60 * 1000);
  await prisma.slot.create({ data: { startAt: start, endAt, isOpen: true } });
  revalidatePath("/prenota");
  revalidatePath("/admin/disponibilita");
}

export async function deleteSlot(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const slot = await prisma.slot.findUnique({
    where: { id },
    include: { appointments: { where: { status: { in: ["pending", "confirmed"] } } } },
  });
  if (!slot) return;
  if (slot.appointments.length > 0) {
    throw new Error("Non è possibile eliminare uno slot con richieste attive.");
  }
  await prisma.slot.delete({ where: { id } });
  revalidatePath("/prenota");
  revalidatePath("/admin/disponibilita");
}
