"use client";

import * as React from "react";
import { grade, today, isDue, isLearned, type Progress } from "@/lib/leitner";
import { skills } from "@/data/math";
import type { LearnerId } from "@/lib/vocab-store";

/**
 * Progress through the maths skills.
 *
 * Same Leitner engine as the vocabulary, keyed on a skill instead of a word,
 * with one deliberate difference in how a box is earned.
 *
 * A word is a fact: answer "cat = con mèo" correctly and you knew it. A skill
 * is not. A child who gets one 7+5 right may have guessed, remembered that
 * single fact, or actually understand carrying — and only the third one is
 * "cộng qua 10". So a skill is graded on a whole run of RUN_LENGTH generated
 * items, and only a run at or above PASS_MARK moves it up a box. One lucky
 * tap cannot promote a skill; one careless tap cannot demote it either.
 */

export const RUN_LENGTH = 6;
export const PASS_MARK = 5;

const STORAGE_KEY = "hla3d.math.v1";

type State = {
  /** skillId → progress, per learner. The learner itself comes from the
   *  vocabulary store, so picking "Long" once picks him for both subjects. */
  skills: Record<string, Record<string, Progress>>;
};

const EMPTY: State = { skills: {} };

let state: State = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): State {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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

export function useMath() {
  return React.useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

/** Records the result of one full run. `right` is out of RUN_LENGTH. */
export function finishRun(who: LearnerId, skillId: string, right: number) {
  const day = today();
  const mine = state.skills[who] ?? {};
  const passed = right >= PASS_MARK;
  commit({
    skills: { ...state.skills, [who]: { ...mine, [skillId]: grade(mine[skillId], passed, day) } },
  });
}

export function resetMath(who: LearnerId) {
  commit({ skills: { ...state.skills, [who]: {} } });
}

export function progressOfSkill(s: State, who: LearnerId, skillId: string): Progress | undefined {
  return s.skills[who]?.[skillId];
}

export type MathStatus = { learned: number; started: number; due: number; unmet: number; total: number };

export function mathStatus(s: State, who: LearnerId): MathStatus {
  const day = today();
  const mine = s.skills[who] ?? {};
  let learned = 0;
  let started = 0;
  let due = 0;
  let unmet = 0;
  for (const skill of skills) {
    const p = mine[skill.id];
    if (!p) {
      unmet++;
      continue;
    }
    started++;
    if (isLearned(p)) learned++;
    if (isDue(p, day)) due++;
  }
  return { learned, started, due, unmet, total: skills.length };
}
