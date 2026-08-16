export type CategoryId = "desk" | "toys" | "custom" | "gifts" | "stem";

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "desk", label: "ĐỂ BÀN", blurb: "Đồ giúp cái bàn học gọn gàng hơn." },
  { id: "toys", label: "ĐỒ CHƠI", blurb: "Đồ in ra là cử động, bẻ được, lắc được." },
  { id: "custom", label: "IN TÊN", blurb: "Có tên bạn ở trên đó." },
  { id: "gifts", label: "QUÀ TẶNG", blurb: "Nhỏ, riêng cho một người, in theo đơn." },
  { id: "stem", label: "HỌC", blurb: "Đồ chơi mà chơi xong biết thêm thứ gì đó." },
];

export type FilamentColor = {
  name: string;
  hex: string;
  /** Silk filaments get a subtle sheen in the UI. */
  silk?: boolean;
};

export const filaments: Record<string, FilamentColor> = {
  lava: { name: "Lava Orange", hex: "#ff4a17" },
  carbon: { name: "Carbon Black", hex: "#1c1c22" },
  cloud: { name: "Cloud White", hex: "#f4f2ee" },
  sky: { name: "Sky Blue", hex: "#3fa9f5" },
  lime: { name: "Lime Green", hex: "#c6f24e" },
  sun: { name: "Sunshine Yellow", hex: "#ffc93c" },
  grape: { name: "Grape Purple", hex: "#7b5cf0" },
  mint: { name: "Mint", hex: "#4fd1b3" },
  rose: { name: "Rose", hex: "#f2789f" },
  goldSilk: { name: "Silk Gold", hex: "#d9a441", silk: true },
  silverSilk: { name: "Silk Silver", hex: "#b9bec7", silk: true },
  woodPla: { name: "Wood PLA", hex: "#a97b4f" },
};

