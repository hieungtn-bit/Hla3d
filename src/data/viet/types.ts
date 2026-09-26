import type { Level } from "@/data/levels";
import type { LessonItem, LessonMethod } from "@/components/course/skill-lesson";

/**
 * A Tiếng Việt lesson.
 *
 * Same shape as a maths lesson — hook, several methods, generated practice,
 * an unmarked kushia — because the method is the same. The difference is in
 * what a "method" is: for c/k it is a rule with no exceptions; for s/x it is
 * a set of memory tricks that each fail somewhere, and the lesson says so.
 */
export type VietSkill = {
  id: string;
  level: Level;
  order: number;
  title: string;
  summary: string;
  hook: string;
  methods: LessonMethod[];
  kushia: string;
  methodNoun: "cách làm" | "cách nhớ";
  /** Read each item aloud — for the levels where the learner cannot read yet. */
  autoSay?: boolean;
  make: (rand: () => number) => LessonItem;
};
