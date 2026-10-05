"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

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

type PostHog = typeof import("posthog-js").default;

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: Array<[string, Record<string, unknown>]> = [];

function doNotTrack(): boolean {
  // `window.doNotTrack` is the legacy IE/old-Safari spelling; not in lib.dom.
  const legacyDnt = (window as unknown as { doNotTrack?: string }).doNotTrack;
  return navigator.doNotTrack === "1" || legacyDnt === "1";
}

/**
 * Loads posthog-js only after the page is idle.
 *
 * The library is about 80 KB of JavaScript. Fetched up front it competes with
 * the lesson a child opened the page for, so it is imported once the browser
 * has nothing better to do, and events raised before then wait in a queue.
 * Nothing is loaded at all under Do Not Track.
 */
function load(): Promise<PostHog | null> {
  if (loading) return loading;
  if (typeof window === "undefined" || doNotTrack()) return (loading = Promise.resolve(null));
  loading = new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(() => resolve(), { timeout: 4000 });
    else setTimeout(resolve, 2000);
  })
    .then(() => import("posthog-js"))
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false, // sent manually so App Router navigations count
        capture_pageleave: true,
        disable_session_recording: true,
        // Each of these downloads another script; the site uses none of them.
        disable_surveys: true,
        capture_dead_clicks: false,
        capture_performance: false,
        autocapture: {
          // Never read the text of what a person typed or tapped.
          element_attribute_ignorelist: ["value", "placeholder", "title", "aria-label"],
        },
        mask_all_text: false,
        mask_all_element_attributes: false,
        persistence: "localStorage+cookie",
      });
      client = posthog;
      for (const [event, props] of queue.splice(0)) posthog.capture(event, props);
      return posthog;
    })
    .catch(() => null);
  return loading;
}

function capture(event: string, properties: Record<string, unknown>) {
  if (typeof window === "undefined" || doNotTrack()) return;
  if (client) {
    client.capture(event, properties);
    return;
  }
  if (queue.length < 50) queue.push([event, properties]);
  void load();
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Record each App Router navigation as its own pageview.
  React.useEffect(() => {
    capture("$pageview", { $current_url: window.location.href, path: pathname });
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
    capture(event, properties);
  } catch {
    // Analytics must never break a lesson.
  }
}
