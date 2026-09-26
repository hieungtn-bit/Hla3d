"use client";

import { skills } from "@/data/math";
import { createSkillStore, type CourseStatus } from "@/lib/skill-store";
import type { LearnerId } from "@/lib/vocab-store";

/**
 * The maths course store. Same key and same record shape as before the
 * shared factory existed, so progress saved on an earlier visit still loads.
 */
export { RUN_LENGTH, PASS_MARK } from "@/lib/skill-store";

export const mathStore = createSkillStore("hla3d.math.v1");

export type MathStatus = CourseStatus;

export function useMath() {
  return mathStore.useStore();
}

export const finishRun = mathStore.finishRun;
export const resetMath = mathStore.reset;
export const progressOfSkill = mathStore.progressOf;

export function mathStatus(s: ReturnType<typeof useMath>, who: LearnerId): MathStatus {
  return mathStore.status(
    s,
    who,
    skills.map((k) => k.id),
  );
}
