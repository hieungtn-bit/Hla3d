"use client";

import * as React from "react";
import { getSkill } from "@/data/math";
import { mathStore } from "@/lib/math-store";
import { SkillLesson, type LessonSkill } from "@/components/course/skill-lesson";

/**
 * The maths lesson: the shared lesson with maths items adapted to it.
 *
 * Takes an id, not the skill itself. A Skill carries `make`, a generator
 * function, and functions cannot cross the server/client boundary as props;
 * the data module is client-safe, so the lesson looks its own skill up.
 *
 * Maths items carry numbers. The shared lesson compares strings, so the
 * adapter converts here — once, in one place — rather than teaching the
 * shared lesson about numbers.
 */
export function MathLesson({ skillId }: { skillId: string }) {
  const skill = getSkill(skillId);
  const lessonSkill = React.useMemo<LessonSkill | null>(
    () =>
      skill
        ? {
            ...skill,
            methodNoun: "cách làm",
            make: (rand) => {
              const it = skill.make(rand);
              return {
                show: it.prompt,
                answer: String(it.answer),
                wrong: it.wrong.map(String),
                because: it.because,
              };
            },
          }
        : null,
    [skill],
  );
  if (!lessonSkill) return null;
  return <SkillLesson skill={lessonSkill} store={mathStore} backHref="/hoc-toan" trackPrefix="toan" />;
}
