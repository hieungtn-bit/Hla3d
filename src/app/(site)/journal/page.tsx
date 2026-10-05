import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { JournalCard } from "@/components/home/journal-preview";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "Nhật ký",
  description:
    "Chuyện in được, chuyện in hỏng và số tiền thật của mỗi lần in ở xưởng của Hưng, Long và Anh.",
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
        description="Mỗi bài kể lại một việc ở xưởng — một lần làm được, hoặc thường hơn, một lần làm hỏng — và điều học được từ đó."
        meta={[
          { label: "Số bài", value: String(journal.length) },
          { label: "Viết về", value: "Làm được, làm hỏng" },
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
