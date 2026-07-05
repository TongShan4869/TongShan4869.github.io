const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Format a "YYYY-MM-DD" string as "Mon YYYY" without timezone drift.
export function formatMonthYear(date?: string | null): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  const idx = parseInt(month ?? "1", 10) - 1;
  return `${MONTHS[idx] ?? ""} ${year}`.trim();
}

export type NewsCategory = "talk" | "event" | "press";

export const CATEGORY_LABELS: Record<string, string> = {
  talk: "Invited Talk",
  event: "Event",
  press: "Press",
};
