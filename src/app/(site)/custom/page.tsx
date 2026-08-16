import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomStudio } from "@/components/custom/custom-studio";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Make It Yours — Custom 3D Studio",
  description:
    "Design your own 3D printed name plate, bag tag or keychain. Pick the name, the colours, the style — see it in 3D before you order.",
};

export default async function CustomPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <PageIntro
        eyebrow="Custom 3D studio"
        title={
          <>
            MAKE
            <br />
            IT YOURS.
          </>
        }
        description="Type a name. Pick two colours. Rotate it, change your mind, rotate it again. When it looks right, we print exactly that."
        meta={[
          { label: "From", value: "45.000đ" },
          { label: "Lead time", value: "3–5 ngày" },
          { label: "Tiếng Việt", value: "Có dấu ✓" },
        ]}
      />

      <div className="container-hla py-14 sm:py-20">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[var(--radius-xl2)] bg-paper-2" />}>
          <CustomStudio initialProduct={product} />
        </Suspense>
      </div>
    </>
  );
}
