import { skillsA } from "./skills-a";
import { skillsB } from "./skills-b";
import type { VietSkill } from "./types";

export type { VietSkill };

export const vietSkills: VietSkill[] = [...skillsA, ...skillsB].sort((a, b) => a.order - b.order);

export function getVietSkill(id: string): VietSkill | undefined {
  return vietSkills.find((s) => s.id === id);
}
