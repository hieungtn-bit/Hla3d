import { products, type Product } from "@/data/products";

/**
 * "Chọn quà giúp em" — three taps, no typing.
 *
 * Built for the two audiences this shop actually has: a child who cannot read
 * yet, and a parent or grandparent who does not want to fight a filter UI.
 * Every answer is a large tappable card with an icon, the questions never
 * branch, and the result is deterministic — the same three answers always
 * produce the same recommendation, so a customer can be talked through it on
 * the phone.
 *
 * No model, no API call. Scoring runs on the real product data, and the
 * toddler answer is a hard filter rather than a ranking penalty: nothing with
 * a small part can surface for a child under three, whatever else scores.
 */

export type Recipient = "toddler" | "kid" | "bigkid" | "adult";
export type Budget = "under100" | "mid" | "over200";
export type Intent = "play" | "desk" | "named" | "surprise";

export type Answers = { recipient: Recipient; budget: Budget; intent: Intent };

export type Question<T extends string> = {
  id: keyof Answers;
  title: string;
  hint: string;
  options: Array<{ value: T; label: string; sub: string; icon: string; tone: string }>;
};

export const questionRecipient: Question<Recipient> = {
  id: "recipient",
  title: "Tặng cho ai?",
  hint: "Bấm vào một ô là được",
  options: [
    { value: "toddler", label: "Bé dưới 3 tuổi", sub: "Còn hay cho đồ vào miệng", icon: "baby", tone: "bg-rose-tint" },
    { value: "kid", label: "Bé 3–8 tuổi", sub: "Thích cầm, bẻ, lắc", icon: "blocks", tone: "bg-sun-tint" },
    { value: "bigkid", label: "Bé 9 tuổi trở lên", sub: "Thích thử thách", icon: "puzzle", tone: "bg-lime-tint" },
    { value: "adult", label: "Người lớn", sub: "Để bàn học, bàn làm việc", icon: "briefcase", tone: "bg-sky-tint" },
  ],
};

export const questionBudget: Question<Budget> = {
  id: "budget",
  title: "Khoảng bao nhiêu tiền?",
  hint: "Chưa gồm phí giao hàng",
  options: [
    { value: "under100", label: "Dưới 100.000đ", sub: "Quà nhỏ, dễ tặng", icon: "coin", tone: "bg-lime-tint" },
    { value: "mid", label: "100 – 200.000đ", sub: "Hay được chọn nhất", icon: "coins", tone: "bg-sun-tint" },
    { value: "over200", label: "Trên 200.000đ", sub: "Quà đặc biệt", icon: "gift", tone: "bg-grape-tint" },
  ],
};

export const questionIntent: Question<Intent> = {
  id: "intent",
  title: "Bạn muốn món đó thế nào?",
  hint: "Câu cuối rồi",
  options: [
    { value: "play", label: "Cầm chơi được", sub: "Cử động, bẻ, lăn", icon: "sparkles", tone: "bg-flame-tint" },
    { value: "named", label: "Có tên riêng", sub: "Khắc tên người nhận", icon: "tag", tone: "bg-sky-tint" },
    { value: "desk", label: "Để bàn cho gọn", sub: "Dùng mỗi ngày", icon: "lamp", tone: "bg-lime-tint" },
    { value: "surprise", label: "Tụi em chọn giúp", sub: "Món nhà em tự hào nhất", icon: "dice", tone: "bg-sun-tint" },
  ],
};

export const questions = [questionRecipient, questionBudget, questionIntent] as const;

const BUDGET_RANGE: Record<Budget, [number, number]> = {
  under100: [0, 99_000],
  mid: [95_000, 200_000],
  over200: [150_000, Number.MAX_SAFE_INTEGER],
};

export type Match = { product: Product; score: number; reason: string };

/** Deterministic: the same answers always give the same three products. */
export function findGifts(a: Answers, limit = 3): Match[] {
  const [lo, hi] = BUDGET_RANGE[a.budget];

  const eligible = products.filter((p) => {
    // Hard safety filter — never rankable away.
    if (a.recipient === "toddler" && p.notForUnder3) return false;
    return true;
  });

  const scored = eligible.map((p) => {
    let score = 0;
    const reasons: string[] = [];

    if (p.price >= lo && p.price <= hi) {
      score += 40;
    } else {
      const distance = p.price < lo ? lo - p.price : p.price - hi;
      score -= Math.min(35, distance / 4000);
    }

    if (a.recipient === "adult") {
      if (!p.isToy) { score += 30; reasons.push("đồ để bàn, không phải đồ chơi"); }
    } else if (p.isToy) {
      score += 22;
      reasons.push("cầm chơi được");
    }

    if (a.recipient === "toddler") {
      score += 18;
      reasons.push("không có chi tiết nhỏ rời ra");
    }
    if (a.recipient === "bigkid" && p.makerRating >= 4) {
      score += 16;
      reasons.push("khó in, chơi cũng cần khéo");
    }
    if (a.recipient === "kid" && p.makerRating <= 3) score += 8;

    switch (a.intent) {
      case "play":
        if (p.isToy) { score += 26; }
        break;
      case "named":
        if (p.customizable) { score += 34; reasons.push("khắc được tên người nhận"); }
        break;
      case "desk":
        if (p.category === "desk") { score += 30; reasons.push("dùng được mỗi ngày trên bàn"); }
        break;
      case "surprise":
        if (p.badge) { score += 24; reasons.push(p.badge.toLowerCase()); }
        break;
    }

    if (p.badge === "BÁN CHẠY NHẤT") score += 6;

    return {
      product: p,
      score,
      reason: reasons.slice(0, 2).join(" · ") || "hợp với ngân sách bạn chọn",
    };
  });

  return scored
    .sort((x, y) => y.score - x.score || x.product.price - y.product.price)
    .slice(0, limit);
}
