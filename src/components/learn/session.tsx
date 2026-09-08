"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, Users, User, Volume2, X } from "lucide-react";
import type { VocabSet, Word } from "@/data/vocab";
import { buildSession, kushiaFor, type Card } from "@/lib/session";
import { answer, progressOf, useVocab, learners } from "@/lib/vocab-store";
import { hasVoice, say, warmVoices } from "@/lib/speech";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Mode = "picture" | "text";
type Phase = "meet" | "ask" | "right" | "wrong";

/** A card plus the one retry it is allowed inside this sitting. */
type Queued = Card & { retried?: boolean };

export function LearnSession({ set }: { set: VocabSet }) {
  const state = useVocab();
  const [mode, setMode] = React.useState<Mode | null>(null);
  const [pair, setPair] = React.useState(false);
  const [queue, setQueue] = React.useState<Queued[] | null>(null);
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("meet");
  const [picked, setPicked] = React.useState<string | null>(null);
  const [score, setScore] = React.useState({ right: 0, wrong: 0 });
  const [voice, setVoice] = React.useState(true);

  React.useEffect(() => {
    warmVoices();
    // Voices arrive asynchronously on most browsers, so ask twice.
    const t = window.setTimeout(() => setVoice(hasVoice()), 700);
    return () => window.clearTimeout(t);
  }, []);

  const card = queue?.[i];

  // Say the word whenever a new question appears, so a child who cannot read
  // still gets the question. Never on the answer screens.
  React.useEffect(() => {
    if (!card || (phase !== "ask" && phase !== "meet")) return;
    say(card.word[0]);
  }, [card, phase]);

  function begin(m: Mode) {
    const cards = buildSession(set, (en) => progressOf(state, set.id, en));
    setMode(m);
    setQueue(cards);
    setI(0);
    setPhase(cards[0]?.stage === "meet" ? "meet" : "ask");
    setScore({ right: 0, wrong: 0 });
    track.lessonStarted(set.id, m, pair);
  }

  function choose(option: Word) {
    if (!card || phase === "right" || phase === "wrong") return;
    const correct = option[0] === card.word[0];
    setPicked(option[0]);
    setPhase(correct ? "right" : "wrong");
    answer(set.id, card.word[0], correct);
    setScore((s) => ({ right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));

    // A missed word returns at the end of this sitting, once. Leaving it to
    // tomorrow means the child walks away with the wrong answer as the last
    // thing they saw.
    if (!correct && !card.retried && queue) {
      setQueue([...queue, { ...card, retried: true }]);
    }
  }

  function next() {
    if (!queue) return;
    setPicked(null);
    const n = i + 1;
    setI(n);
    setPhase(queue[n]?.stage === "meet" && !queue[n]?.retried ? "meet" : "ask");
  }

  /* ---------------- before the first card: how are we studying? ---------- */
  if (!mode || !queue) {
    return <Setup set={set} pair={pair} setPair={setPair} onStart={begin} voice={voice} />;
  }

  /* ---------------- the sitting is over ---------------------------------- */
  if (!card) {
    return <Done set={set} score={score} onAgain={() => begin(mode)} />;
  }

  const asker = learners.find((l) => l.id === state.learner)?.name ?? "Bạn";
  const showing = phase === "right" || phase === "wrong";

  return (
    <div>
      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-surface">
          <div
            className="h-full bg-flame transition-[width] duration-300"
            style={{ width: `${Math.round((i / queue.length) * 100)}%` }}
          />
        </div>
        <span className="font-display text-sm font-bold whitespace-nowrap">
          {i + 1}/{queue.length}
        </span>
      </div>

      {pair && (
        <p className="mt-4 rounded-full border-2 border-ink bg-grape-tint px-4 py-2 text-center text-sm font-semibold">
          {i % 2 === 0 ? <>Bạn cùng học hỏi — <b>{asker}</b> trả lời</> : <><b>{asker}</b> hỏi — bạn cùng học trả lời</>}
        </p>
      )}

      {/* ---- meeting a word for the first time ---- */}
      {phase === "meet" ? (
        <div className="sticker-lg mt-6 rounded-[var(--radius-card)] bg-surface p-6 text-center sm:p-10">
          <p className="eyebrow text-ink-3">Từ mới</p>
          {card.word[2] && <p className="mt-4 text-[5rem] leading-none sm:text-[7rem]">{card.word[2]}</p>}
          <p className="display mt-4 text-[clamp(2rem,9vw,3.5rem)]">{card.word[0]}</p>
          <p className="mt-2 text-lg font-semibold text-ink-2">{card.word[1]}</p>
          <button
            type="button"
            onClick={() => say(card.word[0])}
            className="tactile mt-6 inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-display text-sm font-bold"
          >
            <Volume2 className="size-4" />
            NGHE LẠI
          </button>
          <p className="mt-6 text-sm font-semibold text-ink-2">
            Đọc to lên một lần. Nghe được tai mình nói thì nhớ lâu hơn nhìn.
          </p>
          <button
            type="button"
            onClick={() => setPhase("ask")}
            className="tactile mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold text-paper hover:bg-flame"
          >
            ĐỌC RỒI, HỎI ĐI
            <ArrowRight className="size-5" />
          </button>
        </div>
      ) : (
        <>
          {/* ---- the question ---- */}
          <div className="mt-6 text-center">
            {mode === "picture" ? (
              <>
                <p className="eyebrow text-ink-3">Nghe rồi chọn hình</p>
                <button
                  type="button"
                  onClick={() => say(card.word[0])}
                  className="sticker press mx-auto mt-4 grid size-24 place-items-center rounded-full bg-sun"
                  aria-label={`Nghe lại từ ${card.word[0]}`}
                >
                  <Volume2 className="size-10" />
                </button>
                {!voice && (
                  <p className="mx-auto mt-4 max-w-sm text-sm font-semibold text-flame">
                    Máy này chưa có giọng đọc tiếng Anh nên không phát ra tiếng. Từ cần tìm là{" "}
                    <b>{card.word[0]}</b>.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="eyebrow text-ink-3">Từ này nghĩa là gì?</p>
                <p className="display mt-3 text-[clamp(2rem,9vw,3.5rem)]">{card.word[0]}</p>
                <button
                  type="button"
                  onClick={() => say(card.word[0])}
                  className="tactile mt-3 inline-flex h-10 items-center gap-2 rounded-full border-2 border-ink px-4 font-display text-xs font-bold"
                >
                  <Volume2 className="size-3.5" />
                  NGHE
                </button>
              </>
            )}
          </div>

          {/* ---- the four choices ---- */}
          <div className={cn("mt-7 grid gap-3", mode === "picture" ? "grid-cols-2" : "grid-cols-1")}>
            {card.options.map((o) => {
              const isRight = o[0] === card.word[0];
              const isPicked = picked === o[0];
              return (
                <button
                  key={o[0]}
                  type="button"
                  onClick={() => choose(o)}
                  disabled={showing}
                  className={cn(
                    "sticker press rounded-[var(--radius-card)] p-4 text-center transition-colors disabled:cursor-default",
                    showing && isRight && "bg-lime",
                    showing && isPicked && !isRight && "bg-flame-tint",
                    !showing && "bg-surface hover:bg-paper-2",
                    showing && !isRight && !isPicked && "bg-surface opacity-50",
                  )}
                >
                  {mode === "picture" ? (
                    <>
                      <span className="block text-[3.25rem] leading-none">{o[2]}</span>
                      <span className="mt-2 block text-sm font-semibold text-ink-2">{o[1]}</span>
                    </>
                  ) : (
                    <span className="block font-display text-lg font-bold tracking-tight">{o[1]}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ---- what happened ---- */}
          {showing && (
            <div
              className={cn(
                "sticker mt-6 rounded-[var(--radius-card)] p-5",
                phase === "right" ? "bg-lime" : "bg-sun",
              )}
            >
              <p className="flex items-center gap-2 font-display text-lg font-bold">
                {phase === "right" ? <Check className="size-5" /> : <X className="size-5" />}
                {phase === "right" ? "Đúng rồi!" : "Chưa đúng — không sao."}
              </p>
              <p className="mt-2 text-sm leading-relaxed font-semibold">
                <b>{card.word[0]}</b> {card.word[2]} nghĩa là <b>{card.word[1]}</b>.
                {phase === "wrong" && !card.retried && " Từ này sẽ quay lại cuối buổi để bạn gặp lại."}
              </p>
              <p className="mt-3 text-sm font-semibold text-ink-2">{kushiaFor(card.word[0])}</p>
              <button
                type="button"
                onClick={next}
                className="tactile mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-bold text-paper hover:bg-flame"
              >
                TIẾP TỤC
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Setup — the two questions asked before any word appears.
   ------------------------------------------------------------------------- */

function Setup({
  set,
  pair,
  setPair,
  onStart,
  voice,
}: {
  set: VocabSet;
  pair: boolean;
  setPair: (v: boolean) => void;
  onStart: (m: Mode) => void;
  voice: boolean;
}) {
  return (
    <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 sm:p-10">
      <p className="eyebrow text-ink-3">Trước khi bắt đầu</p>
      <h2 className="display mt-3 text-[clamp(1.5rem,5vw,2.25rem)]">HỌC MỘT MÌNH HAY HỌC ĐÔI?</h2>
      <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
        Trong nhà học của người Do Thái gần như không ai học một mình. Hai người ngồi một bàn, đọc to,
        hỏi ngược lại nhau — gọi là <i>chavruta</i>. Nói ra thành tiếng cho người khác nghe khó hơn
        đọc thầm, và đó chính là lý do nó vào đầu.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
          <span>
            <span className="block font-display font-bold">Một mình</span>
            <span className="text-xs font-semibold text-ink-2">Vẫn phải đọc to nhé</span>
          </span>
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
            <span className="text-xs font-semibold text-ink-2">Hai anh em, đổi lượt hỏi</span>
          </span>
        </button>
      </div>

      <hr className="my-7 border-line" />

      <p className="eyebrow text-ink-3">Bạn đọc chữ được chưa?</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onStart("picture")}
          className="tactile flex h-auto flex-col items-start gap-1 rounded-[var(--radius-card)] bg-lime px-5 py-4 text-left"
        >
          <span className="font-display text-lg font-bold">CHƯA ĐỌC ĐƯỢC</span>
          <span className="text-xs font-semibold text-ink-2">Nghe tiếng rồi chọn hình. Không cần chữ.</span>
        </button>
        <button
          type="button"
          onClick={() => onStart("text")}
          className="tactile flex h-auto flex-col items-start gap-1 rounded-[var(--radius-card)] bg-sky px-5 py-4 text-left"
        >
          <span className="font-display text-lg font-bold">ĐỌC ĐƯỢC RỒI</span>
          <span className="text-xs font-semibold text-ink-2">Nhìn chữ tiếng Anh, chọn nghĩa tiếng Việt.</span>
        </button>
      </div>

      {!set.pictureFirst && (
        <p className="mt-5 rounded-[var(--radius-card)] border-2 border-ink bg-sun-tint p-4 text-sm leading-relaxed font-semibold">
          Bộ này là những từ không vẽ ra hình được (như <i>the</i>, <i>was</i>, <i>because</i>). Bạn nào
          chưa đọc chữ thì để dành bộ này lại, học bộ có hình trước đã.
        </p>
      )}

      {!voice && (
        <p className="mt-4 text-sm font-semibold text-flame">
          Máy này chưa cài giọng đọc tiếng Anh nên phần đọc thành tiếng sẽ im. Các phần khác vẫn chạy
          bình thường.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Done — the score, then the two things a machine cannot mark.
   ------------------------------------------------------------------------- */

function Done({
  set,
  score,
  onAgain,
}: {
  set: VocabSet;
  score: { right: number; wrong: number };
  onAgain: () => void;
}) {
  const total = score.right + score.wrong;

  React.useEffect(() => {
    track.lessonFinished(set.id, score.right, score.wrong);
  }, [set.id, score.right, score.wrong]);

  return (
    <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 text-center sm:p-10">
      <p className="text-[4rem] leading-none">🎉</p>
      <h2 className="display mt-4 text-[clamp(1.75rem,6vw,2.75rem)]">XONG BUỔI NÀY RỒI</h2>
      {total > 0 && (
        <p className="mt-3 text-lg font-semibold">
          Đúng {score.right}/{total}
        </p>
      )}
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-semibold text-ink-2">
        Những từ hôm nay sẽ quay lại sau vài ngày, rồi lâu hơn, rồi lâu hơn nữa. Đó không phải là bạn
        học chưa xong — đó là cách duy nhất để một từ ở lại thật lâu.
      </p>

      <div className="sticker mt-7 rounded-[var(--radius-card)] bg-grape-tint p-5 text-left">
        <p className="eyebrow text-ink-3">Việc cuối — không ai chấm điểm</p>
        <p className="mt-2 font-display text-lg font-bold">Dạy lại cho một người.</p>
        <p className="mt-2 text-sm leading-relaxed font-semibold text-ink-2">
          Chọn 3 từ hôm nay, dạy cho em, cho anh, cho mẹ. Ai dạy được thì người đó thuộc — chỗ nào
          bạn ấp úng chính là chỗ bạn chưa thật sự nhớ. Máy không kiểm tra được việc này, và cũng
          không giả vờ kiểm tra.
        </p>
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onAgain}
          className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold text-paper hover:bg-flame"
        >
          <RotateCcw className="size-5" />
          HỌC TIẾP BỘ NÀY
        </button>
        <Link
          href="/hoc-tieng-anh"
          className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-8 font-display text-base font-bold hover:bg-ink hover:text-paper"
        >
          VỀ BẢNG 1000 TỪ
        </Link>
      </div>
    </div>
  );
}
