#!/usr/bin/env node
/**
 * Checks the lesson content itself — not the UI, the facts.
 *
 *   npm run test:content
 *
 * A wrong tone, a mis-spelled word in a bank, or a generator that marks
 * 52 − 27 = 35 as right would teach a child the wrong thing every time the
 * item comes round. Typechecking cannot see any of that. This can:
 *
 *   1. Tones are read off the spelling (Unicode), on tricky letters and on
 *      both precomposed and decomposed input.
 *   2. Every word-bank entry obeys the rule it is used to teach.
 *   3. Every Tiếng Việt generator, thousands of times, re-read by an
 *      independent reader built on a hand table of letters.
 *   4. Every maths generator, thousands of times, re-solved by an independent
 *      solver that reads only the prompt the child reads.
 *   5. No invented claims about the family, and nothing for sale — the
 *      brothers find models on MakerWorld and print them to learn; they do
 *      not design them and the site does not sell them.
 *
 * Shares no logic with the app beyond importing the data it checks.
 * Exits non-zero on any failure.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(tmpdir(), `hla3d-content-${process.pid}`);
const ts = createRequire(path.join(ROOT, "package.json"))("typescript");

/** Transpiles the real modules, so the checks run against shipped code. */
function load(files) {
  for (const f of files) {
    const src = readFileSync(path.join(ROOT, "src", `${f}.ts`), "utf8");
    const dir = path.dirname(f);
    let out = ts.transpileModule(src, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    out = out
      .replace(/from "\.\/([a-z-]+)"/g, (_, m) => `from "${path.join(OUT, dir, m)}.mjs"`)
      .replace(/from "@\/([a-z/-]+)"/g, (_, m) =>
        `from "${path.join(OUT, m)}${existsSync(path.join(ROOT, "src", `${m}.ts`)) ? "" : "/index"}.mjs"`,
      );
    mkdirSync(path.join(OUT, dir), { recursive: true });
    writeFileSync(path.join(OUT, `${f}.mjs`), out);
  }
}

load([
  "data/levels",
  "data/viet/phonology", "data/viet/banks", "data/viet/helpers", "data/viet/types",
  "data/viet/skills-a", "data/viet/skills-b", "data/viet/index",
  "data/math/types", "data/math/helpers", "data/math/skills-a", "data/math/skills-b", "data/math/index",
  "data/vocab/types", "data/vocab/sets-a", "data/vocab/sets-b", "data/vocab/sets-c", "data/vocab/sets-d", "data/vocab/index",
]);
const imp = (m) => import(path.join(OUT, `${m}.mjs`));
const P = await imp("data/viet/phonology");
const K = await imp("data/viet/banks");
const { vietSkills } = await imp("data/viet/index");
const { vocabSets, TOTAL_WORDS } = await imp("data/vocab/index");
const { skills: mathSkills } = await imp("data/math/index");

const fail = [];
const section = (name, fn) => {
  const before = fail.length;
  const note = fn();
  console.log(`${fail.length === before ? "✓" : "✗"} ${name}${note ? ` — ${note}` : ""}`);
};
const seeded = (seed) => () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

/* ---- an independent tone reader: hand table of precomposed letters -------- */
const ROWS = { a: "aàáảãạ", ă: "ăằắẳẵặ", â: "âầấẩẫậ", e: "eèéẻẽẹ", ê: "êềếểễệ", i: "iìíỉĩị", o: "oòóỏõọ", ô: "ôồốổỗộ", ơ: "ơờớởỡợ", u: "uùúủũụ", ư: "ưừứửữự", y: "yỳýỷỹỵ" };
const NAMES = ["ngang", "huyền", "sắc", "hỏi", "ngã", "nặng"];
const LOOK = {};
for (const [b, row] of Object.entries(ROWS)) [...row].forEach((c, i) => { LOOK[c] = { b, t: i }; LOOK[c.toUpperCase()] = { b: b.toUpperCase(), t: i }; });
const tone = (s) => { let t = 0; for (const c of s.normalize("NFC")) if (LOOK[c]?.t) t = LOOK[c].t; return NAMES[t]; };
const bare = (s) => [...s.normalize("NFC")].map((c) => LOOK[c]?.b ?? c).join("");
const group = (t) => (["ngang", "sắc", "hỏi"].includes(t) ? "bổng" : "trầm");
const nfc = (s) => typeof s === "string" && s === s.normalize("NFC");

/* ---- 1. tones -------------------------------------------------------------- */
section("tone code", () => {
  const cases = [["ba","ngang"],["bà","huyền"],["bá","sắc"],["bả","hỏi"],["bã","ngã"],["bạ","nặng"],["mẹ","nặng"],["nhện","nặng"],["ngựa","nặng"],["sữa","ngã"],["ướt","sắc"],["giỗ","ngã"],["đường","huyền"],["khỏe","hỏi"],["khoẻ","hỏi"],["hòa","huyền"],["hoà","huyền"]];
  for (const [s, t] of cases) {
    if (P.toneOf(s) !== t) fail.push(`toneOf(${s}) = ${P.toneOf(s)}, want ${t}`);
    if (P.toneOf(s.normalize("NFD")) !== t) fail.push(`toneOf(decomposed ${s}) = ${P.toneOf(s.normalize("NFD"))}`);
    if (tone(s) !== t) fail.push(`hand table disagrees on ${s}`);
  }
  for (const [s, w] of [["ệ","ê"],["ặ","ă"],["ự","ư"],["ỡ","ơ"],["nhện","nhên"],["đường","đương"]]) if (P.stripTone(s) !== w) fail.push(`stripTone(${s})`);
  for (const [o, r, t, w] of [["b","a","huyền","bà"],["gh","ê","sắc","ghế"],["qu","a","huyền","quà"],["gi","o","hỏi","giỏ"],["tr","ông","sắc","trống"],["nh","ên","nặng","nhện"]]) {
    if (P.placeTone(o, r, t) !== w) fail.push(`placeTone(${o}+${r}+${t})`);
  }
  let refused = false; try { P.placeTone("h", "oa", "huyền"); } catch { refused = true; }
  if (!refused) fail.push("placeTone must refuse multi-vowel rimes (hoà/hòa is a convention)");
  return `${cases.length} syllables, both encodings`;
});

/* ---- 2. banks -------------------------------------------------------------- */
section("word banks obey the rules they teach", () => {
  for (const [w, on, rime] of K.SYLLABLES) {
    if (P.stripTone(w) !== on + P.stripTone(rime)) fail.push(`syllable ${w}: ${on}+${rime}`);
    if (P.stopFinal(rime) && !["sắc", "nặng"].includes(P.toneOf(w))) fail.push(`syllable ${w}: stop final with ${P.toneOf(w)}`);
  }
  for (const [w, on] of K.CKQ) {
    const rest = w.slice(on.length);
    if (on === "k" && !P.needsLongForm(rest)) fail.push(`${w}: k before ${rest}`);
    if (on === "c" && P.needsLongForm(rest)) fail.push(`${w}: c before i/e/ê`);
  }
  for (const [w, on] of K.GGH) if ((on === "gh" || on === "ngh") !== P.needsLongForm(w.slice(on.length))) fail.push(`${w}: breaks the i/e/ê rule`);
  for (const [a, b, blank] of K.LAY_HOI_NGA) {
    const target = blank === 0 ? a : b, partner = blank === 0 ? b : a;
    const want = group(tone(partner)) === "trầm" ? "ngã" : "hỏi";
    if (tone(target) !== want) fail.push(`láy ${a} ${b}: rule says ${want}`);
  }
  for (const [bank, name] of [[K.SX, "s/x"], [K.TRCH, "tr/ch"], [K.DGIR, "d/gi/r"]]) for (const [w, on] of bank) if (!w.startsWith(on)) fail.push(`${name} ${w} does not start with ${on}`);
  for (const [phrase] of K.CLAP_WORDS) {
    const n = phrase.split(" ").length;
    if (phrase !== phrase.trim() || / {2}/.test(phrase) || n < 1 || n > 4) fail.push(`clap word "${phrase}"`);
  }
  for (const [w, fin] of K.FINALS) {
    const last = bare(w);
    if (!last.endsWith(fin) || (fin === "n" && last.endsWith("nh")) || (fin === "c" && last.endsWith("ch"))) fail.push(`final ${w}: not ${fin}`);
    if ((fin === "t" || fin === "c") && !["sắc", "nặng"].includes(tone(w))) fail.push(`final ${w}: stop final with ${tone(w)}`);
  }
  for (const [sentence, generic, name] of K.PROPER_NAMES) {
    if (sentence.split("___").length !== 2) fail.push(`proper-name sentence needs one gap: ${sentence}`);
    if (generic && generic !== generic.toLocaleLowerCase("vi-VN")) fail.push(`generic "${generic}" must be lower-case`);
    for (const syl of name.split(" ")) if (syl[0] !== syl[0].toLocaleUpperCase("vi-VN")) fail.push(`name "${name}": "${syl}" not capitalised`);
  }
  for (const [lead, items] of K.COMMA_LISTS) {
    if (lead.includes(",")) fail.push(`comma list lead-in has a comma: ${lead}`);
    for (const it of items) if (/,| và /.test(it)) fail.push(`comma list item "${it}"`);
  }
  const strings = JSON.stringify(K).match(/"(?:[^"\\]|\\.)*"/g) ?? [];
  for (const s of strings) if (!nfc(JSON.parse(s))) fail.push(`not NFC: ${s}`);
  return `${K.SYLLABLES.length} syllables, ${K.CKQ.length + K.GGH.length} rule words, ${K.LAY_HOI_NGA.length} từ láy`;
});

