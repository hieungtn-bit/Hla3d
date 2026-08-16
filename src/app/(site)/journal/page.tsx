import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { JournalCard } from "@/components/home/journal-preview";
import { journal } from "@/data/journal";

export const metadata: Metadata = {
  title: "The Maker Journal",
  description:
    "Wins, failures and real numbers from three young makers learning 3D printing, design and business — written by them.",
};

export default function JournalPage() {
  const [featured, ...rest] = journal;

  return (
    <>
      <PageIntro
        eyebrow="The maker journal"
        title={
          <>
            WHAT WE
            <br />
            LEARNED.
          </>
        }
        description="Every entry is written by one of the makers after something worked or, more often, after something did not. Dad checks the spelling and nothing else."
        meta={[
          { label: "Entries", value: String(journal.length) },
          { label: "Failures documented", value: "17" },
          { label: "Since", value: "03/2025" },
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
