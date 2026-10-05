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
    "Lớp tiếng Việt, toán và tiếng Anh miễn phí của ba anh em Hưng (8), Long (6) và Anh (5) — học theo lối nhà học Do Thái. Lúc rảnh, ba anh em in 3D để học, không bán gì.",
  founded: 2025,
  city: "Việt Nam",
} as const;

/**
 * Everything a visitor might go looking for. The footer lists all of it.
 */
export const nav = [
  { href: "/hom-nay", label: "Hôm nay học gì" },
  { href: "/hoc-tieng-viet", label: "Tiếng Việt" },
  { href: "/hoc-toan", label: "Toán" },
  { href: "/hoc-tieng-anh", label: "Tiếng Anh" },
  { href: "/goc-in-3d", label: "Góc in 3D" },
  { href: "/about", label: "Chuyện của tụi em" },
] as const;

/** The header row. "Hôm nay học gì" has the header button to itself. */
export const navPrimary = nav.filter(
  (item) => item.href !== "/hom-nay",
);
