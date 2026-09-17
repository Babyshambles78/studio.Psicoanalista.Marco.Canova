export const appointmentStatus = {
  pending: "In attesa",
  confirmed: "Confermata",
  cancelled: "Annullata",
} as const;

export type AppointmentStatus = keyof typeof appointmentStatus;
