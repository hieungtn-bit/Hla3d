/**
 * The words the Tiếng Việt lessons are built from.
 *
 * Written for this site. Everyday words a five-to-eight-year-old in Vietnam
 * already says, chosen so that each exercise has exactly one right answer:
 * where a picture could mean two words (a basket is both "rổ" and "giỏ") the
 * word is left out of that exercise rather than argued about.
 *
 * Nothing here states a tone. Tones are computed from the spelling in
 * phonology.ts, and the test suite checks every entry against the rules it
 * is used to teach.
 */

/* ---------------------------------------------------------------------------
   Syllables, split into âm đầu + vần. Tone is not stored — it is read off
   the spelling. The picture is for learners who cannot read yet.
   --------------------------------------------------------------------------- */
export type Syllable = readonly [word: string, onset: string, rime: string, picture: string];

export const SYLLABLES: readonly Syllable[] = [
  ["bà", "b", "a", "👵"],
  ["bé", "b", "e", "👶"],
  ["bò", "b", "o", "🐄"],
  ["bố", "b", "ô", "👨"],
  ["bút", "b", "ut", "✏️"],
  ["bóng", "b", "ong", "⚽"],
  ["bánh", "b", "anh", "🍰"],
  ["cá", "c", "a", "🐟"],
  ["cỏ", "c", "o", "🌿"],
  ["cô", "c", "ô", "👩‍🏫"],
  ["cờ", "c", "ơ", "🚩"],
  ["cam", "c", "am", "🍊"],
  ["cành", "c", "anh", "🌿"],
  ["chó", "ch", "o", "🐶"],
  ["chợ", "ch", "ơ", "🏬"],
  ["chim", "ch", "im", "🐦"],
  ["chuối", "ch", "uôi", "🍌"],
  ["dê", "d", "ê", "🐐"],
  ["dưa", "d", "ưa", "🍉"],
  ["đỏ", "đ", "o", "🔴"],
  ["đèn", "đ", "en", "💡"],
  ["gà", "g", "a", "🐔"],
  ["gỗ", "g", "ô", "🪵"],
  ["gấu", "g", "âu", "🐻"],
  ["ghế", "gh", "ê", "🪑"],
  ["ghẹ", "gh", "e", "🦀"],
  ["giỏ", "gi", "o", "🧺"],
  ["hổ", "h", "ô", "🐯"],
  ["hoa", "h", "oa", "🌸"],
  ["học", "h", "oc", "📖"],
  ["kem", "k", "em", "🍦"],
  ["kéo", "k", "eo", "✂️"],
  ["kẹo", "k", "eo", "🍬"],
  ["kính", "k", "inh", "👓"],
  ["khỉ", "kh", "i", "🐵"],
  ["lá", "l", "a", "🍃"],
  ["lê", "l", "ê", "🍐"],
  ["lợn", "l", "ơn", "🐷"],
  ["lúa", "l", "ua", "🌾"],
  ["mẹ", "m", "e", "👩"],
  ["mũ", "m", "u", "🧢"],
  ["mèo", "m", "eo", "🐱"],
  ["mắt", "m", "ăt", "👁️"],
  ["mưa", "m", "ưa", "🌧️"],
  ["nơ", "n", "ơ", "🎀"],
  ["nón", "n", "on", "👒"],
  ["nhà", "nh", "a", "🏠"],
  ["nhện", "nh", "ên", "🕷️"],
  ["ngô", "ng", "ô", "🌽"],
  ["ngủ", "ng", "u", "😴"],
  ["ngựa", "ng", "ưa", "🐴"],
  ["nghé", "ngh", "e", "🐃"],
  ["nghỉ", "ngh", "i", "😌"],
  ["phố", "ph", "ô", "🏙️"],
  ["phở", "ph", "ơ", "🍜"],
  ["quà", "qu", "a", "🎁"],
  ["quê", "qu", "ê", "🏡"],
  ["rùa", "r", "ua", "🐢"],
  ["sẻ", "s", "e", "🐦"],
  ["sách", "s", "ach", "📚"],
  ["sông", "s", "ông", "🏞️"],
  ["sữa", "s", "ưa", "🥛"],
  ["tủ", "t", "u", "🗄️"],
  ["tôm", "t", "ôm", "🦐"],
  ["thỏ", "th", "o", "🐰"],
  ["thơ", "th", "ơ", "📜"],
  ["trà", "tr", "a", "🍵"],
  ["trống", "tr", "ông", "🥁"],
  ["trứng", "tr", "ưng", "🥚"],
  ["vở", "v", "ơ", "📓"],
  ["vẽ", "v", "e", "🎨"],
  ["vịt", "v", "it", "🦆"],
  ["xe", "x", "e", "🚗"],
  ["xôi", "x", "ôi", "🍚"],
  ["ăn", "", "ăn", "🍽️"],
  ["ổi", "", "ôi", "🍈"],
];

