import type { Skill } from "./types";
import { item, pick } from "./helpers";

/** Lớp 2 và Lớp 3 — bậc Hưng (8 tuổi) đang học và bậc kế tiếp. */
export const skillsB: Skill[] = [
  {
    id: "cong-co-nho",
    level: "lop2",
    order: 11,
    title: "Cộng có nhớ trong 100",
    summary: "Khi cộng hàng đơn vị vượt quá 10 thì phần dư đi đâu.",
    hook:
      "37 + 28. Cộng đơn vị được 15 — mà một ô chỉ viết được một chữ số. Số 1 kia đi đâu?",
    methods: [
      {
        name: "Đặt tính dọc, nhớ 1",
        steps: [
          "7 + 8 = 15. Viết 5 ở hàng đơn vị, nhớ 1 sang hàng chục.",
          "Hàng chục: 3 + 2 = 5, cộng thêm 1 nhớ là 6.",
          "Được 65. Số 1 nhớ chính là một chục — nó không biến mất, nó chuyển hàng.",
        ],
      },
      {
        name: "Làm tròn chục rồi bù",
        steps: [
          "37 gần 40. Mượn 3 từ 28: 37 + 3 = 40, 28 còn 25.",
          "40 + 25 = 65.",
          "Cách này tính nhẩm được, không cần giấy.",
        ],
      },
    ],
    kushia:
      "Số 1 mà bạn 'nhớ' thật ra là số mấy? Nếu nói nó là 'một' thì sai chỗ nào? Giải thích cho em lớp 1 nghe.",
    make: (rand) => {
      const u1 = pick(rand, 5, 9);
      const u2 = pick(rand, 10 - u1, 9);
      const t1 = pick(rand, 1, 4);
      const t2 = pick(rand, 1, 4);
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      return item(
        `${a} + ${b} = ?`,
        a + b,
        [a + b - 10, a + b + 10, (t1 + t2) * 10 + ((u1 + u2) % 10)],
        `${u1} + ${u2} = ${u1 + u2}: viết ${(u1 + u2) % 10}, nhớ 1. Hàng chục ${t1} + ${t2} + 1 = ${t1 + t2 + 1}. Được ${a + b}.`,
      );
    },
  },
  {
    id: "tru-co-nho",
    level: "lop2",
    order: 12,
    title: "Trừ có nhớ trong 100",
    summary: "Khi hàng đơn vị không trừ nổi thì mượn ở đâu.",
    hook:
      "52 − 27. Hàng đơn vị: 2 không trừ được cho 7. Nhiều bạn làm nhanh thành 7 − 2 = 5 rồi ra 35. Sai ở chỗ nào?",
    methods: [
      {
        name: "Mượn một chục",
        steps: [
          "2 không trừ được 7, mượn 1 chục từ hàng chục: 2 thành 12.",
          "12 − 7 = 5. Viết 5.",
          "Hàng chục đã cho mượn 1 nên còn 4: 4 − 2 = 2. Được 25.",
        ],
      },
      {
        name: "Đếm tiếp cho tới số lớn",
        steps: [
          "Từ 27 lên 30 là 3.",
          "Từ 30 lên 50 là 20. Từ 50 lên 52 là 2.",
          "3 + 20 + 2 = 25. Không phải mượn gì cả.",
        ],
      },
    ],
    kushia:
      "Vì sao làm 7 − 2 lại sai, dù hai số đó đúng là đang đứng cùng một cột? Phép trừ có đổi chỗ được như phép cộng không?",
    make: (rand) => {
      const u1 = pick(rand, 0, 4);
      const u2 = pick(rand, u1 + 1, 9);
      const t2 = pick(rand, 1, 4);
      const t1 = pick(rand, t2 + 1, 9);
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      // The classic wrong answer: subtracting the smaller digit from the
      // larger inside each column, ignoring which is on top.
      const flipped = (t1 - t2) * 10 + (u2 - u1);
      return item(
        `${a} − ${b} = ?`,
        a - b,
        [flipped, a - b + 10, a - b - 1],
        `Mượn 1 chục: ${u1} thành ${u1 + 10}. ${u1 + 10} − ${u2} = ${u1 + 10 - u2}. Hàng chục còn ${t1 - 1}: ${t1 - 1} − ${t2} = ${t1 - 1 - t2}. Được ${a - b}.`,
      );
    },
  },
  {
    id: "nhan-2-5",
    level: "lop2",
    order: 13,
    title: "Bảng nhân 2 và 5",
    summary: "Hai bảng dễ nhất, và vì sao chúng dễ.",
    hook:
      "4 × 5 nghĩa là gì? Là 4 cộng 5 lần, hay 5 cộng 4 lần? Cả hai có ra cùng một số không?",
    methods: [
      {
        name: "Cộng nhiều lần bằng nhau",
        steps: [
          "4 × 5 là lấy 4 cộng lại 5 lần: 4+4+4+4+4.",
          "Đếm được 20.",
          "Nhân chỉ là phép cộng viết cho gọn.",
        ],
      },
      {
        name: "Đếm nhảy",
        steps: [
          "Bảng 5 thì đếm nhảy 5: 5, 10, 15, 20, 25…",
          "Bảng 2 thì đếm nhảy 2: 2, 4, 6, 8…",
          "Đuôi của bảng 5 luôn là 0 hoặc 5 — nhìn là biết mình có nhảy sai không.",
        ],
      },
    ],
    kushia:
      "Vì sao kết quả bảng 5 lúc nào cũng tận cùng là 0 hoặc 5? Còn bảng 2 thì tận cùng là những số nào?",
    make: (rand) => {
      const b = rand() < 0.5 ? 2 : 5;
      const a = pick(rand, 2, 9);
      return item(
        `${a} × ${b} = ?`,
        a * b,
        [a * b + b, a * b - b, a + b],
        `${a} × ${b} là ${a} cộng ${b} lần, bằng ${a * b}.`,
      );
    },
  },
  {
    id: "nhan-3-4",
    level: "lop2",
    order: 14,
    title: "Bảng nhân 3 và 4",
    summary: "Hai bảng phải nhớ, nhưng có mẹo dựa vào bảng 2.",
    hook: "Nếu bạn đã thuộc bảng 2, có cách nào ra bảng 4 mà không phải học lại từ đầu không?",
    methods: [
      {
        name: "Bảng 4 là bảng 2 gấp đôi",
        steps: ["6 × 2 = 12.", "6 × 4 chính là 12 gấp đôi.", "12 + 12 = 24. Vậy 6 × 4 = 24."],
      },
      {
        name: "Bảng 3 là bảng 2 cộng thêm một lần",
        steps: ["7 × 2 = 14.", "7 × 3 là 14 rồi cộng thêm 7 nữa.", "14 + 7 = 21."],
      },
    ],
    kushia:
      "Mẹo 'gấp đôi bảng 2 ra bảng 4' có dùng được để ra bảng 8 không? Thử với 6 × 8 và nói cách bạn làm.",
    make: (rand) => {
      const b = rand() < 0.5 ? 3 : 4;
      const a = pick(rand, 2, 9);
      return item(
        `${a} × ${b} = ?`,
        a * b,
        [a * b + b, a * b - b, a * b + a],
        b === 4
          ? `${a} × 2 = ${a * 2}, gấp đôi lên là ${a * 4}.`
          : `${a} × 2 = ${a * 2}, cộng thêm ${a} nữa là ${a * 3}.`,
      );
    },
  },
  {
    id: "chia-bang-nho",
    level: "lop2",
    order: 15,
    title: "Phép chia trong bảng",
    summary: "Chia là hỏi ngược lại phép nhân.",
    hook:
      "20 : 4 = ? Bạn có phải học một bảng chia mới không, hay đã biết câu trả lời từ bảng nhân rồi?",
    methods: [
      {
        name: "Hỏi ngược bảng nhân",
        steps: [
          "20 : 4 tức là hỏi: 4 nhân với mấy thì được 20?",
          "Đọc bảng 4: 4, 8, 12, 16, 20 — đó là lần thứ 5.",
          "Vậy 20 : 4 = 5. Không có bảng chia riêng, chỉ có bảng nhân đọc ngược.",
        ],
      },
      {
        name: "Chia thật ra thành phần",
        steps: [
          "Lấy 20 cái kẹo chia đều vào 4 cái đĩa.",
          "Mỗi lần đặt vào mỗi đĩa một cái, đến khi hết.",
          "Đếm một đĩa: được 5 cái.",
        ],
      },
    ],
    kushia:
      "20 : 4 = 5 và 20 : 5 = 4. Vậy phép chia có đổi chỗ được không? Thử 12 : 3 và 3 : 12 rồi trả lời.",
    make: (rand) => {
      const b = pick(rand, 2, 5);
      const q = pick(rand, 2, 9);
      const a = b * q;
      return item(
        `${a} : ${b} = ?`,
        q,
        [q + 1, q - 1, a - b],
        `Hỏi ngược: ${b} nhân mấy được ${a}? ${b} × ${q} = ${a}. Vậy được ${q}.`,
      );
    },
  },
  {
    id: "xem-gio",
    level: "lop2",
    order: 16,
    title: "Xem đồng hồ",
    summary: "Vì sao một cái kim chỉ số 3 lại đọc là 15 phút.",
    hook:
      "Kim phút chỉ vào số 3, nhưng ta đọc là 15 phút chứ không phải 3 phút. Vì sao cùng một con số lại đọc hai kiểu?",
    methods: [
      {
        name: "Mỗi số cách nhau 5 phút",
        steps: [
          "Cả vòng đồng hồ là 60 phút, chia làm 12 số.",
          "60 : 12 = 5, nên từ số này sang số kế tiếp là 5 phút.",
          "Kim phút chỉ số 3 thì đã đi 3 × 5 = 15 phút.",
        ],
      },
      {
        name: "Nhớ bốn mốc chính",
        steps: [
          "Số 12 là 0 phút, số 3 là 15, số 6 là 30, số 9 là 45.",
          "Bốn mốc này chia đồng hồ làm 4 phần bằng nhau.",
          "Nhớ bốn mốc rồi đếm nhảy 5 từ mốc gần nhất.",
        ],
      },
    ],
    kushia:
      "Kim giờ chỉ giữa số 2 và số 3 thì là mấy giờ? Vì sao kim giờ lại nằm giữa mà không nằm đúng vào một số?",
    make: (rand) => {
      const n = pick(rand, 1, 11);
      return item(
        `Kim phút chỉ vào số ${n}.\nLà bao nhiêu phút?`,
        n * 5,
        [n, n * 5 + 5, n * 5 - 5],
        `Mỗi số cách nhau 5 phút, nên số ${n} là ${n} × 5 = ${n * 5} phút.`,
      );
    },
  },
  {
    id: "do-do-dai",
    level: "lop2",
    order: 17,
    title: "Đổi đơn vị đo độ dài",
    summary: "cm, dm, m — và vì sao đổi đơn vị là nhân hoặc chia cho 10.",
    hook:
      "1 dm bằng 10 cm. Vậy 3 dm bằng bao nhiêu cm? Bạn nhân hay chia — và làm sao biết mình chọn đúng?",
    methods: [
      {
        name: "Đơn vị nhỏ đi thì số to lên",
        steps: [
          "Đổi từ dm sang cm là đổi sang đơn vị NHỎ hơn.",
          "Đơn vị nhỏ hơn thì cần NHIỀU cái hơn, nên số phải to lên → nhân.",
          "3 dm = 3 × 10 = 30 cm.",
        ],
      },
      {
        name: "Nghĩ bằng vật thật",
        steps: [
          "1 dm dài bằng gang tay bé. 1 cm bằng bề ngang ngón tay.",
          "Xếp ngón tay dọc theo gang tay: được khoảng 10 ngón.",
          "Vậy 3 gang tay thì khoảng 30 ngón — đúng là 30 cm.",
        ],
      },
    ],
    kushia:
      "Nếu đổi ngược từ cm sang m thì số to lên hay nhỏ đi? Nói ra quy tắc bằng lời của bạn, đừng học thuộc.",
    make: (rand) => {
      const kind = Math.floor(rand() * 3);
      if (kind === 0) {
        const n = pick(rand, 2, 9);
        return item(`${n} dm = ? cm`, n * 10, [n, n * 100, n + 10], `1 dm = 10 cm, nên ${n} dm = ${n * 10} cm.`);
      }
      if (kind === 1) {
        const n = pick(rand, 2, 9);
        return item(`${n} m = ? dm`, n * 10, [n, n * 100, n + 10], `1 m = 10 dm, nên ${n} m = ${n * 10} dm.`);
      }
      const n = pick(rand, 2, 9);
      return item(`${n} m = ? cm`, n * 100, [n * 10, n, n + 100], `1 m = 100 cm, nên ${n} m = ${n * 100} cm.`);
    },
  },
  {
    id: "nhan-6-7",
    level: "lop3",
    order: 18,
    title: "Bảng nhân 6 và 7",
    summary: "Hai bảng khó nhất, và cách bẻ chúng ra thành bảng dễ.",
    hook:
      "7 × 8 là phép nhiều người lớn cũng phải nghĩ một giây. Có cách nào ra nó từ những bảng bạn đã thuộc không?",
    methods: [
      {
        name: "Bẻ ra thành hai phần",
        steps: [
          "7 × 8 = (5 × 8) + (2 × 8).",
          "5 × 8 = 40, 2 × 8 = 16.",
          "40 + 16 = 56. Bảng 5 và bảng 2 thì ai cũng thuộc.",
        ],
      },
      {
        name: "Bảng 6 là bảng 3 gấp đôi",
        steps: ["6 × 7: lấy 3 × 7 = 21 trước.", "Gấp đôi: 21 + 21 = 42.", "Vậy 6 × 7 = 42."],
      },
    ],
    kushia:
      "Cách bẻ 7 thành 5 + 2 chạy được. Bẻ thành 4 + 3 có chạy không? Thử với 7 × 8 rồi nói vì sao.",
    make: (rand) => {
      const b = rand() < 0.5 ? 6 : 7;
      const a = pick(rand, 2, 9);
      return item(
        `${a} × ${b} = ?`,
        a * b,
        [a * b + b, a * b - b, a * b + a],
        `Bẻ ra: (5 × ${a}) + (${b - 5} × ${a}) = ${5 * a} + ${(b - 5) * a} = ${a * b}.`,
      );
    },
  },
  {
    id: "nhan-8-9",
    level: "lop3",
    order: 19,
    title: "Bảng nhân 8 và 9",
    summary: "Bảng 9 có một mẹo mà bảng nào cũng thèm.",
    hook:
      "Viết kết quả bảng 9 ra: 9, 18, 27, 36, 45… Cộng hai chữ số của mỗi số lại xem được mấy. Bạn thấy gì?",
    methods: [
      {
        name: "Bảng 9 là bảng 10 trừ đi",
        steps: [
          "7 × 9 = 7 × 10 − 7.",
          "70 − 7 = 63.",
          "Nhân 10 thì dễ, nên bảng 9 hoá ra là bảng dễ nhất chứ không phải khó nhất.",
        ],
      },
      {
        name: "Bảng 8 là gấp đôi ba lần",
        steps: ["6 × 8: lấy 6 gấp đôi là 12.", "Gấp đôi nữa: 24. Gấp đôi lần ba: 48.", "Vì 8 = 2 × 2 × 2."],
      },
    ],
    kushia:
      "Tổng hai chữ số của mọi kết quả bảng 9 đều bằng 9. Với 9 × 11 = 99 thì quy luật còn đúng không? Còn 9 × 12 thì sao?",
    make: (rand) => {
      const b = rand() < 0.5 ? 8 : 9;
      const a = pick(rand, 2, 9);
      return item(
        `${a} × ${b} = ?`,
        a * b,
        [a * b + b, a * b - b, a * b + a],
        b === 9
          ? `${a} × 10 = ${a * 10}, trừ đi ${a} là ${a * 9}.`
          : `${a} gấp đôi ba lần: ${a * 2} → ${a * 4} → ${a * 8}.`,
      );
    },
  },
  {
    id: "nhan-hai-chu-so",
    level: "lop3",
    order: 20,
    title: "Nhân số có hai chữ số",
    summary: "23 × 4 — nhân từng hàng rồi gộp lại.",
    hook: "23 × 4. Bạn không có bảng nhân 23. Vậy làm sao ra?",
    methods: [
      {
        name: "Tách thành chục và đơn vị",
        steps: ["23 là 20 và 3.", "20 × 4 = 80. 3 × 4 = 12.", "80 + 12 = 92."],
      },
      {
        name: "Đặt tính dọc",
        steps: [
          "Nhân hàng đơn vị trước: 3 × 4 = 12, viết 2 nhớ 1.",
          "Nhân hàng chục: 2 × 4 = 8, cộng 1 nhớ là 9.",
          "Được 92. Đây chính là cách trên viết cho gọn.",
        ],
      },
    ],
    kushia:
      "Hai cách trên ra cùng một số. Vậy bước '20 × 4 = 80' của cách thứ nhất nằm ở chỗ nào trong cách đặt tính dọc?",
    make: (rand) => {
      const t = pick(rand, 1, 4);
      const u = pick(rand, 1, 9);
      const b = pick(rand, 2, 9);
      const a = t * 10 + u;
      return item(
        `${a} × ${b} = ?`,
        a * b,
        [t * 10 * b + u, a * b - 10, a * b + 10],
        `${t * 10} × ${b} = ${t * 10 * b}, ${u} × ${b} = ${u * b}. Cộng lại: ${a * b}.`,
      );
    },
  },
  {
    id: "chia-co-du",
    level: "lop3",
    order: 21,
    title: "Phép chia có dư",
    summary: "Khi chia không hết thì phần thừa gọi là số dư.",
    hook:
      "Có 17 cái bánh chia đều cho 5 bạn. Mỗi bạn được mấy cái, và còn thừa mấy cái? Số thừa có thể bằng 5 được không?",
    methods: [
      {
        name: "Tìm số gần nhất trong bảng",
        steps: [
          "Đọc bảng 5: 5, 10, 15, 20. Số 15 là số lớn nhất mà chưa quá 17.",
          "15 : 5 = 3, nên mỗi bạn được 3 cái.",
          "17 − 15 = 2, còn thừa 2 cái.",
        ],
      },
      {
        name: "Chia thật rồi đếm phần thừa",
        steps: [
          "Phát cho mỗi bạn 1 cái, lặp lại đến khi không đủ phát nữa.",
          "Phát được 3 vòng, hết 15 cái.",
          "Còn 2 cái, không đủ chia mỗi bạn một cái nữa — đó là số dư.",
        ],
      },
    ],
    kushia:
      "Vì sao số dư không bao giờ bằng hoặc lớn hơn số chia? Nếu chia cho 5 mà dư 5 thì bạn đã làm sai bước nào?",
    make: (rand) => {
      const b = pick(rand, 3, 9);
      const q = pick(rand, 2, 8);
      const r = pick(rand, 1, b - 1);
      const a = b * q + r;
      return item(
        `${a} : ${b} = ? (dư ${r})\nĐược mấy phần?`,
        q,
        [q + 1, q - 1, a - b],
        `${b} × ${q} = ${b * q}, còn thừa ${r}. Vậy được ${q} phần, dư ${r}.`,
      );
    },
  },
  {
    id: "chu-vi",
    level: "lop3",
    order: 22,
    title: "Chu vi hình chữ nhật",
    summary: "Đi vòng quanh hình một vòng thì đi hết bao nhiêu.",
    hook:
      "Muốn rào một mảnh vườn hình chữ nhật, bạn cần biết cái gì — chu vi hay diện tích? Vì sao?",
    methods: [
      {
        name: "Cộng bốn cạnh",
        steps: [
          "Hình chữ nhật có 4 cạnh: dài, rộng, dài, rộng.",
          "Cộng cả bốn: 5 + 3 + 5 + 3 = 16.",
          "Cách này chậm nhưng không bao giờ nhớ nhầm công thức.",
        ],
      },
      {
        name: "Cộng dài với rộng rồi nhân 2",
        steps: [
          "Một 'nửa vòng' là dài + rộng = 5 + 3 = 8.",
          "Đi hết vòng là hai nửa vòng: 8 × 2 = 16.",
          "Đây chính là công thức (dài + rộng) × 2.",
        ],
      },
    ],
    kushia:
      "Hình vuông cũng là hình chữ nhật đặc biệt. Vậy công thức chu vi hình vuông có suy ra được từ công thức trên không? Suy thử đi.",
    make: (rand) => {
      const d = pick(rand, 3, 12);
      const r = pick(rand, 2, d - 1);
      return item(
        `Hình chữ nhật dài ${d} cm, rộng ${r} cm.\nChu vi bằng bao nhiêu cm?`,
        (d + r) * 2,
        [d * r, d + r, (d + r) * 2 + 2],
        `(${d} + ${r}) × 2 = ${d + r} × 2 = ${(d + r) * 2} cm.`,
      );
    },
  },
  {
    id: "dien-tich",
    level: "lop3",
    order: 23,
    title: "Diện tích hình chữ nhật",
    summary: "Lát kín mặt hình bằng những ô vuông 1cm thì hết bao nhiêu ô.",
    hook:
      "Chu vi và diện tích khác nhau chỗ nào? Hai mảnh vườn có cùng chu vi thì có chắc cùng diện tích không?",
    methods: [
      {
        name: "Đếm ô vuông theo hàng",
        steps: [
          "Chia hình thành các ô vuông 1cm × 1cm.",
          "Một hàng có 5 ô, có tất cả 3 hàng.",
          "5 × 3 = 15 ô. Vậy diện tích là 15 cm vuông.",
        ],
      },
      {
        name: "Nhân dài với rộng",
        steps: [
          "Lấy chiều dài nhân chiều rộng: 5 × 3 = 15.",
          "Đây chỉ là cách viết gọn của việc đếm ô ở trên.",
          "Nhớ ghi đơn vị là cm vuông, không phải cm.",
        ],
      },
    ],
    kushia:
      "Mảnh 6×2 và mảnh 5×3 đều có chu vi 16. Tính diện tích hai mảnh xem có bằng nhau không. Nếu Ba mua đất, Ba nên hỏi số nào?",
    make: (rand) => {
      const d = pick(rand, 3, 12);
      const r = pick(rand, 2, 9);
      return item(
        `Hình chữ nhật dài ${d} cm, rộng ${r} cm.\nDiện tích bằng bao nhiêu cm vuông?`,
        d * r,
        [(d + r) * 2, d + r, d * r + d],
        `${d} × ${r} = ${d * r} cm vuông. Đó là số ô vuông 1cm lát kín được mặt hình.`,
      );
    },
  },
  {
    id: "gap-len-giam-di",
    level: "lop3",
    order: 24,
    title: "Gấp lên, giảm đi một số lần",
    summary: "Phân biệt 'gấp 3 lần' với 'thêm 3'.",
    hook:
      "Anh có 6 viên bi. 'Thêm 3 viên' và 'gấp 3 lần' — hai câu này cho ra hai số khác nhau. Số nào lớn hơn, và vì sao dễ nhầm?",
    methods: [
      {
        name: "Gấp lên thì nhân",
        steps: [
          "'Gấp 3 lần' nghĩa là có 3 phần bằng phần cũ.",
          "6 gấp 3 lần: 6 × 3 = 18.",
          "Thấy chữ 'gấp… lần' là nhân.",
        ],
      },
      {
        name: "Giảm đi thì chia",
        steps: [
          "'Giảm đi 3 lần' nghĩa là chia thành 3 phần bằng nhau, lấy một phần.",
          "18 giảm đi 3 lần: 18 : 3 = 6.",
          "Thấy chữ 'giảm… lần' là chia. Còn 'bớt 3' mới là trừ.",
        ],
      },
    ],
    kushia:
      "Một bạn nói 'gấp 1 lần' là gấp đôi. Bạn đó đúng hay sai? Lấy ví dụ cụ thể để chứng minh.",
    make: (rand) => {
      const up = rand() < 0.5;
      const k = pick(rand, 2, 5);
      if (up) {
        const n = pick(rand, 3, 12);
        return item(
          `${n} gấp lên ${k} lần được bao nhiêu?`,
          n * k,
          [n + k, n - k, n * k + n],
          `Gấp lên thì nhân: ${n} × ${k} = ${n * k}.`,
        );
      }
      const q = pick(rand, 2, 9);
      const n = q * k;
      return item(
        `${n} giảm đi ${k} lần được bao nhiêu?`,
        q,
        [n - k, n + k, q + 1],
        `Giảm đi thì chia: ${n} : ${k} = ${q}.`,
      );
    },
  },
];
