import { skillsA } from "./skills-a";
import { skillsB } from "./skills-b";
import type { Level, Skill } from "./types";

export * from "./types";

export const skills: Skill[] = [...skillsA, ...skillsB].sort((a, b) => a.order - b.order);

export const TOTAL_SKILLS = skills.length;

export function getSkill(id: string): Skill | undefined {
  return skills.find((s) => s.id === id);
}

export function skillsOfLevel(level: Level): Skill[] {
  return skills.filter((s) => s.level === level);
}