/* ---------------------------------------------------------------------------
   Âm đầu from a picture — mẫu giáo. Single-letter onsets only, and the wrong
   choices are letters that LOOK alike but SOUND different, never the same
   sound spelt another way. A child who only hears "kem" cannot know it is k
   and not c; asking them to guess that would be asking a question with no
   fair answer.
   --------------------------------------------------------------------------- */
export const PICTURE_ONSETS: readonly (readonly [word: string, picture: string])[] = [
  ["cá", "🐟"], ["gà", "🐔"], ["bò", "🐄"], ["mèo", "🐱"], ["dê", "🐐"], ["đèn", "💡"],
  ["hổ", "🐯"], ["lá", "🍃"], ["nơ", "🎀"], ["rùa", "🐢"], ["sữa", "🥛"], ["tôm", "🦐"],
  ["vịt", "🦆"], ["xe", "🚗"], ["kem", "🍦"], ["hoa", "🌸"], ["bút", "✏️"], ["mũ", "🧢"],
  ["lợn", "🐷"], ["voi", "🐘"], ["sao", "⭐"], ["táo", "🍎"], ["dưa", "🍉"], ["gấu", "🐻"],
  ["đũa", "🥢"], ["tay", "✋"], ["mắt", "👁️"], ["nến", "🕯️"], ["cua", "🦀"], ["lê", "🍐"],
];

/** Look-alike letters that never share a sound with the key. */
export const ONSET_DISTRACTORS: Record<string, readonly string[]> = {
  b: ["d", "p", "đ"],
  c: ["e", "o", "x"],
  d: ["b", "đ", "p"],
  đ: ["d", "b", "p"],
  g: ["q", "y", "p"],
  h: ["k", "n", "b"],
  k: ["h", "x", "l"],
  l: ["t", "i", "h"],
  m: ["n", "h", "u"],
  n: ["m", "u", "h"],
  r: ["n", "v", "b"],
  s: ["c", "r", "v"],
  t: ["l", "đ", "i"],
  v: ["u", "y", "b"],
  x: ["k", "v", "c"],
};

/* ---------------------------------------------------------------------------
   Letters. The 29 of the Vietnamese alphabet, and for each the three it is
   most often mistaken for by eye.
   --------------------------------------------------------------------------- */
export const ALPHABET = [
  "a", "ă", "â", "b", "c", "d", "đ", "e", "ê", "g", "h", "i", "k", "l", "m",
  "n", "o", "ô", "ơ", "p", "q", "r", "s", "t", "u", "ư", "v", "x", "y",
] as const;

export const LOOKALIKE: Record<string, readonly string[]> = {
  a: ["ă", "â", "o"], ă: ["a", "â", "ơ"], â: ["a", "ă", "ô"],
  b: ["d", "p", "đ"], c: ["e", "o", "x"], d: ["b", "đ", "q"], đ: ["d", "b", "p"],
  e: ["ê", "c", "o"], ê: ["e", "ô", "â"], g: ["q", "y", "p"], h: ["k", "n", "b"],
  i: ["l", "t", "y"], k: ["h", "x", "l"], l: ["i", "t", "h"], m: ["n", "h", "u"],
  n: ["m", "u", "h"], o: ["ô", "ơ", "a"], ô: ["o", "ơ", "ê"], ơ: ["o", "ô", "ư"],
  p: ["q", "b", "d"], q: ["p", "g", "d"], r: ["n", "v", "s"], s: ["x", "c", "r"],
  t: ["l", "đ", "i"], u: ["ư", "n", "v"], ư: ["u", "ơ", "n"], v: ["u", "y", "r"],
  x: ["s", "k", "v"], y: ["v", "g", "i"],
};

