import type { OrderPayload } from "@/lib/order";
import { formatVndPlain } from "@/lib/order";
import { contact } from "@/data/site";

/**
 * The order email, in HLA3D's own clothes.
 *
 * Email clients are two decades behind browsers, so nothing here is optional:
 * tables for layout, every style inline, no flexbox, no grid, no custom fonts
 * (Gmail strips @font-face, so this leans on a rounded system stack that
 * degrades to Arial rather than shipping a webfont that will not load), no
 * external images, and hard hex colours because `currentColor` and CSS
 * variables are unsupported.
 *
 * The sticker look survives as thick borders and a hard offset shadow drawn
 * with a nested table cell — the one shadow technique Outlook cannot break.
 */

const INK = "#2b2118";
const FLAME = "#ff4a17";
const PAPER = "#fff8ec";
const PAPER2 = "#ffeed6";
const SUN = "#ffc93c";
const LIME = "#b6e64a";
const MUTED = "#6b5a49";

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI Rounded','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

function esc(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A label/value row in the customer block. */
function row(label: string, value: string, opts: { strong?: boolean; href?: string } = {}) {
  const inner = opts.href
    ? `<a href="${esc(opts.href)}" style="color:${FLAME};text-decoration:none;font-weight:800">${esc(value)}</a>`
    : esc(value);
  return `
  <tr>
    <td style="padding:6px 0;font-family:${FONT};font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top;width:120px">${esc(label)}</td>
    <td style="padding:6px 0;font-family:${FONT};font-size:${opts.strong ? "17px" : "15px"};font-weight:${opts.strong ? 800 : 600};color:${INK};vertical-align:top">${inner}</td>
  </tr>`;
}

export function renderOrderEmailHtml(order: OrderPayload, code: string) {
  const { customer, lines, subtotal } = order;

  const items = lines
    .map(
      (l) => `
      <tr>
        <td style="padding:14px 16px;border-bottom:1px solid ${PAPER2};font-family:${FONT};vertical-align:top">
          <div style="font-size:16px;font-weight:800;color:${INK}">${esc(l.name)}</div>
          <div style="margin-top:4px;font-size:13px;color:${MUTED}">Màu: ${esc(l.colorName)}</div>
          ${
            l.customText
              ? `<div style="margin-top:6px;display:inline-block;padding:4px 10px;border:2px solid ${INK};border-radius:999px;background:${SUN};font-size:13px;font-weight:800;color:${INK}">Khắc chữ: ${esc(l.customText)}</div>`
              : ""
          }
        </td>
        <td style="padding:14px 8px;border-bottom:1px solid ${PAPER2};font-family:${FONT};font-size:15px;font-weight:700;color:${MUTED};text-align:center;white-space:nowrap;vertical-align:top">×${l.qty}</td>
        <td style="padding:14px 16px 14px 8px;border-bottom:1px solid ${PAPER2};font-family:${FONT};font-size:16px;font-weight:800;color:${INK};text-align:right;white-space:nowrap;vertical-align:top">${formatVndPlain(l.price * l.qty)}</td>
      </tr>`,
    )
    .join("");

  const receivedAt = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Đơn hàng mới ${esc(code)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<!-- Preview line shown in the inbox list, before the message is opened. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Đơn ${esc(code)} · ${esc(customer.name)} · ${esc(customer.phone)} · ${formatVndPlain(subtotal)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:24px 12px">
<tr><td align="center">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

  <!-- ── header ─────────────────────────────────────────────── -->
  <tr><td style="padding-bottom:18px">
    <table role="presentation" cellpadding="0" cellspacing="0"><tr>
      <td style="width:44px;vertical-align:middle">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:44px;height:44px;background:${FLAME};border:2px solid ${INK};border-radius:13px">
          <tr><td align="center" style="font-family:${FONT};font-size:19px;font-weight:800;color:#fff;line-height:44px">H</td></tr>
        </table>
      </td>
      <td style="padding-left:12px;vertical-align:middle;font-family:${FONT};font-size:22px;font-weight:800;color:${INK};letter-spacing:-0.5px">
        HLA<span style="color:${FLAME}">3D</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- ── the one thing that matters ──────────────────────────── -->
  <tr><td style="padding-bottom:6px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:${INK};border-radius:22px;height:8px;font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="height:0;font-size:0;line-height:0">&nbsp;</td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:-8px;background:${SUN};border:2px solid ${INK};border-radius:22px">
      <tr><td style="padding:22px 24px;font-family:${FONT};text-align:center">
        <div style="font-size:13px;font-weight:800;letter-spacing:2px;color:${INK};opacity:.7">CÓ ĐƠN HÀNG MỚI</div>
        <div style="margin-top:8px;font-size:30px;font-weight:800;color:${INK};letter-spacing:-0.5px">${esc(code)}</div>
        <div style="margin-top:6px;font-size:14px;color:${INK};opacity:.75">${esc(receivedAt)}</div>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── call the customer ───────────────────────────────────── -->
  <tr><td style="padding-top:18px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid ${INK};border-radius:22px">
      <tr><td style="padding:22px 24px">
        <div style="font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1.5px;color:${MUTED}">GỌI CHO KHÁCH</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px">
          ${row("Tên", customer.name, { strong: true })}
          ${row("Điện thoại", customer.phone, { strong: true, href: `tel:${customer.phone.replace(/[^\d+]/g, "")}` })}
          ${row("Địa chỉ", customer.address || "chưa điền — hỏi khi gọi")}
          ${customer.email ? row("Email", customer.email, { href: `mailto:${customer.email}` }) : ""}
          ${customer.note ? row("Ghi chú", customer.note) : ""}
        </table>

        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px">
          <tr><td style="background:${INK};border-radius:999px">
            <a href="tel:${esc(customer.phone.replace(/[^\d+]/g, ""))}"
               style="display:block;margin:-3px 0 3px -3px;padding:13px 28px;background:${FLAME};border:2px solid ${INK};border-radius:999px;font-family:${FONT};font-size:15px;font-weight:800;color:#ffffff;text-decoration:none">
              Gọi ${esc(customer.phone)}
            </a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── what to print ───────────────────────────────────────── -->
  <tr><td style="padding-top:16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:2px solid ${INK};border-radius:22px">
      <tr><td style="padding:20px 24px 8px">
        <div style="font-family:${FONT};font-size:13px;font-weight:800;letter-spacing:1.5px;color:${MUTED}">CẦN IN</div>
      </td></tr>
      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
      </td></tr>
      <tr><td style="padding:16px 24px 22px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:${FONT};font-size:14px;font-weight:700;color:${MUTED}">Tạm tính</td>
            <td style="font-family:${FONT};font-size:24px;font-weight:800;color:${INK};text-align:right">${formatVndPlain(subtotal)}</td>
          </tr>
          <tr><td colspan="2" style="padding-top:6px;font-family:${FONT};font-size:12px;color:${MUTED}">Chưa gồm phí giao hàng</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── the checklist the makers actually follow ─────────────── -->
  <tr><td style="padding-top:16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${LIME};border:2px solid ${INK};border-radius:22px">
      <tr><td style="padding:20px 24px;font-family:${FONT}">
        <div style="font-size:13px;font-weight:800;letter-spacing:1.5px;color:${INK};opacity:.75">VIỆC TIẾP THEO</div>
        <div style="margin-top:10px;font-size:15px;font-weight:700;color:${INK};line-height:1.9">
          1. Gọi xác nhận món, màu và địa chỉ<br>
          2. Báo phí giao hàng<br>
          3. Xếp vào hàng chờ in<br>
          4. Chụp ảnh trước khi đóng gói
        </div>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── footer ──────────────────────────────────────────────── -->
  <tr><td style="padding:22px 24px 8px;text-align:center;font-family:${FONT};font-size:12px;color:${MUTED};line-height:1.7">
    Đơn này gửi tự động từ <a href="https://hla3d.fun" style="color:${FLAME};font-weight:700;text-decoration:none">hla3d.fun</a><br>
    Hưng 8 tuổi · Long 6 tuổi · Anh 5 tuổi · ${esc(contact.phoneDisplay)}
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
