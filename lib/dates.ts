const rome = { timeZone: "Europe/Rome" } as const;

export function formatSlot(date: Date) {
  const day = new Intl.DateTimeFormat("it-IT", {
    ...rome,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("it-IT", {
    ...rome,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return { day, time, label: `${day} · ${time}` };
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("it-IT", {
    ...rome,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function toDateTimeLocalValue(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    ...rome,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

export function parseDateTimeLocal(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}