/** What to look at to tell a letter from its look-alikes. */
export const LETTER_HINT: Record<string, string> = {
  a: "a không đội mũ, ă đội mũ cong như cái bát, â đội mũ nhọn.",
  ă: "ă đội cái mũ cong như cái bát úp ngược.",
  â: "â đội cái mũ nhọn như mái nhà.",
  b: "b có cái bụng tròn quay sang phải, que dựng lên trên.",
  d: "d có cái bụng tròn quay sang trái, que dựng lên trên.",
  đ: "đ giống d nhưng có thêm một gạch ngang ở que.",
  p: "p có bụng quay sang phải, que thò xuống dưới.",
  q: "q có bụng quay sang trái, que thò xuống dưới.",
  o: "o tròn trơn, không đội gì trên đầu.",
  ô: "ô đội cái mũ nhọn như mái nhà.",
  ơ: "ơ có cái râu nhỏ ở bên phải.",
  u: "u trơn, không có râu.",
  ư: "ư có cái râu nhỏ ở bên phải, trên đầu.",
  e: "e không đội mũ.",
  ê: "ê đội cái mũ nhọn.",
  m: "m có hai cái cầu, n chỉ có một.",
  n: "n có một cái cầu, m có hai.",
};

/* ---------------------------------------------------------------------------
   c / k / q, g / gh, ng / ngh — the rule-governed spellings.
   Stored as the whole word; the exercise blanks the onset.
   --------------------------------------------------------------------------- */
export type SpellItem = readonly [word: string, onset: string, picture: string];

export const CKQ: readonly SpellItem[] = [
  ["cá", "c", "🐟"], ["cỏ", "c", "🌿"], ["cờ", "c", "🚩"], ["cam", "c", "🍊"], ["cua", "c", "🦀"],
  ["cú", "c", "🦉"], ["cây", "c", "🌳"], ["cơm", "c", "🍚"], ["cửa", "c", "🚪"], ["cốc", "c", "🥛"],
  ["kem", "k", "🍦"], ["kéo", "k", "✂️"], ["kẹo", "k", "🍬"], ["kính", "k", "👓"], ["kiến", "k", "🐜"],
  ["kẻ", "k", "📏"], ["quà", "qu", "🎁"], ["quả", "qu", "🍎"], ["quê", "qu", "🏡"],
  ["quần", "qu", "👖"], ["quạ", "qu", "🐦‍⬛"],
];

export const GGH: readonly SpellItem[] = [
  ["gà", "g", "🐔"], ["gỗ", "g", "🪵"], ["gấu", "g", "🐻"], ["gạo", "g", "🍚"], ["gối", "g", "🛏️"],
  ["gương", "g", "🪞"], ["ghế", "gh", "🪑"], ["ghi", "gh", "✍️"], ["ghẹ", "gh", "🦀"],
  ["ghim", "gh", "📌"], ["ghe", "gh", "⛵"],
  ["ngô", "ng", "🌽"], ["ngủ", "ng", "😴"], ["ngựa", "ng", "🐴"], ["ngón", "ng", "👆"],
  ["nghé", "ngh", "🐃"], ["nghe", "ngh", "👂"], ["nghỉ", "ngh", "😌"], ["nghĩ", "ngh", "🤔"],
];

/* ---------------------------------------------------------------------------
   s/x, tr/ch, d/gi/r — no rule decides these, only memory and a few tricks.
   A word is either a single word with a picture, or a từ láy where both
   syllables share the onset (which is what the "láy" trick relies on).
   --------------------------------------------------------------------------- */
export type LexItem = readonly [word: string, onset: string, picture: string];

export const SX: readonly LexItem[] = [
  ["sách", "s", "📚"], ["sao", "s", "⭐"], ["sữa", "s", "🥛"], ["sông", "s", "🏞️"], ["sóc", "s", "🐿️"],
  ["sư tử", "s", "🦁"], ["sen", "s", "🪷"], ["sò", "s", "🐚"], ["sấm", "s", "⛈️"],
  ["xe", "x", "🚗"], ["xôi", "x", "🍚"], ["xoài", "x", "🥭"], ["xương", "x", "🦴"], ["xà phòng", "x", "🧼"],
  ["xô", "x", "🪣"], ["xiếc", "x", "🎪"],
  ["sạch sẽ", "s", "✨"], ["sáng sủa", "s", "☀️"], ["xinh xắn", "x", "🎀"], ["xa xôi", "x", "🗺️"],
];

