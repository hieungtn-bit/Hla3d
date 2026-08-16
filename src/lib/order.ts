import type { CartLine } from "@/lib/cart";

/** Where every order lands. Kept server-side; never rendered into the page. */
export const ORDER_INBOX = "Hieungtn@gmail.com";

export type OrderCustomer = {
  name: string;
  phone: string;
  address: string;
  email?: string;
  note?: string;
};

export type OrderPayload = {
  customer: OrderCustomer;
  lines: Array<Pick<CartLine, "name" | "colorName" | "qty" | "price" | "customText">>;
  subtotal: number;
};

export type OrderResult = {
  ok: boolean;
  code: string;
  /** false when no mail provider is configured — the UI then offers a fallback. */
  emailed: boolean;
};

const VN_PHONE = /^(0|\+84)([0-9][\s.-]?){8,10}$/;

/**
 * Validation runs on the server too — a client-only check is a suggestion,
 * not a rule.
 */
export function validateOrder(input: unknown): { ok: true; value: OrderPayload } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) return { ok: false, error: "Dữ liệu không hợp lệ." };
  const o = input as Record<string, unknown>;
  const c = (o.customer ?? {}) as Record<string, unknown>;

  const name = String(c.name ?? "").trim();
  const phone = String(c.phone ?? "").trim();
  const address = String(c.address ?? "").trim();
  const email = String(c.email ?? "").trim();
  const note = String(c.note ?? "").trim();

  if (name.length < 2) return { ok: false, error: "Vui lòng cho tụi em biết tên người nhận." };
  if (!VN_PHONE.test(phone.replace(/\s+/g, ""))) return { ok: false, error: "Số điện thoại chưa đúng định dạng." };
  if (address.length < 8) return { ok: false, error: "Địa chỉ cần đầy đủ hơn để gửi hàng được." };
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Email chưa đúng định dạng." };

  const rawLines = Array.isArray(o.lines) ? o.lines : [];
  if (rawLines.length === 0) return { ok: false, error: "Chưa có món nào trong đơn." };
  if (rawLines.length > 50) return { ok: false, error: "Đơn hàng quá lớn, bạn nhắn trực tiếp giúp tụi em nhé." };

  const lines: OrderPayload["lines"] = [];
  for (const raw of rawLines) {
    const l = (raw ?? {}) as Record<string, unknown>;
    const qty = Number(l.qty);
    const price = Number(l.price);
    if (!Number.isFinite(qty) || qty < 1 || qty > 99) return { ok: false, error: "Số lượng không hợp lệ." };
    if (!Number.isFinite(price) || price < 0) return { ok: false, error: "Giá không hợp lệ." };
    lines.push({
      name: String(l.name ?? "").slice(0, 120),
      colorName: String(l.colorName ?? "").slice(0, 80),
      customText: l.customText ? String(l.customText).slice(0, 40) : undefined,
      qty,
      price,
    });
  }

  const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);

  return {
    ok: true,
    value: { customer: { name, phone, address, email: email || undefined, note: note || undefined }, lines, subtotal },
  };
}

/** HLA + yymmdd + 3 random chars, e.g. HLA260816K7Q. Readable over the phone. */
export function makeOrderCode(now = new Date()) {
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1
  let tail = "";
  for (let i = 0; i < 3; i++) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `HLA${yy}${mm}${dd}${tail}`;
}

export function formatVndPlain(n: number) {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(n))}đ`;
}

/** The email body. Plain text on purpose — it has to be readable on a phone. */
export function renderOrderEmail(order: OrderPayload, code: string) {
  const { customer, lines, subtotal } = order;
  const items = lines
    .map(
      (l) =>
        `  • ${l.name}${l.customText ? ` — khắc chữ: "${l.customText}"` : ""}\n` +
        `    Màu: ${l.colorName} · SL: ${l.qty} · ${formatVndPlain(l.price * l.qty)}`,
    )
    .join("\n");

  return [
    `ĐƠN HÀNG MỚI — ${code}`,
    "",
    "NGƯỜI ĐẶT",
    `  Tên:      ${customer.name}`,
    `  Điện thoại: ${customer.phone}`,
    customer.email ? `  Email:    ${customer.email}` : null,
    `  Địa chỉ:  ${customer.address}`,
    customer.note ? `  Ghi chú:  ${customer.note}` : null,
    "",
    "MÓN ĐẶT",
    items,
    "",
    `TẠM TÍNH: ${formatVndPlain(subtotal)}`,
    "  (chưa gồm phí giao hàng)",
    "",
    `Nhận lúc: ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
    "— hla3d.fun",
  ]
    .filter((l) => l !== null)
    .join("\n");
}
