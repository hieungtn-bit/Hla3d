"use client";

import * as React from "react";
import { grade, today, isDue, isLearned, type Progress } from "@/lib/leitner";
import { vocabSets, wordKey, TOTAL_WORDS } from "@/data/vocab";

/**
 * Who is learning, and what they know.
 *
 * Everything lives in this browser's localStorage. There is no account, no
 * server and no upload — the site already asks for a name and phone number to
 * sell a keyring, and it is not going to also collect a record of which
 * English words somebody's six-year-old gets wrong.
 *
 * The three named learners are the brothers whose shop this is. "Khách" is
 * for a visiting child, so a customer's kid can use the whole thing without
 * anyone typing anything about them.
 */

export type LearnerId = "hung" | "long" | "anh" | "khach";

export type Learner = { id: LearnerId; name: string; age: string; colour: string };

export const learners: Learner[] = [
  { id: "hung", name: "Hưng", age: "8 tuổi", colour: "bg-flame" },
  { id: "long", name: "Long", age: "6 tuổi", colour: "bg-sky" },
  { id: "anh", name: "Anh", age: "5 tuổi", colour: "bg-lime" },
  { id: "khach", name: "Bạn ghé chơi", age: "ai cũng học được", colour: "bg-sun" },
];

type State = {
  learner: LearnerId;
  /** wordKey → progress, per learner. */
  words: Record<LearnerId, Record<string, Progress>>;
  /** Epoch day of the last session, per learner, for the streak. */
  lastDay: Record<string, number>;
  /** Consecutive days with at least one answer. */
  streak: Record<string, number>;
};

const STORAGE_KEY = "hla3d.vocab.v1";

const EMPTY: State = {
  learner: "hung",
  words: { hung: {}, long: {}, anh: {}, khach: {} },
  lastDay: {},
  streak: {},
};

let state: State = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): State {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<State>;
    // Merge rather than trust: a half-written or older record must not throw.
    return {
      learner: parsed.learner ?? EMPTY.learner,
      words: { ...EMPTY.words, ...(parsed.words ?? {}) },
      lastDay: parsed.lastDay ?? {},
      streak: parsed.streak ?? {},
    };
  } catch {
    return EMPTY;
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or quota — the session still works, it just will not persist.
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

export function useVocab() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* -------------------------------------------------------------------------
   Actions
   ------------------------------------------------------------------------- */

export function setLearner(learner: LearnerId) {
  commit({ ...state, learner });
}

/** Records one answer and rolls the daily streak forward. */
export function answer(setId: string, en: string, correct: boolean) {
  const day = today();
  const who = state.learner;
  const key = wordKey(setId, en);
  const mine = state.words[who] ?? {};

  const last = state.lastDay[who];
  // Same day: streak unchanged. Yesterday: +1. Any older gap: back to 1.
  const streak = last === day ? (state.streak[who] ?? 1) : last === day - 1 ? (state.streak[who] ?? 0) + 1 : 1;

  commit({
    ...state,
    words: { ...state.words, [who]: { ...mine, [key]: grade(mine[key], correct, day) } },
    lastDay: { ...state.lastDay, [who]: day },
    streak: { ...state.streak, [who]: streak },
  });
}

/** Clears one learner's record. Used by the "start again" button. */
export function resetLearner(who: LearnerId) {
  commit({
    ...state,
    words: { ...state.words, [who]: {} },
    lastDay: { ...state.lastDay, [who]: 0 },
    streak: { ...state.streak, [who]: 0 },
  });
}

/* -------------------------------------------------------------------------
   Readers
   ------------------------------------------------------------------------- */

export function progressOf(s: State, setId: string, en: string): Progress | undefined {
  return s.words[s.learner]?.[wordKey(setId, en)];
}

export type SetStatus = {
  learned: number;
  started: number;
  /** Words already met whose review has come round. */
  due: number;
  /** Words never seen. Deliberately NOT counted as due: telling a child they
   *  have "18 to review" when 15 of those they have never met turns a normal
   *  amount of new material into a debt they are already behind on. */
  unmet: number;
  total: number;
};

export function statusOfSet(s: State, setId: string): SetStatus {
  const set = vocabSets.find((v) => v.id === setId);
  if (!set) return { learned: 0, started: 0, due: 0, unmet: 0, total: 0 };
  const day = today();
  let learned = 0;
  let started = 0;
  let due = 0;
  let unmet = 0;
  for (const [en] of set.words) {
    const p = progressOf(s, setId, en);
    if (!p) {
      unmet++;
      continue;
    }
    started++;
    if (isLearned(p)) learned++;
    if (isDue(p, day)) due++;
  }
  return { learned, started, due, unmet, total: set.words.length };
}

export type Overall = {
  learned: number;
  started: number;
  dueToday: number;
  total: number;
  streak: number;
};

export function overall(s: State): Overall {
  const day = today();
  const mine = s.words[s.learner] ?? {};
  let learned = 0;
  let dueToday = 0;
  for (const set of vocabSets) {
    for (const [en] of set.words) {
      const p = mine[wordKey(set.id, en)];
      if (isLearned(p)) learned++;
      // Only words already met count as "due" — the whole unmet list is not a debt.
      if (p && isDue(p, day)) dueToday++;
    }
  }
  return {
    learned,
    started: Object.keys(mine).length,
    dueToday,
    total: TOTAL_WORDS,
    streak: s.streak[s.learner] ?? 0,
  };
}
