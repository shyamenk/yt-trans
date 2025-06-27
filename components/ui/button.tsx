import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-ring-primary group relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-white shadow-button hover:shadow-button-hover hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0",
        destructive:
          "bg-gradient-to-r from-error to-red-600 text-white shadow-button hover:shadow-glow-error hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]",
        outline:
          "glass-button border-glass-border text-text-primary hover:bg-glass-bg hover:border-gradient-start hover:text-gradient-start hover:scale-[1.02] hover:-translate-y-1",
        secondary:
          "glass-effect text-text-secondary hover:text-text-primary hover:bg-gradient-card hover:scale-[1.02] hover:-translate-y-1",
        ghost:
          "text-text-secondary hover:glass-effect hover:text-text-primary hover:scale-[1.02] hover:-translate-y-1",
        link: "text-gradient-primary underline-offset-4 hover:underline hover:text-gradient-accent",
        gradient:
          "bg-gradient-accent text-white shadow-button hover:shadow-glow-accent hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]",
        glass:
          "glass-button text-text-primary backdrop-blur-lg hover:bg-gradient-primary hover:text-white hover:scale-[1.02] hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-button gap-1.5 px-4 has-[>svg]:px-3 text-sm",
        lg: "h-12 rounded-button px-8 has-[>svg]:px-6 text-base font-medium",
        xl: "h-14 rounded-button px-10 has-[>svg]:px-8 text-lg font-semibold",
        icon: "size-10 rounded-button",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
