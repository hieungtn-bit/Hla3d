import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomStudio } from "@/components/custom/custom-studio";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  alternates: { canonical: "/custom" },
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
        eyebrow="Xưởng thiết kế riêng"
        title={
          <>
            TỰ LÀM
            <br />
            MỘT MÓN.
          </>
        }
        description="Gõ tên vào. Chọn hai màu. Xoay qua xoay lại, đổi ý cũng được. Khi nào bạn thấy ưng, tụi em in đúng y như vậy."
        meta={[
          { label: "Giá từ", value: "45.000đ" },
          { label: "Thời gian làm", value: "3–5 ngày" },
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
