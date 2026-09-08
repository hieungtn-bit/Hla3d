"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Lightbulb, RotateCcw, Users, User, X } from "lucide-react";
import { getSkill, type Item, type Skill } from "@/data/math";
import { RUN_LENGTH, PASS_MARK, finishRun, progressOfSkill, useMath } from "@/lib/math-store";
import { useVocab, learners } from "@/lib/vocab-store";
import { BOX_LABEL } from "@/lib/leitner";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * A lesson, in the order a beit midrash would take it.
 *
 *   hook → guess → methods → practice → kushia
 *
 * The hook comes before any method and the child is asked to answer it with
 * nothing but what they already know. That guess is not marked and not even
 * recorded: its job is to make the method land as an answer to a question the
 * child has already started chewing on, rather than a rule handed down.
 */
type Stage = "hook" | "methods" | "run" | "done";

/** An item with its option order already fixed, so it cannot re-order mid-read. */
type Asked = Item & { options: number[] };

function shuffle<T>(xs: T[]): T[] {
  const out = [...xs];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Takes an id, not the skill itself.
 *
 * A Skill carries `make`, a generator function, and functions cannot cross
 * the server/client boundary as props. The data module is client-safe, so the
 * lesson looks its own skill up instead.
 */
export function MathLesson({ skillId }: { skillId: string }) {
  const skill = getSkill(skillId);
  if (!skill) return null;
  // Handing the resolved skill to an inner component keeps the guard above
  // every hook, and passing a function-carrying object between two client
  // components is fine — it is only the server boundary that forbids it.
  return <Lesson skill={skill} />;
}

function Lesson({ skill }: { skill: Skill }) {
  const vocab = useVocab();
  const math = useMath();
  const who = vocab.learner;

  const [stage, setStage] = React.useState<Stage>("hook");
  const [pair, setPair] = React.useState(false);
  const [items, setItems] = React.useState<Asked[]>([]);
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [right, setRight] = React.useState(0);

  const prev = progressOfSkill(math, who, skill.id);
  const name = learners.find((l) => l.id === who)?.name ?? "Bạn";

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
    track.lessonStarted(`toan:${skill.id}`, "math", pair);
  }

  function choose(n: number) {
    if (picked !== null) return;
    setPicked(n);
    if (n === items[i].answer) setRight((r) => r + 1);
  }

  function next() {
    if (i + 1 >= items.length) {
      const finalRight = right;
      finishRun(who, skill.id, finalRight);
      track.lessonFinished(`toan:${skill.id}`, finalRight, items.length - finalRight);
      setStage("done");
      return;
    }
    setPicked(null);
    setI(i + 1);
  }

  /* ---------------- 1. the question, before any teaching ---------------- */
  if (stage === "hook") {
    return (
      <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 sm:p-10">
        <p className="eyebrow text-ink-3">Câu hỏi trước, cách làm sau</p>
        <h2 className="display mt-4 text-[clamp(1.375rem,4.5vw,2rem)] leading-tight">{skill.hook}</h2>
        <p className="mt-5 text-sm leading-relaxed font-semibold text-ink-2">
          Đoán thử đi, đoán sai cũng được — không ai chấm câu này. Nghĩ xong rồi mới xem cách làm,
          vì đọc cách làm trước thì bạn chỉ đang chép, không phải đang học.
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

        <button
          type="button"
          onClick={() => setStage("methods")}
          className="tactile mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold text-paper hover:bg-flame"
        >
          ĐOÁN XONG RỒI, CHO XEM CÁCH LÀM
          <ArrowRight className="size-5" />
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
            <b>Có {skill.methods.length} cách làm bài này, cách nào cũng đúng.</b> Trong nhà học của
            người Do Thái, một bài giải xong bằng một cách vẫn chưa gọi là xong — cách thứ hai mới là
            chỗ hiểu ra. Đọc hết rồi chọn cách bạn thích.
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          {skill.methods.map((m, n) => (
            <div key={m.name} className="sticker rounded-[var(--radius-card)] bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-lime font-display text-sm font-bold">
                  {n + 1}
                </span>
                <p className="font-display text-lg font-bold tracking-tight">{m.name}</p>
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
    const box = progressOfSkill(math, who, skill.id)?.box ?? 1;
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
            Trả lời được câu này thì mới là hiểu, chứ làm đúng 6 bài mới chỉ là làm được. Nói câu trả
            lời ra tiếng cho anh, cho em, cho mẹ nghe. Máy không nghe được bạn nói nên không chấm —
            và cũng không giả vờ chấm.
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
            href="/hoc-toan"
            className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-8 font-display text-base font-bold hover:bg-ink hover:text-paper"
          >
            VỀ BẢNG BÀI HỌC
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- 3. practice ---------------- */
  const it = items[i];
  const answered = picked !== null;
  const correct = picked === it.answer;

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
        <p className="display text-[clamp(1.5rem,7vw,2.75rem)] leading-tight whitespace-pre-line">
          {it.prompt}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
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
                "sticker press rounded-[var(--radius-card)] py-6 font-display text-2xl font-bold transition-colors disabled:cursor-default",
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

      {answered && (
        <div className={cn("sticker mt-5 rounded-[var(--radius-card)] p-5", correct ? "bg-lime" : "bg-sun")}>
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            {correct ? <Check className="size-5" /> : <X className="size-5" />}
            {correct ? "Đúng rồi!" : "Chưa đúng."}
          </p>
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
