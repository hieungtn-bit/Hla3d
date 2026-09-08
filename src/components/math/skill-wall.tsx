"use client";

import Link from "next/link";
import { LEVELS, skills, type Level } from "@/data/math";
import { mathStatus, progressOfSkill, useMath } from "@/lib/math-store";
import { useVocab } from "@/lib/vocab-store";
import { isDue, isLearned, BOX_LABEL } from "@/lib/leitner";
import { cn } from "@/lib/utils";

const ORDER: Level[] = ["mau-giao", "lop1", "lop2", "lop3"];

export function SkillWall() {
  const vocab = useVocab();
  const math = useMath();
  const who = vocab.learner;
  const total = mathStatus(math, who);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`${total.learned}`} label="Bài đã thuộc" sub={`trên ${total.total}`} tone="bg-lime" />
        <Stat value={`${total.started}`} label="Bài đã học" sub="đang trong vòng ôn" tone="bg-sun" />
        <Stat value={`${total.due}`} label="Cần ôn hôm nay" sub="ôn xong là xong" tone="bg-flame" />
        <Stat value={`${total.unmet}`} label="Bài chưa mở" sub="còn ở phía trước" tone="bg-sky" />
      </div>

      {ORDER.map((level) => {
        const meta = LEVELS[level];
        const list = skills.filter((s) => s.level === level);
        return (
          <section key={level} className="mt-12">
            <div className="flex items-center gap-3">
              <span className={cn("grid size-11 place-items-center rounded-xl border-2 border-ink text-xl", meta.tone)}>
                {meta.icon}
              </span>
              <div>
                <h2 className="display text-2xl">{meta.label}</h2>
                <p className="text-xs font-semibold text-ink-3">
                  {meta.age} · {list.length} bài
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((skill) => {
                const p = progressOfSkill(math, who, skill.id);
                const learned = isLearned(p);
                const due = Boolean(p) && isDue(p);
                return (
                  <Link
                    key={skill.id}
                    href={`/hoc-toan/${skill.id}`}
                    className={cn(
                      "sticker press rounded-[var(--radius-card)] p-4 transition-colors",
                      learned ? "bg-lime" : "bg-surface hover:bg-paper-2",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-base leading-snug font-bold tracking-tight">
                        {skill.title}
                      </p>
                      <span className="font-display text-sm font-bold text-ink-3">{skill.order}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed font-semibold text-ink-2">{skill.summary}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold">
                      <span className="text-ink-3">
                        {skill.methods.length} cách làm
                      </span>
                      {due ? (
                        <span className="rounded-full border-2 border-ink bg-flame px-2 py-0.5 text-white">
                          Ôn lại
                        </span>
                      ) : p ? (
                        <span className="rounded-full border-2 border-ink bg-surface px-2 py-0.5">
                          {BOX_LABEL[p.box]}
                        </span>
                      ) : (
                        <span className="rounded-full border-2 border-ink bg-sun px-2 py-0.5">Chưa học</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Stat({ value, label, sub, tone }: { value: string; label: string; sub: string; tone: string }) {
  return (
    <div className="sticker rounded-[var(--radius-card)] bg-surface p-4">
      <span className={cn("inline-block rounded-lg border-2 border-ink px-2 py-0.5 text-[0.625rem] font-bold", tone)}>
        {label}
      </span>
      <p className="display mt-2 text-3xl">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink-3">{sub}</p>
    </div>
  );
}
