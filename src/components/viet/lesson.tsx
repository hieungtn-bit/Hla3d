"use client";

import { getVietSkill } from "@/data/viet";
import { vietStore } from "@/lib/viet-store";
import { SkillLesson } from "@/components/course/skill-lesson";

/** Looks its own skill up: a skill carries a generator, which cannot be a server prop. */
export function VietLesson({ skillId }: { skillId: string }) {
  const skill = getVietSkill(skillId);
  if (!skill) return null;
  return <SkillLesson skill={skill} store={vietStore} backHref="/hoc-tieng-viet" trackPrefix="tv" speechLang="vi" />;
}
