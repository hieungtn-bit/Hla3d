import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { GiftFinder } from "@/components/finder/gift-finder";

export const metadata: Metadata = {
  title: "Chọn quà giúp em",
  alternates: { canonical: "/chon-qua" },
  description:
    "Ba câu hỏi, ba lần bấm, không phải gõ chữ nào. Tụi em chọn giúp bạn món hợp nhất với người nhận và túi tiền.",
};

export default function ChonQuaPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chọn quà giúp em"
        title={
          <>
            KHÔNG BIẾT
            <br />
            CHỌN MÓN NÀO?
          </>
        }
        description="Bạn bấm ba lần, không phải gõ chữ nào. Tụi em chọn ra ba món hợp nhất — và nói luôn vì sao lại chọn món đó."
        meta={[
          { label: "Số câu hỏi", value: "3" },
          { label: "Phải gõ chữ", value: "Không" },
          { label: "Mất bao lâu", value: "~20 giây" },
        ]}
      />
      <div className="container-hla py-14 sm:py-20">
        <GiftFinder />
      </div>
    </>
  );
}
