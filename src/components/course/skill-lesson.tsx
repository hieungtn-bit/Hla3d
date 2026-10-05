"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Lightbulb, RotateCcw, Users, User, Volume2, X } from "lucide-react";
import { RUN_LENGTH, PASS_MARK, type SkillStore } from "@/lib/skill-store";
import { useVocab, learners } from "@/lib/vocab-store";
import { BOX_LABEL } from "@/lib/leitner";
import { hasVoice, say, warmVoices, type SpeechLang } from "@/lib/speech";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * A lesson, in the order a beit midrash would take it.
 *
 *   hook → guess → methods → practice → kushia
 *
 * Shared by every skill-based course. The hook comes before any method and
 * the child is asked to answer it with nothing but what they already know.
 * That guess is not marked and not even recorded: its job is to make the
 * method land as an answer to a question the child has already started
 * chewing on, rather than a rule handed down.
 */

export type LessonMethod = { name: string; steps: string[] };

/** One practice question, in the shape every course hands to the lesson. */
export type LessonItem = {
  /** Question text, read at normal size. */
  prompt?: string;
  /** The thing being asked about, shown large: "8 + 5 = ?", "_ẹo", "mẹ". */
  show?: string;
  /** A picture, so a child who cannot read yet still knows what the word is. */
  picture?: string;
  /** Text for the speaker button. Never the answer itself. */
  say?: string;
  answer: string;
  wrong: string[];
  because: string;
};

export type LessonSkill = {
  id: string;
  title: string;
  hook: string;
  methods: LessonMethod[];
  kushia: string;
  /** "cách làm" for a procedure, "cách nhớ" for a spelling rule of thumb. */
  methodNoun?: "cách làm" | "cách nhớ";
  /** Speak each item as it appears — for learners who cannot read yet. */
  autoSay?: boolean;
  /**
   * Answers are whole numbers, so the learner may type them instead of
   * picking. Four choices let a guess land a quarter of the time; a typed
   * answer has to be worked out.
   */
  allowTyped?: boolean;
  make: (rand: () => number) => LessonItem;
};

/** "1 000", "1.000" and " 42 " all mean the number the child meant. */
export function normaliseNumber(raw: string): string | null {
  const t = raw.replace(/[\s.,]/g, "");
  if (!/^\d+$/.test(t)) return null;
  return String(Number(t));
}

type Stage = "hook" | "methods" | "run" | "done";

/** An item with its option order fixed, so it cannot re-order mid-read. */
type Asked = LessonItem & { options: string[] };

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Wide options need a single column; a row of letters wants to sit in one line. */
function optionLayout(options: string[]) {
  const longest = Math.max(...options.map((o) => [...o].length));
  if (longest <= 4) {
    return {
      grid: options.length === 3 ? "grid-cols-3" : "grid-cols-2",
      text: "py-6 text-2xl",
    };
  }
  if (longest <= 16) return { grid: "grid-cols-2", text: "py-5 text-lg" };
  return { grid: "grid-cols-1", text: "px-5 py-4 text-base text-left" };
}

