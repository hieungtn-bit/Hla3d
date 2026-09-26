import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LEVELS } from "@/data/levels";
import { getVietSkill, vietSkills } from "@/data/viet";
import { VietLesson } from "@/components/viet/lesson";

type Params = { params: Promise<{ skill: string }> };

export function generateStaticParams() {
  return vietSkills.map((s) => ({ skill: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { skill: id } = await params;
  const skill = getVietSkill(id);
  if (!skill) return {};
  return {
    title: `${skill.title} — tiếng Việt ${LEVELS[skill.level].label.toLowerCase()}`,
    alternates: { canonical: `/hoc-tieng-viet/${skill.id}` },
    description: `${skill.summary} ${skill.methods.length} ${skill.methodNoun}, đề không lặp lại, ôn lại theo lịch. Miễn phí, không cần tài khoản.`,
  };
}

export default async function VietSkillPage({ params }: Params) {
  const { skill: id } = await params;
  const skill = getVietSkill(id);
  if (!skill) notFound();
  const meta = LEVELS[skill.level];

  return (
    <div className="container-hla py-10 sm:py-14">
      <Link href="/hoc-tieng-viet" className="inline-flex items-center gap-2 text-sm font-bold text-ink-2 hover:text-flame">
        <ArrowLeft className="size-4" />
        Bảng bài học
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className={`sticker grid size-14 shrink-0 place-items-center rounded-xl text-2xl ${meta.tone}`}>{meta.icon}</span>
        <div>
          <p className="eyebrow text-ink-3">
            {meta.label} · Bài {skill.order}
          </p>
          <h1 className="display text-[clamp(1.5rem,5.5vw,2.5rem)]">{skill.title}</h1>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <VietLesson skillId={skill.id} />
      </div>
    </div>
  );
}
