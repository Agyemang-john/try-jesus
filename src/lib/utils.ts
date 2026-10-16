import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** "2026-04-11" → "April 2026". Fixed locale so server and client agree. */
export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Zero-pads a 1-based index for the editorial counters: 1 → "01". */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
