/**
 * Single source of truth for brand-level copy and numbers.
 * Everything here is deliberately editable by a non-developer.
 */

export const site = {
  name: "HLA3D",
  tagline: "Học mỗi ngày. Làm thật.",
  taglineVi: "Học mỗi ngày. Làm thật.",
  motto: ["LEARN IT.", "ASK BACK.", "MAKE IT REAL."],
  locale: "vi-VN",
  /** What the site is, in one line, for humans and for machines. */
  descriptionVi:
    "Lớp tiếng Việt, toán và tiếng Anh miễn phí của ba anh em Hưng (8), Long (6) và Anh (5) — học theo lối nhà học Do Thái. Lúc rảnh, ba anh em tìm mẫu 3D trên MakerWorld và in ra.",
  founded: 2025,
  city: "Việt Nam",
  email: "hello@hla3d.vn",
} as const;

/**
 * The zero-typing order path.
 *
 * Children browse; adults pay. For the adults who are least confident with a
 * web form — and in Vietnam that is most first-time small-shop buyers — the
 * shortest route to an order is a phone call or a Zalo message, not a field
 * to fill in. This number is published deliberately for that reason.
 */
export const contact = {
  phone: "0909475179",
  phoneDisplay: "0909 475 179",
  /** tel: works with the plain domestic number on every Vietnamese handset. */
  tel: "tel:0909475179",
  zalo: "https://zalo.me/0909475179",
  owner: "mẹ Hiếu",
} as const;

/**
 * The shop's goal. Shown only on the private dashboard: `current` is not a
 * confirmed count of real customers, so no public page may display it.
 */
export const goal = {
  label: "100 khách hàng đầu tiên",
  labelVi: "100 khách hàng đầu tiên",
  current: 27,
  target: 100,
  startedAt: "Tháng 3, 2025",
} as const;

/**
 * Everything a visitor might go looking for. The footer lists all of it.
 */
export const nav = [
  { href: "/hom-nay", label: "Hôm nay học gì" },
  { href: "/hoc-tieng-viet", label: "Tiếng Việt" },
  { href: "/hoc-toan", label: "Toán" },
  { href: "/hoc-tieng-anh", label: "Tiếng Anh" },
  { href: "/shop", label: "Cửa hàng" },
  { href: "/chon-qua", label: "Chọn quà" },
  { href: "/custom", label: "In tên riêng" },
  { href: "/about", label: "Chuyện của tụi em" },
] as const;

/**
 * What fits across the top of a laptop without wrapping. The gift finder and
 * the name studio are one tap away from the shop, and stay in the footer.
 */
export const navPrimary = nav.filter(
  // "Hôm nay học gì" has the header button to itself, so it stays out of the row.
  (item) => !["/chon-qua", "/custom", "/hom-nay"].includes(item.href),
);
