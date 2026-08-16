/**
 * Single source of truth for brand-level copy and numbers.
 * Everything here is deliberately editable by a non-developer.
 */

export const site = {
  name: "HLA3D",
  tagline: "Ý tưởng nhỏ. Tạo nên điều thật.",
  taglineVi: "Ý tưởng nhỏ. Tạo nên điều thật.",
  motto: ["DREAM IT.", "DESIGN IT.", "PRINT IT."],
  locale: "vi-VN",
  description:
    "Three young makers turning ideas into real 3D printed creations. Designed, printed and packed at home in Vietnam.",
  descriptionVi:
    "Hưng 8 tuổi, Long 6 tuổi và Anh 5 tuổi học cách biến ý tưởng thành sản phẩm thật bằng máy in 3D. Thiết kế, in và đóng gói tại Việt Nam.",
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

export const nav = [
  { href: "/shop", label: "Cửa hàng" },
  { href: "/custom", label: "Tự thiết kế" },
  { href: "/about", label: "Chuyện của tụi em" },
  { href: "/lab", label: "Xưởng in" },
  { href: "/journal", label: "Nhật ký" },
] as const;

export const printer = {
  name: "Anycubic Kobra X",
  nickname: "PRINTER #01",
  buildVolume: "220 × 220 × 250 mm",
  nozzle: "0.4 mm",
  material: "PLA / PLA+ / Silk PLA",
  layerHeights: "0.12 – 0.28 mm",
  commissioned: "Tháng 3, 2025",
} as const;
