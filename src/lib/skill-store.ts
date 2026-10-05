"use client";

import * as React from "react";
import { grade, today, isDue, isLearned, type Progress } from "@/lib/leitner";
import { markStudied, type LearnerId } from "@/lib/vocab-store";

/**
 * Progress through a skill-based course (maths, Tiếng Việt).
 *
 * Same Leitner engine as the vocabulary, keyed on a skill instead of a word,
 * with one deliberate difference in how a box is earned.
 *
 * A word is a fact: answer "cat = con mèo" correctly and you knew it. A skill
 * is not. A child who gets one 7+5 right — or one "kẹo" spelled with k — may
 * have guessed, remembered that single case, or actually understood the rule,
 * and only the third counts. So a skill is graded on a whole run of RUN_LENGTH
 * generated items, and only a run at or above PASS_MARK moves it up a box.
 * One lucky tap cannot promote a skill; one careless tap cannot demote it.
 *
 * Each course gets its own store and its own localStorage key, so a reset or
 * a corrupt record in one course can never touch another.
 */

export const RUN_LENGTH = 6;
export const PASS_MARK = 5;

type State = {
  /** skillId → progress, per learner. The learner itself comes from the
   *  vocabulary store, so picking "Long" once picks him for every subject. */
  skills: Record<string, Record<string, Progress>>;
};

export type CourseStatus = { learned: number; started: number; due: number; unmet: number; total: number };

export type SkillStore = ReturnType<typeof createSkillStore>;

export function createSkillStore(storageKey: string) {
  const EMPTY: State = { skills: {} };
  let state: State = EMPTY;
  let hydrated = false;
  const listeners = new Set<() => void>();

  function readStorage(): State {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return EMPTY;
      const parsed = JSON.parse(raw) as Partial<State>;
      return { skills: parsed.skills ?? {} };
    } catch {
      return EMPTY;
    }
  }

  function commit(next: State) {
    state = next;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Private mode or quota — the run still works, it just will not persist.
    }
    listeners.forEach((l) => l());
  }

  function subscribe(onChange: () => void) {
    if (!hydrated) {
      hydrated = true;
      state = readStorage();
    }
    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  }

  const getSnapshot = () => state;
  const getServerSnapshot = () => EMPTY;

  return {
    useStore() {
      return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    },

    /** Records the result of one full run. `right` is out of RUN_LENGTH. */
    finishRun(who: LearnerId, skillId: string, right: number) {
      markStudied(who);
      const mine = state.skills[who] ?? {};
      commit({
        skills: {
          ...state.skills,
          [who]: { ...mine, [skillId]: grade(mine[skillId], right >= PASS_MARK, today()) },
        },
      });
    },

    reset(who: LearnerId) {
      commit({ skills: { ...state.skills, [who]: {} } });
    },

    progressOf(s: State, who: LearnerId, skillId: string): Progress | undefined {
      return s.skills[who]?.[skillId];
    },

    status(s: State, who: LearnerId, skillIds: string[]): CourseStatus {
      const day = today();
      const mine = s.skills[who] ?? {};
      let learned = 0;
      let started = 0;
      let due = 0;
      let unmet = 0;
      for (const id of skillIds) {
        const p = mine[id];
        if (!p) {
          unmet++;
          continue;
        }
        started++;
        if (isLearned(p)) learned++;
        if (isDue(p, day)) due++;
      }
      return { learned, started, due, unmet, total: skillIds.length };
    },
  };
}
