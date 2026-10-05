"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck, Flame, Sparkles } from "lucide-react";
import { vocabSets } from "@/data/vocab";
import { skills as mathSkills } from "@/data/math";
import { vietSkills } from "@/data/viet";
import { LEVEL_ORDER, type Level } from "@/data/levels";
import { mathStore } from "@/lib/math-store";
import { vietStore } from "@/lib/viet-store";
import { currentStreak, learners, statusOfSet, useVocab, type LearnerId } from "@/lib/vocab-store";
import { isDue, today } from "@/lib/leitner";
import type { SkillStore } from "@/lib/skill-store";
import { cn } from "@/lib/utils";

/**
 * Today, across all three classes.
 *
 * The courses promise that the site keeps the schedule and the child only has
 * to open it. Until this page, opening it meant visiting three hubs and
 * reading three walls. This is the one screen a parent opens each day: what
 * has come due, roughly how long it takes, and what to start next.
 */

/** Where each learner starts when nothing is due — by age, not by guess. */
const START_LEVEL: Record<LearnerId, Level> = {
  anh: "mau-giao",
  long: "lop1",
  hung: "lop3",
  khach: "mau-giao",
};

/** One run of six items, or one sitting of eight words: about three minutes. */
const MINUTES_PER_SITTING = 3;

type Row = { href: string; title: string; note: string; tone: string; sittings?: number };

function dueSkills(
  list: { id: string; title: string }[],
  store: SkillStore,
  state: ReturnType<SkillStore["useStore"]>,
  who: LearnerId,
  base: string,
  tone: string,
): Row[] {
  const day = today();
  return list
    .filter((s) => {
      const p = store.progressOf(state, who, s.id);
      return Boolean(p) && isDue(p, day);
    })
    .map((s) => ({ href: `${base}/${s.id}`, title: s.title, note: "Đến hạn ôn", tone }));
}

/** The first lesson not yet started, at or above this learner's level. */
function nextSkill<T extends { id: string; level: Level; order: number; title: string }>(
  list: T[],
  store: SkillStore,
  state: ReturnType<SkillStore["useStore"]>,
  who: LearnerId,
): T | undefined {
  const from = LEVEL_ORDER.indexOf(START_LEVEL[who]);
  const fresh = list.filter((s) => !store.progressOf(state, who, s.id)).sort((a, b) => a.order - b.order);
  return fresh.find((s) => LEVEL_ORDER.indexOf(s.level) >= from) ?? fresh[0];
}

export function TodayBoard() {
  const vocab = useVocab();
  const viet = vietStore.useStore();
  const math = mathStore.useStore();
  const who = vocab.learner;
  const name = learners.find((l) => l.id === who)?.name ?? "Bạn";

  const vietDue = dueSkills(vietSkills, vietStore, viet, who, "/hoc-tieng-viet", "bg-lime");
  const mathDue = dueSkills(mathSkills, mathStore, math, who, "/hoc-toan", "bg-sky");
  const engDue: Row[] = vocabSets
    .map((set) => ({ set, st: statusOfSet(vocab, set.id) }))
    .filter(({ st }) => st.due > 0)
    .map(({ set, st }) => ({
      href: `/hoc-tieng-anh/${set.id}`,
      title: `${set.icon} ${set.title}`,
      note: `${st.due} từ đến hạn`,
      tone: "bg-sun",
      // A sitting is eight words.
      sittings: Math.ceil(st.due / 8),
    }));

  const sittings = vietDue.length + mathDue.length + engDue.reduce((n, r) => n + (r.sittings ?? 1), 0);
  const allDue = [...vietDue, ...mathDue, ...engDue];
  const streak = currentStreak(vocab, who);

  // Young learners start on sets they can do from pictures alone.
  const youngReader = who === "anh" || who === "khach";
  const nextEnglish = vocabSets.find((set) => {
    const st = statusOfSet(vocab, set.id);
    return st.unmet > 0 && (!youngReader || set.pictureFirst);
  });
  const next: Row[] = [
    (() => {
      const s = nextSkill(vietSkills, vietStore, viet, who);
      return s && { href: `/hoc-tieng-viet/${s.id}`, title: s.title, note: "Tiếng Việt · bài mới", tone: "bg-lime" };
    })(),
    (() => {
      const s = nextSkill(mathSkills, mathStore, math, who);
      return s && { href: `/hoc-toan/${s.id}`, title: s.title, note: "Toán · bài mới", tone: "bg-sky" };
    })(),
    nextEnglish && {
      href: `/hoc-tieng-anh/${nextEnglish.id}`,
      title: `${nextEnglish.icon} ${nextEnglish.title}`,
      note: "Tiếng Anh · bộ từ mới",
      tone: "bg-sun",
    },
  ].filter((r): r is Row => Boolean(r));

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat icon={CalendarCheck} value={`${allDue.length}`} label="Bài đến hạn ôn" tone="bg-flame" />
        <Stat
          icon={Sparkles}
          value={sittings ? `~${sittings * MINUTES_PER_SITTING} phút` : "0 phút"}
          label="Ôn hết hôm nay mất khoảng"
          tone="bg-sun"
        />
        <Stat icon={Flame} value={`${streak} ngày`} label="Học liên tiếp" tone="bg-lime" />
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Cần ôn hôm nay</h2>
        {allDue.length ? (
          <>
            <p className="mt-2 text-sm font-semibold text-ink-2">
              Ôn trước, học mới sau. Một từ để quá hạn lâu thì phải học lại gần như từ đầu.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {allDue.map((r) => (
                <RowLink key={r.href} row={r} />
              ))}
            </ul>
          </>
        ) : (
          <p className="sticker mt-5 rounded-[var(--radius-card)] bg-surface p-5 text-sm leading-relaxed font-semibold text-ink-2">
            Hôm nay {name} không có bài nào đến hạn ôn. Lịch ôn sẽ tự gọi khi tới ngày — giờ thì học
            thêm một bài mới ở dưới nhé.
          </p>
        )}
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl">Bài tiếp theo</h2>
        <p className="mt-2 text-sm font-semibold text-ink-2">
          Bài đầu tiên {name} chưa học ở mỗi lớp, bắt đầu từ đúng bậc của {name}.
        </p>
        {next.length ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {next.map((r) => (
              <RowLink key={r.href} row={r} />
            ))}
          </ul>
        ) : (
          <p className="sticker mt-5 rounded-[var(--radius-card)] bg-lime p-5 text-sm font-semibold">
            {name} đã mở hết mọi bài ở cả ba lớp. Giờ chỉ còn ôn — đúng là việc khó nhất.
          </p>
        )}
      </section>
    </div>
  );
}

function RowLink({ row }: { row: Row }) {
  return (
    <li>
      <Link
        href={row.href}
        className="sticker press group flex items-center gap-3 rounded-[var(--radius-card)] bg-surface p-4"
      >
        <span className={cn("size-3 shrink-0 rounded-full border-2 border-ink", row.tone)} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-base font-bold tracking-tight">{row.title}</span>
          <span className="block text-xs font-semibold text-ink-3">{row.note}</span>
        </span>
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>
    </li>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <div className="sticker flex items-center gap-4 rounded-[var(--radius-card)] bg-surface p-4">
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink", tone)}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="display text-2xl">{value}</p>
        <p className="text-xs font-semibold text-ink-3">{label}</p>
      </div>
    </div>
  );
}
