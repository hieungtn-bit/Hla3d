import type { Skill } from "./types";
import { item, pick } from "./helpers";

/** Mẫu giáo lớn và Lớp 1 — Anh (5 tuổi) và Long (6 tuổi). */
export const skillsA: Skill[] = [
  {
    id: "dem-den-10",
    level: "mau-giao",
    order: 1,
    title: "Đếm đến 10",
    summary: "Đếm số vật và biết dừng đúng chỗ.",
    hook: "Có một rổ kẹo. Làm sao đếm mà chắc chắn không đếm sót con nào, cũng không đếm một con hai lần?",
    methods: [
      {
        name: "Chỉ tay từng cái",
        steps: [
          "Chỉ ngón tay vào từng cái, vừa chỉ vừa nói: một, hai, ba…",
          "Chỉ đến đâu thì đẩy cái đó sang một bên.",
          "Số nói cuối cùng chính là số cái có tất cả.",
        ],
      },
      {
        name: "Xếp thành hàng trước",
        steps: [
          "Xếp hết thành một hàng thẳng.",
          "Đếm từ trái sang phải, không nhảy cóc.",
          "Xếp hàng rồi thì mắt tự biết chỗ nào đã đếm — khỏi cần nhớ.",
        ],
      },
    ],
    kushia:
      "Nếu đếm từ phải sang trái thì có ra số khác không? Thử đi rồi nói cho anh/mẹ nghe vì sao.",
    make: (rand) => {
      const n = pick(rand, 3, 10);
      const icons = ["🍬", "🐟", "⭐", "🍎", "🧸", "🚗"];
      const icon = icons[Math.floor(rand() * icons.length)];
      return item(
        `${icon.repeat(n)}\n\nCó bao nhiêu cái?`,
        n,
        [n - 1, n + 1, n - 2],
        `Đếm từng cái một: có ${n} cái.`,
      );
    },
  },
  {
    id: "ban-cua-10",
    level: "mau-giao",
    order: 2,
    title: "Bạn của 10",
    summary: "Hai số cộng lại đúng bằng 10. Nền của mọi phép tính về sau.",
    hook:
      "Bạn có 10 ngón tay. Gập 4 ngón xuống thì còn mấy ngón? Có cách nào biết ngay mà không cần đếm lại không?",
    methods: [
      {
        name: "Dùng hai bàn tay",
        steps: [
          "Xoè cả 10 ngón ra.",
          "Gập xuống đúng số ngón bạn đang có.",
          "Số ngón còn xoè chính là bạn của nó.",
        ],
      },
      {
        name: "Học thuộc 5 cặp",
        steps: [
          "Chỉ có đúng 5 cặp thôi: 1–9, 2–8, 3–7, 4–6, 5–5.",
          "Thuộc 5 cặp này là thuộc hết.",
          "Đọc to 5 cặp mỗi ngày một lần, vài hôm là nhớ.",
        ],
      },
    ],
    kushia:
      "Vì sao chỉ có 5 cặp mà không phải 10 cặp? Cặp 3–7 và cặp 7–3 có phải là hai cặp khác nhau không?",
    make: (rand) => {
      const a = pick(rand, 1, 9);
      return item(
        `${a} + ? = 10`,
        10 - a,
        [10 + a, 10 - a - 1, a],
        `${a} + ${10 - a} = 10. Đây là một cặp bạn của 10.`,
      );
    },
  },
  {
    id: "cong-trong-5",
    level: "mau-giao",
    order: 3,
    title: "Cộng trong 5",
    summary: "Gộp hai nhóm nhỏ lại với nhau.",
    hook: "Tay trái cầm 2 viên bi, tay phải cầm 3 viên. Đổ chung vào một rổ thì có mấy viên?",
    methods: [
      {
        name: "Đếm tiếp",
        steps: [
          "Nhớ số lớn trong đầu, ví dụ 3.",
          "Rồi đếm tiếp lên: bốn, năm.",
          "Đếm đúng bằng số còn lại thì dừng.",
        ],
      },
      {
        name: "Nhìn là biết",
        steps: [
          "2 và 2 là 4 — nhìn hai bàn tay mỗi bên 2 ngón là thấy ngay.",
          "Những cặp nhỏ như vậy nên nhớ thẳng, đừng đếm.",
          "Đếm chỉ dùng khi chưa nhớ kịp.",
        ],
      },
    ],
    kushia: "2 + 3 và 3 + 2 có bằng nhau không? Lấy bi ra thử rồi giải thích vì sao.",
    make: (rand) => {
      const a = pick(rand, 1, 4);
      const b = pick(rand, 1, 5 - a);
      return item(`${a} + ${b} = ?`, a + b, [a + b + 1, a + b - 1, Math.abs(a - b)], `${a} + ${b} = ${a + b}.`);
    },
  },
  {
    id: "tru-trong-10",
    level: "mau-giao",
    order: 4,
    title: "Trừ trong 10",
    summary: "Bớt đi một phần thì còn lại bao nhiêu.",
    hook: "Có 8 cái bánh, ăn mất 3 cái. Còn mấy cái? Bạn tính bằng cách nào — đếm lùi hay đếm tiếp?",
    methods: [
      {
        name: "Đếm lùi",
        steps: ["Bắt đầu từ 8.", "Lùi từng bước: bảy, sáu, năm.", "Lùi đúng 3 bước thì dừng — còn 5."],
      },
      {
        name: "Đếm tiếp cho tới số lớn",
        steps: [
          "Hỏi ngược: từ 3 phải thêm mấy nữa mới tới 8?",
          "Đếm tiếp: bốn, năm, sáu, bảy, tám — đếm được 5 bước.",
          "Vậy 8 − 3 = 5. Cách này nhanh hơn khi hai số gần nhau.",
        ],
      },
    ],
    kushia: "Khi nào đếm lùi nhanh hơn, khi nào đếm tiếp nhanh hơn? Cho một ví dụ của mỗi loại.",
    make: (rand) => {
      const a = pick(rand, 4, 10);
      const b = pick(rand, 1, a - 1);
      return item(`${a} − ${b} = ?`, a - b, [a + b, a - b + 1, a - b - 1], `${a} − ${b} = ${a - b}.`);
    },
  },
  {
    id: "nhieu-hon-it-hon",
    level: "mau-giao",
    order: 5,
    title: "Nhiều hơn, ít hơn",
    summary: "So hai nhóm mà chưa cần biết đếm giỏi.",
    hook:
      "Một rổ táo, một rổ cam. Làm sao biết rổ nào nhiều hơn mà KHÔNG cần đếm cả hai rổ?",
    methods: [
      {
        name: "Ghép cặp",
        steps: [
          "Lấy một quả táo ghép với một quả cam, để thành từng cặp.",
          "Ghép cho tới khi một bên hết.",
          "Bên nào còn dư thì bên đó nhiều hơn. Không cần đếm chút nào.",
        ],
      },
      {
        name: "Đếm cả hai rồi so số",
        steps: ["Đếm rổ táo được mấy quả.", "Đếm rổ cam được mấy quả.", "Số nào lớn hơn thì rổ đó nhiều hơn."],
      },
    ],
    kushia:
      "Cách ghép cặp không cần đếm. Vậy nó có lợi gì hơn cách đếm? Khi nào thì cách đếm lại tốt hơn?",
    make: (rand) => {
      const a = pick(rand, 2, 9);
      let b = pick(rand, 2, 9);
      if (b === a) b = a + 1 > 9 ? a - 1 : a + 1;
      const more = Math.max(a, b);
      return item(
        `Rổ A có ${a} quả. Rổ B có ${b} quả.\nRổ nhiều hơn có mấy quả?`,
        more,
        [Math.min(a, b), a + b, Math.abs(a - b)],
        `${a} và ${b}: ${more} lớn hơn, nên rổ đó nhiều hơn.`,
      );
    },
  },
  {
    id: "cong-trong-10",
    level: "lop1",
    order: 6,
    title: "Cộng trong 10",
    summary: "Cộng nhanh, không phải đếm ngón tay nữa.",
    hook:
      "Bạn đếm ngón tay để tính 6 + 3 thì vẫn ra đúng. Nhưng vì sao cô giáo lại muốn bạn nhớ thẳng?",
    methods: [
      {
        name: "Đếm tiếp từ số lớn",
        steps: [
          "Đặt số lớn trước: 6 + 3 thì nhớ 6.",
          "Đếm tiếp 3 bước: bảy, tám, chín.",
          "Luôn bắt đầu từ số lớn — đếm ít bước hơn, ít sai hơn.",
        ],
      },
      {
        name: "Dựa vào số đôi",
        steps: [
          "Nhớ các số đôi trước: 3+3=6, 4+4=8, 5+5=10.",
          "Gặp 4 + 5 thì nghĩ: 4+4=8, thêm 1 nữa là 9.",
          "Số đôi dễ nhớ, rồi lệch một bước là ra.",
        ],
      },
    ],
    kushia: "Vì sao đếm tiếp từ số lớn lại ít sai hơn đếm từ số bé? Nói bằng lời của bạn.",
    make: (rand) => {
      const a = pick(rand, 1, 9);
      const b = pick(rand, 1, 10 - a);
      return item(
        `${a} + ${b} = ?`,
        a + b,
        [a + b + 1, a + b - 1, Math.abs(a - b)],
        `${a} + ${b} = ${a + b}.`,
      );
    },
  },
  {
    id: "cong-qua-10",
    level: "lop1",
    order: 7,
    title: "Cộng qua 10",
    summary: "Phép tính đầu tiên vượt qua mốc 10. Đây là bài quan trọng nhất của lớp 1.",
    hook:
      "8 + 5 thì nhiều hơn 10 rồi. Đếm ngón tay không đủ ngón. Làm thế nào bây giờ?",
    methods: [
      {
        name: "Làm tròn 10 trước",
        steps: [
          "8 cần thêm 2 nữa là tròn 10 — đây là bạn của 10.",
          "Tách 5 thành 2 và 3. Lấy 2 cho đủ 10.",
          "Còn 3. Vậy 10 + 3 = 13.",
        ],
      },
      {
        name: "Dựa vào số đôi",
        steps: [
          "8 + 5: nghĩ tới 5 + 5 = 10 trước.",
          "8 nhiều hơn 5 là 3 đơn vị.",
          "Vậy 10 + 3 = 13.",
        ],
      },
      {
        name: "Đếm tiếp (chậm nhưng chắc)",
        steps: [
          "Nhớ 8 trong đầu, đếm tiếp 5 bước: 9, 10, 11, 12, 13.",
          "Cách này luôn đúng nhưng chậm.",
          "Dùng khi hai cách trên chưa quen.",
        ],
      },
    ],
    kushia:
      "Cách làm tròn 10 chỉ chạy được nếu bạn thuộc bạn của 10. Vì sao? Thử làm 7 + 6 bằng cách đó và chỉ ra chỗ nào bạn phải dùng tới bạn của 10.",
    make: (rand) => {
      const a = pick(rand, 5, 9);
      const b = pick(rand, 11 - a, 9);
      const sum = a + b;
      return item(
        `${a} + ${b} = ?`,
        sum,
        [sum - 1, sum + 1, sum - 10],
        `${a} cần ${10 - a} nữa là tròn 10. Tách ${b} thành ${10 - a} và ${b - (10 - a)}. Vậy 10 + ${b - (10 - a)} = ${sum}.`,
      );
    },
  },
  {
    id: "tru-qua-10",
    level: "lop1",
    order: 8,
    title: "Trừ qua 10",
    summary: "Trừ khi số bị trừ lớn hơn 10 mà hàng đơn vị lại nhỏ hơn.",
    hook: "13 − 5. Số 3 không trừ được cho 5. Vậy phải làm sao?",
    methods: [
      {
        name: "Về 10 trước",
        steps: [
          "Từ 13 lùi về 10 mất 3 bước.",
          "Còn phải lùi thêm: 5 − 3 = 2 bước nữa.",
          "10 − 2 = 8. Vậy 13 − 5 = 8.",
        ],
      },
      {
        name: "Đếm tiếp từ số nhỏ",
        steps: [
          "Hỏi ngược: từ 5 thêm mấy nữa thì tới 13?",
          "Từ 5 lên 10 là 5 bước. Từ 10 lên 13 là 3 bước.",
          "5 + 3 = 8 bước. Vậy 13 − 5 = 8.",
        ],
      },
    ],
    kushia:
      "Hai cách trên đều đi qua mốc 10. Vì sao số 10 lại tiện đến thế? Nếu tay người có 8 ngón thì mốc đó là số mấy?",
    make: (rand) => {
      const res = pick(rand, 2, 9);
      const b = pick(rand, 11 - res > 9 ? 2 : Math.max(2, 11 - res), 9);
      const a = res + b;
      return item(
        `${a} − ${b} = ?`,
        res,
        [b - (a - 10), res + 1, res - 1],
        `Từ ${a} lùi về 10 mất ${a - 10} bước, còn phải lùi ${b - (a - 10)} bước nữa. 10 − ${b - (a - 10)} = ${res}.`,
      );
    },
  },
  {
    id: "so-sanh-den-100",
    level: "lop1",
    order: 9,
    title: "So sánh số đến 100",
    summary: "Số nào lớn hơn, và vì sao.",
    hook:
      "47 và 74 dùng đúng hai chữ số như nhau. Vậy sao một số lại lớn hơn số kia?",
    methods: [
      {
        name: "Nhìn hàng chục trước",
        steps: [
          "47 có 4 chục. 74 có 7 chục.",
          "7 chục nhiều hơn 4 chục, khỏi cần nhìn tiếp.",
          "Chỉ khi hàng chục bằng nhau mới phải so hàng đơn vị.",
        ],
      },
      {
        name: "Đặt lên tia số",
        steps: [
          "Vẽ một đường thẳng, ghi 0 ở đầu và 100 ở cuối.",
          "Số nào nằm xa số 0 hơn thì lớn hơn.",
          "Cách này chậm nhưng thấy được vì sao.",
        ],
      },
    ],
    kushia:
      "Vì sao hàng chục lại quan trọng hơn hàng đơn vị? Số 19 có 9 đơn vị, số 20 chỉ có 0 đơn vị — mà 20 vẫn lớn hơn. Giải thích cho em nghe.",
    make: (rand) => {
      const a = pick(rand, 10, 99);
      let b = pick(rand, 10, 99);
      if (b === a) b = a === 99 ? 98 : a + 1;
      const big = Math.max(a, b);
      return item(
        `${a} và ${b}\nSố nào lớn hơn?`,
        big,
        [Math.min(a, b), Math.abs(a - b), a + b],
        `${big} lớn hơn. So hàng chục trước: ${Math.floor(a / 10)} chục và ${Math.floor(b / 10)} chục.`,
      );
    },
  },
  {
    id: "cong-tru-khong-nho",
    level: "lop1",
    order: 10,
    title: "Cộng trừ trong 100 (không nhớ)",
    summary: "Cộng và trừ số hai chữ số khi chưa phải nhớ sang hàng.",
    hook:
      "32 + 45. Bạn có thể cộng cả cục một lúc không, hay phải tách ra? Thử cả hai xem cách nào dễ hơn.",
    methods: [
      {
        name: "Tách chục và đơn vị",
        steps: [
          "32 là 30 và 2. 45 là 40 và 5.",
          "Cộng chục với chục: 30 + 40 = 70.",
          "Cộng đơn vị với đơn vị: 2 + 5 = 7. Rồi 70 + 7 = 77.",
        ],
      },
      {
        name: "Đặt tính dọc",
        steps: [
          "Viết số này dưới số kia, thẳng cột đơn vị với đơn vị.",
          "Cộng cột đơn vị trước, rồi cột chục.",
          "Viết thẳng cột là để hàng nào cộng với hàng ấy — không phải để cho đẹp.",
        ],
      },
    ],
    kushia:
      "Nếu viết lệch cột, ví dụ đặt hàng đơn vị dưới hàng chục, thì kết quả sai bao nhiêu? Thử một phép rồi tính ra con số cụ thể.",
    make: (rand) => {
      const plus = rand() < 0.5;
      if (plus) {
        const t1 = pick(rand, 1, 4);
        const t2 = pick(rand, 1, 9 - t1);
        const u1 = pick(rand, 0, 4);
        const u2 = pick(rand, 0, 9 - u1);
        const a = t1 * 10 + u1;
        const b = t2 * 10 + u2;
        return item(
          `${a} + ${b} = ?`,
          a + b,
          [a + b + 10, a + b - 10, a + b + 1],
          `Chục: ${t1 * 10} + ${t2 * 10} = ${(t1 + t2) * 10}. Đơn vị: ${u1} + ${u2} = ${u1 + u2}. Cộng lại: ${a + b}.`,
        );
      }
      const t1 = pick(rand, 3, 9);
      const t2 = pick(rand, 1, t1 - 1);
      const u1 = pick(rand, 5, 9);
      const u2 = pick(rand, 0, u1);
      const a = t1 * 10 + u1;
      const b = t2 * 10 + u2;
      return item(
        `${a} − ${b} = ?`,
        a - b,
        [a - b + 10, a - b - 10, b - a + 20],
        `Chục: ${t1 * 10} − ${t2 * 10} = ${(t1 - t2) * 10}. Đơn vị: ${u1} − ${u2} = ${u1 - u2}. Còn ${a - b}.`,
      );
    },
  },
];
