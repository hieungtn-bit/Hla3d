/**
 * Vietnamese spelling, computed rather than labelled.
 *
 * A hand-labelled "mẹ → thanh nặng" is one typo away from teaching a child
 * the wrong tone a thousand times. So tones are read straight off the text:
 * in Unicode's decomposed form (NFD) every Vietnamese tone is exactly one
 * combining mark, separate from the vowel's own shape marks (the hat on â,
 * the horn on ơ, the breve on ă). Finding the tone is looking for one of five
 * code points; removing it is deleting that code point.
 *
 * Everything here works on NFC input and returns NFC output, because a
 * decomposed "ệ" and a precomposed "ệ" look identical and compare unequal —
 * the classic way a correct answer gets marked wrong.
 */

export const TONES = ["ngang", "huyền", "sắc", "hỏi", "ngã", "nặng"] as const;
export type Tone = (typeof TONES)[number];

const MARK: Record<Exclude<Tone, "ngang">, string> = {
  huyền: "̀",
  sắc: "́",
  hỏi: "̉",
  ngã: "̃",
  nặng: "̣",
};

const TONE_MARKS = /[̣̀́̉̃]/g;

/** Every tone on the same vowel — the chant every Vietnamese first-grader knows. */
export const TONE_SAMPLE: Record<Tone, string> = {
  ngang: "a",
  huyền: "à",
  sắc: "á",
  hỏi: "ả",
  ngã: "ã",
  nặng: "ạ",
};

export function nfc(s: string): string {
  return s.normalize("NFC");
}

/** The tone of one syllable, read from its marks. */
export function toneOf(syllable: string): Tone {
  const d = syllable.normalize("NFD");
  for (const [tone, mark] of Object.entries(MARK)) {
    if (d.includes(mark)) return tone as Tone;
  }
  return "ngang";
}

/** The syllable with its tone mark removed and every other mark kept. */
export function stripTone(s: string): string {
  return s.normalize("NFD").replace(TONE_MARKS, "").normalize("NFC");
}

/** Replaces one syllable's tone with another, wherever the mark sits. */
export function swapTone(syllable: string, to: Tone): string {
  const d = syllable.normalize("NFD");
  const from = toneOf(syllable);
  if (from === "ngang") throw new Error(`swapTone needs a marked syllable, got "${syllable}"`);
  const target = to === "ngang" ? "" : MARK[to];
  return d.replace(MARK[from], target).normalize("NFC");
}

const VOWELS = "aăâeêioôơuưy";

export function vowelCount(rime: string): number {
  return [...stripTone(rime)].filter((c) => VOWELS.includes(c)).length;
}

/**
 * Builds a syllable from its parts.
 *
 * Only for rimes with exactly one vowel letter. With two or more (oa, uy, oe)
 * where the mark goes is a matter of convention — hoà or hòa — and both are
 * accepted. A lesson must never mark a child wrong for a choice the language
 * itself leaves open, so those rimes are simply never composed.
 */
export function placeTone(onset: string, rime: string, tone: Tone): string {
  const r = [...nfc(rime)];
  if (vowelCount(rime) !== 1) throw new Error(`placeTone only handles single-vowel rimes, got "${rime}"`);
  if (tone === "ngang") return nfc(onset + rime);
  const at = r.findIndex((c) => VOWELS.includes(c));
  r[at] = (r[at] + MARK[tone]).normalize("NFC");
  return nfc(onset + r.join(""));
}

/**
 * A syllable ending in p, t, c or ch can only carry sắc or nặng.
 * "học", "hóc" — but never "hòc". The lesson uses this so that it never
 * offers a child a syllable the language does not have.
 */
export function stopFinal(rime: string): boolean {
  return /(p|t|c|ch)$/.test(stripTone(rime));
}

export function allowedTones(rime: string): Tone[] {
  return stopFinal(rime) ? ["sắc", "nặng"] : [...TONES];
}

/**
 * c/k, g/gh, ng/ngh: the one rule that really is a rule.
 * Before i, e or ê the long form is used; before anything else, the short.
 */
export function needsLongForm(rest: string): boolean {
  const first = [...stripTone(rest)][0];
  return first === "i" || first === "e" || first === "ê";
}

/** The two tone groups behind the từ láy rule for hỏi and ngã. */
export function toneGroup(t: Tone): "bổng" | "trầm" {
  return t === "ngang" || t === "sắc" || t === "hỏi" ? "bổng" : "trầm";
}
