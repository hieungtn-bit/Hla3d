import type { VietSkill } from "./types";
import { blankOnset, pickOne, vItem } from "./helpers";
import {
  TONE_SAMPLE,
  placeTone,
  stopFinal,
  stripTone,
  toneOf,
  vowelCount,
  type Tone,
} from "./phonology";
import {
  ALPHABET,
  CKQ,
  GGH,
  LETTER_HINT,
  LOOKALIKE,
  ONSET_DISTRACTORS,
  PICTURE_ONSETS,
  SYLLABLES,
} from "./banks";

/** The tones most often mistaken for each other — the wrong answers worth offering. */
const TONE_CONFUSION: Record<Tone, Tone[]> = {
  ngang: ["huyền", "sắc", "nặng"],
  huyền: ["ngang", "sắc", "nặng"],
  sắc: ["hỏi", "huyền", "nặng"],
  hỏi: ["ngã", "sắc", "nặng"],
  ngã: ["hỏi", "sắc", "huyền"],
  nặng: ["hỏi", "ngã", "huyền"],
};

const toneLabel = (t: Tone) => `${t} (${TONE_SAMPLE[t]})`;

/** Onsets a child confuses with each one, by sound or by spelling. */
const ONSET_SIBLINGS: Record<string, string[]> = {
  b: ["đ", "p"], c: ["k", "ch"], ch: ["c", "tr"], d: ["đ", "gi"], đ: ["d", "b"],
  g: ["gh", "gi"], gh: ["g", "ngh"], gi: ["g", "d"], h: ["kh", "th"], k: ["c", "kh"],
  kh: ["k", "h"], l: ["n", "đ"], m: ["n", "b"], n: ["nh", "ng"], nh: ["n", "ng"],
  ng: ["ngh", "n"], ngh: ["ng", "nh"], ph: ["p", "h"], qu: ["q", "c"], r: ["d", "gi"],
  s: ["x", "th"], t: ["th", "tr"], th: ["t", "h"], tr: ["t", "ch"], v: ["b", "ph"], x: ["s", "ch"],
};

/** Groups of letters a young eye mixes up; every item is drawn from one group. */
const FAMILIES: readonly string[][] = [
  ["b", "d", "p", "q"],
  ["o", "ô", "ơ", "a"],
  ["a", "ă", "â", "o"],
  ["u", "ư", "n", "v"],
  ["e", "ê", "c", "o"],
  ["d", "đ", "b", "q"],
  ["m", "n", "h", "u"],
  ["g", "q", "y", "p"],
];

const COMPOSABLE = SYLLABLES.filter(([, on, rime]) => on && vowelCount(rime) === 1 && !stopFinal(rime));

