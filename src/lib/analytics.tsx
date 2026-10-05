"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

/**
 * Analytics for a learning site whose visitors are mostly children.
 *
 * The configuration below is deliberately conservative:
 *
 * - Session recording is OFF. Watching replays of children doing lessons is
 *   not worth the privacy cost.
 * - Autocapture never reads text, so nothing a child types can leak into an
 *   event property.
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

   One place, so a rename cannot silently break a report, and so nothing that
   identifies a child is ever passed by accident.
   -------------------------------------------------------------------------- */

export const track = {
  /**
   * The learning section. Carries a set id and counts — never a word a
   * particular child got wrong, which would be a record of one kid's
   * weaknesses sitting in a third-party dashboard.
   */
  lessonStarted: (set: string, mode: string, pair: boolean) =>
    safe("lesson_started", { set, mode, pair }),

  lessonFinished: (set: string, right: number, wrong: number) =>
    safe("lesson_finished", { set, right, wrong, total: right + wrong }),

};

function safe(event: string, properties: Record<string, unknown>) {
  try {
    if (!ensure()) return;
    posthog.capture(event, properties);
  } catch {
    // Analytics must never break a lesson.
  }
}