export const TRCH: readonly LexItem[] = [
  ["trâu", "tr", "🐃"], ["trống", "tr", "🥁"], ["trăng", "tr", "🌙"], ["trời", "tr", "☀️"], ["trà", "tr", "🍵"],
  ["trứng", "tr", "🥚"], ["tre", "tr", "🎋"], ["tranh", "tr", "🖼️"], ["trường", "tr", "🏫"],
  ["chó", "ch", "🐶"], ["chim", "ch", "🐦"], ["chuối", "ch", "🍌"], ["cháo", "ch", "🥣"], ["chanh", "ch", "🍋"],
  ["chổi", "ch", "🧹"], ["chân", "ch", "🦶"], ["chợ", "ch", "🏬"], ["chuột", "ch", "🐭"],
  ["chăm chỉ", "ch", "📖"], ["chông chênh", "ch", "🪜"], ["trong trẻo", "tr", "💧"], ["trơ trọi", "tr", "🌵"],
];

export const DGIR: readonly LexItem[] = [
  ["dê", "d", "🐐"], ["dưa", "d", "🍉"], ["dép", "d", "🩴"], ["dừa", "d", "🥥"], ["dây", "d", "🪢"],
  ["giày", "gi", "👟"], ["gió", "gi", "💨"], ["giường", "gi", "🛏️"], ["giấy", "gi", "📄"], ["gián", "gi", "🪳"],
  ["rùa", "r", "🐢"], ["rau", "r", "🥬"], ["rồng", "r", "🐉"], ["rắn", "r", "🐍"], ["ruồi", "r", "🪰"],
  ["dịu dàng", "d", "🌸"], ["giòn giã", "gi", "🍘"], ["rì rào", "r", "🌊"], ["rộn ràng", "r", "🎉"],
];

/* ---------------------------------------------------------------------------
   hỏi / ngã in từ láy. Every pair here follows the rule
     huyền, nặng, ngã  →  ngã      ngang, sắc, hỏi  →  hỏi
   and the test suite checks that. Known exceptions (nhỏ nhẹ) are kept out of
   the drill and put in the kushia instead, where arguing about them is the
   point.
   `blank` is which syllable the child fills in.
   --------------------------------------------------------------------------- */
export type LayItem = readonly [first: string, second: string, blank: 0 | 1];

export const LAY_HOI_NGA: readonly LayItem[] = [
  ["vui", "vẻ", 1], ["sạch", "sẽ", 1], ["mạnh", "mẽ", 1], ["lặng", "lẽ", 1], ["rõ", "ràng", 0],
  ["dễ", "dàng", 0], ["nghĩ", "ngợi", 0], ["sẵn", "sàng", 0], ["vững", "vàng", 0], ["đẹp", "đẽ", 1],
  ["mỏng", "manh", 0], ["nhỏ", "nhắn", 0], ["thỏ", "thẻ", 1], ["mải", "miết", 0], ["hớn", "hở", 1],
  ["vất", "vả", 1], ["rộn", "rã", 1], ["vội", "vã", 1], ["ngổn", "ngang", 0], ["vẻ", "vang", 0],
  ["nghỉ", "ngơi", 0], ["mỉa", "mai", 0], ["bẽn", "lẽn", 1], ["lững", "thững", 1], ["rủ", "rỉ", 1],
];

/* ---------------------------------------------------------------------------
   Word classes. Only words that sit in one class in everyday use — no "cày",
   which is both the plough and the ploughing.
   --------------------------------------------------------------------------- */
export const WORD_CLASS: Record<"sự vật" | "hoạt động" | "đặc điểm", readonly string[]> = {
  "sự vật": [
    "cái bàn", "con mèo", "cây bàng", "bác sĩ", "quyển sách", "bông hoa", "dòng sông", "mặt trời",
    "cái bút", "ngôi nhà", "học sinh", "con đường", "chiếc lá", "cô giáo", "máy in",
  ],
  "hoạt động": [
    "chạy", "nhảy", "đọc", "viết", "hát", "ăn", "ngủ", "bơi", "quét nhà", "tưới cây", "học bài",
    "đá bóng", "nấu cơm", "múa", "vẽ tranh",
  ],
  "đặc điểm": [
    "đỏ", "xanh", "cao", "thấp", "to", "nhỏ", "đẹp", "chăm chỉ", "ngoan", "nhanh", "chậm", "hiền",
    "dũng cảm", "thơm", "ngọt", "tròn",
  ],
};

/* ---------------------------------------------------------------------------
   Sentences. Each is unambiguous on its own, without intonation to help.
   --------------------------------------------------------------------------- */
