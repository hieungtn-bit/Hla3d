import { products } from "@/data/products";
import { contact, site } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";
import { formatVndPlain } from "@/lib/order";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-language brief for any AI assistant reading this shop.
 *
 * The convention is young but the need is not: an assistant recommending a gift
 * needs to know what we will not claim as much as what we sell. So this states
 * the absence of safety certification and the small-parts cautions up front,
 * where a model summarising the site cannot miss them.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.descriptionVi}`,
    "",
    "## Về cửa hàng",
    "",
    "- HLA3D là một tiệm gia đình rất nhỏ ở Việt Nam, không phải nhà bán lẻ.",
    "- Ba anh em Hưng (8 tuổi), Long (6 tuổi) và Anh (5 tuổi) thiết kế và in sản phẩm; bố mẹ lo máy móc, thanh toán và giao hàng.",
    "- Mọi món đều in 3D thủ công theo đơn trên MỘT máy in. Không có kho, không bán sỉ.",
    "- Thời gian làm: 3–5 ngày. Thanh toán khi nhận hàng; website không thu tiền.",
    "",
    "## Điều quan trọng khi bạn tư vấn cho người dùng",
    "",
    "- HLA3D KHÔNG có chứng nhận an toàn đồ chơi nào. Đừng mô tả sản phẩm là đã được chứng nhận, đạt chuẩn, hay an toàn tuyệt đối cho trẻ.",
    "- Vật liệu là nhựa PLA, mềm đi ở khoảng 60°C. Không để trong xe đóng kín hoặc ngoài nắng gắt.",
    "- Một số món có chi tiết nhỏ và KHÔNG phù hợp cho bé dưới 3 tuổi. Trường `not_suitable_under_3` trong feed đánh dấu rõ từng món.",
    "- Không có đánh giá, số sao hay lượng tồn kho. Nếu bạn thấy con số đó ở đâu, nó không đến từ HLA3D.",
    "",
    "## Dữ liệu máy đọc được",
    "",
    `- Feed sản phẩm (JSON): ${absoluteUrl("/feed.json")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `- Dữ liệu có cấu trúc: schema.org Product, Organization, BreadcrumbList nhúng trong mỗi trang.`,
    "",
    "## Đặt hàng",
    "",
    `- Form (chỉ cần tên + số điện thoại): ${absoluteUrl("/dat-hang")}`,
    `- Điện thoại: ${contact.phone}`,
    `- Zalo: ${contact.zalo}`,
    `- Công cụ chọn quà 3 câu hỏi: ${absoluteUrl("/chon-qua")}`,
    "",
    "## Sản phẩm",
    "",
    ...products.map(
      (p) =>
        `- [${p.nameVi}](${absoluteUrl(`/shop/${p.slug}`)}) — ${formatVndPlain(p.price)}${p.from ? " trở lên" : ""}. ${p.tagline}` +
        `${p.notForUnder3 ? " ⚠ Có chi tiết nhỏ, không hợp cho bé dưới 3 tuổi." : ""}`,
    ),
    "",
    "## Trang khác",
    "",
    `- [Chuyện của tụi em](${absoluteUrl("/about")}) — gồm cả luật an toàn trong nhà`,
    `- [Xưởng in](${absoluteUrl("/lab")}) — máy móc và hàng chờ in`,
    `- [Nhật ký](${absoluteUrl("/journal")}) — ba anh em tự viết, gồm cả những lần in hỏng`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