/* ---- 3. Tiếng Việt generators --------------------------------------------- */
section("Tiếng Việt items, re-read independently", () => {
  const N = 3000;
  let total = 0;
  for (const s of vietSkills) {
    const rand = seeded(4242);
    const before = fail.length;
    for (let n = 0; n < N && fail.length - before < 5; n++) {
      const it = s.make(rand); total++;
      const tag = `${s.id} "${it.show ?? it.prompt}"`;
      if (!it.answer || !nfc(it.answer) || !it.because) fail.push(`${tag}: bad item`);
      if (!it.wrong.length || it.wrong.includes(it.answer) || new Set(it.wrong).size !== it.wrong.length) fail.push(`${tag}: bad wrong answers`);
      const show = it.show ?? "";
      if (s.id === "thanh-dieu" && !it.answer.startsWith(tone(show) + " ")) fail.push(`${tag}: says ${it.answer}, table says ${tone(show)}`);
      if (s.id === "ghep-tieng") {
        const [on, rime] = show.split(" + ");
        if (bare(it.answer) !== on + rime) fail.push(`${tag}: not ${on}+${rime}`);
      }
      if (s.id === "c-k-q") {
        const next = LOOK[[...show][1]]?.b ?? [...show][1];
        const want = it.say.startsWith("qu") ? "q" : ["i", "e", "ê"].includes(next) ? "k" : "c";
        if (it.answer !== want) fail.push(`${tag}: rule says ${want}`);
      }
      if (s.id === "dem-tieng") {
        const claps = [...it.answer];
        if (claps.some((c) => c !== "👏") || claps.length !== it.say.split(" ").length) fail.push(`${tag}: ${claps.length} claps for "${it.say}"`);
      }
      if (s.id === "van-cuoi") {
        const fill = (x) => bare(show.replace("_", x));
        if (fill(it.answer) !== bare(it.say)) fail.push(`${tag}: ${it.answer} does not make "${it.say}"`);
        if (it.wrong.some((w) => fill(w) === bare(it.say))) fail.push(`${tag}: a wrong option also makes "${it.say}"`);
      }
      if (s.id === "viet-hoa") {
        const LOW = ["sông", "hồ", "núi", "cô", "chú", "bạn", "bác"];
        const ok = (o) => o.split(" ").every((w, i) => (i === 0 && LOW.includes(w.toLocaleLowerCase("vi-VN")) ? w === w.toLocaleLowerCase("vi-VN") : w[0] === w[0].toLocaleUpperCase("vi-VN") && w[0] !== w[0].toLocaleLowerCase("vi-VN")));
        const all = [it.answer, ...it.wrong];
        if (new Set(all.map((o) => o.toLocaleLowerCase("vi-VN"))).size !== 1) fail.push(`${tag}: options differ by more than capitals`);
        if (!ok(it.answer) || all.filter(ok).length !== 1) fail.push(`${tag}: capitalisation rule disagrees (${it.answer})`);
      }
      if (s.id === "dau-phay") {
        const at = show.indexOf(" ___ ");
        const before = show.slice(0, at), after = show.slice(at + 5);
        const none = after.startsWith("và ") || K.COMMA_LISTS.some(([lead]) => lead === before);
        if (it.answer !== (none ? "không cần dấu" : ", dấu phẩy")) fail.push(`${tag}: want ${none ? "no mark" : "a comma"}`);
      }
      if (s.id === "hoi-nga") {
        const parts = show.split(" ");
        const partner = parts[0] === "___" ? parts[1] : parts[0];
        if (tone(it.answer) !== (group(tone(partner)) === "trầm" ? "ngã" : "hỏi")) fail.push(`${tag}: breaks the láy rule`);
      }
    }
  }
  return `${vietSkills.length} lessons, ${total} items`;
});

