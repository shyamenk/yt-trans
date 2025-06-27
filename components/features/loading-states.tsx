"use client";

import { useState, useEffect } from "react";
import { Loader2, Youtube, Brain, CheckCircle, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonVideo } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type LoadingStage =
  | "validating"
  | "fetching"
  | "analyzing"
  | "formatting"
  | "complete";

export interface LoadingStatesProps {
  stage?: LoadingStage;
  progress?: number;
  message?: string;
  videoTitle?: string;
  className?: string;
}

const stageConfig = {
  validating: {
    icon: Youtube,
    title: "Validating YouTube URL",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    description: "Checking video accessibility and permissions..."
  },
  fetching: {
    icon: Youtube,
    title: "Fetching Video Data",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description: "Downloading transcript and video metadata..."
  },
  analyzing: {
    icon: Brain,
    title: "AI Analysis in Progress",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    description: "Claude is analyzing the content and generating insights..."
  },
  formatting: {
    icon: Zap,
    title: "Formatting Results",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    description: "Organizing analysis into key insights and action steps..."
  },
  complete: {
    icon: CheckCircle,
    title: "Analysis Complete",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Ready to display your personalized insights!"
  }
};

export function LoadingStates({
  stage = "validating",
  progress = 0,
  message,
  videoTitle,
  className
}: LoadingStatesProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const config = stageConfig[stage];
  const Icon = config.icon;

  // Animate progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
      {/* Main Loading Card */}
      <Card className={cn(
        "border-0 shadow-xl overflow-hidden transition-all duration-500",
        config.bgColor,
        "animate-in slide-in-from-bottom-4"
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-lg",
              config.bgColor,
              "border-2 border-current/20"
            )}>
              <Icon className={cn(
                "w-6 h-6",
                config.color,
                stage !== "complete" && "animate-pulse"
              )} />
            </div>

            <div className="flex-1 space-y-1">
              <CardTitle className={cn("text-lg", config.color)}>
                {config.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {message || config.description}
              </p>
            </div>

            {stage !== "complete" && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {Math.round(animatedProgress)}%
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(animatedProgress)}% complete</span>
            </div>
            <Progress
              value={animatedProgress}
              className="h-2"
              aria-label={`Loading progress: ${animatedProgress}%`}
            />
          </div>

          {/* Video Title if available */}
          {videoTitle && (
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {videoTitle}
                </span>
              </div>
            </div>
          )}

          {/* Stage Timeline */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {Object.entries(stageConfig).slice(0, 4).map(([key, stageInfo], index) => {
              const isCompleted = getStageIndex(stage) > index;
              const isCurrent = key === stage;
              const StageIcon = stageInfo.icon;

              return (
                <div
                  key={key}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300",
                    isCompleted && "bg-green-50 dark:bg-green-950/20",
                    isCurrent && stageInfo.bgColor
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                    isCompleted && "bg-green-500 text-white",
                    isCurrent && `${stageInfo.color} bg-current/20`,
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <StageIcon className={cn(
                        "w-3 h-3",
                        isCurrent && "animate-pulse"
                      )} />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs text-center font-medium",
                    isCompleted && "text-green-600",
                    isCurrent && stageInfo.color,
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}>
                    {stageInfo.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estimated Time */}
      <Card className="border-0 bg-muted/20 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Estimated time remaining</span>
            </div>
            <span className="font-medium text-foreground">
              {getEstimatedTime(stage)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Results Loading Skeleton
export function ResultsLoadingSkeleton({ className }: { className?: string; }) {
  return (
    <div className={cn("w-full max-w-5xl mx-auto space-y-8 p-4", className)}>
      {/* Video Info Skeleton */}
      <SkeletonVideo />

      {/* Navigation Tabs Skeleton */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Skeleton */}
      <SkeletonCard className="h-96" />
    </div>
  );
}

// Form Loading Skeleton
export function FormLoadingSkeleton({ className }: { className?: string; }) {
  return (
    <Card className={cn("border-0 shadow-xl", className)}>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <SkeletonText lines={2} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

// Inline Loading Component
export function InlineLoading({
  message = "Loading...",
  className
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 bg-muted/10 rounded-lg text-sm",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-4 h-4 animate-spin text-primary" />
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
}

// Helper functions
function getStageIndex(stage: LoadingStage): number {
  const stages: LoadingStage[] = ["validating", "fetching", "analyzing", "formatting", "complete"];
  return stages.indexOf(stage);
}

function getEstimatedTime(stage: LoadingStage): string {
  const timeMap = {
    validating: "10-15 seconds",
    fetching: "15-30 seconds",
    analyzing: "30-60 seconds",
    formatting: "5-10 seconds",
    complete: "Complete!"
  };
  return timeMap[stage];
} 