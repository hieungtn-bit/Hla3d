import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOTAL_WORDS } from "@/data/vocab";
import { skills } from "@/data/math";

/**
 * The other classroom.
 *
 * Maths is not in the header — five links is what fits — so each hub carries
 * a link to the other. A parent who found one has found both.
 */
export function SubjectSwitch({ current }: { current: "english" | "math" }) {
  const to =
    current === "english"
      ? {
          href: "/hoc-toan",
          icon: "➗",
          title: "Còn lớp toán nữa",
          body: `${skills.length} bài từ mẫu giáo đến lớp 3. Mỗi bài hỏi trước rồi mới dạy, và bài nào cũng có từ hai cách làm.`,
          tone: "bg-sky",
        }
      : {
          href: "/hoc-tieng-anh",
          icon: "🔤",
          title: "Còn lớp tiếng Anh nữa",
          body: `${TOTAL_WORDS} từ tiếng Anh đầu tiên, chia 40 chủ đề. Bé chưa biết đọc vẫn học được bằng cách nghe rồi chọn hình.`,
          tone: "bg-sun",
        };

  return (
    <Link
      href={to.href}
      className={`sticker press group flex items-center gap-4 rounded-[var(--radius-card)] ${to.tone} p-5`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-surface text-2xl">
        {to.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg font-bold tracking-tight">{to.title}</span>
        <span className="mt-0.5 block text-sm leading-snug font-semibold text-ink/75">{to.body}</span>
      </span>
      <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
