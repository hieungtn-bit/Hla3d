import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOTAL_WORDS } from "@/data/vocab";
import { skills } from "@/data/math";
import { vietSkills } from "@/data/viet";

export type Subject = "viet" | "math" | "english";

const SUBJECTS: Record<Subject, { href: string; icon: string; title: string; body: string; tone: string }> = {
  viet: {
    href: "/hoc-tieng-viet",
    icon: "🔤",
    title: "Lớp tiếng Việt",
    body: `${vietSkills.length} bài từ mẫu giáo đến lớp 3: chữ cái, dấu thanh, chính tả, câu.`,
    tone: "bg-lime",
  },
  math: {
    href: "/hoc-toan",
    icon: "➗",
    title: "Lớp toán",
    body: `${skills.length} bài từ mẫu giáo đến lớp 3. Hỏi trước rồi mới dạy, bài nào cũng có từ hai cách làm.`,
    tone: "bg-sky",
  },
  english: {
    href: "/hoc-tieng-anh",
    icon: "🇬🇧",
    title: "Lớp tiếng Anh",
    body: `${TOTAL_WORDS} từ đầu tiên, 40 chủ đề. Bé chưa biết đọc vẫn học được bằng cách nghe rồi chọn hình.`,
    tone: "bg-sun",
  },
};

/**
 * The other classrooms.
 *
 * The header holds five links, so each hub carries links to the other two —
 * a parent who found one has found all three.
 */
export function SubjectSwitch({ current }: { current: Subject }) {
  const others = (Object.keys(SUBJECTS) as Subject[]).filter((s) => s !== current);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {others.map((key) => {
        const to = SUBJECTS[key];
        return (
          <Link
            key={key}
            href={to.href}
            className={`sticker press group flex items-center gap-4 rounded-[var(--radius-card)] ${to.tone} p-5`}
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-surface text-2xl">
              {to.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold tracking-tight">Còn {to.title.toLowerCase()} nữa</span>
              <span className="mt-0.5 block text-sm leading-snug font-semibold text-ink/75">{to.body}</span>
            </span>
            <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        );
      })}
    </div>
  );
}