/* ---- 4. maths generators ---------------------------------------------------- */
function solveMaths(prompt) {
  const t = prompt.replace(/−/g, "-").replace(/×/g, "*");
  let m;
  if ((m = t.match(/^(\d+) \+ \? = (\d+)$/))) return +m[2] - +m[1];
  if ((m = t.match(/^(\d+) \+ (\d+) = \?$/))) return +m[1] + +m[2];
  if ((m = t.match(/^(\d+) - (\d+) = \?$/))) return +m[1] - +m[2];
  if ((m = t.match(/^(\d+) \* (\d+) = \?$/))) return +m[1] * +m[2];
  if ((m = t.match(/^(\d+) : (\d+) = \?$/))) return +m[1] / +m[2];
  if ((m = t.match(/^(\d+) : (\d+) = \? \(dư (\d+)\)/))) return (+m[1] - +m[3]) / +m[2];
  if ((m = t.match(/dài (\d+) cm, rộng (\d+) cm\.\s*Chu vi/s))) return (+m[1] + +m[2]) * 2;
  if ((m = t.match(/dài (\d+) cm, rộng (\d+) cm\.\s*Diện tích/s))) return +m[1] * +m[2];
  if ((m = t.match(/^Kim phút chỉ vào số (\d+)\./))) return +m[1] * 5;
  if ((m = t.match(/^(\d+) dm = \? cm$/))) return +m[1] * 10;
  if ((m = t.match(/^(\d+) m = \? dm$/))) return +m[1] * 10;
  if ((m = t.match(/^(\d+) m = \? cm$/))) return +m[1] * 100;
  if ((m = t.match(/^(\d+) và (\d+)\s*Số nào lớn hơn\?$/s))) return Math.max(+m[1], +m[2]);
  if ((m = t.match(/^Rổ A có (\d+) quả\. Rổ B có (\d+) quả\./))) return Math.max(+m[1], +m[2]);
  if ((m = t.match(/^(\d+) gấp lên (\d+) lần/))) return +m[1] * +m[2];
  if ((m = t.match(/^(\d+) giảm đi (\d+) lần/))) return +m[1] / +m[2];
  if ((m = t.match(/^([\s\S]+?)\s*Có bao nhiêu cái\?$/))) return [...m[1]].filter((c) => c.codePointAt(0) > 0x2000).length;
  return null;
}
section("maths items, re-solved independently", () => {
  const N = 3000;
  let total = 0, unsolved = 0;
  for (const s of mathSkills) {
    const rand = seeded(777);
    const before = fail.length;
    for (let n = 0; n < N && fail.length - before < 5; n++) {
      const it = s.make(rand); total++;
      if (!Number.isInteger(it.answer) || it.answer < 0) fail.push(`${s.id} "${it.prompt}": answer ${it.answer}`);
      if (it.wrong.length !== 3 || it.wrong.includes(it.answer) || new Set(it.wrong).size !== 3) fail.push(`${s.id} "${it.prompt}": bad wrong answers`);
      const want = solveMaths(it.prompt);
      if (want === null) { unsolved++; continue; }
      if (want !== it.answer) fail.push(`${s.id} "${it.prompt}": app says ${it.answer}, solver says ${want}`);
    }
    if (!s.hook.includes("?") || !s.kushia.includes("?") || s.methods.length < 2) fail.push(`${s.id}: hook, kushia or methods missing`);
  }
  if (unsolved) fail.push(`${unsolved} maths prompts the independent solver could not read`);
  return `${mathSkills.length} lessons, ${total} items`;
});

