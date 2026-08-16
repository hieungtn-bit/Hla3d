import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-extrabold whitespace-nowrap disabled:pointer-events-none disabled:opacity-45 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "sticker press bg-flame text-white",
        ink: "sticker press bg-ink text-paper",
        outline: "sticker press bg-surface text-ink",
        ghost: "tactile bg-transparent text-ink hover:bg-ink/8",
        surface: "sticker press bg-surface text-ink",
        lime: "sticker press bg-lime text-ink",
        sky: "sticker press bg-sky text-white",
        sun: "sticker press bg-sun text-ink",
        carbon: "border-2 border-carbon-line bg-carbon-2 text-white hover:border-flame/60",
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
