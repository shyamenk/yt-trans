// Custom hook for usage tracking functionality
// This will be implemented in Issue #9 logic

import { useState, useEffect } from 'react';
import type { UsageData } from '@/types';
import { APP_CONFIG } from '@/lib/constants';

export function useUsageTracking() {
  const [usage, setUsage] = useState<UsageData>({
    analysesUsed: 0,
    analysesRemaining: APP_CONFIG.FREE_ANALYSIS_LIMIT,
    resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Placeholder - will load from localStorage or API
    const savedUsage = localStorage.getItem('usage_data');
    if (savedUsage) {
      setUsage(JSON.parse(savedUsage));
    }
    setIsLoading(false);
  }, []);

  const incrementUsage = () => {
    const newUsage = {
      ...usage,
      analysesUsed: Math.min(usage.analysesUsed + 1, APP_CONFIG.FREE_ANALYSIS_LIMIT),
      analysesRemaining: Math.max(usage.analysesRemaining - 1, 0),
    };
    setUsage(newUsage);
    localStorage.setItem('usage_data', JSON.stringify(newUsage));
  };

  const hasUsageRemaining = usage.analysesRemaining > 0;

  return {
    usage,
    incrementUsage,
    hasUsageRemaining,
    isLoading,
  };
}