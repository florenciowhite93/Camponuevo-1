import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toSentenceCase(text: string): string {
  if (!text) return text;

  const PLACEHOLDER = "<<<NEWLINE>>>";
  const processedText = text
    .replace(/<<<newline>>>/gi, PLACEHOLDER)
    .replace(/[\r\n]+/g, PLACEHOLDER);

  return processedText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      const trimmed = sentence.trim();
      if (!trimmed) return sentence;
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(new RegExp(PLACEHOLDER, "g"), "\n");
}
