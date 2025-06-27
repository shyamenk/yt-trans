import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "default" | "rounded" | "circular" | "text" | "card" | "video";
  animate?: boolean;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", animate = true, ...props }, ref) => {
    const baseClasses = cn(
      "bg-gradient-to-r from-muted/50 via-muted/70 to-muted/50",
      "bg-[length:200%_100%]",
      animate && "animate-[shimmer_1.8s_ease-in-out_infinite]",
      "transition-opacity duration-300",
    );

    const variantClasses = {
      default: "h-4 rounded-md",
      rounded: "rounded-lg",
      circular: "rounded-full",
      text: "h-4 rounded-sm",
      card: "h-32 rounded-xl",
      video: "aspect-video rounded-lg",
    };

    return (
      <div
        ref={ref}
        data-testid="skeleton"
        role="status"
        aria-label="Loading content"
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Specialized skeleton components for common patterns
export const SkeletonText = ({ lines = 3, className, ...props }: { lines?: number; } & SkeletonProps) => (
  <div className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={cn(
          "w-full",
          i === lines - 1 && "w-3/4" // Last line shorter
        )}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className, ...props }: SkeletonProps) => (
  <div className={cn("p-6 space-y-4 border rounded-xl bg-card", className)} {...props}>
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" className="h-12 w-12" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <SkeletonText lines={3} />
  </div>
);

export const SkeletonVideo = ({ className, ...props }: SkeletonProps) => (
  <div className={cn("space-y-4", className)} {...props}>
    <Skeleton variant="video" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  </div>
);

export { Skeleton };
