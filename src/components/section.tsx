import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  action,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {(index || eyebrow) && (
          <div
            className={cn(
              "eyebrow mb-4 flex items-center gap-3",
              align === "center" && "justify-center",
              tone === "dark" ? "text-white/45" : "text-ink-3",
            )}
          >
            {index && (
              <span className="grid size-7 place-items-center rounded-lg border-2 border-ink bg-sun text-ink">
                {index}
              </span>
            )}
            {eyebrow && (
              <span className={tone === "dark" ? "text-white/60" : "text-ink-2"}>{eyebrow}</span>
            )}
          </div>
        )}
        <h2
          className={cn(
            "display text-[clamp(2rem,5.2vw,3.5rem)]",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-5 text-base leading-relaxed font-semibold text-pretty sm:text-lg",
              tone === "dark" ? "text-white/60" : "text-ink-2",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      {children}
    </section>
  );
}
