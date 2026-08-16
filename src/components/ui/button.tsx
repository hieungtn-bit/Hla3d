import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "tactile inline-flex items-center justify-center gap-2 rounded-full font-display font-bold tracking-tight whitespace-nowrap disabled:pointer-events-none disabled:opacity-45 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-flame text-white shadow-[var(--shadow-flame)] hover:bg-flame-2",
        ink: "bg-ink text-paper hover:bg-ink/90",
        outline: "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        ghost: "bg-transparent text-ink hover:bg-ink/6",
        surface: "bg-surface text-ink shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
        lime: "bg-lime text-ink hover:brightness-105",
        carbon: "border border-carbon-line bg-carbon-2 text-white hover:border-flame/60",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem] [&_svg]:size-4",
        md: "h-11 px-6 text-[0.9375rem] [&_svg]:size-4",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