export function SkillLesson({
  skill,
  store,
  backHref,
  trackPrefix,
  speechLang = "vi",
}: {
  skill: LessonSkill;
  store: SkillStore;
  backHref: string;
  trackPrefix: string;
  speechLang?: SpeechLang;
}) {
  const vocab = useVocab();
  const course = store.useStore();
  const who = vocab.learner;

  const [stage, setStage] = React.useState<Stage>("hook");
  const [pair, setPair] = React.useState(false);
  const [items, setItems] = React.useState<Asked[]>([]);
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [right, setRight] = React.useState(0);
  const [voice, setVoice] = React.useState(true);
  // Which item's word a grown-up has revealed. Keyed by index so it resets
  // itself on the next item without an effect.
  const [revealed, setRevealed] = React.useState(-1);
  const [typed, setTyped] = React.useState(false);
  const [draft, setDraft] = React.useState("");

  const it = items[i];

  React.useEffect(() => {
    warmVoices();
    // Voices arrive asynchronously on most browsers, so check after a beat.
    const t = window.setTimeout(() => setVoice(hasVoice(speechLang)), 700);
    return () => window.clearTimeout(t);
  }, [speechLang]);

  // Read each new question aloud for a learner who cannot read it yet.
  React.useEffect(() => {
    if (stage !== "run" || !skill.autoSay || !it?.say) return;
    say(it.say, 0.8, speechLang);
  }, [stage, it, skill.autoSay, speechLang]);

  const prev = store.progressOf(course, who, skill.id);
  const name = learners.find((l) => l.id === who)?.name ?? "Bạn";
  const noun = skill.methodNoun ?? "cách làm";

  function startRun() {
    setItems(
      Array.from({ length: RUN_LENGTH }, () => {
        const made = skill.make(Math.random);
        return { ...made, options: shuffle([made.answer, ...made.wrong]) };
      }),
    );
    setI(0);
    setPicked(null);
    setRight(0);
    setStage("run");
    track.lessonStarted(`${trackPrefix}:${skill.id}`, trackPrefix, pair);
  }

  function choose(option: string) {
    if (picked !== null) return;
    setPicked(option);
    if (option === items[i].answer) setRight((r) => r + 1);
  }

  function submitTyped() {
    const n = normaliseNumber(draft);
    if (n === null) return;
    choose(n === normaliseNumber(items[i].answer) ? items[i].answer : n);
  }

  function next() {
    if (i + 1 >= items.length) {
      store.finishRun(who, skill.id, right);
      track.lessonFinished(`${trackPrefix}:${skill.id}`, right, items.length - right);
      setStage("done");
      return;
    }
    setPicked(null);
    setDraft("");
    setI(i + 1);
  }

  /* ---------------- 1. the question, before any teaching ---------------- */
  if (stage === "hook") {
    return (
      <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 sm:p-10">
        <p className="eyebrow text-ink-3">Câu hỏi trước, {noun} sau</p>
        <h2 className="display mt-4 text-[clamp(1.375rem,4.5vw,2rem)] leading-tight">{skill.hook}</h2>
        <p className="mt-5 text-sm leading-relaxed font-semibold text-ink-2">
          Đoán thử đi, đoán sai cũng được — không ai chấm câu này. Nghĩ xong rồi mới xem {noun},
          vì đọc {noun} trước thì bạn chỉ đang chép, không phải đang học.
        </p>

        <hr className="my-7 border-line" />

        <p className="eyebrow text-ink-3">Học một mình hay học đôi?</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPair(false)}
            aria-pressed={!pair}
            className={cn(
              "sticker press flex items-center gap-3 rounded-[var(--radius-card)] p-4 text-left",
              !pair ? "bg-sun" : "bg-paper hover:bg-paper-2",
            )}
          >
            <User className="size-5 shrink-0" />
            <span className="font-display font-bold">Một mình</span>
          </button>
          <button
            type="button"
            onClick={() => setPair(true)}
            aria-pressed={pair}
            className={cn(
              "sticker press flex items-center gap-3 rounded-[var(--radius-card)] p-4 text-left",
              pair ? "bg-grape-tint" : "bg-paper hover:bg-paper-2",
            )}
          >
            <Users className="size-5 shrink-0" />
            <span>
              <span className="block font-display font-bold">Học đôi</span>
              <span className="text-xs font-semibold text-ink-2">Người trả lời phải nói cả vì sao</span>
            </span>
          </button>
        </div>

        {skill.allowTyped && (
          <>
            <p className="eyebrow mt-7 text-ink-3">Trả lời bằng cách nào?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setTyped(false)}
                aria-pressed={!typed}
                className={cn(
                  "sticker press rounded-[var(--radius-card)] p-4 text-left",
                  !typed ? "bg-sun" : "bg-paper hover:bg-paper-2",
                )}
              >
                <span className="block font-display font-bold">Chọn đáp án</span>
                <span className="text-xs font-semibold text-ink">Bốn ô, bấm một ô</span>
              </button>
              <button
                type="button"
                onClick={() => setTyped(true)}
                aria-pressed={typed}
                className={cn(
                  "sticker press rounded-[var(--radius-card)] p-4 text-left",
                  typed ? "bg-sky" : "bg-paper hover:bg-paper-2",
                )}
              >
                <span className="block font-display font-bold">Tự gõ đáp án</span>
                <span className="text-xs font-semibold text-ink">Không đoán mò được — khó hơn</span>
              </button>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={() => setStage("methods")}
          className="tactile mt-7 inline-flex h-auto min-h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 py-3 font-display text-base font-bold text-paper hover:bg-flame"
        >
          ĐOÁN XONG RỒI, CHO XEM {noun.toUpperCase()}
          <ArrowRight className="size-5 shrink-0" />
        </button>
      </div>
    );
  }

  /* ---------------- 2. more than one way ---------------- */
  if (stage === "methods") {
    return (
      <div>
        <div className="sticker rounded-[var(--radius-card)] bg-sun-tint p-5">
          <p className="text-sm leading-relaxed font-semibold">
            <b>
              Có {skill.methods.length} {noun} bài này,{" "}
              {noun === "cách làm" ? "cách nào cũng đúng" : "dùng cách nào cũng được"}.
            </b>{" "}
            Trong nhà học của người Do Thái, một bài xong bằng một cách vẫn chưa gọi là xong — cách
            thứ hai mới là chỗ hiểu ra. Đọc hết rồi chọn cách bạn thích.
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          {skill.methods.map((m, n) => (
            <div key={m.name} className="sticker rounded-[var(--radius-card)] bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-lime font-display text-sm font-bold">
                  {n + 1}
                </span>
                <p className="font-display text-lg tracking-tight font-bold">{m.name}</p>
              </div>
              <ol className="mt-4 space-y-2">
                {m.steps.map((s, k) => (
                  <li key={k} className="flex gap-3 text-sm leading-relaxed font-semibold text-ink-2">
                    <span className="mt-0.5 font-display text-ink-3">{k + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={startRun}
          className="tactile mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold text-paper hover:bg-flame"
        >
          LÀM THỬ {RUN_LENGTH} BÀI
          <ArrowRight className="size-5" />
        </button>
      </div>
    );
  }

  /* ---------------- 4. the result, and the question nobody marks -------- */
  if (stage === "done") {
    const passed = right >= PASS_MARK;
    const box = store.progressOf(course, who, skill.id)?.box ?? 1;
    return (
      <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 text-center sm:p-10">
        <p className="text-[3.5rem] leading-none">{passed ? "🎉" : "💪"}</p>
        <h2 className="display mt-4 text-[clamp(1.5rem,5vw,2.25rem)]">
          ĐÚNG {right}/{items.length}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-semibold text-ink-2">
          {passed ? (
            <>
              Đúng từ {PASS_MARK}/{items.length} trở lên mới được lên bậc, để một lần may mắn không
              tính là thuộc. Bài này giờ ở bậc <b>{BOX_LABEL[box]}</b> và sẽ quay lại sau vài ngày.
            </>
          ) : (
            <>
              Chưa tới {PASS_MARK}/{items.length} nên bài này quay về bậc đầu và gặp lại sớm. Không
              phải bị phạt — chỉ là chưa chắc thì phải gặp lại nhiều hơn.
            </>
          )}
        </p>

        <div className="sticker mt-7 rounded-[var(--radius-card)] bg-grape-tint p-5 text-left">
          <p className="eyebrow text-ink-3">Kushia — câu hỏi khó, không ai chấm</p>
          <p className="mt-3 text-base leading-relaxed font-semibold">{skill.kushia}</p>
          <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
            Trả lời được câu này thì mới là hiểu, chứ làm đúng {items.length} bài mới chỉ là làm được.
            Nói câu trả lời ra tiếng cho anh, cho em, cho mẹ nghe. Máy không nghe được bạn nói nên
            không chấm — và cũng không giả vờ chấm.
          </p>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={startRun}
            className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold text-paper hover:bg-flame"
          >
            <RotateCcw className="size-5" />
            LÀM {RUN_LENGTH} BÀI NỮA
          </button>
          <Link
            href={backHref}
            className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-8 font-display text-base font-bold hover:bg-ink hover:text-paper"
          >
            VỀ BẢNG BÀI HỌC
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- 3. practice ---------------- */
  const answered = picked !== null;
  const correct = picked === it.answer;
  const layout = optionLayout(it.options);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-surface">
          <div
            className="h-full bg-flame transition-[width] duration-300"
            style={{ width: `${Math.round((i / items.length) * 100)}%` }}
          />
        </div>
        <span className="font-display text-sm font-bold whitespace-nowrap">
          {i + 1}/{items.length}
        </span>
      </div>

      {pair && (
        <p className="mt-4 rounded-full border-2 border-ink bg-grape-tint px-4 py-2 text-center text-sm font-semibold">
          {i % 2 === 0 ? (
            <>
              <b>{name}</b> làm — bạn cùng học hỏi &ldquo;vì sao?&rdquo;
            </>
          ) : (
            <>
              Bạn cùng học làm — <b>{name}</b> hỏi &ldquo;vì sao?&rdquo;
            </>
          )}
        </p>
      )}

      <div className="sticker-lg mt-6 rounded-[var(--radius-card)] bg-surface p-6 text-center sm:p-10">
        {it.picture && (
          <span className="block text-[4.5rem] leading-none" aria-hidden>
            {it.picture}
          </span>
        )}
        {it.show && (
          <p
            className={cn(
              "display leading-tight whitespace-pre-line",
              it.picture && "mt-4",
              [...it.show].length > 28 ? "text-[clamp(1.25rem,5vw,1.75rem)]" : "text-[clamp(1.5rem,7vw,2.75rem)]",
            )}
          >
            {it.show}
          </p>
        )}
        {it.prompt && (
          <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2 sm:text-base">{it.prompt}</p>
        )}
        {it.say && (
          <button
            type="button"
            onClick={() => say(it.say!, 0.8, speechLang)}
            className="tactile mt-5 inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-sun px-5 font-display text-sm font-bold"
            aria-label={`Nghe lại: ${it.say}`}
          >
            <Volume2 className="size-4" />
            NGHE LẠI
          </button>
        )}
        {/*
          No voice on this device. The word is needed — a picture of a house
          could be "nhà" or "quê" — but printing it outright would hand the
          answer to any child who can already read, which in a spelling drill
          is the whole exercise. So it waits behind a tap meant for a parent.
        */}
        {it.say && !voice && (
          <div className="mx-auto mt-3 max-w-sm text-xs leading-relaxed font-semibold text-flame">
            <p>Máy này chưa có giọng đọc {speechLang === "vi" ? "tiếng Việt" : "tiếng Anh"}.</p>
            {revealed === i ? (
              <p className="mt-1 text-base text-ink">&ldquo;{it.say}&rdquo;</p>
            ) : (
              <button
                type="button"
                onClick={() => setRevealed(i)}
                className="mt-1 underline underline-offset-4 hover:text-ink"
              >
                Nhờ bố mẹ bấm vào đây rồi đọc to giúp bé
              </button>
            )}
          </div>
        )}
      </div>

      {typed ? (
        <form
          className="mt-5 flex gap-3"
          // The browser's own pattern check would silently refuse " 1 1 " and
          // leave a child pressing a button that does nothing. The lesson
          // reads the number itself, so the browser is told not to judge.
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submitTyped();
          }}
        >
          <input
            value={answered ? picked ?? "" : draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={answered}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            autoFocus
            aria-label="Đáp án"
            placeholder="Gõ số"
            className={cn(
              "sticker h-16 min-w-0 flex-1 rounded-[var(--radius-card)] px-5 text-center font-display text-3xl font-bold outline-none",
              answered && correct && "bg-lime",
              answered && !correct && "bg-flame-tint",
              !answered && "bg-surface",
            )}
          />
          {!answered && (
            <button
              type="submit"
              disabled={normaliseNumber(draft) === null}
              className="tactile h-16 shrink-0 rounded-full bg-ink px-6 font-display text-base font-bold text-paper hover:bg-flame disabled:opacity-40"
            >
              KIỂM TRA
            </button>
          )}
        </form>
      ) : (
      <div className={cn("mt-5 grid gap-3", layout.grid)}>
        {it.options.map((o) => {
          const isRight = o === it.answer;
          const isPicked = picked === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => choose(o)}
              disabled={answered}
              className={cn(
                "sticker press rounded-[var(--radius-card)] font-display font-bold transition-colors disabled:cursor-default",
                layout.text,
                answered && isRight && "bg-lime",
                answered && isPicked && !isRight && "bg-flame-tint",
                !answered && "bg-surface hover:bg-paper-2",
                answered && !isRight && !isPicked && "bg-surface opacity-45",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
      )}

      {answered && (
        <div className={cn("sticker mt-5 rounded-[var(--radius-card)] p-5", correct ? "bg-lime" : "bg-sun")}>
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            {correct ? <Check className="size-5" /> : <X className="size-5" />}
            {correct ? "Đúng rồi!" : "Chưa đúng."}
          </p>
          {typed && !correct && (
            <p className="mt-2 font-display text-base font-bold">Đáp án đúng là {it.answer}.</p>
          )}
          <p className="mt-2 flex gap-2 text-sm leading-relaxed font-semibold">
            <Lightbulb className="mt-0.5 size-4 shrink-0" />
            {it.because}
          </p>
          <button
            type="button"
            onClick={next}
            className="tactile mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-bold text-paper hover:bg-flame"
          >
            {i + 1 >= items.length ? "XEM KẾT QUẢ" : "BÀI TIẾP"}
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}

      {prev && i === 0 && !answered && (
        <p className="mt-5 text-center text-xs font-semibold text-ink-3">
          Bài này bạn đang ở bậc {BOX_LABEL[prev.box]}
        </p>
      )}
    </div>
  );
}