/*
 * Pictures are how a child who cannot read yet answers. An emoji newer than
 * Unicode 14 draws as an empty box on older phones and tablets — the hand-me-
 * down devices children are most likely to learn on — so none may be used.
 */
const TOO_NEW = new Set([..."🫨🩷🩵🩶🫏🫎🪽🪿🪼🪻🫚🫛🪭🪮🪇🪈🪯🛜🫸🫷🫩🫆🪾🫜🪉🪏🫟"]);
/*
 * English: a child who cannot read yet hears a word and picks one of four
 * pictures from the same set, so two words in a set may never share a picture.
 */
section("English pictures unambiguous", () => {
  const all = new Map();
  let words = 0;
  for (const set of vocabSets) {
    const pics = new Map();
    for (const [en, vi, pic] of set.words) {
      words++;
      all.set(en, set.id);
      // Sets of function words ("the", "is") have no pictures on purpose.
      if (set.pictureFirst && pics.has(pic)) fail.push(`${set.id}: "${en}" and "${pics.get(pic)}" share the picture ${pic}`);
      pics.set(pic, en);
      if (!nfc(vi)) fail.push(`${set.id}: "${vi}" not NFC`);
    }
  }
  if (words !== TOTAL_WORDS || words !== 1000) fail.push(`${words} English words, the site says ${TOTAL_WORDS}`);
  return `${vocabSets.length} sets, ${words} words`;
});

