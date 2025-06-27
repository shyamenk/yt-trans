'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Clock, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUsageTracking } from '@/hooks/use-usage-tracking';

interface UsageCounterProps {
  className?: string;
  showProgress?: boolean;
  showResetTimer?: boolean;
}

export function UsageCounter({
  className = "",
  showProgress = false,
  showResetTimer = false
}: UsageCounterProps) {
  const {
    usage,
    hasUsageRemaining,
    isLoading,
    getTimeUntilReset,
    getUsagePercentage
  } = useUsageTracking();

  const [timeUntilReset, setTimeUntilReset] = useState({ hours: 0, minutes: 0 });

  // Update reset timer every minute
  useEffect(() => {
    if (!showResetTimer) return;

    const updateTimer = () => {
      setTimeUntilReset(getTimeUntilReset());
    };

    updateTimer(); // Initial update
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [getTimeUntilReset, showResetTimer]);

  if (isLoading) {
    return (
      <Badge className={`px-4 py-2 bg-secondary/20 border border-border rounded-full animate-pulse ${className}`}>
        <Sparkles className="w-4 h-4 mr-2" />
        Loading...
      </Badge>
    );
  }

  const usagePercentage = getUsagePercentage();
  const isLimitReached = !hasUsageRemaining;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Main Usage Badge */}
      <Badge
        className={`px-4 py-2 border rounded-full transition-colors ${isLimitReached
          ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300'
          : usagePercentage >= 75
            ? 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300'
            : 'bg-secondary/20 border border-border text-secondary-foreground'
          }`}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {isLimitReached ? (
          'Limit reached'
        ) : (
          `${usage.analysesRemaining} free ${usage.analysesRemaining === 1 ? 'analysis' : 'analyses'} remaining`
        )}
      </Badge>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Usage: {usage.analysesUsed}/{usage.analysesUsed + usage.analysesRemaining}</span>
            <span>{usagePercentage}%</span>
          </div>
          <Progress
            value={usagePercentage}
            className="h-2"
            aria-label={`Usage progress: ${usagePercentage}%`}
          />
        </div>
      )}

      {/* Reset Timer */}
      {showResetTimer && isLimitReached && (
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          {timeUntilReset.hours > 0 || timeUntilReset.minutes > 0 ? (
            <span>
              Resets in {timeUntilReset.hours > 0 && `${timeUntilReset.hours}h `}
              {timeUntilReset.minutes}m
            </span>
          ) : (
            <span className="flex items-center">
              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
              Resetting...
            </span>
          )}
        </div>
      )}

      {/* Last Analysis Date */}
      {usage.lastAnalysisDate && showResetTimer && (
        <div className="text-xs text-muted-foreground text-center">
          Last used: {new Date(usage.lastAnalysisDate).toLocaleString()}
        </div>
      )}
    </div>
  );
} 