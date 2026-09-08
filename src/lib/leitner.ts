/**
 * The review engine.
 *
 * Leitner boxes, not a full SM-2 implementation. SM-2 tunes an interval per
 * card from a 0–5 self-rating, which assumes a learner who can honestly judge
 * "how well did I know that?". An eight-year-old cannot, and a five-year-old
 * cannot even read the question — so the only input here is right or wrong,
 * and the boxes do the rest.
 *
 * Five boxes, doubling: a word answered right moves up one box and comes back
 * later; a word answered wrong falls all the way to box 1 and comes back
 * today. That fall is deliberate. Dropping one box lets a half-known word
 * drift upward on lucky guesses, which is exactly how a list of 1000 words
 * quietly rots.
 *
 * A word in box 5 is "thuộc" — it still returns after 32 days, because
 * nothing stays learned without being used. The site never claims otherwise.
 */

export const BOXES = [1, 2, 3, 4, 5] as const;
export type Box = (typeof BOXES)[number];

/** Days until a word in each box comes back. Box 5 is maintenance, not an end. */
export const BOX_DAYS: Record<Box, number> = { 1: 0, 2: 2, 3: 4, 4: 8, 5: 32 };

export const BOX_LABEL: Record<Box, string> = {
  1: "Mới gặp",
  2: "Đang nhớ",
  3: "Nhớ khá",
  4: "Gần thuộc",
  5: "Thuộc rồi",
};

export type Progress = {
  /** Which box the word sits in right now. */
  box: Box;
  /** Epoch day number when the word is next due. */
  due: number;
  /** How many times it has ever been answered right. */
  right: number;
  /** How many times it has ever been answered wrong. */
  wrong: number;
  /** Epoch day of the last answer, for the streak display. */
  seen: number;
};

/** Epoch day in the learner's own timezone, so "today" means their today. */
export function today(now: Date = new Date()): number {
  const local = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor(local.getTime() / 86_400_000);
}

export function freshProgress(day = today()): Progress {
  return { box: 1, due: day, right: 0, wrong: 0, seen: day };
}

/**
 * Applies one answer.
 *
 * Right: up one box, due after that box's interval.
 * Wrong: straight back to box 1, due immediately — the learner sees it again
 * in the same session rather than tomorrow, which is where the repair happens.
 */
export function grade(p: Progress | undefined, correct: boolean, day = today()): Progress {
  const prev = p ?? freshProgress(day);
  if (!correct) {
    return { box: 1, due: day, right: prev.right, wrong: prev.wrong + 1, seen: day };
  }
  const box = Math.min(5, prev.box + 1) as Box;
  return { box, due: day + BOX_DAYS[box], right: prev.right + 1, wrong: prev.wrong, seen: day };
}

export function isDue(p: Progress | undefined, day = today()): boolean {
  return !p || p.due <= day;
}

/** A word only counts as learned once it has survived the full climb. */
export function isLearned(p: Progress | undefined): boolean {
  return p?.box === 5;
}
