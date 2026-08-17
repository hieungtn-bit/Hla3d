import { NextResponse } from "next/server";
import {
  ORDER_INBOX,
  makeOrderCode,
  renderOrderEmail,
  validateOrder,
} from "@/lib/order";
import { renderOrderEmailHtml } from "@/lib/order-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Order intake.
 *
 * There is no database and no payment gateway — deliberately. For a shop that
 * takes a handful of made-to-order jobs a week, the mother's inbox IS the
 * order book, and that is a real, durable store she already checks.
 *
 * Email goes out through Resend's REST API, called with plain fetch so the
 * project gains no dependency. If RESEND_API_KEY is not set the request still
 * succeeds and the order is written to the server log, and the response says
 * `emailed: false` so the UI can hand the customer a pre-filled mail link
 * instead of silently swallowing the order.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Không đọc được dữ liệu đơn hàng." }, { status: 400 });
  }

  const parsed = validateOrder(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const order = parsed.value;
  const code = makeOrderCode();
  const text = renderOrderEmail(order, code);
  // HTML for the inbox, plain text for clients that refuse it.
  const html = renderOrderEmailHtml(order, code);

  // Always logged, so an order is recoverable from Vercel logs even if the
  // mail provider is down or unconfigured.
  console.info(`[order] ${code}\n${text}`);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: true, code, emailed: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ORDER_FROM_EMAIL ?? "HLA3D <onboarding@resend.dev>",
        to: [ORDER_INBOX.toLowerCase()],
        reply_to: order.customer.email ? [order.customer.email] : undefined,
        subject: `🧡 Đơn mới ${code} — ${order.customer.name} · ${order.customer.phone}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Log the provider's reason verbatim. A rejected send is invisible to
      // the customer, so this is the only trace of why an order never arrived.
      console.error(`[order] ${code} email failed: ${res.status} ${await res.text()}`);
      return NextResponse.json({ ok: true, code, emailed: false });
    }
  } catch (err) {
    console.error(`[order] ${code} email threw`, err);
    return NextResponse.json({ ok: true, code, emailed: false });
  }

  return NextResponse.json({ ok: true, code, emailed: true });
}