export const END_MARK: readonly (readonly [sentence: string, mark: "." | "?" | "!"])[] = [
  ["Bạn tên là gì", "?"], ["Nhà bạn ở đâu", "?"], ["Bạn có thích ăn kem không", "?"],
  ["Vì sao trời lại mưa", "?"], ["Ai đã vẽ bức tranh này", "?"], ["Bạn đi đâu đấy", "?"],
  ["Mấy giờ rồi hả mẹ", "?"],
  ["Hôm nay em đi học", "."], ["Con mèo đang ngủ trên ghế", "."], ["Mẹ em là giáo viên", "."],
  ["Em thích đọc truyện", "."], ["Bố đang sửa xe đạp", "."], ["Chúng em trồng cây ở sân trường", "."],
  ["Trời hôm nay nắng đẹp", "."],
  ["Ôi, bông hoa đẹp quá", "!"], ["Chà, cái bánh ngon quá", "!"], ["Hoan hô, đội mình thắng rồi", "!"],
  ["Ồ, cầu vồng kìa", "!"], ["Cẩn thận, xe đến đấy", "!"],
];

export type SentenceKind = "Ai là gì?" | "Ai làm gì?" | "Ai thế nào?";

export const SENTENCE_KIND: readonly (readonly [sentence: string, kind: SentenceKind])[] = [
  ["Mẹ em là giáo viên.", "Ai là gì?"], ["Bố em là bác sĩ.", "Ai là gì?"],
  ["Mèo là con vật nuôi trong nhà.", "Ai là gì?"], ["Hà Nội là thủ đô của nước ta.", "Ai là gì?"],
  ["Em là học sinh lớp ba.", "Ai là gì?"], ["Mùa xuân là mùa của hoa.", "Ai là gì?"],
  ["Bác nông dân đang cày ruộng.", "Ai làm gì?"], ["Chim sơn ca hót trên cành cây.", "Ai làm gì?"],
  ["Các bạn học sinh quét sân trường.", "Ai làm gì?"], ["Bà em kể chuyện cổ tích.", "Ai làm gì?"],
  ["Đàn cá bơi dưới hồ.", "Ai làm gì?"], ["Anh Hưng in một chú rồng nhỏ.", "Ai làm gì?"],
  ["Bông hoa hồng rất thơm.", "Ai thế nào?"], ["Bầu trời mùa thu xanh ngắt.", "Ai thế nào?"],
  ["Chú mèo nhà em rất lười.", "Ai thế nào?"], ["Dòng sông quê em rất rộng.", "Ai thế nào?"],
  ["Cô giáo em rất hiền.", "Ai thế nào?"], ["Anh trai em rất chăm chỉ.", "Ai thế nào?"],
];

/** So sánh: the sentence, what is compared, what it is compared to, and three wrong picks. */
export const SIMILE: readonly (readonly [sentence: string, subject: string, image: string, wrong: readonly string[]])[] = [
  ["Trăng tròn như quả bóng.", "Trăng", "quả bóng", ["trăng", "tròn", "như"]],
  ["Mặt trời đỏ như quả cầu lửa.", "Mặt trời", "quả cầu lửa", ["mặt trời", "đỏ", "như"]],
  ["Mắt bé sáng như sao.", "Mắt bé", "sao", ["mắt bé", "sáng", "như"]],
  ["Những chiếc lá bàng đỏ như ngọn lửa.", "Lá bàng", "ngọn lửa", ["chiếc lá bàng", "đỏ", "như"]],
  ["Tóc bà trắng như bông.", "Tóc bà", "bông", ["tóc bà", "trắng", "như"]],
  ["Cánh diều như con chim bay trên trời.", "Cánh diều", "con chim", ["cánh diều", "trời", "bay"]],
  ["Chiếc thuyền nhỏ như chiếc lá trôi trên sông.", "Chiếc thuyền", "chiếc lá", ["chiếc thuyền", "sông", "trôi"]],
  ["Hai má bé đỏ như quả táo.", "Hai má bé", "quả táo", ["hai má bé", "đỏ", "như"]],
  ["Mặt hồ phẳng lặng tựa tấm gương.", "Mặt hồ", "tấm gương", ["mặt hồ", "phẳng lặng", "tựa"]],
  ["Cây bàng già giống như chiếc ô khổng lồ.", "Cây bàng già", "chiếc ô khổng lồ", ["cây bàng già", "khổng lồ", "giống như"]],
  ["Quả dưa hấu to tựa cái trống.", "Quả dưa hấu", "cái trống", ["quả dưa hấu", "to", "tựa"]],
  ["Bé ngủ ngon như con mèo con.", "Bé", "con mèo con", ["bé", "ngủ ngon", "như"]],
];

