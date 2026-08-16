import * as React from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Shared page header so every route opens with the same rhythm:
 * eyebrow → big display headline → one honest paragraph → hard numbers.
 */
export function PageIntro({
  eyebrow,
  title,
  description,
  meta,
  tone = "light",
  className,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: Array<{ label: string; value: string }>;
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b",
        dark ? "border-carbon-line bg-carbon text-white" : "border-line bg-paper",
        className,
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 opacity-60", dark ? "grid-carbon" : "grid-paper")} />
      <div
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 size-96 rounded-full blur-3xl",
          dark ? "bg-flame/20" : "bg-flame/8",
        )}
      />
      <div className="container-hla relative py-16 sm:py-20">
        <Reveal>
          <span className={cn("eyebrow", dark ? "text-flame" : "text-ink-3")}>{eyebrow}</span>
          <h1
            className={cn(
              "display mt-5 text-[clamp(2.5rem,7vw,4.5rem)]",
              dark ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
                dark ? "text-white/60" : "text-ink-2",
              )}
            >
              {description}
            </p>
          )}
        </Reveal>

        {meta && meta.length > 0 && (
          <Reveal delay={0.1}>
            <dl
              className={cn(
                "mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t pt-6",
                dark ? "border-carbon-line" : "border-line",
              )}
            >
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className={cn("eyebrow", dark ? "text-white/40" : "text-ink-3")}>{item.label}</dt>
                  <dd className={cn("display mt-2 text-2xl", dark ? "text-white" : "text-ink")}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
