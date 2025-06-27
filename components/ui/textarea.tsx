import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "glass-effect w-full min-h-[120px] px-4 py-3 text-text-primary placeholder:text-text-secondary/60 transition-all duration-300",
          "border-glass-border focus:border-gradient-start focus:shadow-glow-primary focus:scale-[1.01]",
          "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          "hover:border-gradient-start/50 hover:shadow-glass-lg",
          "outline-none focus-ring-primary rounded-glass",
          "backdrop-blur-md field-sizing-content",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
