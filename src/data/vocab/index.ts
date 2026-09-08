import { setsA } from "./sets-a";
import { setsB } from "./sets-b";
import { setsC } from "./sets-c";
import { setsD } from "./sets-d";
import type { VocabSet, Word } from "./types";

export type { VocabSet, Word };

/** All 40 sets, in the order a learner climbs them. */
export const vocabSets: VocabSet[] = [...setsA, ...setsB, ...setsC, ...setsD].sort(
  (a, b) => a.order - b.order,
);

export const TOTAL_WORDS = vocabSets.reduce((n, s) => n + s.words.length, 0);

export function getSet(id: string): VocabSet | undefined {
  return vocabSets.find((s) => s.id === id);
}

/**
 * A word's stable key.
 *
 * Scoped to its set, not global: "orange" is a fruit in set 11 and a colour
 * in set 8, and a learner who has met one has not met the other. Keying on
 * the English alone would silently mark half the pair as learned.
 */
export function wordKey(setId: string, en: string): string {
  return `${setId}:${en}`;
}

/** Sets a child who cannot read yet can complete without help. */
export const pictureSets = vocabSets.filter((s) => s.pictureFirst);
