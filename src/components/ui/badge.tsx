import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "eyebrow inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 leading-none",
  {
    variants: {
      variant: {
        flame: "bg-flame text-white",
        tint: "bg-flame-tint text-flame-2",
        ink: "bg-ink text-paper",
        outline: "border border-line bg-surface/70 text-ink-2",
        lime: "bg-lime text-ink",
        sky: "bg-sky/15 text-sky",
        carbon: "border border-carbon-line bg-carbon-2 text-white/70",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
