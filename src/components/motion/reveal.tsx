"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled on entry, in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * One scroll-reveal primitive for the whole site so motion stays consistent
 * and restrained.
 *
 * Plain CSS transitions toggled by an IntersectionObserver — no animation
 * library, so it costs a few hundred bytes. `prefers-reduced-motion` and
 * no-JavaScript are both handled in globals.css (`.reveal`), so content is
 * never left invisible.
 */
export function Reveal({ children, className, delay = 0, y = 20, as = "div" }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -64px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      className: cn("reveal", shown && "reveal-in", className),
      style: { "--reveal-y": `${y}px`, transitionDelay: delay ? `${delay}s` : undefined } as React.CSSProperties,
    },
    children,
  );
}
