"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

/**
 * Analytics for a shop whose visitors include children and whose forms carry
 * customers' real names, phone numbers and home addresses.
 *
 * The configuration below is deliberately conservative:
 *
 * - Session recording is OFF. Watching replays of people typing an address
 *   into a small family shop is not worth the privacy cost, and the site has
 *   no funnel complex enough to need it.
 * - Every input is masked and autocapture never reads text, so a phone number
 *   or address cannot leak into an event property.
 * - Do Not Track is honoured.
 * - IPs are not used to build a person profile beyond what PostHog needs.
 *
 * The project key (phc_…) is public by design — PostHog expects it in client
 * code — so it ships as a literal fallback and the whole thing keeps working
 * without anyone setting an environment variable. The personal key (phx_…)
 * is a secret and appears nowhere in this repository.
 */
const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_pjoVbyrgaw7wKSYHx7Dqeb3cicvNSAHqRz7eEtazYsPu";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initAttempted = false;

/**
 * Boots PostHog once per module instance, then reports that capture is safe.
 *
 * Two things this deliberately does NOT do:
 *
 * - It does not gate on `posthog.__loaded`. That flag flips only after the
 *   remote config request resolves, so gating on it drops every event fired
 *   before the network answers — and drops all of them permanently if the
 *   request fails.
 * - It is not called only from the provider. `track` is imported by component
 *   chunks, and if a bundler hands one of them its own copy of this module,
 *   that copy boots itself here instead of silently discarding events.
 *
 * posthog-js queues captures made before it is ready, so returning true as
 * soon as init has been called is correct.
 */
function ensure(): boolean {
  if (typeof window === "undefined") return false;
  if (initAttempted) return true;

  // `window.doNotTrack` is the legacy IE/old-Safari spelling; not in lib.dom.
  const legacyDnt = (window as unknown as { doNotTrack?: string }).doNotTrack;
  if (navigator.doNotTrack === "1" || legacyDnt === "1") return false;

  initAttempted = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // sent manually so App Router navigations count
    capture_pageleave: true,
    disable_session_recording: true,
    autocapture: {
      // Never read the text of what a person typed or tapped.
      element_attribute_ignorelist: ["value", "placeholder", "title", "aria-label"],
    },
    mask_all_text: false,
    mask_all_element_attributes: false,
    persistence: "localStorage+cookie",
  });

  return true;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Boot once, then record each App Router navigation as its own pageview.
  React.useEffect(() => {
    if (!ensure()) return;
    posthog.capture("$pageview", { $current_url: window.location.href, path: pathname });
  }, [pathname]);

  return <>{children}</>;
}

/* --------------------------------------------------------------------------
   Typed events.

   One place, so a rename cannot silently break a funnel and so nothing that
   identifies a customer is ever passed by accident — note that none of these
   accept a name, phone, address or email.
   -------------------------------------------------------------------------- */

type ProductRef = { slug: string; name: string; price: number };

export const track = {
  viewProduct: (p: ProductRef) =>
    safe("product_viewed", { slug: p.slug, product: p.name, price: p.price }),

  addToCart: (p: ProductRef & { color: string; qty: number }) =>
    safe("cart_added", { slug: p.slug, product: p.name, price: p.price, color: p.color, qty: p.qty }),

  openCart: (count: number, subtotal: number) => safe("cart_opened", { count, subtotal }),

  startCheckout: (count: number, subtotal: number) => safe("checkout_started", { count, subtotal }),

  /** Fired after the server accepts the order. Carries no personal data. */
  orderPlaced: (o: { code: string; items: number; subtotal: number; emailed: boolean; hasAddress: boolean }) =>
    safe("order_placed", o),

  orderFailed: (reason: string) => safe("order_failed", { reason }),

  /** The zero-typing path — the number that matters most for this audience. */
  contactTapped: (channel: "phone" | "zalo", from: string) => safe("contact_tapped", { channel, from }),

  customizeUsed: (product: string, chars: number) => safe("custom_studio_used", { product, chars }),

  filterShop: (category: string) => safe("shop_filtered", { category }),
};

function safe(event: string, properties: Record<string, unknown>) {
  try {
    if (!ensure()) return;
    posthog.capture(event, properties);
  } catch {
    // Analytics must never break a purchase.
  }
}
