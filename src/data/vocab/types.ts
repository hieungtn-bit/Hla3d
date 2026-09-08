/**
 * The first 1000 English words, as data.
 *
 * A word is a tuple, not an object, on purpose: 1000 objects with four keys
 * each is 4000 lines nobody will ever proofread. As tuples the whole list
 * stays scannable, and a wrong translation is visible at a glance.
 *
 * The picture is the third element and may be empty. Function words ("the",
 * "was", "their") have no picture because they have no picture — pretending
 * otherwise teaches a five-year-old that "the" means whatever icon we chose.
 * Sets made of those words are marked pictureFirst: false and are meant for a
 * child who already reads.
 */
export type Word = readonly [en: string, vi: string, icon: string];

export type VocabSet = {
  id: string;
  /** Position in the 1–40 climb. */
  order: number;
  title: string;
  titleEn: string;
  icon: string;
  /** A brand colour utility, so each set owns a colour on the wall. */
  tone: string;
  /**
   * True when every word in the set can be understood from its picture alone,
   * so a child who cannot read yet can do the whole set unaided.
   */
  pictureFirst: boolean;
  words: readonly Word[];
};
