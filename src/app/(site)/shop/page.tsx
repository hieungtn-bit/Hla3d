import type { Metadata } from "next";
import { ShopGrid } from "@/components/products/shop-grid";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop",
  description:
    "Desk objects, flexi toys, custom name plates and gifts — all designed and 3D printed by three young makers in Vietnam.",
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Cửa hàng"
        title={
          <>
            ĐỒ TỤI EM
            <br />
            TỰ LÀM.
          </>
        }
        description="Mười lăm món do Hưng, Long và Anh tự thiết kế, tự in và tự cầm lên kiểm tra. Làm theo đơn trong 3–5 ngày, vì nhà chỉ có đúng một cái máy in."
        meta={[
          { label: "Số món", value: "15" },
          { label: "Nhóm đồ", value: "5" },
          { label: "Thời gian làm", value: "3–5 ngày" },
        ]}
      />
      <div className="container-hla pb-24">
        <ShopGrid />
      </div>
    </>
  );
}
