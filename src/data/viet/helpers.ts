import type { LessonItem } from "@/components/course/skill-lesson";

export function pickOne<T>(rand: () => number, xs: readonly T[]): T {
  return xs[Math.floor(rand() * xs.length)];
}

export function shuffled<T>(rand: () => number, xs: readonly T[]): T[] {
  const out = [...xs];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Builds an item, cleaning its wrong answers.
 *
 * Wrong answers are chosen by hand per skill to be mistakes children really
 * make. This only drops any that collide with the answer or each other, and
 * caps them at three — it never invents one, because an invented wrong
 * answer is exactly the random noise the hand-picked ones exist to avoid.
 */
export function vItem(item: Omit<LessonItem, "wrong"> & { wrong: readonly string[] }): LessonItem {
  const seen = new Set([item.answer]);
  const wrong: string[] = [];
  for (const w of item.wrong) {
    if (!w || seen.has(w)) continue;
    seen.add(w);
    wrong.push(w);
    if (wrong.length === 3) break;
  }
  return { ...item, wrong };
}

/** "_ẹo" — the word with its first `n` letters replaced by a blank. */
export function blankOnset(word: string, onset: string): string {
  return "_" + word.slice(onset.length);
}