/** Nhân hoá: the sentence, the thing given a person's life, and three wrong picks. */
export const PERSONIFY: readonly (readonly [sentence: string, thing: string, wrong: readonly string[]])[] = [
  ["Ông mặt trời thức dậy sau rặng tre.", "mặt trời", ["ông", "rặng tre", "thức dậy"]],
  ["Chị gió chạy nhảy khắp cánh đồng.", "gió", ["chị", "cánh đồng", "chạy nhảy"]],
  ["Bác cây bàng đứng im lặng giữa sân trường.", "cây bàng", ["bác", "sân trường", "đứng im lặng"]],
  ["Những giọt mưa nhảy nhót trên mái nhà.", "giọt mưa", ["mái nhà", "nhảy nhót", "những"]],
  ["Cô chổi rơm chăm chỉ quét nhà.", "chổi rơm", ["cô", "nhà", "chăm chỉ"]],
  ["Chú gà trống gọi mọi người thức dậy.", "gà trống", ["chú", "mọi người", "gọi"]],
  ["Bông hoa mỉm cười chào buổi sáng.", "bông hoa", ["buổi sáng", "mỉm cười", "chào"]],
  ["Chiếc đồng hồ chăm chỉ làm việc suốt ngày đêm.", "đồng hồ", ["ngày đêm", "chăm chỉ", "làm việc"]],
  ["Dòng sông mải miết chạy về biển.", "dòng sông", ["biển", "mải miết", "chạy"]],
  ["Ông trăng tròn nhìn em qua cửa sổ.", "trăng", ["ông", "em", "cửa sổ"]],
  ["Cái máy in chăm chỉ làm việc cả đêm.", "máy in", ["cái", "cả đêm", "chăm chỉ"]],
];

/* ---------------------------------------------------------------------------
   Opposites, grouped by what they measure. Wrong choices are always drawn
   from a DIFFERENT group, so no wrong choice can also be a fair opposite.
   --------------------------------------------------------------------------- */
export const OPPOSITES: Record<string, readonly (readonly [string, string])[]> = {
  "kích thước": [["cao", "thấp"], ["dài", "ngắn"], ["rộng", "hẹp"], ["béo", "gầy"], ["nặng", "nhẹ"]],
  "nhiệt độ, ánh sáng": [["nóng", "lạnh"], ["sáng", "tối"]],
  "tốc độ": [["nhanh", "chậm"]],
  "tính nết, cảm xúc": [["vui", "buồn"], ["chăm chỉ", "lười biếng"], ["dũng cảm", "hèn nhát"], ["hiền", "dữ"]],
  "vị trí, hướng": [["trên", "dưới"], ["trước", "sau"], ["lên", "xuống"], ["xa", "gần"]],
  "tình trạng": [["mới", "cũ"], ["sạch", "bẩn"], ["đúng", "sai"], ["cứng", "mềm"], ["khô", "ướt"], ["đầy", "vơi"], ["mở", "đóng"]],
  "vị": [["ngọt", "đắng"]],
};

/* ---------------------------------------------------------------------------
   Same meaning. Half of these are the same thing named differently in the
   North and the South — which is the most useful thing a child can learn
   about synonyms, and the kindest: neither word is the wrong one.
   --------------------------------------------------------------------------- */
export const SYNONYMS: readonly (readonly [string, string, string?])[] = [
  ["chăm chỉ", "siêng năng"],
  ["dũng cảm", "gan dạ"],
  ["to lớn", "khổng lồ"],
  ["im lặng", "yên lặng"],
  ["thông minh", "sáng dạ"],
  ["xinh", "đẹp"],
  ["ngô", "bắp", "Miền Bắc nói ngô, miền Nam nói bắp."],
  ["lợn", "heo", "Miền Bắc nói lợn, miền Nam nói heo."],
  ["thìa", "muỗng", "Miền Bắc nói thìa, miền Nam nói muỗng."],
  ["bát", "chén", "Miền Bắc nói bát, miền Nam nói chén."],
  ["quả", "trái", "Miền Bắc nói quả, miền Nam nói trái."],
  ["bố", "ba", "Nhà này gọi là Ba, nhiều nhà gọi là Bố — cùng một người."],
  ["mẹ", "má", "Nhiều nhà miền Nam gọi mẹ là má."],
  ["vừng", "mè", "Miền Bắc nói vừng, miền Nam nói mè."],
  ["hoa", "bông", "Miền Nam hay gọi hoa là bông."],
];

