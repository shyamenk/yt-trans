"use client";

import { useState } from "react";
import { AlertTriangle, RefreshCw, Wifi, Server, Ban, HelpCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ErrorType =
  | "network"
  | "server"
  | "validation"
  | "rate-limit"
  | "api-key"
  | "youtube-api"
  | "ai-service"
  | "unknown";

export interface ErrorDisplayProps {
  error: {
    type?: ErrorType;
    message: string;
    code?: string | number;
    details?: string;
  };
  onRetry?: () => void;
  onReset?: () => void;
  retryCount?: number;
  maxRetries?: number;
  isRetrying?: boolean;
  className?: string;
}

const errorConfig = {
  network: {
    icon: Wifi,
    title: "Connection Error",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    suggestions: [
      "Check your internet connection",
      "Try refreshing the page",
      "Disable VPN if using one"
    ]
  },
  server: {
    icon: Server,
    title: "Server Error",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    suggestions: [
      "Our servers are experiencing issues",
      "Please try again in a few minutes",
      "Contact support if the issue persists"
    ]
  },
  validation: {
    icon: AlertTriangle,
    title: "Invalid Input",
    color: "text-chart-3",
    bgColor: "bg-chart-3/5",
    borderColor: "border-chart-3/20",
    suggestions: [
      "Please check your YouTube URL",
      "Ensure the video is public and accessible",
      "Try a different video URL"
    ]
  },
  "rate-limit": {
    icon: Ban,
    title: "Too Many Requests",
    color: "text-chart-4",
    bgColor: "bg-chart-4/5",
    borderColor: "border-chart-4/20",
    suggestions: [
      "You've reached the hourly limit",
      "Please wait before trying again",
      "Consider upgrading for higher limits"
    ]
  },
  "api-key": {
    icon: HelpCircle,
    title: "API Configuration Error",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    suggestions: [
      "There's an issue with our API configuration",
      "Our team has been notified",
      "Please try again later"
    ]
  },
  "youtube-api": {
    icon: AlertTriangle,
    title: "YouTube API Error",
    color: "text-chart-3",
    bgColor: "bg-chart-3/5",
    borderColor: "border-chart-3/20",
    suggestions: [
      "Unable to fetch video information",
      "Video might be private or deleted",
      "Try a different video URL"
    ]
  },
  "ai-service": {
    icon: Server,
    title: "AI Analysis Error",
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
    suggestions: [
      "AI service is temporarily unavailable",
      "Please try again in a few minutes",
      "Video analysis will resume shortly"
    ]
  },
  unknown: {
    icon: HelpCircle,
    title: "Something Went Wrong",
    color: "text-muted-foreground",
    bgColor: "bg-muted/5",
    borderColor: "border-muted/20",
    suggestions: [
      "An unexpected error occurred",
      "Please try again",
      "Contact support if the issue persists"
    ]
  }
};

export function ErrorDisplay({
  error,
  onRetry,
  onReset,
  retryCount = 0,
  maxRetries = 3,
  isRetrying = false,
  className
}: ErrorDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const config = errorConfig[error.type || "unknown"];
  const Icon = config.icon;
  const canRetry = onRetry && retryCount < maxRetries;
  const hasDetails = error.details || error.code;

  return (
    <Card
      className={cn(
        "border-0 shadow-xl overflow-hidden",
        config.bgColor,
        config.borderColor,
        "animate-in slide-in-from-bottom-4 duration-500",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-lg",
            config.bgColor,
            config.borderColor,
            "border-2"
          )}>
            <Icon className={cn("w-6 h-6", config.color)} />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className={cn("text-xl", config.color)}>
                {config.title}
              </CardTitle>
              {error.code && (
                <Badge variant="outline" className="text-xs">
                  Error {error.code}
                </Badge>
              )}
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {error.message}
            </p>

            {retryCount > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="w-3 h-3" />
                <span>Attempt {retryCount} of {maxRetries}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">
            What you can try:
          </h4>
          <ul className="space-y-2">
            {config.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {canRetry && (
            <Button
              onClick={onRetry}
              disabled={isRetrying}
              className={cn(
                "flex-1 gap-2",
                isRetrying && "animate-pulse"
              )}
            >
              <RefreshCw className={cn(
                "w-4 h-4",
                isRetrying && "animate-spin"
              )} />
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
          )}

          {onReset && (
            <Button
              variant="outline"
              onClick={onReset}
              className="flex-1 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Start Over
            </Button>
          )}
        </div>

        {/* Technical Details (Expandable) */}
        {hasDetails && (
          <div className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-muted-foreground h-auto p-0"
            >
              {isExpanded ? "Hide" : "Show"} technical details
            </Button>

            {isExpanded && (
              <div className="p-4 bg-muted/30 rounded-lg border">
                <div className="space-y-2 text-xs text-muted-foreground font-mono">
                  {error.code && (
                    <div>
                      <span className="font-semibold">Code:</span> {error.code}
                    </div>
                  )}
                  {error.details && (
                    <div>
                      <span className="font-semibold">Details:</span>
                      <pre className="mt-1 whitespace-pre-wrap">{error.details}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Simplified error component for inline errors
export function InlineError({
  message,
  onRetry,
  className
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm",
        className
      )}
      role="alert"
    >
      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
      <span className="text-destructive flex-1">{message}</span>
      {onRetry && (
        <Button size="sm" variant="ghost" onClick={onRetry} className="h-auto p-1">
          <RefreshCw className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
} 