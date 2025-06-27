import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "glass-effect rounded-glass animate-skeleton",
        "bg-gradient-to-r from-glass-bg via-text-secondary/10 to-glass-bg",
        "bg-[length:200%_100%] animate-gradient-x",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
