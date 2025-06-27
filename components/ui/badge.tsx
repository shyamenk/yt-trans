import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "glass-effect border-glass-border text-text-primary hover:bg-gradient-card",
        secondary:
          "bg-gradient-to-r from-text-secondary/20 to-text-secondary/10 text-text-secondary hover:from-text-secondary/30 hover:to-text-secondary/20",
        destructive:
          "bg-gradient-to-r from-error/20 to-error/10 border-error/30 text-error hover:from-error/30 hover:to-error/20",
        success:
          "bg-gradient-to-r from-success/20 to-success/10 border-success/30 text-success hover:from-success/30 hover:to-success/20 shadow-glow-success",
        warning:
          "bg-gradient-to-r from-warning/20 to-warning/10 border-warning/30 text-warning hover:from-warning/30 hover:to-warning/20",
        primary:
          "bg-gradient-primary text-white shadow-button hover:shadow-glow-primary hover:scale-105",
        accent:
          "bg-gradient-accent text-white shadow-button hover:shadow-glow-accent hover:scale-105",
        glass:
          "glass-effect backdrop-blur-lg text-text-primary border-glass-border hover:border-gradient-start hover:text-gradient-start",
        outline:
          "border-glass-border text-text-primary hover:bg-gradient-card hover:border-gradient-start",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
