import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSet, vocabSets } from "@/data/vocab";
import { LearnSession } from "@/components/learn/session";

type Params = { params: Promise<{ set: string }> };

export function generateStaticParams() {
  return vocabSets.map((s) => ({ set: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { set: id } = await params;
  const set = getSet(id);
  if (!set) return {};
  return {
    title: `${set.title} — 25 từ tiếng Anh`,
    alternates: { canonical: `/hoc-tieng-anh/${set.id}` },
    description: `Học 25 từ tiếng Anh chủ đề ${set.title.toLowerCase()} (${set.titleEn}) bằng cách nghe, chọn hình và ôn lại theo lịch. Miễn phí, không cần tài khoản.`,
  };
}

export default async function LearnSetPage({ params }: Params) {
  const { set: id } = await params;
  const set = getSet(id);
  if (!set) notFound();

  return (
    <div className="container-hla py-10 sm:py-14">
      <Link
        href="/hoc-tieng-anh"
        className="inline-flex items-center gap-2 text-sm font-bold text-ink-2 hover:text-flame"
      >
        <ArrowLeft className="size-4" />
        Bảng 1000 từ
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className={`sticker grid size-14 shrink-0 place-items-center rounded-xl text-2xl ${set.tone}`}>
          {set.icon}
        </span>
        <div>
          <p className="eyebrow text-ink-3">
            Bộ {set.order} · {set.words.length} từ
          </p>
          <h1 className="display text-[clamp(1.5rem,5.5vw,2.5rem)]">{set.title}</h1>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <LearnSession set={set} />
      </div>
    </div>
  );
}
