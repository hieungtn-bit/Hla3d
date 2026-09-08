import type { Item } from "./types";

export function pick(rand: () => number, lo: number, hi: number): number {
  return lo + Math.floor(rand() * (hi - lo + 1));
}

/**
 * Cleans a set of distractors.
 *
 * Every wrong answer here is meant to be a mistake a child actually makes, so
 * the list is written by hand per skill. This only removes the ones that
 * collide with the right answer or each other, and tops the list back up if
 * that leaves fewer than three — a question with a repeated option gives the
 * answer away.
 */
export function item(prompt: string, answer: number, wrong: number[], because: string): Item {
  const seen = new Set<number>([answer]);
  const clean: number[] = [];
  for (const w of wrong) {
    if (w < 0 || seen.has(w)) continue;
    seen.add(w);
    clean.push(w);
  }
  let step = 1;
  while (clean.length < 3) {
    for (const candidate of [answer + step, answer - step]) {
      if (clean.length >= 3) break;
      if (candidate < 0 || seen.has(candidate)) continue;
      seen.add(candidate);
      clean.push(candidate);
    }
    step++;
  }
  return { prompt, answer, wrong: clean.slice(0, 3), because };
}
