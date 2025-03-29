import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatReleaseDate(dateString?: string): string {
  if (!dateString) return "Unknown";

  // Handle different date formats from Spotify (YYYY-MM-DD, YYYY-MM, YYYY)
  const parts = dateString.split("-");

  if (parts.length === 3) {
    // Full date format
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (parts.length === 2) {
    // Year and month only
    const date = new Date(`${dateString}-01`);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  } else {
    // Year only
    return dateString;
  }
}
