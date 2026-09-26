/**
 * School levels shared by every skill-based course.
 *
 * Maths and Tiếng Việt cover the same four years for the same three
 * learners, so they share one definition rather than two that can drift.
 */
export type Level = "mau-giao" | "lop1" | "lop2" | "lop3";

export const LEVELS: Record<Level, { label: string; age: string; tone: string; icon: string }> = {
  "mau-giao": { label: "Mẫu giáo lớn", age: "5 tuổi", tone: "bg-lime", icon: "🐣" },
  lop1: { label: "Lớp 1", age: "6 tuổi", tone: "bg-sky", icon: "1️⃣" },
  lop2: { label: "Lớp 2", age: "7 tuổi", tone: "bg-sun", icon: "2️⃣" },
  lop3: { label: "Lớp 3", age: "8 tuổi", tone: "bg-flame", icon: "3️⃣" },
};

export const LEVEL_ORDER: Level[] = ["mau-giao", "lop1", "lop2", "lop3"];
