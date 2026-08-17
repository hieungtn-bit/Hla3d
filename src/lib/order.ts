import type { CartLine } from "@/lib/cart";

/**
 * Where every order lands. Kept server-side; never rendered into the page.
 *
 * Lower-case on purpose. Resend compares the recipient against the account
 * address literally, so "Hieungtn@gmail.com" is rejected with a 403 while
 * "hieungtn@gmail.com" is accepted — a silent, total failure of order
 * delivery that only shows up in the provider's response.
 */
export const ORDER_INBOX = "hieungtn@gmail.com";

export type OrderCustomer = {
  name: string;
  phone: string;
  /** Optional: taken on the confirmation call when the buyer leaves it blank. */
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

  // Only a name and a reachable phone number are required.
  //
  // Address is the field low-confidence buyers abandon on: it is long free
  // text, it is easy to get wrong, and it is the one thing that is trivially
  // collected during the confirmation call that already happens. Requiring it
  // cost orders and bought nothing.
  if (name.length < 2) return { ok: false, error: "Bạn cho tụi em xin tên với ạ." };
  if (!VN_PHONE.test(phone.replace(/\s+/g, "")))
    return { ok: false, error: "Số điện thoại chưa đúng. Bạn kiểm tra lại giúp em nhé." };
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { ok: false, error: "Email chưa đúng. Bạn bỏ trống cũng được ạ." };

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
    value: {
      customer: { name, phone, address, email: email || undefined, note: note || undefined },
      lines,
      subtotal,
    },
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
    customer.address ? `  Địa chỉ:  ${customer.address}` : "  Địa chỉ:  (chưa điền — hỏi khi gọi xác nhận)",
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
