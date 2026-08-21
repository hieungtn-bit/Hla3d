import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { JournalCard } from "@/components/home/journal-preview";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "Nhật ký",
  description:
    "Chuyện in được, chuyện in hỏng và số tiền thật của mỗi lần in — do Hưng, Long và Anh tự viết.",
};

export default function JournalPage() {
  const [featured, ...rest] = journal;

  return (
    <>
      <PageIntro
        eyebrow="Nhật ký"
        title={
          <>
            TỤI EM
            <br />
            HỌC ĐƯỢC GÌ.
          </>
        }
        description="Mỗi bài là do một trong ba anh em tự viết, sau khi làm được một việc — hoặc thường hơn, sau khi làm hỏng. Ba chỉ sửa lỗi chính tả, không sửa nội dung."
        meta={[
          { label: "Số bài", value: String(journal.length) },
          { label: "Lần hỏng đã ghi lại", value: "17" },
          { label: "Bắt đầu từ", value: "03/2025" },
        ]}
      />

      <div className="container-hla py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <JournalCard post={featured} featured />
          <div className="grid gap-6">
            {rest.slice(0, 2).map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {rest.length > 2 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
