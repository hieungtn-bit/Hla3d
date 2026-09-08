import type { VocabSet, Word } from "@/data/vocab";
import { isDue, today, type Progress } from "@/lib/leitner";

/**
 * Building one sitting.
 *
 * Two rules, both from how the review actually has to work:
 *
 * 1. Review before new. A word already met and now due is the whole point of
 *    the schedule; adding new words while old ones rot is how a 1000-word
 *    list becomes 1000 words nobody knows.
 * 2. Eight words, not the whole set. Twenty-five new words in one sitting is
 *    a wall to a five-year-old, and the boxes are going to bring them all
 *    back anyway.
 */

export const BATCH = 8;

export type Stage = "meet" | "recall";

export type Card = {
  word: Word;
  /** "meet" introduces a word never seen; "recall" tests one already met. */
  stage: Stage;
  /** Three wrong answers drawn from the same set, so the choice is real. */
  options: Word[];
};

function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Picks the words for one sitting.
 *
 * `rand` is injected so a test can pin the shuffle; in the app it is
 * Math.random and every sitting is differently ordered on purpose — a child
 * who learns the answers in position order has learned the positions.
 */
export function buildSession(
  set: VocabSet,
  progress: (en: string) => Progress | undefined,
  rand: () => number = Math.random,
  day = today(),
): Card[] {
  const due: Word[] = [];
  const fresh: Word[] = [];

  for (const w of set.words) {
    const p = progress(w[0]);
    if (!p) fresh.push(w);
    else if (isDue(p, day)) due.push(w);
  }

  const chosen = [...shuffle(due, rand), ...fresh].slice(0, BATCH);

  return chosen.map((word) => {
    const others = set.words.filter((w) => w[0] !== word[0]);
    const distractors = shuffle(others, rand).slice(0, 3);
    return {
      word,
      stage: progress(word[0]) ? "recall" : "meet",
      options: shuffle([word, ...distractors], rand),
    };
  });
}

/** Words in the set that are due or unmet — what the set badge counts. */
export function outstanding(
  set: VocabSet,
  progress: (en: string) => Progress | undefined,
  day = today(),
): number {
  return set.words.filter((w) => {
    const p = progress(w[0]);
    return !p || isDue(p, day);
  }).length;
}

/**
 * The kushia — the question the learner has to ask.
 *
 * Named for the questioning that drives study in the beit midrash: you have
 * not finished with a text until you can raise a difficulty about it. Here it
 * is deliberately unmarked. A machine cannot judge a spoken question from a
 * six-year-old, and pretending to would be worse than not trying: the value
 * is in saying it out loud to another person, which the app can prompt but
 * cannot grade. The site says so rather than showing a fake tick.
 */
export const KUSHIA_PROMPTS = [
  "Đặt một câu hỏi có từ này. Hỏi anh, hỏi em, hỏi mẹ — ai cũng được.",
  "Từ này làm bạn nhớ tới cái gì ở nhà mình? Nói ra một câu.",
  "Nếu không có từ này thì bạn nói thế nào? Thử xem.",
  "Từ này giống từ nào bạn đã học rồi? Khác chỗ nào?",
  "Kể một chuyện thật ngắn có từ này ở trong.",
];

export function kushiaFor(en: string): string {
  // Stable per word, so the same word always asks the same thing and the
  // learner can prepare it — the point is the answer, not the surprise.
  let h = 0;
  for (const ch of en) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return KUSHIA_PROMPTS[h % KUSHIA_PROMPTS.length];
}
