import type { Metadata } from "next";
import { ShopGrid } from "@/components/products/shop-grid";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Desk objects, flexi toys, custom name plates and gifts — all designed and 3D printed by three young makers in Vietnam.",
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="The shop"
        title={
          <>
            SHOP OUR
            <br />
            CREATIONS.
          </>
        }
        description="Fifteen things three brothers designed, printed and checked by hand. Made to order in 3–5 days — because there is exactly one printer."
        meta={[
          { label: "Products", value: "15" },
          { label: "Categories", value: "5" },
          { label: "Lead time", value: "3–5 ngày" },
        ]}
      />
      <div className="container-hla pb-24">
        <ShopGrid />
      </div>
    </>
  );
}