export type ProductShape =
  | "nameplate"
  | "stand"
  | "arch"
  | "flexi-dragon"
  | "flexi-octopus"
  | "buddy"
  | "comb"
  | "cylinder"
  | "truck"
  | "animal"
  | "tag"
  | "keyring"
  | "wedge"
  | "puzzle"
  | "giftbox";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameVi: string;
  category: CategoryId;
  price: number;
  /** true when price is a starting point (size / length dependent) */
  from?: boolean;
  shape: ProductShape;
  colors: string[];
  /** 1–5. How hard this one is for the makers to get right. */
  makerRating: number;
  printTime: string;
  material: string;
  size: string;
  weight: string;
  customizable?: boolean;
  badge?: string;
  tagline: string;
  description: string;
  /** A short, honest note from the makers. This is the soul of the shop. */
  makerNote: string;
  madeBy: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "p01",
    slug: "custom-name-plate",
    name: "Custom Name Plate",
    nameVi: "Bảng tên cá nhân",
    category: "custom",
    price: 129000,
    from: true,
    shape: "nameplate",
    colors: ["lava", "carbon", "sky", "lime", "goldSilk", "cloud"],
    makerRating: 3,
    printTime: "2h 40m",
    material: "PLA+",
    size: "Dài theo tên · cao 45mm · dày 12mm",
    weight: "~38g",
    customizable: true,
    badge: "BEST SELLER",
    tagline: "Your name, 12 millimetres thick.",
    description:
      "A solid two-tone desk plate with your name raised off the base. We print the base first, pause the machine, swap the filament, and let the letters finish in a second colour. It stands up on its own and does not slide.",
    makerNote:
      "Bài học đầu tiên của tụi em: chữ 'Ư' và 'Ơ' rất dễ bị dính. Bây giờ tụi em đã in được tiếng Việt có dấu đầy đủ.",
    madeBy: "Designed by Maker #02 · Printed by Maker #01",
    features: [
      "Vietnamese diacritics supported",
      "Two-colour filament swap mid-print",
      "Felt pads on the base",
      "Up to 14 characters at this price",
    ],
  },
  {
    id: "p02",
    slug: "phone-stand",
    name: "Phone Stand",
    nameVi: "Giá đỡ điện thoại",
    category: "desk",
    price: 95000,
    shape: "stand",
    colors: ["carbon", "lava", "cloud", "sky", "silverSilk"],
    makerRating: 2,
    printTime: "1h 55m",
    material: "PLA+",
    size: "78 × 70 × 92 mm",
    weight: "~42g",
    tagline: "Holds your phone at exactly the right angle.",
    description:
      "A single-piece stand with a 62° viewing angle and a channel underneath so the charging cable runs through the back. Tested with cases on — it does not tip when you tap the screen.",
    makerNote:
      "Tụi em thử 4 góc nghiêng khác nhau. Góc 62° là góc duy nhất mà điện thoại không bị đổ khi bấm mạnh.",
    madeBy: "Designed by Maker #02 · Tested by Maker #03",
    features: ["Cable pass-through", "Works with thick cases", "Non-slip base ridges", "62° viewing angle"],
  },
  {
    id: "p03",
    slug: "headphone-stand",
    name: "Headphone Stand",
    nameVi: "Giá treo tai nghe",
    category: "desk",
    price: 189000,
    shape: "arch",
    colors: ["carbon", "cloud", "lava", "grape"],
    makerRating: 4,
    printTime: "6h 10m",
    material: "PLA+",
    size: "120 × 110 × 250 mm",
    weight: "~165g",
    tagline: "An arch that keeps your headband happy.",
    description:
      "A wide, rounded arch that spreads the weight of the headband instead of denting it. The base is weighted with a hidden chamber you can fill with coins or sand so it never topples.",
    makerNote:
      "Đây là sản phẩm khó nhất của tụi em. Ba lần đầu bị gãy ở cổ. Tụi em phải tăng độ dày tường lên 3 lớp.",
    madeBy: "Designed by Maker #01 · Reinforced by Dad",
    features: ["Weighted hidden chamber", "Wide 40mm headband rest", "3-wall reinforced neck", "Cable hook on the side"],
  },
  {
    id: "p04",
    slug: "flexi-dragon",
    name: "Flexi Dragon",
    nameVi: "Rồng khớp nối",
    category: "toys",
    price: 149000,
    shape: "flexi-dragon",
    colors: ["lava", "lime", "grape", "goldSilk", "sky", "carbon"],
    makerRating: 4,
    printTime: "4h 25m",
    material: "PLA",
    size: "240 mm khi duỗi thẳng",
    weight: "~55g",
    badge: "MAKER FAVOURITE",
    tagline: "Printed in one piece. Moves like it was assembled.",
    description:
      "28 linked segments, printed together in a single job with no glue and no screws. It coils around a wrist, a pen or a monitor stand. Print-in-place is the trick every maker wants to learn first.",
    makerNote:
      "Con rồng đầu tiên bị dính hết các khớp. Tụi em phải chỉnh khe hở từ 0.2mm lên 0.3mm mới bẻ được.",
    madeBy: "Printed by Maker #01 · Bent 40 times by Maker #03",
    features: ["Print-in-place, zero assembly", "28 articulated segments", "0.3mm joint clearance", "Fidget-safe, no small loose parts"],
  },
  {
    id: "p05",
    slug: "flexi-octopus",
    name: "Flexi Octopus",
    nameVi: "Bạch tuộc khớp nối",
    category: "toys",
    price: 129000,
    shape: "flexi-octopus",
    colors: ["rose", "sky", "lime", "grape", "sun"],
    makerRating: 3,
    printTime: "3h 05m",
    material: "PLA",
    size: "110 × 110 × 60 mm",
    weight: "~40g",
    tagline: "Eight arms. Zero glue. Six failed attempts.",
    description:
      "Eight independently articulated arms that curl over a desk edge or a bag strap. Small enough to travel, heavy enough to feel like a real object rather than a party favour.",
    makerNote:
      "Bạch tuộc là sản phẩm thất bại nhiều nhất của tụi em — 6 lần hỏng. Tụi em đã viết một bài trong Journal về chuyện này.",
    madeBy: "Rescued by Maker #03 after six failures",
    features: ["8 articulated arms", "Curls over a desk edge", "Sanded contact points", "Ages 4+"],
  },
  {
    id: "p06",
    slug: "desk-buddy",
    name: "Desk Buddy",
    nameVi: "Bạn nhỏ để bàn",
    category: "desk",
    price: 79000,
    shape: "buddy",
    colors: ["lime", "sun", "sky", "lava", "cloud"],
    makerRating: 2,
    printTime: "1h 20m",
    material: "PLA",
    size: "55 × 45 × 70 mm",
    weight: "~22g",
    tagline: "A small character that holds one very important note.",
    description:
      "A rounded little figure with a slot in its arms for a note, a photo, or a business card. It is the first thing all three makers agreed on without arguing.",
    makerNote: "Đây là món đầu tiên tụi em bán được cho một người không phải họ hàng.",
    madeBy: "Designed together by all three makers",
    features: ["Note / card slot", "Prints without supports", "Five personalities in the works", "Fits in a pocket"],
  },
  {
    id: "p07",
    slug: "cable-organizer",
    name: "Cable Organizer",
    nameVi: "Kẹp gom dây",
    category: "desk",
    price: 69000,
    shape: "comb",
    colors: ["carbon", "cloud", "lava", "sky", "lime"],
    makerRating: 1,
    printTime: "45m",
    material: "PLA+",
    size: "90 × 30 × 18 mm",
    weight: "~14g",
    tagline: "Five slots. No more spaghetti behind the desk.",
    description:
      "A weighted comb with five tapered slots that grip cables of different thickness — USB-C, lightning, HDMI and the fat laptop charger. Adhesive pad included.",
    makerNote: "Món dễ in nhất trong shop. Maker #03 in được một mình (Ba vẫn đứng cạnh).",
    madeBy: "Printed solo by Maker #03",
    features: ["5 tapered slots", "3M adhesive pad included", "Sold in packs of 2", "Prints in 45 minutes"],
  },
  {
    id: "p08",
    slug: "pen-holder",
    name: "Pen Holder",
    nameVi: "Ống đựng bút",
    category: "desk",
    price: 115000,
    shape: "cylinder",
    colors: ["cloud", "carbon", "lava", "silverSilk", "woodPla"],
    makerRating: 2,
    printTime: "3h 40m",
    material: "PLA+",
    size: "Ø85 × 100 mm",
    weight: "~90g",
    tagline: "A spiral vase-mode cup that took three tries to get smooth.",
    description:
      "Printed in vase mode — one continuous spiral wall from base to rim, with no seam. The ribbed surface catches the light and hides fingerprints. Heavier than it looks.",
    makerNote: "Vase mode nghĩa là máy in chỉ đi một đường xoắn ốc duy nhất. Không có mối nối nào cả.",
    madeBy: "Sliced by Maker #02 with Dad",
    features: ["Seamless vase-mode spiral", "Ribbed anti-fingerprint wall", "Cork pad under the base", "Also works for brushes"],
  },
  {
    id: "p09",
    slug: "mini-cyber-truck",
    name: "Mini Cyber Truck",
    nameVi: "Xe bán tải mini",
    category: "toys",
    price: 159000,
    shape: "truck",
    colors: ["silverSilk", "carbon", "lava", "lime"],
    makerRating: 4,
    printTime: "5h 15m",
    material: "PLA+",
    size: "150 × 62 × 48 mm",
    weight: "~70g",
    tagline: "Angular, stubborn and it actually rolls.",
    description:
      "Four free-spinning wheels on printed axles, a flat angular body and a tailgate that opens. Printed in two parts so the panel lines stay sharp instead of blobby.",
    makerNote: "Bánh xe quay được là phần khó nhất. Khe hở phải đúng 0.25mm.",
    madeBy: "Designed by Maker #01 · Wheels tuned by Maker #02",
    features: ["4 rolling printed wheels", "Opening tailgate", "Two-part print, sharp edges", "No batteries, ever"],
  },
  {
    id: "p10",
    slug: "animal-figures",
    name: "Animal Figures",
    nameVi: "Bộ thú nhỏ",
    category: "toys",
    price: 99000,
    from: true,
    shape: "animal",
    colors: ["sun", "mint", "rose", "sky", "cloud"],
    makerRating: 2,
    printTime: "1h 10m mỗi con",
    material: "PLA",
    size: "45 – 60 mm cao",
    weight: "~18g mỗi con",
    tagline: "A small herd, printed one at a time.",
    description:
      "Chunky low-poly animals sized for small hands and shelf edges. Buy them singly or as a set of four. Each one prints flat on its base with no supports and no stringy bits to trim.",
    makerNote: "Tụi em chọn kiểu low-poly vì in ra sắc nét hơn và không bị 'lông' như hình tròn.",
    madeBy: "Curated by Maker #03",
    features: ["Low-poly, support-free", "Sold singly or as a set of 4", "Smooth sanded bases", "Ages 3+"],
  },
  {
    id: "p11",
    slug: "bag-tag",
    name: "Bag Tag",
    nameVi: "Thẻ tên hành lý",
    category: "custom",
    price: 59000,
    shape: "tag",
    colors: ["lava", "sky", "lime", "sun", "carbon", "rose"],
    makerRating: 2,
    printTime: "35m",
    material: "PLA+",
    size: "78 × 42 × 5 mm",
    weight: "~9g",
    customizable: true,
    tagline: "So the school bag comes home again.",
    description:
      "A tough two-colour tag with a raised name on the front and space for a phone number on the back. The loop is reinforced — it is the part that always breaks on shop-bought tags.",
    makerNote: "Cái móc là chỗ dễ gãy nhất. Tụi em in thử 3 kiểu móc trước khi chọn kiểu này.",
    madeBy: "Designed by Maker #02",
    features: ["Reinforced loop", "Name front, number back", "Steel split ring included", "Survives a washing machine"],
  },
  {
    id: "p12",
    slug: "keychain",
    name: "Keychain",
    nameVi: "Móc khoá in 3D",
    category: "gifts",
    price: 45000,
    shape: "keyring",
    colors: ["lime", "sky", "lava", "goldSilk", "carbon"],
    makerRating: 1,
    printTime: "25m",
    material: "PLA+",
    size: "50 × 22 × 4 mm",
    weight: "~6g",
    customizable: true,
    tagline: "The cheapest way to hold something we made.",
    description:
      "A small personalised tag on a metal ring. Choose a name, a word, an initial or a tiny icon. This is the product most people buy first, and the one that brings them back.",
    makerNote: "Món này rẻ nhất nhưng dạy tụi em nhiều nhất về giá bán và lợi nhuận.",
    madeBy: "Printed in batches of 12 by Maker #03",
    features: ["Name, word or initial", "Metal split ring", "Batch printed, ships fast", "Great party favour"],
  },
  {
    id: "p13",
    slug: "card-holder",
    name: "Card Holder",
    nameVi: "Kệ đựng danh thiếp",
    category: "desk",
    price: 89000,
    shape: "wedge",
    colors: ["carbon", "cloud", "woodPla", "silverSilk"],
    makerRating: 2,
    printTime: "1h 35m",
    material: "PLA+",
    size: "95 × 55 × 40 mm",
    weight: "~48g",
    tagline: "A quiet wedge for business cards or SD cards.",
    description:
      "A minimal angled wedge with two slots — one wide for cards, one narrow for memory cards or SIM trays. Matte finish, flat bottom, no logo shouting at you.",
    makerNote: "Ba nói kệ này phải 'lịch sự' vì để trên bàn làm việc của người lớn. Tụi em bỏ hết chi tiết vui nhộn.",
    madeBy: "Restrained by Maker #02",
    features: ["Two-slot design", "Matte top surface", "Fits ~40 cards", "Adult-desk approved"],
  },
  {
    id: "p14",
    slug: "puzzle-toy",
    name: "Puzzle Toy",
    nameVi: "Đồ chơi giải đố",
    category: "stem",
    price: 135000,
    shape: "puzzle",
    colors: ["sun", "sky", "lime", "rose", "grape"],
    makerRating: 5,
    printTime: "3h 50m",
    material: "PLA+",
    size: "70 × 70 × 70 mm",
    weight: "~85g",
    badge: "HARDEST TO PRINT",
    tagline: "Six pieces. One solution. A lot of tolerance testing.",
    description:
      "An interlocking burr puzzle where the pieces slide together in exactly one order. Getting printed parts to slide — not jam, not rattle — is the single hardest thing on this shop page.",
    makerNote:
      "Tụi em phải in 11 bộ mới ra bộ đầu tiên lắp vừa. Đây là bài học lớn nhất về dung sai (tolerance).",
    madeBy: "11 failed sets before this one · all three makers",
    features: ["6 interlocking pieces", "0.15mm tolerance, tested", "Solution card included", "Ages 8+ (adults struggle too)"],
  },
  {
    id: "p15",
    slug: "custom-gift-set",
    name: "Custom Gift Set",
    nameVi: "Hộp quà cá nhân hoá",
    category: "gifts",
    price: 289000,
    from: true,
    shape: "giftbox",
    colors: ["lava", "goldSilk", "sky", "rose", "lime"],
    makerRating: 3,
    printTime: "7h 30m",
    material: "PLA+ / Silk PLA",
    size: "Hộp 180 × 120 × 60 mm",
    weight: "~210g",
    customizable: true,
    badge: "GIFT READY",
    tagline: "A name plate, a keychain and a desk buddy in one box.",
    description:
      "Our three most personal prints, matched in one colour family, packed in a printed-lid box with a handwritten card from the makers. Made to order — tell us the name and we will do the rest.",
    makerNote: "Tấm thiệp trong hộp là do tụi em tự viết tay. Mỗi hộp một tấm khác nhau.",
    madeBy: "Packed by all three makers",
    features: [
      "Name plate + keychain + desk buddy",
      "Matched colour family",
      "Handwritten card from the makers",
      "Made to order, 3–5 days",
    ],
  },
];

export const featuredSlugs = ["custom-name-plate", "flexi-dragon", "headphone-stand", "mini-cyber-truck"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, count);
  const sameCategory = products.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = products.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export function priceLabel(product: Product) {
  return product.from ? `Từ ${product.price.toLocaleString("vi-VN")}đ` : `${product.price.toLocaleString("vi-VN")}đ`;
}