/** Mẫu giáo lớn (Anh, 5 tuổi) and Lớp 1 (Long, 6 tuổi). */
export const skillsA: VietSkill[] = [
  {
    id: "tim-chu-giong",
    level: "mau-giao",
    order: 1,
    title: "Tìm chữ giống hệt",
    summary: "Nhìn thật kỹ để thấy o, ô, ơ khác nhau ở cái mũ nhỏ trên đầu.",
    hook: "Chữ o, ô và ơ trông gần giống nhau. Vậy mắt mình phải nhìn vào chỗ nào để biết chữ nào là chữ nào?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Nhìn cái mũ trên đầu chữ",
        steps: [
          "o không đội gì cả.",
          "ô đội cái mũ nhọn như mái nhà.",
          "ơ có cái râu nhỏ ở bên phải.",
          "a, ă, â cũng vậy: ă đội mũ cong như cái bát, â đội mũ nhọn.",
        ],
      },
      {
        name: "Nhìn cái bụng quay về đâu",
        steps: [
          "b có bụng tròn quay sang phải, que dựng lên trên.",
          "d có bụng quay sang trái, que dựng lên trên.",
          "p và q cũng thế, nhưng que thò xuống dưới.",
        ],
      },
    ],
    kushia:
      "Viết chữ b lên giấy rồi xoay ngược tờ giấy lại. Nó thành chữ gì? Còn chữ d xoay ngược thì thành chữ gì?",
    make: (rand) => {
      const family = pickOne(rand, FAMILIES);
      const target = pickOne(rand, family);
      return vItem({
        prompt: "Tìm chữ giống hệt chữ này",
        show: target,
        answer: target,
        wrong: family.filter((l) => l !== target),
        because: LETTER_HINT[target] ?? `Đúng là chữ “${target}”.`,
      });
    },
  },
  {
    id: "chu-hoa-thuong",
    level: "mau-giao",
    order: 2,
    title: "Chữ hoa và chữ thường",
    summary: "Mỗi chữ có hai kiểu viết: chữ to đầu câu và chữ nhỏ thường ngày.",
    hook: "Tên của em luôn viết hoa chữ đầu. Nhưng chữ A hoa và chữ a thường trông khác hẳn nhau — làm sao biết chúng là cùng một chữ?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Nhiều chữ chỉ to lên thôi",
        steps: [
          "C và c, O và o, S và s, V và v, X và x: chữ hoa chỉ là chữ thường phóng to.",
          "Mấy chữ này dễ nhất, học trước.",
        ],
      },
      {
        name: "Mấy chữ đổi hình hẳn",
        steps: [
          "A và a, B và b, D và d, G và g, Q và q, R và r trông khác hẳn nhau.",
          "Mấy chữ này phải thuộc từng cặp.",
          "Đọc to cả cặp: A hoa — a thường.",
        ],
      },
      {
        name: "Mũ và râu thì giữ nguyên",
        steps: [
          "Ô hoa vẫn đội mũ, Ơ hoa vẫn có râu, Đ hoa vẫn có gạch ngang.",
          "Nhìn cái mũ, cái râu là biết ngay chữ nào.",
        ],
      },
    ],
    kushia:
      "Tên người phải viết hoa. Vậy tên con mèo nhà em thì sao — có viết hoa không? Còn chữ “con mèo” thì sao?",
    make: (rand) => {
      const lower = pickOne(rand, ALPHABET);
      const toLower = rand() < 0.5;
      const look = LOOKALIKE[lower];
      return vItem({
        prompt: toLower ? "Chữ thường của chữ này là chữ nào?" : "Chữ hoa của chữ này là chữ nào?",
        show: toLower ? lower.toUpperCase() : lower,
        answer: toLower ? lower : lower.toUpperCase(),
        wrong: look.map((l) => (toLower ? l : l.toUpperCase())),
        because: `${lower.toUpperCase()} hoa và ${lower} thường là cùng một chữ.${LETTER_HINT[lower] ? " " + LETTER_HINT[lower] : ""}`,
      });
    },
  },
  {
    id: "am-dau-hinh",
    level: "mau-giao",
    order: 3,
    title: "Tiếng bắt đầu bằng chữ gì",
    summary: "Nghe tên con vật, đồ vật rồi tìm chữ đứng đầu.",
    hook: "Con cá, cái cốc, cái cây — đọc to ba tiếng này lên. Ở đầu mỗi tiếng, miệng em làm cùng một việc. Đó là việc gì?",
    methodNoun: "cách làm",
    autoSay: true,
    methods: [
      {
        name: "Kéo dài âm đầu",
        steps: [
          "Đọc thật chậm và kéo dài âm đầu: mmm… mèo, sss… sữa.",
          "Âm nghe được đầu tiên chính là chữ đứng đầu.",
          "Chữ nào không kéo dài được như b, c, t thì đọc lặp thật nhanh: c-c-cá.",
        ],
      },
      {
        name: "Nghĩ tới một tiếng khác",
        steps: [
          "Nghĩ một tiếng khác bắt đầu giống vậy: cá — cam — cây.",
          "Nếu em đã biết “cam” viết bằng c, thì “cá” cũng bắt đầu bằng c.",
        ],
      },
    ],
    kushia:
      "Con cá và cái kéo nghe đầu giống hệt nhau, nhưng một tiếng viết c, một tiếng viết k. Vậy chỉ nghe thôi có đủ để biết viết chữ gì không?",
    make: (rand) => {
      const [word, picture] = pickOne(rand, PICTURE_ONSETS);
      const onset = word[0];
      return vItem({
        prompt: "Nghe rồi chọn chữ đứng đầu",
        picture,
        say: word,
        answer: onset,
        wrong: ONSET_DISTRACTORS[onset],
        because: `“${word}” bắt đầu bằng chữ ${onset}.`,
      });
    },
  },
  {
    id: "thanh-dieu",
    level: "lop1",
    order: 4,
    title: "Sáu thanh điệu",
    summary: "Không dấu, huyền, sắc, hỏi, ngã, nặng — nhìn dấu mà gọi đúng tên.",
    hook: "Ma, mà, má, mả, mã, mạ — sáu tiếng này chỉ khác nhau đúng một cái dấu nhỏ xíu, vậy mà nghĩa khác hẳn. Làm sao một cái dấu nhỏ lại quan trọng đến thế?",
    methodNoun: "cách nhớ",
    autoSay: true,
    methods: [
      {
        name: "Nhìn hình cái dấu",
        steps: [
          "Huyền nghiêng xuống từ trái sang phải: à.",
          "Sắc nghiêng lên, ngược với huyền: á.",
          "Hỏi giống cái móc câu, như dấu hỏi không có chấm: ả.",
          "Ngã là đường lượn sóng: ã.",
          "Nặng là cái chấm nằm dưới chữ: ạ.",
        ],
      },
      {
        name: "Đọc thuộc cả dãy",
        steps: [
          "Đọc to thuộc lòng: a — à — á — ả — ã — ạ.",
          "Gặp tiếng lạ thì đem dấu của nó so với dãy này.",
          "Tiếng không có dấu nào là thanh ngang.",
        ],
      },
      {
        name: "Nghe giọng lên hay xuống",
        steps: [
          "Sắc thì giọng đi lên, huyền thì giọng đi xuống.",
          "Nặng thì giọng rơi xuống thật nhanh rồi dừng lại.",
          "Hỏi và ngã khó nghe nhất — nhiều vùng đọc hai dấu này giống nhau, nên phải nhìn dấu.",
        ],
      },
    ],
    kushia:
      "Tiếng “học” có dấu nặng, tiếng “hóc” có dấu sắc. Thử đặt dấu huyền lên xem — “hòc” đọc được không? Vì sao tiếng kết thúc bằng c, t, p, ch chỉ đi với dấu sắc và dấu nặng?",
    make: (rand) => {
      const [word, , , picture] = pickOne(rand, SYLLABLES);
      const tone = toneOf(word);
      return vItem({
        prompt: "Tiếng này mang thanh gì?",
        show: word,
        picture,
        say: word,
        answer: toneLabel(tone),
        wrong: TONE_CONFUSION[tone].map(toneLabel),
        because:
          tone === "ngang"
            ? `“${word}” không có dấu nào nên mang thanh ngang.`
            : `“${word}” có dấu ${tone}, giống như ${TONE_SAMPLE[tone]} trong dãy a — à — á — ả — ã — ạ.`,
      });
    },
  },
  {
    id: "ghep-tieng",
    level: "lop1",
    order: 5,
    title: "Ghép tiếng",
    summary: "Âm đầu + vần + dấu thanh = một tiếng. Đánh vần chính là ghép như vậy.",
    hook: "Chữ b, chữ a và một cái dấu huyền — ba mảnh rời nhau. Ghép lại thì đọc thành tiếng gì? Và nếu đổi sang dấu khác thì sao?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Đánh vần thành tiếng",
        steps: [
          "Đọc từng mảnh: bờ — a — ba.",
          "Rồi thêm dấu: ba — huyền — bà.",
          "Đánh vần to lên để tai kiểm tra giùm mắt.",
        ],
      },
      {
        name: "Ghép vần trước, đặt dấu sau",
        steps: [
          "Ghép âm đầu với vần trước: b + a = ba.",
          "Có “ba” rồi mới đặt dấu lên: bà.",
          "Dấu luôn nằm trên (hoặc dưới) chữ cái nguyên âm, không bao giờ nằm trên b, n hay ng.",
        ],
      },
    ],
    kushia:
      "Dấu được đặt lên chữ nào trong tiếng? Thử với “bàn”, “bóng”, “kính” — vì sao dấu không bao giờ nằm trên chữ b, chữ n hay chữ ng?",
    make: (rand) => {
      const [word, onset, rime] = pickOne(rand, COMPOSABLE);
      const tone = toneOf(word);
      return vItem({
        prompt: tone === "ngang" ? "Không thêm dấu nào thì đọc thành tiếng gì?" : `Thêm dấu ${tone} thì thành tiếng nào?`,
        show: `${onset} + ${rime}`,
        answer: word,
        wrong: TONE_CONFUSION[tone].map((t) => placeTone(onset, rime, t)),
        because:
          tone === "ngang"
            ? `${onset} + ${rime} = ${onset}${rime}, không có dấu nên đọc là “${word}”.`
            : `${onset} + ${rime} = ${onset}${rime}, thêm dấu ${tone} thành “${word}”.`,
      });
    },
  },
  {
    id: "am-dau-van",
    level: "lop1",
    order: 6,
    title: "Âm đầu và vần",
    summary: "Tách một tiếng thành âm đầu và vần. nh, ng, ch, tr là một âm, dù viết bằng hai chữ.",
    hook: "Tiếng “nhà” có ba chữ cái: n, h, a. Vậy âm đầu của nó là n, hay là nh?",
    methodNoun: "cách làm",
    autoSay: true,
    methods: [
      {
        name: "Thuộc các âm viết nhiều chữ",
        steps: [
          "Có âm viết bằng hai chữ: ch, gh, gi, kh, ng, nh, ph, qu, th, tr.",
          "Có một âm viết bằng ba chữ: ngh.",
          "Gặp mấy nhóm này thì coi cả nhóm là một âm đầu.",
        ],
      },
      {
        name: "Lấy tay che vần",
        steps: [
          "Lấy ngón tay che phần vần ở cuối.",
          "Phần còn lại phía trước là âm đầu.",
          "Che hết mà không còn gì — như “ăn”, “ổi” — thì tiếng đó không có âm đầu.",
        ],
      },
      {
        name: "Để dấu ra ngoài",
        steps: [
          "Khi tách vần thì bỏ dấu ra riêng: “mèo” có vần eo, dấu huyền.",
          "Dấu là một phần riêng, không nằm trong vần.",
        ],
      },
    ],
    kushia:
      "Tiếng “ăn” không có âm đầu. Em tìm thêm ba tiếng nữa cũng không có âm đầu. Chúng có điểm gì giống nhau?",
    make: (rand) => {
      const [word, onset, rime, picture] = pickOne(rand, SYLLABLES);
      const tone = toneOf(word);
      const whole = stripTone(word);
      const toned = word.slice(onset.length);
      // A syllable with no onset ("ăn", "ổi") is its own vần, so asking for the
      // vần would just ask the child to copy the word. The useful question is
      // the one the method teaches: is there an âm đầu at all?
      if (!onset) {
        return vItem({
          prompt: "Âm đầu của tiếng này là gì?",
          show: word,
          picture,
          say: word,
          answer: "không có âm đầu",
          wrong: [[...word][0], whole, [...whole].slice(-1).join("")],
          because: `“${word}” mở đầu bằng nguyên âm, che vần “${rime}” đi thì không còn gì — nên không có âm đầu.`,
        });
      }
      if (rand() < 0.5) {
        return vItem({
          prompt: "Âm đầu của tiếng này là gì?",
          show: word,
          picture,
          say: word,
          answer: onset,
          wrong: [...(onset.length > 1 ? [onset[0]] : []), ...(ONSET_SIBLINGS[onset] ?? []), whole],
          because: `“${word}” = ${onset} + ${rime}${tone === "ngang" ? "" : " + dấu " + tone}. Âm đầu là ${onset}${
            onset.length > 1 ? " — viết bằng " + onset.length + " chữ nhưng chỉ là một âm" : ""
          }.`,
        });
      }
      const other = pickOne(
        rand,
        SYLLABLES.filter(([, , r]) => r !== rime),
      )[2];
      return vItem({
        prompt: "Vần của tiếng này là gì? (không tính dấu)",
        show: word,
        picture,
        say: word,
        answer: rime,
        wrong: [toned !== rime ? toned : "", whole !== rime ? whole : "", [...rime].length > 1 ? [...rime].slice(0, -1).join("") : "", other],
        because: `“${word}” = ${onset ? onset + " + " : ""}${rime}${tone === "ngang" ? "" : " + dấu " + tone}. Vần là ${rime}${
          tone === "ngang" ? "" : " — dấu " + tone + " để riêng, không tính vào vần"
        }.`,
      });
    },
  },
  {
    id: "c-k-q",
    level: "lop1",
    order: 7,
    title: "c, k hay q",
    summary: "Ba chữ cùng đọc là “cờ”. Chọn chữ nào là do chữ đứng ngay sau.",
    hook: "Cá, kẹo, quà — ba tiếng này đầu đều đọc giống nhau. Vậy sao lại viết bằng ba chữ khác nhau? Có phải chọn bừa không?",
    methodNoun: "cách nhớ",
    autoSay: true,
    methods: [
      {
        name: "Nhìn chữ đứng sau",
        steps: [
          "Sau đó là i, e hoặc ê → viết k: kem, kẹo, kính.",
          "Đọc như “quờ” → viết q, và q luôn đi với u: quà, quạt.",
          "Còn lại → viết c: cá, cỏ, cua.",
        ],
      },
      {
        name: "Câu thần chú",
        steps: [
          "Đọc thuộc: “K đi với i, e, ê. Q đi với u. Còn lại là C.”",
          "Luật này đúng với mọi từ, không có ngoại lệ.",
        ],
      },
    ],
    kushia:
      "Con cua và món quà: sau chữ đầu đều là u. Vậy sao cua viết c mà quà viết qu? Đọc thật chậm hai tiếng này xem miệng em có làm khác nhau không.",
    make: (rand) => {
      const [word, onset, picture] = pickOne(rand, CKQ);
      const letter = onset === "qu" ? "q" : onset;
      const rest = word.slice(1);
      const next = [...rest][0];
      const because =
        letter === "k"
          ? `Sau chỗ trống là “${next}” — gặp i, e, ê thì viết k: ${word}.`
          : letter === "q"
            ? `Đọc như “quờ” nên viết q, và q luôn đi cùng u: ${word}.`
            : next === "u"
              ? `Trước u có thể là c (cua) hoặc qu (quà). Ở đây đọc là “${word}”, không có tiếng “quờ”, nên viết c.`
              : `Sau chỗ trống là “${next}”, không phải i, e, ê, nên viết c: ${word}.`;
      return vItem({
        prompt: "Điền c, k hay q?",
        show: blankOnset(word, letter),
        picture,
        say: word,
        answer: letter,
        wrong: ["c", "k", "q"].filter((l) => l !== letter),
        because,
      });
    },
  },
  {
    id: "g-gh-ng-ngh",
    level: "lop1",
    order: 8,
    title: "g hay gh, ng hay ngh",
    summary: "Cùng một luật với c và k: gặp i, e, ê thì thêm chữ h.",
    hook: "Gà viết g, ghế lại viết gh. Ngô viết ng, nghé lại viết ngh. Luật này em đã gặp ở bài nào rồi nhỉ?",
    methodNoun: "cách nhớ",
    autoSay: true,
    methods: [
      {
        name: "Luật i, e, ê",
        steps: [
          "Trước i, e, ê thì viết gh và ngh: ghế, ghi, nghé, nghe.",
          "Trước các chữ khác thì viết g và ng: gà, gỗ, ngô, ngủ.",
          "Y hệt luật c và k — ba cặp, một luật.",
        ],
      },
      {
        name: "Chữ h là cái mũ bảo hiểm",
        steps: [
          "Coi chữ h như cái mũ bảo hiểm.",
          "i, e, ê là ba chữ “nguy hiểm” — gặp chúng thì phải đội mũ h vào.",
          "Gặp chữ khác thì không cần đội.",
        ],
      },
    ],
    kushia:
      "Có bạn viết “ngỉ ngơi” thay vì “nghỉ ngơi”. Em giải thích cho bạn ấy thế nào để bạn ấy nhớ luôn, không phải nhắc lần hai?",
    make: (rand) => {
      const [word, onset, picture] = pickOne(rand, GGH);
      const nasal = onset.startsWith("ng");
      const pair = nasal ? ["ng", "ngh"] : ["g", "gh"];
      const long = onset.endsWith("h");
      const next = [...word.slice(onset.length)][0];
      return vItem({
        prompt: `Điền ${pair[0]} hay ${pair[1]}?`,
        show: blankOnset(word, onset),
        picture,
        say: word,
        answer: onset,
        wrong: pair.filter((p) => p !== onset),
        because: long
          ? `Sau chỗ trống là “${next}” — gặp i, e, ê thì thêm h: ${word}.`
          : `Sau chỗ trống là “${next}”, không phải i, e, ê, nên không cần h: ${word}.`,
      });
    },
  },
];
