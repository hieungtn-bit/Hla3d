import { products, categories, filaments } from "@/data/products";
import { contact, site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

/**
 * A machine-readable product feed.
 *
 * By 2026 a growing share of buyers arrive through an assistant rather than a
 * search box: someone asks their AI for "a personalised gift for a six-year-old
 * under 200k in Vietnam" and the assistant reads structured data. A shop that
 * only exists as rendered HTML is invisible to that path.
 *
 * Everything here is fact from src/data. Deliberately absent: ratings, review
 * counts, stock levels and delivery estimates in days — we have none of those,
 * and inventing them to look bigger is how a small honest shop loses the one
 * thing it has.
 */
export function GET() {
  const feed = {
    version: "1.0",
    generated_at: new Date().toISOString(),
    shop: {
      name: site.name,
      url: absoluteUrl("/"),
      description: site.descriptionVi,
      language: "vi-VN",
      country: "VN",
      currency: "VND",
      made_by: "Ba anh em: Hưng (8), Long (6), Anh (5), dưới sự giám sát của bố mẹ",
      production: "In 3D thủ công tại nhà, một máy Anycubic Kobra X, làm theo đơn",
      lead_time: "3–5 ngày làm việc",
      order_channels: [
        { type: "web_form", url: absoluteUrl("/dat-hang"), requires: ["name", "phone"] },
        { type: "phone", value: contact.phone },
        { type: "zalo", value: contact.zalo },
      ],
      payment: "Thanh toán khi nhận hàng. Website không thu tiền.",
      certifications: [],
      disclosure:
        "Không có chứng nhận an toàn đồ chơi. Mọi cảnh báo an toàn là mô tả thực tế, không phải chứng nhận.",
    },
    categories: categories.map((c) => ({ id: c.id, label: c.label, description: c.blurb })),
    products: products.map((p) => ({
      id: p.id,
      sku: p.slug,
      url: absoluteUrl(`/shop/${p.slug}`),
      name_vi: p.nameVi,
      name_en: p.name,
      category: p.category,
      summary: p.tagline,
      description: p.description,
      price: { amount: p.price, currency: "VND", is_from_price: Boolean(p.from) },
      availability: "made_to_order",
      production_time: p.printTime,
      material: p.material,
      dimensions: p.size,
      weight: p.weight,
      colours: p.colors.map((k) => filaments[k]?.name).filter(Boolean),
      customisable: Boolean(p.customizable),
      difficulty_for_makers: `${p.makerRating}/5`,
      features: p.features,
      safety_notes: p.safety,
      not_suitable_under_3: p.notForUnder3,
      is_toy: p.isToy,
      made_by: p.madeBy,
    })),
  };

  return Response.json(feed, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
