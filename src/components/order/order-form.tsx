"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Check, Loader2, Mail, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { ORDER_INBOX } from "@/lib/order";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { ProductVisual } from "@/components/products/product-visual";
import { formatVnd } from "@/lib/utils";
import { contact } from "@/data/site";
import { track } from "@/lib/analytics";

type Sent = { code: string; emailed: boolean; mailto: string };

export function OrderForm() {
  const cart = useCart();
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState<Sent | null>(null);
  const errorRef = React.useRef<HTMLParagraphElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const fd = new FormData(e.currentTarget);
    const customer = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      address: String(fd.get("address") ?? ""),
      email: String(fd.get("email") ?? ""),
      note: String(fd.get("note") ?? ""),
    };
    const lines = cart.lines.map((l) => ({
      name: l.name,
      colorName: l.colorName,
      qty: l.qty,
      price: l.price,
      customText: l.customText,
    }));

    try {
      const res = await fetch("/api/dat-hang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, lines }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        track.orderFailed(String(data.error ?? "unknown"));
        setError(data.error ?? "Gửi đơn không thành công. Bạn thử lại giúp tụi em nhé.");
        setPending(false);
        window.setTimeout(() => errorRef.current?.focus(), 50);
        return;
      }

      // Fallback path: if no mail provider is configured the order is only in
      // the server log, so hand the customer a pre-filled email they can send.
      const bodyLines = [
        `Đơn hàng: ${data.code}`,
        `Tên: ${customer.name}`,
        `Điện thoại: ${customer.phone}`,
        `Địa chỉ: ${customer.address}`,
        customer.note ? `Ghi chú: ${customer.note}` : "",
        "",
        ...cart.lines.map((l) => `- ${l.name} (${l.colorName}) x${l.qty} = ${formatVnd(l.price * l.qty)}`),
        "",
        `Tạm tính: ${formatVnd(cart.subtotal)}`,
      ].filter(Boolean);
      const mailto = `mailto:${ORDER_INBOX}?subject=${encodeURIComponent(
        `Đơn hàng ${data.code} — ${customer.name}`,
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      track.orderPlaced({
        code: data.code,
        items: cart.count,
        subtotal: cart.subtotal,
        emailed: Boolean(data.emailed),
        hasAddress: customer.address.trim().length > 0,
      });
      setSent({ code: data.code, emailed: Boolean(data.emailed), mailto });
      cart.clear();
    } catch {
      track.orderFailed("network");
      setError("Mất kết nối. Bạn kiểm tra mạng rồi gửi lại giúp tụi em nhé.");
      window.setTimeout(() => errorRef.current?.focus(), 50);
    } finally {
      setPending(false);
    }
  }

  /* ---------------- sent ---------------- */
  if (sent) {
    return (
      <div className="sticker mx-auto max-w-xl rounded-[var(--radius-xl2)] bg-surface p-8 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full border-2 border-ink bg-lime">
          <Check className="size-8 text-ink" />
        </span>
        <h2 className="display mt-6 text-3xl">TỤI EM NHẬN ĐƠN RỒI!</h2>
        <p className="mt-3 font-mono text-lg font-bold text-flame">{sent.code}</p>

        {sent.emailed ? (
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
            Đơn đã được gửi tới mẹ Hiếu. Nhà em sẽ gọi lại cho bạn trong hôm nay hoặc sáng mai để xác nhận
            món, màu và phí giao hàng. Bạn giữ giúp mã đơn ở trên nhé.
          </p>
        ) : (
          <>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">
              Đơn đã được ghi lại. Để chắc chắn nhà em nhận được ngay, bạn bấm nút dưới đây để gửi luôn một
              email nhé — nội dung đã điền sẵn hết rồi.
            </p>
            <a href={sent.mailto} className="mt-5 inline-block">
              <Button size="lg">
                <Mail className="size-5" />
                GỬI EMAIL XÁC NHẬN
              </Button>
            </a>
          </>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="w-full">
              XEM TIẾP CÁC MÓN KHÁC
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- empty cart ---------------- */
  if (cart.lines.length === 0) {
    return (
      <div className="sticker mx-auto max-w-lg rounded-[var(--radius-xl2)] bg-surface p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl border-2 border-ink bg-paper-2">
          <ShoppingBag className="size-6 text-ink-2" />
        </span>
        <h2 className="display mt-5 text-2xl">GIỎ CỦA BẠN ĐANG TRỐNG</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          Bạn chọn vài món trước rồi quay lại đây điền thông tin nhé.
        </p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button size="lg">XEM CỬA HÀNG</Button>
        </Link>
      </div>
    );
  }

  /* ---------------- form ---------------- */
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
      <form onSubmit={submit} noValidate className="order-2 lg:order-1">
        <div className="sticker rounded-[var(--radius-xl2)] bg-surface p-6 sm:p-8">
          <h2 className="display text-2xl">CHỈ CẦN 2 Ô LÀ XONG</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
            Bạn để lại <strong className="text-ink">tên</strong> và{" "}
            <strong className="text-ink">số điện thoại</strong>. Mẹ Hiếu sẽ gọi lại hỏi địa chỉ và báo phí
            ship. Chưa trả tiền gì lúc này cả.
          </p>

          {error && (
            <p
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-2xl border-2 border-flame bg-flame-tint p-4 text-sm font-bold text-flame-2"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-6 space-y-5">
            <div>
              <Label htmlFor="name">Tên của bạn</Label>
              <Input id="name" name="name" required autoComplete="name" placeholder="Ví dụ: Chị Lan" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="09xx xxx xxx"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="address">Địa chỉ — để trống cũng được</Label>
              <Input
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="Không nhớ rõ thì bỏ qua, mẹ Hiếu sẽ hỏi khi gọi"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">Email — không bắt buộc</Label>
              <Input id="email" name="email" type="email" autoComplete="email" placeholder="email@cua-ban.com" className="mt-2" />
              <p className="mt-1.5 text-xs text-ink-3">Có email thì tụi em gửi ảnh sản phẩm trước khi đóng gói.</p>
            </div>
            <div>
              <Label htmlFor="note">Muốn dặn gì thêm không?</Label>
              <textarea
                id="note"
                name="note"
                rows={3}
                placeholder="Ví dụ: cần trước ngày 20, hoặc muốn đổi màu chữ."
                className="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-3 focus:border-flame focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full" disabled={pending}>
            {pending ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                ĐANG GỬI…
              </>
            ) : (
              "XONG, GỬI ĐƠN"
            )}
          </Button>
          <p className="mt-3 text-center text-sm font-semibold text-ink-2">
            Bấm xong là có người gọi lại cho bạn.
          </p>
          <p className="mt-2 text-center text-xs text-ink-3">
            Thông tin của bạn chỉ dùng để liên hệ và giao đơn hàng này.
          </p>

          <div className="mt-7 border-t-2 border-dashed border-ink/25 pt-6">
            <p className="text-center text-sm font-bold text-ink">Hoặc không cần điền gì cả</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a
                href={contact.tel}
                onClick={() => track.contactTapped("phone", "order-form")}
                className="sticker press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-flame font-display text-sm font-extrabold text-white"
              >
                <Phone className="size-4" aria-hidden />
                GỌI {contact.phoneDisplay}
              </a>
              <a
                href={contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="sticker press inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-sky font-display text-sm font-extrabold text-white"
              >
                <MessageCircle className="size-4" aria-hidden />
                NHẮN ZALO
              </a>
            </div>
          </div>
        </div>
      </form>

      {/* ---- summary ---- */}
      <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
        <div className="sticker rounded-[var(--radius-xl2)] bg-paper-2 p-6">
          <h2 className="display text-xl">ĐƠN CỦA BẠN</h2>
          <ul className="mt-5 space-y-3">
            {cart.lines.map((line) => (
              <li key={line.key} className="flex gap-3 rounded-2xl border-2 border-ink bg-surface p-3">
                <span
                  className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl p-1"
                  style={{ background: `${line.colorHex}22` }}
                >
                  <ProductVisual shape={line.shape} color={line.colorHex} uid={`sum-${line.key}`} label={line.name} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold">{line.name}</p>
                  <p className="mt-0.5 text-xs text-ink-3">
                    {line.colorName} · SL {line.qty}
                  </p>
                </div>
                <span className="shrink-0 font-display text-sm font-extrabold">
                  {formatVnd(line.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-baseline justify-between border-t-2 border-dashed border-ink/25 pt-4">
            <span className="eyebrow text-ink-3">Tạm tính</span>
            <span className="display text-2xl">{formatVnd(cart.subtotal)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-2">
            Chưa gồm phí giao hàng — mẹ Hiếu sẽ báo bạn khi gọi xác nhận.
          </p>
        </div>
      </aside>
    </div>
  );
}
