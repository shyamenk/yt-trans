"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export function CopyToClipboard({
  text,
  children,
  className,
  variant = "ghost",
  size = "sm"
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: copied
      ? 'oklch(0.8003 0.1821 151.7110 / 0.15)'
      : isHovered
        ? 'oklch(0.2940 0.0130 272.9312)'
        : 'transparent',
    borderColor: copied
      ? 'oklch(0.8003 0.1821 151.7110 / 0.4)'
      : isHovered
        ? 'oklch(0.6132 0.2294 291.7437 / 0.4)'
        : 'oklch(0.3289 0.0092 268.3843)',
    color: copied
      ? 'oklch(0.8003 0.1821 151.7110)'
      : isHovered
        ? 'oklch(0.6132 0.2294 291.7437)'
        : 'oklch(0.7058 0 0)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: 'var(--radius-md, 1.2rem)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: copied
      ? '0 0 20px oklch(0.8003 0.1821 151.7110 / 0.3)'
      : isHovered
        ? '0 0 16px oklch(0.6132 0.2294 291.7437 / 0.2)'
        : 'var(--shadow-sm)',
  };

  return (
    <Button
      onClick={handleCopy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant={variant}
      size={size}
      className={cn(
        "group relative transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "font-medium tracking-tight",
        className
      )}
      style={buttonStyle}
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <span className="flex items-center gap-2">
        {copied ? (
          <Check
            className="h-4 w-4 transition-all duration-200"
            style={{ color: 'oklch(0.8003 0.1821 151.7110)' }}
          />
        ) : (
          <Copy
            className="h-4 w-4 transition-all duration-200 group-hover:scale-110"
          />
        )}
        {children && (
          <span className="transition-all duration-200">
            {children}
          </span>
        )}
      </span>

      {/* Success feedback overlay */}
      {copied && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, oklch(0.8003 0.1821 151.7110 / 0.1) 0%, transparent 70%)',
            animation: 'pulse 0.6s ease-out',
          }}
        />
      )}

      {/* Hover glow effect */}
      {isHovered && !copied && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, oklch(0.6132 0.2294 291.7437 / 0.08) 0%, transparent 70%)',
            transform: 'scale(1.1)',
            transition: 'all 0.3s ease-out',
          }}
        />
      )}
    </Button>
  );
}

export default CopyToClipboard;