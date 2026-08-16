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
    makerRating: 3,
    printTime: "2h 40m",
    material: "PLA+",
    size: "Dài theo tên · cao 45mm · dày 12mm",
    weight: "~38g",
    customizable: true,
    badge: "BEST SELLER",
    tagline: "Tên của bạn, dày 12 milimét.",
    description:
      "Bảng tên hai màu, chữ nổi hẳn lên khỏi đế. Tụi em in đế trước, dừng máy, đổi cuộn nhựa, rồi để phần chữ in tiếp bằng màu thứ hai. Bảng tự đứng được và không trượt trên bàn.",
    makerNote:
      "Bài học đầu tiên của tụi em: chữ 'Ư' và 'Ơ' rất dễ bị dính. Bây giờ tụi em đã in được tiếng Việt có dấu đầy đủ.",
    madeBy: "Long thiết kế · Hưng in",
    features: [
      "In được tiếng Việt có dấu đầy đủ",
      "Đổi màu nhựa giữa chừng để chữ khác màu đế",
      "Dán nỉ dưới đế",
      "Tối đa 14 ký tự với giá này",
    ],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Cạnh được chà nhám, nhưng vẫn là nhựa cứng — không phải đồ chơi cho bé nhỏ.",
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
    makerRating: 2,
    printTime: "1h 55m",
    material: "PLA+",
    size: "78 × 70 × 92 mm",
    weight: "~42g",
    tagline: "Giữ điện thoại đúng góc nhìn.",
    description:
      "Giá liền khối, nghiêng 62 độ, có rãnh luồn dây sạc ra phía sau. Tụi em đã thử với điện thoại có ốp — bấm mạnh vào màn hình cũng không đổ.",
    makerNote:
      "Tụi em thử 4 góc nghiêng khác nhau. Góc 62° là góc duy nhất mà điện thoại không bị đổ khi bấm mạnh.",
    madeBy: "Long thiết kế · Anh thử",
    features: ["Có rãnh luồn dây sạc", "Dùng được với ốp dày", "Gờ chống trượt dưới đế", "Góc nghiêng 62 độ"],
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
    makerRating: 4,
    printTime: "6h 10m",
    material: "PLA+",
    size: "120 × 110 × 250 mm",
    weight: "~165g",
    tagline: "Vòm đỡ để tai nghe không bị móp.",
    description:
      "Vòm rộng và tròn nên trải đều sức nặng của tai nghe thay vì tạo vết lõm. Đế có khoang rỗng giấu bên trong, đổ xu hoặc cát vào là không bao giờ đổ.",
    makerNote:
      "Đây là sản phẩm khó nhất của tụi em. Ba lần đầu bị gãy ở cổ. Tụi em phải tăng độ dày tường lên 3 lớp.",
    madeBy: "Hưng thiết kế · Ba gia cố",
    features: ["Khoang giấu để tăng trọng lượng", "Chỗ đỡ rộng 40mm", "Cổ gia cố 3 lớp tường", "Móc treo dây bên hông"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Khoang đáy có thể bỏ vật nặng vào — người lớn nên là người làm việc đó.",
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
    makerRating: 4,
    printTime: "4h 25m",
    material: "PLA",
    size: "240 mm khi duỗi thẳng",
    weight: "~55g",
    badge: "MAKER FAVOURITE",
    tagline: "In liền một khối. Vẫn cử động như đồ lắp ráp.",
    description:
      "28 đốt nối nhau, in một lần duy nhất, không keo không ốc. Quấn được quanh cổ tay, cây bút hay chân màn hình. In-liền-khối là kỹ thuật mà ai mới in 3D cũng muốn học đầu tiên.",
    makerNote:
      "Con rồng đầu tiên bị dính hết các khớp. Tụi em phải chỉnh khe hở từ 0.2mm lên 0.3mm mới bẻ được.",
    madeBy: "Hưng in · Anh bẻ thử 40 lần",
    features: ["In liền khối, không phải lắp gì", "28 đốt cử động được", "Khe hở khớp 0,3mm", "Không có mảnh nào tháo rời ra được"],
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
    makerRating: 3,
    printTime: "3h 05m",
    material: "PLA",
    size: "110 × 110 × 60 mm",
    weight: "~40g",
    tagline: "Tám cái tay. Không giọt keo. Sáu lần in hỏng.",
    description:
      "Tám cái tay cử động độc lập, vắt được qua mép bàn hay quai cặp. Đủ nhỏ để mang đi, nhưng cầm lên vẫn thấy chắc tay chứ không hẫng như đồ chơi rẻ tiền.",
    makerNote:
      "Bạch tuộc là sản phẩm thất bại nhiều nhất của tụi em — 6 lần hỏng. Tụi em đã viết một bài trong Journal về chuyện này.",
    madeBy: "Anh cứu được sau 6 lần in hỏng",
    features: ["8 tay cử động được", "Vắt được qua mép bàn", "Các điểm tiếp xúc được chà nhám", "Tám tay in liền một khối"],
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
    makerRating: 2,
    printTime: "1h 20m",
    material: "PLA",
    size: "55 × 45 × 70 mm",
    weight: "~22g",
    tagline: "Bạn nhỏ giữ giùm một tờ giấy quan trọng.",
    description:
      "Một bạn nhỏ tròn trịa, hai tay có khe kẹp để nhét tờ ghi chú, tấm ảnh hay danh thiếp. Đây là món duy nhất cả ba anh em đồng ý ngay mà không cãi nhau.",
    makerNote: "Đây là món đầu tiên tụi em bán được cho một người không phải họ hàng.",
    madeBy: "Cả ba anh em cùng thiết kế",
    features: ["Có khe kẹp giấy", "In không cần chân đỡ", "Đang vẽ thêm 5 tính cách nữa", "Bỏ vừa túi áo"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Cao khoảng 70mm, không có chi tiết rời.",
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
    makerRating: 1,
    printTime: "45m",
    material: "PLA+",
    size: "90 × 30 × 18 mm",
    weight: "~14g",
    tagline: "Năm rãnh. Hết cảnh dây rối như mì.",
    description:
      "Một cái lược có năm rãnh thóp dần, kẹp được dây to nhỏ khác nhau — USB-C, lightning, HDMI và cả cục sạc laptop mập. Có sẵn miếng dán.",
    makerNote: "Món dễ in nhất trong shop. Maker #03 in được một mình (Ba vẫn đứng cạnh).",
    madeBy: "Anh in một mình (Ba vẫn đứng cạnh)",
    features: ["5 rãnh thóp dần", "Kèm miếng dán 3M", "Bán theo cặp 2 cái", "In xong trong 45 phút"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Có keo dán 3M đi kèm — phần dán nên để người lớn làm.",
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
    makerRating: 2,
    printTime: "3h 40m",
    material: "PLA+",
    size: "Ø85 × 100 mm",
    weight: "~90g",
    tagline: "Ống xoắn ốc, in ba lần mới mịn.",
    description:
      "In kiểu vase mode — một đường xoắn ốc duy nhất từ đáy lên miệng, không có mối nối nào. Mặt ngoài có gân nên bắt sáng đẹp và không lộ vân tay. Cầm nặng hơn nhìn.",
    makerNote: "Vase mode nghĩa là máy in chỉ đi một đường xoắn ốc duy nhất. Không có mối nối nào cả.",
    madeBy: "Long cắt lớp cùng Ba",
    features: ["Xoắn ốc liền mạch, không mối nối", "Thành có gân, không lộ vân tay", "Lót bần dưới đáy", "Cắm cọ vẽ cũng được"],
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
    makerRating: 4,
    printTime: "5h 15m",
    material: "PLA+",
    size: "150 × 62 × 48 mm",
    weight: "~70g",
    tagline: "Góc cạnh, lì lợm, và chạy được thật.",
    description:
      "Bốn bánh quay tự do trên trục in sẵn, thân xe phẳng góc cạnh, thùng sau mở được. In làm hai phần để các đường viền sắc nét chứ không bị nhoè.",
    makerNote: "Bánh xe quay được là phần khó nhất. Khe hở phải đúng 0.25mm.",
    madeBy: "Hưng thiết kế · Long chỉnh bánh xe",
    features: ["4 bánh in sẵn, lăn được", "Thùng sau mở ra được", "In hai phần nên cạnh sắc", "Không pin, không sạc"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Bánh xe quay được nhưng không tháo rời. In hai phần, ghép chặt.",
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
    makerRating: 2,
    printTime: "1h 10m mỗi con",
    material: "PLA",
    size: "45 – 60 mm cao",
    weight: "~18g mỗi con",
    tagline: "Một đàn thú nhỏ, in từng con một.",
    description:
      "Mấy con thú low-poly mập mạp, vừa tay cầm và vừa mép kệ. Mua lẻ từng con hoặc trọn bộ bốn con. Con nào cũng in đứng thẳng trên đáy, không cần chân đỡ và không có sợi nhựa thừa phải cắt.",
    makerNote: "Tụi em chọn kiểu low-poly vì in ra sắc nét hơn và không bị 'lông' như hình tròn.",
    madeBy: "Anh chọn mẫu",
    features: ["Kiểu low-poly, in không cần chân đỡ", "Bán lẻ hoặc trọn bộ 4 con", "Đáy được chà nhám phẳng"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Cao 45–60mm và không có chi tiết rời, nhưng cả con vẫn đủ nhỏ để bé dưới 3 tuổi cho vào miệng — người lớn cân nhắc trước khi mua cho bé nhỏ.",
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
    makerRating: 2,
    printTime: "35m",
    material: "PLA+",
    size: "78 × 42 × 5 mm",
    weight: "~9g",
    customizable: true,
    tagline: "Để cái cặp còn biết đường về nhà.",
    description:
      "Thẻ hai màu chắc chắn, mặt trước chữ nổi, mặt sau chừa chỗ ghi số điện thoại. Cái móc được gia cố — vì đó chính là chỗ hay gãy nhất ở thẻ mua ngoài tiệm.",
    makerNote: "Cái móc là chỗ dễ gãy nhất. Tụi em in thử 3 kiểu móc trước khi chọn kiểu này.",
    madeBy: "Long thiết kế",
    features: ["Móc được gia cố", "Tên mặt trước, số mặt sau", "Kèm khoen sắt", "Đã thử giặt máy một lần, thẻ không sao"],
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
    makerRating: 1,
    printTime: "25m",
    material: "PLA+",
    size: "50 × 22 × 4 mm",
    weight: "~6g",
    customizable: true,
    tagline: "Cách rẻ nhất để cầm một món tụi em làm.",
    description:
      "Một cái thẻ nhỏ in riêng, gắn khoen sắt. Chọn một cái tên, một chữ, một chữ cái đầu hoặc một hình nhỏ. Đây là món nhiều người mua đầu tiên nhất, và cũng là món kéo họ quay lại.",
    makerNote: "Món này rẻ nhất nhưng dạy tụi em nhiều nhất về giá bán và lợi nhuận.",
    madeBy: "Anh in theo lô 12 cái",
    features: ["In tên, một chữ hoặc chữ cái đầu", "Kèm khoen sắt", "In theo lô nên gửi nhanh", "Làm quà sinh nhật rất hợp"],
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
    makerRating: 2,
    printTime: "1h 35m",
    material: "PLA+",
    size: "95 × 55 × 40 mm",
    weight: "~48g",
    tagline: "Cái nêm nhỏ, đựng danh thiếp hoặc thẻ nhớ.",
    description:
      "Một khối nêm nghiêng tối giản với hai khe — khe rộng đựng danh thiếp, khe hẹp đựng thẻ nhớ hoặc khay SIM. Bề mặt nhám, đáy phẳng, không có logo nào chình ình.",
    makerNote: "Ba nói kệ này phải 'lịch sự' vì để trên bàn làm việc của người lớn. Tụi em bỏ hết chi tiết vui nhộn.",
    madeBy: "Long thiết kế, cố tình làm cho đơn giản",
    features: ["Thiết kế hai khe", "Mặt trên nhám", "Đựng khoảng 40 tấm", "Đủ lịch sự cho bàn làm việc"],
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
    makerRating: 5,
    printTime: "3h 50m",
    material: "PLA+",
    size: "70 × 70 × 70 mm",
    weight: "~85g",
    badge: "HARDEST TO PRINT",
    tagline: "Sáu mảnh. Một lời giải. Rất nhiều lần đo lại.",
    description:
      "Một bộ đố gỗ kiểu khoá nhau, các mảnh chỉ ráp vừa theo đúng một thứ tự duy nhất. Làm cho các mảnh in ra trượt được — không kẹt, không lỏng lẻo — là thứ khó nhất trong cả cửa hàng này.",
    makerNote:
      "Tụi em phải in 11 bộ mới ra bộ đầu tiên lắp vừa. Đây là bài học lớn nhất về dung sai (tolerance).",
    madeBy: "11 bộ hỏng mới ra bộ này · cả ba anh em",
    features: ["6 mảnh khoá vào nhau", "Dung sai 0,15mm, đã thử kỹ", "Kèm tờ hướng dẫn giải", "Người lớn giải cũng toát mồ hôi"],
    safety: [
      "Nhựa PLA mềm đi ở khoảng 60°C — đừng để trong xe đóng kín hoặc ngoài nắng gắt.",
      "Gồm 6 mảnh rời, mỗi mảnh nhỏ — không hợp cho bé dưới 3 tuổi.",
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
    makerRating: 3,
    printTime: "7h 30m",
    material: "PLA+ / Silk PLA",
    size: "Hộp 180 × 120 × 60 mm",
    weight: "~210g",
    customizable: true,
    badge: "GIFT READY",
    tagline: "Bảng tên, móc khoá và bạn nhỏ trong một hộp.",
    description:
      "Ba món cá nhân nhất của tụi em, phối cùng một tông màu, đóng trong hộp có nắp in sẵn kèm tấm thiệp viết tay. Làm theo đơn — bạn cho tụi em cái tên, phần còn lại tụi em lo.",
    makerNote: "Tấm thiệp trong hộp là do tụi em tự viết tay. Mỗi hộp một tấm khác nhau.",
    madeBy: "Ba anh em cùng đóng gói",
    features: [
      "Bảng tên + móc khoá + bạn nhỏ để bàn",
      "Phối cùng một tông màu",
      "Kèm thiệp do ba anh em viết tay",
      "Làm theo đơn, 3–5 ngày",
    ],
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
