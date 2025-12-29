import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Split text into characters for animation
export function splitText(text: string) {
  return text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char,
    index,
  }));
}

// Random number in range
export function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Lerp function for smooth animations
export function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

// Map value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Format date
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Truncate text
export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str;
}
