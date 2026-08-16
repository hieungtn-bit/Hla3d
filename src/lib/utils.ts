import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 129000 -> "129.000đ" — the way prices are actually written in Vietnam. */
export function formatVnd(amount: number) {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(amount))}đ`;
}

/** 27 / 100 -> 27 (clamped, rounded) */
export function toPercent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / total) * 100)));
}

/** 28 -> "HLA0028" */
export function orderNumber(customerNumber: number) {
  return `HLA${String(customerNumber).padStart(4, "0")}`;
}