/** Ai? / Làm gì? — subject, predicate, and one tempting wrong split. */
export const SUBJ_PRED: readonly (readonly [sentence: string, subject: string, predicate: string, noun: string, slip: string])[] = [
  ["Đàn cá bơi dưới hồ.", "Đàn cá", "bơi dưới hồ", "hồ", "Đàn cá bơi"],
  ["Bà em kể chuyện cổ tích.", "Bà em", "kể chuyện cổ tích", "chuyện cổ tích", "Bà em kể"],
  ["Con mèo đang ngủ trên ghế.", "Con mèo", "đang ngủ trên ghế", "ghế", "Con mèo đang ngủ"],
  ["Các bạn học sinh quét sân trường.", "Các bạn học sinh", "quét sân trường", "sân trường", "Các bạn học sinh quét"],
  ["Mẹ em nấu cơm.", "Mẹ em", "nấu cơm", "cơm", "Mẹ em nấu"],
  ["Những chú chim hót trên cành.", "Những chú chim", "hót trên cành", "cành", "Những chú chim hót"],
  ["Anh Hưng in một chú rồng nhỏ.", "Anh Hưng", "in một chú rồng nhỏ", "chú rồng nhỏ", "Anh Hưng in"],
  ["Long vẽ một con bạch tuộc.", "Long", "vẽ một con bạch tuộc", "con bạch tuộc", "Long vẽ"],
  ["Bé Anh xếp những khối gỗ.", "Bé Anh", "xếp những khối gỗ", "những khối gỗ", "Bé Anh xếp"],
  ["Chú bộ đội đứng gác ở biên giới.", "Chú bộ đội", "đứng gác ở biên giới", "biên giới", "Chú bộ đội đứng gác"],
];

/* ---------------------------------------------------------------------------
   Added with lessons 21–24.
   --------------------------------------------------------------------------- */

/**
 * Vỗ tay đếm tiếng: a word or phrase and its picture. In Vietnamese writing
 * every tiếng is separated by a space, so the count is the number of words —
 * the test suite counts them independently.
 */
export const CLAP_WORDS: readonly (readonly [phrase: string, picture: string])[] = [
  ["cá", "🐟"], ["gà", "🐔"], ["mèo", "🐱"], ["hoa", "🌸"], ["sao", "⭐"], ["voi", "🐘"], ["trăng", "🌙"],
  ["con mèo", "🐱"], ["máy bay", "✈️"], ["xe đạp", "🚲"], ["quả táo", "🍎"], ["cầu vồng", "🌈"],
  ["cá heo", "🐬"], ["dưa hấu", "🍉"], ["ô tô", "🚗"], ["bông hoa", "🌸"],
  ["con cá vàng", "🐠"], ["xe cứu hoả", "🚒"], ["con bạch tuộc", "🐙"], ["quả dưa hấu", "🍉"],
  ["bánh sinh nhật", "🎂"], ["kem ốc quế", "🍦"], ["ông mặt trời", "☀️"], ["chiếc ô tô", "🚗"],
  ["con chim bồ câu", "🕊️"], ["con chim cánh cụt", "🐧"], ["máy bay trực thăng", "🚁"],
  ["chiếc xe cứu hoả", "🚒"], ["cây kem ốc quế", "🍦"],
];

/**
 * Vần an hay ang, at hay ac: one-syllable words whose last sound is n, ng,
 * t or c, with a picture that fixes the meaning. `pair` is set when swapping
 * the last letter gives another real word — the lesson names it, because
 * that is exactly the mix-up worth explaining.
 */
