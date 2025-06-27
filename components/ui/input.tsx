import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "glass-effect w-full px-4 py-3 text-white placeholder:text-gray-400 transition-all duration-300",
          "border border-white/10 focus:border-purple-500 focus:shadow-lg focus:scale-[1.01]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
          "hover:border-purple-400/50 hover:shadow-lg",
          "outline-none focus:ring-2 focus:ring-purple-500/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
