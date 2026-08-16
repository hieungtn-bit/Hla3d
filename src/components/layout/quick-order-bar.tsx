"use client";

import { Phone, MessageCircle } from "lucide-react";
import { contact } from "@/data/site";

/**
 * The zero-typing order path, pinned to the bottom on phones.
 *
 * Two taps, no keyboard, no form, no reading required beyond one word per
 * button. This is the route for the buyer who would otherwise abandon at the
 * address field — and it is the pattern every small Vietnamese shop already
 * trains its customers on.
 *
 * Hidden on desktop, where the page has room to offer the same two actions
 * inline without covering anything.
 */
export function QuickOrderBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-80 border-t-2 border-ink bg-paper/95 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={contact.tel}
          className="sticker press flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-flame font-display text-base font-extrabold text-white"
        >
          <Phone className="size-5" aria-hidden />
          GỌI ĐẶT HÀNG
        </a>
        <a
          href={contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="sticker press flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-sky font-display text-base font-extrabold text-white"
        >
          <MessageCircle className="size-5" aria-hidden />
          NHẮN ZALO
        </a>
      </div>
    </div>
  );
}
