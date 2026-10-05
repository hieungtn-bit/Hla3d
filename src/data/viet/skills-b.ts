import type { VietSkill } from "./types";
import { blankOnset, pickOne, shuffled, vItem } from "./helpers";
import { swapTone, toneGroup, toneOf, type Tone } from "./phonology";
import {
  COMMA_LISTS,
  DGIR,
  END_MARK,
  LAY_HOI_NGA,
  OPPOSITES,
  PERSONIFY,
  PROPER_NAMES,
  SENTENCE_KIND,
  SIMILE,
  SUBJ_PRED,
  SX,
  SYNONYMS,
  TRCH,
  WORD_CLASS,
  type LexItem,
} from "./banks";

/* ---------------------------------------------------------------------------
   Shared by s/x, tr/ch and d/gi/r: no rule decides these, so the explanation
   either points at the từ láy (which really does settle it) or says plainly
   that this one has to be remembered.
   --------------------------------------------------------------------------- */
function lexItem(rand: () => number, bank: readonly LexItem[], onsets: string[]) {
  const [word, onset, picture] = pickOne(rand, bank);
  const parts = word.split(" ");
  const isLay = parts.length === 2 && parts.every((p) => p.startsWith(onset)) && !["sư tử", "xà phòng"].includes(word);
  return vItem({
    prompt: `Điền ${onsets.join(", ").replace(/, ([^,]*)$/, " hay $1")}?`,
    show: blankOnset(word, onset),
    picture,
    say: word,
    answer: onset,
    wrong: onsets.filter((o) => o !== onset),
    because: isLay
      ? `Từ láy giữ nguyên chữ đầu: “${parts[1]}” viết ${onset}, nên “${parts[0]}” cũng viết ${onset}.`
      : `“${word}” viết ${onset}. Chữ này không có luật nào quyết định — phải nhớ mặt chữ, nên đọc to vài lần.`,
  });
}

const toneWord = (t: Tone) => (t === "ngang" ? "không dấu" : `dấu ${t}`);

const OPPOSITE_PAIRS = Object.entries(OPPOSITES).flatMap(([group, pairs]) =>
  pairs.map(([a, b]) => ({ group, a, b })),
);

const QUESTION_WORDS = ["gì", "đâu", "không", "sao", "ai", "mấy", "nào", "hả"];
const EXCLAIM_WORDS = ["Ôi", "Chà", "Hoan hô", "Ồ"];

const MARK_LABEL: Record<"." | "?" | "!" | ",", string> = {
  ".": ". dấu chấm",
  "?": "? dấu chấm hỏi",
  "!": "! dấu chấm than",
  ",": ", dấu phẩy",
};

const COMPARE_WORDS = ["giống như", "như", "tựa"];