export type FinalItem = readonly [word: string, final: "n" | "ng" | "t" | "c", picture: string, pair?: string];
export const FINALS: readonly FinalItem[] = [
  ["đèn", "n", "💡"], ["nến", "n", "🕯️"], ["lợn", "n", "🐷"], ["chân", "n", "🦶"], ["sen", "n", "🪷"],
  ["trăn", "n", "🐍", "trăng là mặt trăng"], ["nhện", "n", "🕷️"], ["giun", "n", "🪱"], ["khăn", "n", "🧣"],
  ["trăng", "ng", "🌙", "trăn là con trăn"], ["ong", "ng", "🐝"], ["bóng", "ng", "⚽", "bón là bón phân cho cây"],
  ["trống", "ng", "🥁", "trốn là trốn tìm"], ["chuông", "ng", "🔔"], ["trứng", "ng", "🥚"], ["rồng", "ng", "🐉"],
  ["sóng", "ng", "🌊"], ["răng", "ng", "🦷"],
  ["mắt", "t", "👁️", "mắc là mắc áo"], ["bút", "t", "✏️"], ["ớt", "t", "🌶️"],
  ["bát", "t", "🥣", "bác là anh hoặc chị của bố mẹ"], ["tất", "t", "🧦"], ["vợt", "t", "🏸"],
  ["hạt", "t", "🌰", "hạc là con chim hạc"], ["cát", "t", "🏖️", "các là “các bạn”"],
  ["sóc", "c", "🐿️", "sót là bỏ sót"], ["ốc", "c", "🐌"], ["mực", "c", "🦑"], ["lạc", "c", "🥜", "lạt là sợi lạt buộc bánh chưng"],
  ["nhạc", "c", "🎵", "nhạt là ăn nhạt, ít muối"], ["thóc", "c", "🌾"],
];

/** The other spelling a child is likely to write for each final. */
export const FINAL_PARTNER: Record<FinalItem[1], FinalItem[1]> = { n: "ng", ng: "n", t: "c", c: "t" };

/**
 * Viết hoa tên riêng: a sentence with a gap, and the name that fills it.
 * `generic` is the common word in front of a geographical name — sông, hồ,
 * núi — or a title in front of a person — cô, chú, bạn. It stays lower-case;
 * every syllable of the name itself is capitalised.
 */
export const PROPER_NAMES: readonly (readonly [sentence: string, generic: string, name: string])[] = [
  ["Nhà ông bà em ở ___.", "", "Hà Nội"],
  ["Hè này cả nhà em đi ___.", "", "Đà Nẵng"],
  ["Cô giáo kể cho em nghe về ___.", "", "Huế"],
  ["Chú em làm việc ở ___.", "", "Cần Thơ"],
  ["Cả lớp em đi tham quan ___.", "", "Hạ Long"],
  ["Bà ngoại em sống ở ___.", "", "Hải Phòng"],
  ["Mùa đông, ở ___ có sương mù.", "", "Sa Pa"],
  ["Dì em vừa đi ___ về.", "", "Nha Trang"],
  ["Em được bố cho đi thuyền trên ___.", "sông", "Hồng"],
  ["Thành phố Huế nằm bên ___.", "sông", "Hương"],
  ["Ông dẫn em đi dạo quanh ___.", "hồ", "Gươm"],
  ["Sáng chủ nhật, cả nhà em đi bộ quanh ___.", "hồ", "Tây"],
  ["Em được nghe kể về ___ ở Tây Ninh.", "núi", "Bà Đen"],
  ["Lớp em có bạn ___ mới chuyển đến.", "bạn", "Mai"],
  ["Hôm nay ___ dạy cả lớp hát.", "cô", "Lan"],
  ["Em gửi thư cho ___ ở quê.", "chú", "Tư"],
  ["Cô giáo gọi ___ lên bảng.", "bạn", "Trần Bảo Ngọc"],
  ["Em ngồi cạnh ___.", "bạn", "Lê Gia Huy"],
  ["Tên đầy đủ của mẹ em là ___.", "", "Phạm Thu Hà"],
];

/**
 * Dấu phẩy: a list of things of the same kind, after a lead-in that has no
 * comma of its own. The lesson puts a gap between two neighbours, before
 * "và", or straight after the lead-in.
 */
export const COMMA_LISTS: readonly (readonly [lead: string, items: readonly string[]])[] = [
  ["Vườn nhà em có", ["cam", "xoài", "bưởi", "chuối"]],
  ["Trong hộp bút của em có", ["bút chì", "thước kẻ", "tẩy", "bút màu"]],
  ["Ở sở thú có", ["voi", "hổ", "khỉ", "hươu cao cổ"]],
  ["Cầu vồng có màu", ["đỏ", "cam", "vàng", "lục", "lam", "chàm", "tím"]],
  ["Bữa sáng em ăn", ["bánh mì", "trứng", "sữa"]],
  ["Em thích", ["vẽ tranh", "đá bóng", "đọc truyện"]],
  ["Trên bàn học có", ["sách", "vở", "đèn bàn"]],
  ["Bà trồng", ["rau cải", "cà chua", "hành lá", "mướp"]],
  ["Trong rừng có", ["sóc", "khỉ", "nai", "chim"]],
  ["Mẹ đi chợ mua", ["cá", "rau", "thịt", "đậu phụ"]],
];
