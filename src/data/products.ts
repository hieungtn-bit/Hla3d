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
  lava: { name: "Cam núi lửa", hex: "#ff4a17" },
  carbon: { name: "Đen", hex: "#1c1c22" },
  cloud: { name: "Trắng mây", hex: "#f4f2ee" },
  sky: { name: "Xanh da trời", hex: "#3fa9f5" },
  lime: { name: "Xanh lá", hex: "#c6f24e" },
  sun: { name: "Vàng nắng", hex: "#ffc93c" },
  grape: { name: "Tím nho", hex: "#7b5cf0" },
  mint: { name: "Xanh bạc hà", hex: "#4fd1b3" },
  rose: { name: "Hồng", hex: "#f2789f" },
  goldSilk: { name: "Vàng ánh kim", hex: "#d9a441", silk: true },
  silverSilk: { name: "Bạc ánh kim", hex: "#b9bec7", silk: true },
  woodPla: { name: "Vân gỗ", hex: "#a97b4f" },
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

export type ModelSource = {
  /** The designer's name exactly as MakerWorld shows it. */
  designer: string;
  /** The model's MakerWorld page. */
  url: string;
  /** The licence shown on that page, e.g. "CC BY 4.0". */
  license: string;
};

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
  material: string;
  customizable?: boolean;
  badge?: string;
  tagline: string;
  description: string;
  /**
   * Where the 3D model came from. The brothers do not design models yet: they
   * find them on MakerWorld and print them. Fill this in from the model's page
   * — the designer's name, the link, and the licence shown there — so the
   * designer is credited. Leave it out until it is known; never guess it.
   */
  source?: ModelSource;
  features: string[];
  /**
   * A caution, not a certification: true where the object or something in the
   * box is small enough to be a choking risk. Derived from `safety`, kept as a
   * field so the gift finder never has to parse prose to protect a toddler.
   */
  notForUnder3: boolean;
  /** Something a child plays with, as opposed to a desk object for an adult. */
  isToy: boolean;
  /**
   * Factual cautions only. We do not hold any toy-safety certification, so
   * nothing here may read as one — no "child-safe", no certified age rating,
   * no food-safe claim. State what the object physically is and let the
   * parent decide.
   */
  safety: string[];
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
    material: "PLA+",
    customizable: true,
    tagline: "Tên của bạn, chữ nổi trên đế.",
    description:
      "Bảng tên chữ nổi trên đế, để đứng trên bàn học. Bạn cho tên, tụi em in tên đó ra.",
    features: [
      "Chữ nổi trên đế",
      "Chọn màu nhựa",
      "Tên có dấu: tụi em đọc lại tên với bạn trước khi in",
      "Tên dài thì hỏi giá trước",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Nhựa cứng, có cạnh — không phải đồ chơi cho bé nhỏ.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
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
    material: "PLA+",
    tagline: "Giữ điện thoại đứng nghiêng trên bàn.",
    description:
      "Giá đỡ liền một khối để điện thoại đứng nghiêng khi xem video hay gọi video.",
    features: [
      "Liền một khối",
      "Để điện thoại đứng nghiêng",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Đồ để bàn, không phải đồ chơi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Chỗ treo tai nghe trên bàn.",
    description:
      "Giá treo tai nghe chụp tai, đặt trên bàn để tai nghe có chỗ để thay vì nằm lăn lóc.",
    features: [
      "Treo tai nghe chụp tai",
      "Đồ để bàn",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Đồ để bàn, không phải đồ chơi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA",
    tagline: "In liền một khối mà vẫn cử động.",
    description:
      "Rồng khớp nối kiểu in-liền-khối: máy in ra một lần là các đốt đã nối sẵn với nhau, không keo, không ốc. Bẻ cong, quấn quanh cổ tay hay cây bút được.",
    features: [
      "In liền khối, không phải lắp gì",
      "Các đốt cử động được",
      "Không có mảnh tháo rời",
    ],
    notForUnder3: true,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "In liền khối, không có mảnh rời. Bẻ quá mạnh thì khớp có thể gãy và tạo mảnh nhỏ.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA",
    tagline: "Tám cái tay cử động được.",
    description:
      "Bạch tuộc khớp nối in liền một khối, tám tay cử động được, vắt được qua mép bàn hay quai cặp.",
    features: [
      "8 tay cử động được",
      "In liền một khối",
      "Vắt được qua mép bàn",
    ],
    notForUnder3: false,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Tám tay in liền, không tháo rời được. Người lớn nên ngồi cùng khi bé dưới 3 tuổi chơi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA",
    tagline: "Bạn nhỏ giữ giùm một tờ giấy.",
    description:
      "Một bạn nhỏ để bàn có khe kẹp tờ ghi chú hoặc tấm ảnh nhỏ.",
    features: [
      "Có khe kẹp giấy",
      "Không có chi tiết rời",
    ],
    notForUnder3: false,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Không có chi tiết rời.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Gom dây sạc cho bàn đỡ rối.",
    description:
      "Kẹp gom dây có nhiều rãnh, giữ dây sạc và dây tai nghe nằm gọn ở mép bàn.",
    features: [
      "Nhiều rãnh giữ dây",
      "Đồ để bàn",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Nếu cần dán lên bàn, người lớn nên dán giúp.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Ống đựng bút in kiểu xoắn ốc.",
    description:
      "Ống đựng bút in kiểu vase mode: máy in đi một đường xoắn ốc liên tục từ đáy lên miệng, nên thành ống liền một mạch.",
    features: [
      "Thành ống liền một đường in",
      "Đựng bút, cọ vẽ",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Thành ống mỏng, rơi mạnh có thể nứt.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Xe bán tải mini, bánh lăn được.",
    description:
      "Xe bán tải nhỏ kiểu góc cạnh, bánh xe lăn được trên bàn.",
    features: [
      "Bánh xe lăn được",
      "Không pin, không sạc",
    ],
    notForUnder3: true,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Có bánh xe nhỏ — không hợp cho bé dưới 3 tuổi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA",
    tagline: "Một đàn thú nhỏ kiểu low-poly.",
    description:
      "Thú nhỏ kiểu low-poly — mặt phẳng, góc cạnh — vừa tay cầm, để trên kệ hay bàn học. Mua lẻ từng con hoặc cả bộ.",
    features: [
      "Kiểu low-poly",
      "Mua lẻ hoặc cả bộ",
    ],
    notForUnder3: true,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Không có chi tiết rời, nhưng cả con vẫn đủ nhỏ để bé dưới 3 tuổi cho vào miệng — người lớn cân nhắc trước khi mua cho bé nhỏ.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    customizable: true,
    tagline: "Để cái cặp còn biết đường về nhà.",
    description:
      "Thẻ tên đeo cặp hoặc vali, mặt trước in tên, có khoen để móc vào quai.",
    features: [
      "In tên",
      "Kèm khoen móc",
    ],
    notForUnder3: true,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Đi kèm khoen sắt rời — người lớn nên lắp giúp.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    customizable: true,
    tagline: "Món nhỏ, giá nhỏ.",
    description:
      "Móc khoá in tên, một chữ hoặc chữ cái đầu, gắn khoen sắt.",
    features: [
      "In tên, một chữ hoặc chữ cái đầu",
      "Kèm khoen sắt",
    ],
    notForUnder3: true,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Đi kèm khoen sắt rời, là chi tiết nhỏ. Không phải đồ chơi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Kệ nhỏ đựng danh thiếp.",
    description:
      "Kệ hình nêm nhỏ để danh thiếp đứng gọn trên bàn làm việc.",
    features: [
      "Đựng danh thiếp",
      "Đồ để bàn cho người lớn",
    ],
    notForUnder3: false,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Đồ để bàn cho người lớn, không phải đồ chơi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+",
    tagline: "Mấy mảnh khoá vào nhau. Một lời giải.",
    description:
      "Đồ chơi giải đố kiểu khoá liên kết: các mảnh chỉ ráp vừa theo đúng một thứ tự. Hợp cho bé lớn và người lớn thích thử thách.",
    features: [
      "Các mảnh khoá vào nhau",
      "Hợp cho bé lớn thích thử thách",
    ],
    notForUnder3: true,
    isToy: true,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Gồm nhiều mảnh rời nhỏ — không hợp cho bé dưới 3 tuổi.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
    ],
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
    material: "PLA+ / Silk PLA",
    customizable: true,
    badge: "SẴN SÀNG LÀM QUÀ",
    tagline: "Bảng tên, móc khoá và bạn nhỏ trong một hộp.",
    description:
      "Ba món — bảng tên, móc khoá và bạn nhỏ để bàn — phối cùng một tông màu, đóng chung một hộp. Bạn cho tên người nhận, tụi em in.",
    features: [
      "Bảng tên + móc khoá + bạn nhỏ để bàn",
      "Phối cùng một tông màu",
      "Làm theo đơn",
    ],
    notForUnder3: true,
    isToy: false,
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Trong hộp có móc khoá kèm khoen sắt rời — chi tiết nhỏ.",
      "Tụi em tự in tại nhà, chưa có chứng nhận an toàn đồ chơi nào.",
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
