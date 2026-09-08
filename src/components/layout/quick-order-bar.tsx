"use client";

import { usePathname } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { contact } from "@/data/site";
import { track } from "@/lib/analytics";

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
 *
 * And hidden entirely on the two classrooms. A fixed "GỌI ĐẶT HÀNG" bar
 * pinned under a free children's lesson makes the lesson look like bait for
 * the shop, which is both untrue and the fastest way for a parent to stop
 * trusting the rest of the page. The lessons also want the screen.
 */
const NO_BAR = ["/hoc-tieng-anh", "/hoc-toan"];

export function QuickOrderBar() {
  const pathname = usePathname();
  if (NO_BAR.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-80 border-t-2 border-ink bg-paper/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={contact.tel}
          onClick={() => track.contactTapped("phone", "bar")}
          className="sticker press flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-flame font-display text-base font-extrabold text-white"
        >
          <Phone className="size-5" aria-hidden />
          GỌI ĐẶT HÀNG
        </a>
        <a
          href={contact.zalo}
          onClick={() => track.contactTapped("zalo", "bar")}
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

/**
 * The spacer that keeps the fixed bar off the last row of content.
 *
 * It lives next to the bar and reads the same rule, so the two can never
 * disagree — a spacer left behind on a page with no bar is a mystery gap at
 * the foot of every lesson.
 */
export function QuickOrderSpacer() {
  const pathname = usePathname();
  if (NO_BAR.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <div className="h-20 lg:hidden" aria-hidden />;
}
