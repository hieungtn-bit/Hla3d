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
    "Lớp tiếng Anh và lớp toán miễn phí của ba anh em Hưng (8), Long (6) và Anh (5) — học theo lối nhà học Do Thái. Cuối tuần ba anh em in 3D và bán đồ tự làm.",
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

/** The public goal that the whole homepage narrative hangs on. */
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
  { href: "/hoc-tieng-anh", label: "Học tiếng Anh" },
  { href: "/hoc-toan", label: "Học toán" },
  { href: "/shop", label: "Cửa hàng" },
  { href: "/chon-qua", label: "Chọn quà" },
  { href: "/custom", label: "Tự thiết kế" },
  { href: "/about", label: "Chuyện của tụi em" },
  { href: "/lab", label: "Xưởng in" },
  { href: "/journal", label: "Nhật ký" },
] as const;

/**
 * What fits across the top of a laptop without wrapping.
 *
 * Seven links do not fit, and a header that wraps to two lines reads as
 * broken. The lab and the journal come out: both are things a visitor reads
 * once out of curiosity, not things they navigate to — and both are still one
 * tap away in the footer and from the homepage sections that introduce them.
 */
export const navPrimary = nav.filter(
  (item) => !["/lab", "/journal", "/chon-qua"].includes(item.href),
);

export const printer = {
  name: "Anycubic Kobra X",
  nickname: "PRINTER #01",
  buildVolume: "220 × 220 × 250 mm",
  nozzle: "0.4 mm",
  material: "PLA / PLA+ / Silk PLA",
  layerHeights: "0.12 – 0.28 mm",
  commissioned: "Tháng 3, 2025",
} as const;