section("picture emoji render on older devices", () => {
  let n = 0;
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (/\.tsx?$/.test(e.name)) {
        readFileSync(f, "utf8").split("\n").forEach((line, i) => {
          for (const c of line) { if (/\p{Extended_Pictographic}/u.test(c)) n++; if (TOO_NEW.has(c)) fail.push(`${path.relative(ROOT, f)}:${i + 1}: ${c} needs Unicode 15+`); }
        });
      }
    }
  };
  walk(path.join(ROOT, "src"));
  return `${n} emoji, none newer than Unicode 14`;
});

/*
 * The site may only say what the family has said. The brothers do not design
 * models: they find them on MakerWorld and print them. These phrases were all
 * once on the site as placeholders that read like fact; none may come back.
 */
const INVENTED = [
  /(?<!không phải do )(Hưng|Long|Anh|ba anh em|Cả ba anh em|tụi em) (tự )?thiết kế(?! được)/i,
  /tự thiết kế, tự in/i,
  /BÁN CHẠY NHẤT|TỤI EM THÍCH NHẤT|KHÓ IN NHẤT/,
  /LÀM KHÁCH SỐ|Khách hàng số \d/i,
  /Chuyện thật ở nhà|Lời nhắn của ba anh em/,
  /viết tay/i,
  /Không (món nào|có món nào) mua (sẵn )?về bán lại/i,
  /goal\.current/,
  // HLA3D is a learning site and sells nothing. No cart, no orders, no prices.
  /giỏ hàng|THÊM VÀO GIỎ|đặt hàng|useCart|formatVnd|\d{2,3}\.000đ/i,
];
const SKIP = /(^|\/)data\/(vocab|viet|math)(\/|$)/;
section("no invented claims and nothing for sale", () => {
  let files = 0;
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      const rel = path.relative(path.join(ROOT, "src"), f).split(path.sep).join("/");
      if (SKIP.test(rel)) continue;
      if (e.isDirectory()) walk(f);
      else if (/\.(tsx?|mjs)$/.test(e.name)) {
        files++;
        readFileSync(f, "utf8").split("\n").forEach((line, i) => {
          for (const re of INVENTED) if (re.test(line)) fail.push(`src/${rel}:${i + 1}: ${line.trim().slice(0, 100)}`);
        });
      }
    }
  };
  walk(path.join(ROOT, "src"));
  return `${files} files`;
});

rmSync(OUT, { recursive: true, force: true });
if (fail.length) {
  console.error("\n" + [...new Set(fail)].slice(0, 60).join("\n"));
  process.exit(1);
}
console.log("\nAll content checks passed.");