/** Lớp 2 and Lớp 3 — spelling that has to be remembered, then words and sentences. */
export const skillsB: VietSkill[] = [
  {
    id: "s-x",
    level: "lop2",
    order: 11,
    title: "s hay x",
    summary: "Nhiều vùng đọc s và x giống hệt nhau. Viết thì vẫn phải phân biệt.",
    hook: "Ở nhiều nơi, người ta đọc “sa” và “xa” giống hệt nhau. Nếu tai nghe không ra, thì làm sao biết một từ viết s hay x?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Từ láy giữ nguyên chữ đầu",
        steps: [
          "Sạch sẽ, sáng sủa: cả hai tiếng đều viết s.",
          "Xinh xắn, xa xôi: cả hai tiếng đều viết x.",
          "Biết một tiếng là biết luôn tiếng kia.",
        ],
      },
      {
        name: "Nhớ theo nhóm hình",
        steps: [
          "Sách — sao — sữa — sông — sóc viết s.",
          "Xe — xôi — xoài — xô — xương viết x.",
          "Đọc to mỗi nhóm vài lần trong tuần.",
        ],
      },
      {
        name: "Không chắc thì tra",
        steps: [
          "Không có luật nào đúng cho mọi từ s và x — ai nói có là nói quá.",
          "Không chắc thì mở từ điển hoặc hỏi bố mẹ. Tra từ điển không phải gian lận.",
        ],
      },
    ],
    kushia:
      "Giọng nhà em đọc s và x có giống nhau không? Nếu giống, thì đó có phải là nói sai không? Nói theo giọng nhà mình và viết đúng chính tả có phải là một chuyện không?",
    make: (rand) => lexItem(rand, SX, ["s", "x"]),
  },
  {
    id: "tr-ch",
    level: "lop2",
    order: 12,
    title: "tr hay ch",
    summary: "Lại một cặp nhiều vùng đọc giống nhau. Có vài mẹo, nhưng mẹo nào cũng có ngoại lệ.",
    hook: "Con trâu và con chó — ở nhiều nơi, “tr” và “ch” nghe y như nhau. Có mẹo nào giúp đoán được không, hay phải học thuộc hết?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Từ láy giữ nguyên chữ đầu",
        steps: ["Chăm chỉ, chông chênh: cả hai tiếng đều ch.", "Trong trẻo, trơ trọi: cả hai tiếng đều tr."],
      },
      {
        name: "Người trong nhà hay viết ch",
        steps: [
          "Cha, chú, chị, cháu, chồng đều viết ch.",
          "Đây là mẹo, không phải luật: “con trai”, “anh trai” lại viết tr.",
        ],
      },
      {
        name: "Nhớ theo nhóm hình",
        steps: ["Trâu — trống — trăng — trứng — tre viết tr.", "Chó — chim — chuối — chổi — chanh viết ch."],
      },
    ],
    kushia:
      "Mẹo “người trong nhà viết ch” sai với từ “con trai”. Một mẹo có ngoại lệ thì còn dùng được không? Khi nào nên tin mẹo, khi nào nên tra từ điển?",
    make: (rand) => lexItem(rand, TRCH, ["tr", "ch"]),
  },
  {
    id: "d-gi-r",
    level: "lop2",
    order: 13,
    title: "d, gi hay r",
    summary: "Ba cách viết mà giọng miền Bắc đọc gần như giống nhau. Cặp khó nhất trong chính tả.",
    hook: "Dưa, gió, rùa — đọc to ba tiếng này. Âm đầu có giống nhau không? Nếu giống, thì làm sao biết phải viết chữ nào?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Từ láy giữ nguyên chữ đầu",
        steps: ["Dịu dàng, dễ dàng: d.", "Giòn giã, giục giã: gi.", "Rì rào, rộn ràng: r."],
      },
      {
        name: "Nhờ giọng miền Nam",
        steps: [
          "Người miền Nam đọc r khác hẳn d và gi.",
          "Nhà có ai nói giọng Nam thì nhờ họ đọc to từ đó lên.",
          "Cách này chỉ tách được r ra thôi — d và gi thì vẫn phải nhớ.",
        ],
      },
      {
        name: "Nhớ theo nhóm hình",
        steps: ["Dê — dưa — dép — dừa viết d.", "Giày — gió — giường — giấy viết gi.", "Rùa — rau — rồng — rắn viết r."],
      },
    ],
    kushia:
      "Giọng miền Bắc phân biệt được hỏi và ngã, nhưng không phân biệt được d và r. Giọng miền Nam thì ngược lại. Vậy người miền nào viết chính tả dễ hơn — hay mỗi miền khó một chỗ?",
    make: (rand) => lexItem(rand, DGIR, ["d", "gi", "r"]),
  },
  {
    id: "hoi-nga",
    level: "lop2",
    order: 14,
    title: "Dấu hỏi hay dấu ngã",
    summary: "Trong từ láy có một luật nhớ bằng câu thơ: Huyền – Ngã – Nặng, Ngang – Sắc – Hỏi.",
    hook: "“Vui vẻ” viết dấu hỏi, “sạch sẽ” viết dấu ngã. Tiếng đứng cạnh là “vui” và “sạch” — liệu tiếng đứng cạnh có mách giùm mình nên dùng dấu nào không?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Luật từ láy",
        steps: [
          "Nhìn dấu của tiếng đứng cạnh.",
          "Tiếng đó có dấu huyền, nặng hoặc ngã → viết dấu ngã: sạch sẽ, rõ ràng, dễ dàng.",
          "Tiếng đó không dấu, có dấu sắc hoặc hỏi → viết dấu hỏi: vui vẻ, nhỏ nhắn, vất vả.",
        ],
      },
      {
        name: "Câu thơ để nhớ",
        steps: [
          "“Chị Huyền mang nặng ngã đau,",
          "Anh Ngang sắc thuốc hỏi đau chỗ nào.”",
          "Huyền và nặng đi với ngã. Ngang và sắc đi với hỏi.",
        ],
      },
    ],
    kushia:
      "Theo luật, tiếng có dấu nặng đi với dấu ngã. Vậy sao “nhỏ nhẹ” lại viết dấu hỏi? Luật sai, hay luật nào cũng có ngoại lệ? Em thử tìm thêm một từ nữa không theo luật.",
    make: (rand) => {
      const [first, second, blank] = pickOne(rand, LAY_HOI_NGA);
      const target = blank === 0 ? first : second;
      const partner = blank === 0 ? second : first;
      const tone = toneOf(target);
      const partnerTone = toneOf(partner);
      const group = toneGroup(partnerTone) === "trầm" ? "Huyền – Ngã – Nặng" : "Ngang – Sắc – Hỏi";
      return vItem({
        prompt: "Chọn tiếng đúng để điền vào chỗ trống",
        show: blank === 0 ? `___ ${second}` : `${first} ___`,
        answer: target,
        wrong: [swapTone(target, tone === "hỏi" ? "ngã" : "hỏi")],
        because: `“${partner}” ${toneWord(partnerTone)}, thuộc nhóm ${group} → viết dấu ${tone}: ${first} ${second}.`,
      });
    },
  },
  {
    id: "tu-loai",
    level: "lop2",
    order: 16,
    title: "Từ chỉ sự vật, hoạt động, đặc điểm",
    summary: "Từ gọi tên, từ chỉ việc làm, từ chỉ dáng vẻ — ba nhóm từ đầu tiên.",
    hook: "“Con mèo”, “chạy”, “trắng” — ba từ thuộc ba nhóm khác nhau. Có cách nào kiểm tra một từ thuộc nhóm nào mà không cần học thuộc không?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Nó có phải là tên gọi không?",
        steps: [
          "Tên người, con vật, đồ vật, cây cối → từ chỉ sự vật: con mèo, cái bàn, cô giáo.",
          "Thường thêm được “cái”, “con”, “người”, “quyển” vào trước.",
        ],
      },
      {
        name: "Thử hỏi “đang làm gì?”",
        steps: [
          "Trả lời được câu “Bạn ấy đang làm gì?” bằng từ đó → từ chỉ hoạt động.",
          "Đang chạy, đang đọc, đang tưới cây.",
        ],
      },
      {
        name: "Thử thêm “rất” vào trước",
        steps: [
          "Thêm “rất” vào trước mà nghe hợp → thường là từ chỉ đặc điểm: rất đỏ, rất cao, rất ngoan.",
          "“Rất chạy” nghe sai, nên chạy không phải từ chỉ đặc điểm.",
        ],
      },
    ],
    kushia:
      "“Học sinh” và “học bài” đều bắt đầu bằng chữ “học”. Vì sao một từ là sự vật, một từ là hoạt động? Thử đặt “con”, “đang”, “rất” vào trước từng từ xem.",
    make: (rand) => {
      const cls = pickOne(rand, Object.keys(WORD_CLASS) as (keyof typeof WORD_CLASS)[]);
      const word = pickOne(rand, WORD_CLASS[cls]);
      const because =
        cls === "sự vật"
          ? `“${word}” là tên gọi của người, con vật, đồ vật hay cây cối → từ chỉ sự vật.`
          : cls === "hoạt động"
            ? `Hỏi “đang làm gì?” → “đang ${word}”. Đó là một việc làm → từ chỉ hoạt động.`
            : `Nói được “rất ${word}” → từ chỉ đặc điểm.`;
      return vItem({
        prompt: "Từ này chỉ gì?",
        show: word,
        answer: cls,
        wrong: (Object.keys(WORD_CLASS) as string[]).filter((c) => c !== cls),
        because,
      });
    },
  },
  {
    id: "dau-cau",
    level: "lop2",
    order: 17,
    title: "Dấu chấm, dấu hỏi, dấu chấm than",
    summary: "Câu kể dùng dấu chấm, câu hỏi dùng dấu chấm hỏi, câu bày tỏ cảm xúc dùng dấu chấm than.",
    hook: "“Bạn đi đâu đấy” — đọc câu này mà không có dấu gì ở cuối, em có biết người nói đang hỏi hay đang kể không? Cái gì trong câu cho em biết?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Tìm từ để hỏi",
        steps: [
          "Trong câu có ai, gì, đâu, nào, mấy, sao, không… mà người nói đang hỏi → dấu chấm hỏi (?).",
          "Bạn tên là gì? Nhà bạn ở đâu?",
        ],
      },
      {
        name: "Tìm từ bày tỏ cảm xúc",
        steps: [
          "Câu mở đầu bằng Ôi, Chà, Ồ, Hoan hô… hoặc là lời nhắc gấp → dấu chấm than (!).",
          "Ôi, đẹp quá! Cẩn thận!",
        ],
      },
      {
        name: "Còn lại là câu kể",
        steps: ["Câu chỉ kể một việc, không hỏi, không reo lên → dấu chấm (.).", "Hôm nay em đi học."],
      },
    ],
    kushia:
      "Câu “Em đi học à” không có từ ai, gì, đâu… mà vẫn là câu hỏi. Vì sao? Em tìm thêm một chữ nữa đặt ở cuối có thể biến câu kể thành câu hỏi.",
    make: (rand) => {
      const [sentence, mark] = pickOne(rand, END_MARK);
      const lower = sentence.toLowerCase();
      let because: string;
      if (mark === "?") {
        const q = QUESTION_WORDS.find((w) => new RegExp(`(^|\\s)${w}(\\s|$)`).test(lower)) ?? "để hỏi";
        because = `Câu này đang hỏi — có chữ “${q}” — nên cuối câu là dấu chấm hỏi.`;
      } else if (mark === "!") {
        const e = EXCLAIM_WORDS.find((w) => sentence.startsWith(w));
        because = e
          ? `Câu mở đầu bằng “${e}” để bày tỏ cảm xúc, nên cuối câu là dấu chấm than.`
          : "Đây là lời nhắc gấp, cần nói to và mạnh, nên cuối câu là dấu chấm than.";
      } else {
        because = "Câu này chỉ kể một việc, không hỏi, không reo lên, nên cuối câu là dấu chấm.";
      }
      return vItem({
        prompt: "Cuối câu này cần dấu gì?",
        show: `${sentence} ___`,
        answer: MARK_LABEL[mark],
        wrong: (Object.keys(MARK_LABEL) as (keyof typeof MARK_LABEL)[]).filter((m) => m !== mark).map((m) => MARK_LABEL[m]),
        because,
      });
    },
  },
  {
    id: "kieu-cau",
    level: "lop3",
    order: 18,
    title: "Ai là gì? Ai làm gì? Ai thế nào?",
    summary: "Ba kiểu câu kể: để giới thiệu, để kể việc làm, và để tả.",
    hook: "“Mẹ em là giáo viên”, “Mẹ em đang nấu cơm”, “Mẹ em rất hiền” — cùng nói về mẹ, mà ba câu làm ba việc khác nhau. Đó là ba việc gì?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Tìm chữ “là”",
        steps: ["Phần sau dùng chữ “là” để giới thiệu ai đó là gì → câu Ai là gì?", "Mẹ em là giáo viên."],
      },
      {
        name: "Hỏi “làm gì?”",
        steps: ["Phần sau trả lời được câu hỏi “làm gì?” → câu Ai làm gì?", "Mẹ em làm gì? — Đang nấu cơm."],
      },
      {
        name: "Hỏi “thế nào?”",
        steps: ["Phần sau tả dáng vẻ, tính nết → câu Ai thế nào?", "Mẹ em thế nào? — Rất hiền."],
      },
    ],
    kushia:
      "Câu “Con mèo là con vật lười nhất nhà” có chữ “là” nhưng lại nói về tính nết. Nó là câu Ai là gì hay Ai thế nào? Tranh luận với anh em xem — có khi cả hai bên đều có lý.",
    make: (rand) => {
      const [sentence, kind] = pickOne(rand, SENTENCE_KIND);
      const because =
        kind === "Ai là gì?"
          ? "Câu dùng chữ “là” để giới thiệu ai đó là gì → kiểu Ai là gì?"
          : kind === "Ai làm gì?"
            ? "Phần sau kể một việc đang làm → kiểu Ai làm gì?"
            : "Phần sau tả dáng vẻ, tính nết → kiểu Ai thế nào?";
      return vItem({
        prompt: "Câu này thuộc kiểu nào?",
        show: sentence,
        answer: kind,
        wrong: (["Ai là gì?", "Ai làm gì?", "Ai thế nào?"] as const).filter((k) => k !== kind),
        because,
      });
    },
  },
  {
    id: "so-sanh",
    level: "lop3",
    order: 19,
    title: "So sánh",
    summary: "Tìm xem cái gì được so sánh với cái gì — và vì sao người viết lại so như thế.",
    hook: "Viết “trăng rất tròn” hay viết “trăng tròn như quả bóng” — câu nào làm em nhìn thấy mặt trăng rõ hơn? Vì sao?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Tìm từ so sánh trước",
        steps: [
          "Tìm các từ: như, tựa, giống như.",
          "Phía trước từ đó là cái được so sánh.",
          "Phía sau là cái người viết đem ra để so.",
        ],
      },
      {
        name: "Hỏi “giống cái gì?”",
        steps: ["Đọc câu rồi hỏi: trăng giống cái gì?", "Câu trả lời là cái được đem ra so: quả bóng."],
      },
    ],
    kushia:
      "Người viết so tóc bà với bông, sao không so với tuyết? Em nghĩ vì sao một người lớn lên ở Việt Nam lại hay chọn “bông” hơn?",
    make: (rand) => {
      const [sentence, subject, image, wrong] = pickOne(rand, SIMILE);
      const word = COMPARE_WORDS.find((w) => sentence.includes(` ${w} `)) ?? "như";
      return vItem({
        prompt: `${subject} được so sánh với cái gì?`,
        show: sentence,
        answer: image,
        wrong,
        because: `${subject} được so với ${image} — nhờ từ “${word}” đứng giữa hai cái.`,
      });
    },
  },
  {
    id: "nhan-hoa",
    level: "lop3",
    order: 20,
    title: "Nhân hoá",
    summary: "Gọi con vật, đồ vật như gọi người, và cho chúng làm việc của người.",
    hook: "“Ông mặt trời thức dậy” — mặt trời đâu có ngủ mà thức. Vậy người viết đang làm gì với mặt trời? Vì sao lại viết như thế?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Tìm từ gọi người",
        steps: [
          "Tìm các từ ông, bà, chú, cô, chị, bác đứng trước một sự vật.",
          "Sự vật đứng ngay sau từ đó là sự vật được nhân hoá: ông mặt trời.",
          "Chọn cái sự vật, đừng chọn chữ “ông”.",
        ],
      },
      {
        name: "Tìm việc chỉ người mới làm",
        steps: [
          "Tìm việc như cười, chào, thức dậy, chăm chỉ làm việc.",
          "Hỏi: ai đang làm việc đó? Nếu là một con vật hay đồ vật → nó được nhân hoá.",
        ],
      },
    ],
    kushia:
      "Em thử nhân hoá cái máy in 3D nhà mình trong một câu. Máy in sẽ làm việc gì của người? Đọc câu đó cho anh em nghe.",
    make: (rand) => {
      const [sentence, thing, wrong] = pickOne(rand, PERSONIFY);
      const addr = ["Ông", "Bà", "Chị", "Bác", "Cô", "Chú"].find((w) => sentence.startsWith(w + " "));
      return vItem({
        prompt: "Sự vật nào được nhân hoá?",
        show: sentence,
        answer: thing,
        wrong,
        because: addr
          ? `Người viết gọi ${thing} là “${addr.toLowerCase()}” như gọi người, và cho nó làm việc của người.`
          : `${thing[0].toUpperCase() + thing.slice(1)} được tả là biết làm việc của người.`,
      });
    },
  },
  {
    id: "trai-nghia",
    level: "lop3",
    order: 21,
    title: "Từ trái nghĩa",
    summary: "Hai từ có nghĩa ngược nhau: cao – thấp, nhanh – chậm.",
    hook: "Trái nghĩa với “nóng” là “lạnh”. Vậy trái nghĩa với “nóng tính” là gì? Có phải cứ đổi “nóng” thành “lạnh” là xong không?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Đặt vào một câu",
        steps: [
          "Đặt từ vào một câu: Cái cây này cao.",
          "Nói ngược lại thì câu thành thế nào? Cái cây này thấp.",
          "Từ vừa thay vào là từ trái nghĩa.",
        ],
      },
      {
        name: "Hai đầu của một chiếc thước",
        steps: [
          "Mỗi cặp trái nghĩa như hai đầu của một chiếc thước: một đầu cao, một đầu thấp.",
          "Từ ở giữa như “vừa” không phải từ trái nghĩa.",
        ],
      },
    ],
    kushia:
      "Trái nghĩa với “mở cửa” là “đóng cửa”. Còn trái nghĩa với “mở lòng” là gì? Một từ có thể có nhiều từ trái nghĩa không?",
    make: (rand) => {
      const pair = pickOne(rand, OPPOSITE_PAIRS);
      const flip = rand() < 0.5;
      const target = flip ? pair.b : pair.a;
      const answer = flip ? pair.a : pair.b;
      const elsewhere = shuffled(
        rand,
        OPPOSITE_PAIRS.filter((p) => p.group !== pair.group).map((p) => (rand() < 0.5 ? p.a : p.b)),
      );
      return vItem({
        prompt: "Từ nào trái nghĩa với từ này?",
        show: target,
        answer,
        wrong: elsewhere,
        because: `“${target}” và “${answer}” có nghĩa ngược nhau — như hai đầu của cùng một chiếc thước ${pair.group}.`,
      });
    },
  },
  {
    id: "dong-nghia",
    level: "lop3",
    order: 22,
    title: "Từ cùng nghĩa",
    summary: "Hai từ khác nhau mà nghĩa giống nhau — có khi chỉ vì mỗi miền gọi một kiểu.",
    hook: "Người miền Bắc nói “quả dứa”, người miền Nam nói “trái thơm”. Hai cách gọi này, có cách nào đúng hơn cách nào không?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Thay vào câu thử",
        steps: [
          "Đặt từ này vào một câu, rồi thay bằng từ kia.",
          "Câu vẫn đúng, nghĩa không đổi → hai từ cùng nghĩa: Bạn ấy rất chăm chỉ / Bạn ấy rất siêng năng.",
        ],
      },
      {
        name: "Nhớ các cặp Bắc – Nam",
        steps: [
          "Ngô – bắp, lợn – heo, thìa – muỗng, bát – chén, quả – trái, vừng – mè.",
          "Cả hai cách gọi đều đúng. Biết cả hai thì đi đâu cũng hiểu.",
        ],
      },
    ],
    kushia:
      "“Bé” và “nhỏ” cùng nghĩa. Vậy nói “em bé” được, sao nói “em nhỏ” nghe lại hơi khác? Hai từ cùng nghĩa có lúc nào không thay được cho nhau không?",
    make: (rand) => {
      const group = pickOne(rand, SYNONYMS);
      const flip = rand() < 0.5;
      const target = flip ? group[1] : group[0];
      const answer = flip ? group[0] : group[1];
      const elsewhere = shuffled(
        rand,
        SYNONYMS.filter((g) => g !== group).map((g) => (rand() < 0.5 ? g[0] : g[1])),
      );
      return vItem({
        prompt: "Từ nào cùng nghĩa với từ này?",
        show: target,
        answer,
        wrong: elsewhere,
        because: group[2] ?? `“${target}” và “${answer}” cùng nghĩa — thay từ này bằng từ kia, câu vẫn đúng.`,
      });
    },
  },
  {
    id: "bo-phan-cau",
    level: "lop3",
    order: 23,
    title: "Ai? – Làm gì?",
    summary: "Tách câu thành hai phần: ai đang làm, và đang làm gì.",
    hook: "Câu “Long vẽ một con bạch tuộc” có hai phần. Nếu chỉ giữ lại một phần thì câu còn hiểu được không? Phần nào không bỏ được?",
    methodNoun: "cách làm",
    methods: [
      {
        name: "Hỏi “Ai?” trước",
        steps: ["Hỏi: Ai vẽ? → Long. Đó là bộ phận trả lời câu hỏi Ai?", "Là con vật, đồ vật thì hỏi Con gì? Cái gì?"],
      },
      {
        name: "Hỏi “Làm gì?” sau",
        steps: ["Hỏi: Long làm gì? → vẽ một con bạch tuộc.", "Lấy trọn cả cụm, đừng chỉ lấy mỗi chữ “vẽ”."],
      },
      {
        name: "Gạch một đường chia đôi",
        steps: [
          "Đọc câu và tìm chỗ ngắt tự nhiên: Long / vẽ một con bạch tuộc.",
          "Trước dấu gạch là Ai?, sau dấu gạch là Làm gì?",
        ],
      },
    ],
    kushia:
      "Nếu đổi “Bé Anh xếp những khối gỗ” thành “Những khối gỗ được bé Anh xếp”, thì bộ phận Ai? giờ là gì? Câu có còn cùng nghĩa không?",
    make: (rand) => {
      const [sentence, subject, predicate, noun, slip] = pickOne(rand, SUBJ_PRED);
      const askWho = rand() < 0.5;
      return vItem({
        prompt: askWho ? "Bộ phận nào trả lời câu hỏi “Ai?” (Con gì? Cái gì?)" : "Bộ phận nào trả lời câu hỏi “Làm gì?”",
        show: sentence,
        answer: askWho ? subject : predicate,
        wrong: askWho ? [predicate, noun, slip] : [subject, noun, slip],
        because: askWho
          ? `Hỏi “Ai ${predicate}?” → ${subject}.`
          : `Hỏi “${subject} làm gì?” → ${predicate}. Lấy trọn cả cụm, không chỉ riêng một chữ.`,
      });
    },
  },
  {
    id: "viet-hoa",
    level: "lop2",
    order: 15,
    title: "Viết hoa tên riêng",
    summary: "Tên người, tên sông núi, tên thành phố viết hoa mỗi tiếng. Tên chung như “sông”, “hồ”, “cô” thì viết thường.",
    hook: "Em viết tên mình thì chữ đầu viết hoa. Vậy trong “sông Hồng”, chữ nào viết hoa — “sông”, “Hồng”, hay cả hai?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Tên riêng viết hoa mọi tiếng",
        steps: [
          "Tên người: viết hoa chữ đầu của họ, tên đệm và tên — Trần Bảo Ngọc.",
          "Tên nơi chốn: viết hoa chữ đầu của mỗi tiếng — Hà Nội, Đà Nẵng, Sa Pa.",
        ],
      },
      {
        name: "Tên chung thì viết thường",
        steps: [
          "Có rất nhiều con sông, nên “sông” là tên chung — viết thường.",
          "Chỉ có một sông Hồng, nên “Hồng” là tên riêng — viết hoa.",
          "Hồ, núi cũng vậy: hồ Gươm, núi Bà Đen.",
        ],
      },
      {
        name: "Cách gọi cũng viết thường",
        steps: [
          "Cô, chú, bạn, bác chỉ là cách gọi, không phải tên: cô Lan, bạn Mai.",
          "Đầu câu thì chữ nào cũng viết hoa — kể cả “Cô” hay “Bạn”. Luật này là của câu, không phải của tên.",
        ],
      },
    ],
    kushia:
      "Con mèo nhà em tên là Mướp. Viết “con mèo Mướp” thì chữ nào viết hoa? Vì sao “con mèo” lại không viết hoa, mà “Mướp” thì có?",
    make: (rand) => {
      const [sentence, generic, name] = pickOne(rand, PROPER_NAMES);
      const syl = name.split(" ");
      const lower = (w: string) => w.toLocaleLowerCase("vi-VN");
      const upper = (w: string) => w.charAt(0).toLocaleUpperCase("vi-VN") + w.slice(1);
      const join = (g: string, parts: string[]) => [g, ...parts].filter(Boolean).join(" ");
      const answer = join(generic, syl);
      const wrong = [
        join(generic, syl.map(lower)),
        syl.length > 1 ? join(generic, [syl[0], ...syl.slice(1).map(lower)]) : "",
        generic ? join(upper(generic), syl) : "",
        generic ? join(upper(generic), syl.map(lower)) : "",
        syl.length > 1 ? join(generic, [lower(syl[0]), ...syl.slice(1)]) : "",
      ];
      const isTitle = ["cô", "chú", "bạn", "bác"].includes(generic);
      return vItem({
        prompt: "Chọn cách viết đúng để điền vào chỗ trống",
        show: sentence,
        answer,
        wrong,
        because: generic && !isTitle
          ? `“${generic}” là tên chung nên viết thường; “${name}” là tên riêng nên viết hoa chữ đầu mỗi tiếng.`
          : isTitle
            ? `“${generic}” chỉ là cách gọi nên viết thường; tên “${name}” thì viết hoa chữ đầu mỗi tiếng.`
            : `Tên nơi chốn và tên người viết hoa chữ đầu của mỗi tiếng: ${name}.`,
      });
    },
  },
  {
    id: "dau-phay",
    level: "lop3",
    order: 24,
    title: "Dấu phẩy",
    summary: "Kể ra nhiều thứ cùng loại thì ngăn bằng dấu phẩy. Trước chữ “và” thì không cần.",
    hook: "“Mẹ mua cam xoài bưởi và chuối.” Đọc liền một hơi thì mẹ mua mấy thứ? Thêm gì vào câu thì người đọc biết ngay?",
    methodNoun: "cách nhớ",
    methods: [
      {
        name: "Kể ra nhiều thứ thì ngăn bằng dấu phẩy",
        steps: [
          "Vườn nhà em có cam, xoài, bưởi và chuối.",
          "Mỗi dấu phẩy ngăn hai thứ cùng loại đứng cạnh nhau.",
        ],
      },
      {
        name: "Gặp chữ “và” thì thôi",
        steps: [
          "Chữ “và” nối thứ cuối cùng vào danh sách.",
          "Đã có “và” nối rồi thì không cần dấu phẩy nữa: bưởi và chuối.",
        ],
      },
      {
        name: "Danh sách bắt đầu từ thứ đầu tiên",
        steps: [
          "“Vườn nhà em có” chưa kể thứ gì cả.",
          "Dấu phẩy chỉ nằm giữa các thứ được kể ra, không nằm ngay sau chữ “có”.",
        ],
      },
      {
        name: "Đọc to để nghe chỗ ngắt",
        steps: [
          "Đọc to câu: chỗ nghỉ hơi ngắn thường là dấu phẩy.",
          "Cuối câu nghỉ lâu hơn — đó là dấu chấm.",
        ],
      },
    ],
    kushia:
      "“Em thích vẽ tranh, đá bóng và đọc truyện.” Nếu xoá hết dấu phẩy thì người đọc có hiểu nhầm không? Thử đọc “Em thích vẽ tranh đá bóng” xem nghe ra sao.",
    make: (rand) => {
      const [lead, all] = pickOne(rand, COMMA_LISTS);
      const k = Math.min(all.length, 3 + Math.floor(rand() * 2));
      const from = Math.floor(rand() * (all.length - k + 1));
      const items = all.slice(from, from + k);
      const gap = Math.floor(rand() * k); // 0: after the lead-in; i: before items[i]
      let show = lead + (gap === 0 ? " ___ " : " ") + items[0];
      for (let i = 1; i < k; i++) {
        const last = i === k - 1;
        show += gap === i ? (last ? " ___ và " : " ___ ") : last ? " và " : ", ";
        show += items[i];
      }
      show += ".";
      const NONE = "không cần dấu";
      const answer = gap > 0 && gap < k - 1 ? MARK_LABEL[","] : NONE;
      return vItem({
        prompt: "Chỗ trống cần dấu gì?",
        show,
        answer,
        wrong: [MARK_LABEL[","], MARK_LABEL["."], NONE],
        because:
          gap === 0
            ? `“${lead}” chưa kể thứ gì — danh sách bắt đầu từ “${items[0]}”. Không đặt dấu phẩy ngay sau đó.`
            : gap === k - 1
              ? `Chữ “và” đã nối “${items[k - 2]}” với “${items[k - 1]}” rồi, nên không cần dấu phẩy.`
              : `“${items[gap - 1]}” và “${items[gap]}” là hai thứ cùng loại được kể ra, nên ngăn bằng dấu phẩy.`,
      });
    },
  },
];
