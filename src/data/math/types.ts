/**
 * Maths, written from scratch.
 *
 * Nothing here is taken from a course or a textbook. The scope — what a
 * Vietnamese child covers in mẫu giáo, lớp 1, 2 and 3 — comes from the
 * national curriculum (Chương trình GDPT 2018), which is a published
 * government document, and the maths itself belongs to nobody. Every hook
 * question, every method and every kushia below was written for this site.
 *
 * The shape is deliberately different from the vocabulary module:
 *
 * - A word is a fact you either know or do not. A skill is not: a child who
 *   gets 7+5 right once has not learned "cộng qua 10". So practice items are
 *   GENERATED, not listed, and the skill is graded on a whole run rather than
 *   a single lucky answer.
 * - Every skill carries two or three genuinely different methods. In a beit
 *   midrash a text is not finished when one reading works; the second reading
 *   is the point. In maths this is also just true — a child who can only do
 *   7+5 one way is stuck the moment that way fails.
 */

export type Level = "mau-giao" | "lop1" | "lop2" | "lop3";

export const LEVELS: Record<Level, { label: string; age: string; tone: string; icon: string }> = {
  "mau-giao": { label: "Mẫu giáo lớn", age: "5 tuổi", tone: "bg-lime", icon: "🐣" },
  lop1: { label: "Lớp 1", age: "6 tuổi", tone: "bg-sky", icon: "1️⃣" },
  lop2: { label: "Lớp 2", age: "7 tuổi", tone: "bg-sun", icon: "2️⃣" },
  lop3: { label: "Lớp 3", age: "8 tuổi", tone: "bg-flame", icon: "3️⃣" },
};

/** One way of getting the answer, named so a child can ask for it by name. */
export type Method = {
  name: string;
  /** Worked on the skill's own example, step by step. */
  steps: string[];
};

/** A generated practice question. */
export type Item = {
  /** What the child reads. Kept short: a wall of words is a reading test. */
  prompt: string;
  answer: number;
  /**
   * Three wrong answers, each one a mistake a child actually makes on this
   * skill — a forgotten carry, an off-by-one, the opposite operation. Random
   * distractors teach nothing; these make a wrong tap diagnostic.
   */
  wrong: number[];
  /** Shown after answering. Says why, never just "sai rồi". */
  because: string;
};

export type Skill = {
  id: string;
  level: Level;
  order: number;
  title: string;
  /** One line a parent can read to know what this is. */
  summary: string;
  /**
   * The question asked BEFORE any method is shown.
   *
   * Question first is the whole point. Handing a child the rule and then
   * drilling it teaches them to wait for rules. Asking first — "làm sao biết
   * mà không đếm lại từ đầu?" — makes the rule feel like an answer to
   * something they already wanted.
   */
  hook: string;
  methods: Method[];
  /**
   * The kushia: the difficulty that shows whether the rule is understood or
   * only copied. Never marked — a machine cannot judge a spoken argument from
   * a seven-year-old, and a fake tick is worse than no tick.
   */
  kushia: string;
  /** Generates one practice item. `rand` returns [0,1). */
  make: (rand: () => number) => Item;
};
