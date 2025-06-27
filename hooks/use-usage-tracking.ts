// Custom hook for usage tracking functionality
// Dynamic usage tracking implementation for Issue #9

import { useState, useEffect, useCallback } from 'react';
import type { UsageData } from '@/types';
import { APP_CONFIG } from '@/lib/constants';

const STORAGE_KEY = 'yt_analyzer_usage_data';

/**
 * Creates initial usage data with reset date 24 hours from now
 */
function createInitialUsageData(): UsageData {
  const resetDate = new Date();
  resetDate.setHours(24, 0, 0, 0); // Reset at midnight tomorrow

  return {
    analysesUsed: 0,
    analysesRemaining: APP_CONFIG.FREE_ANALYSIS_LIMIT,
    resetDate: resetDate.toISOString(),
    lastAnalysisDate: undefined,
  };
}

/**
 * Checks if usage data should be reset based on reset date
 */
function shouldResetUsage(resetDate: string): boolean {
  const now = new Date();
  const reset = new Date(resetDate);
  return now >= reset;
}

/**
 * Loads usage data from localStorage with validation
 */
function loadUsageData(): UsageData {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      return createInitialUsageData();
    }

    const parsed: UsageData = JSON.parse(savedData);
    
    // Validate required properties
    if (
      typeof parsed.analysesUsed !== 'number' ||
      typeof parsed.analysesRemaining !== 'number' ||
      typeof parsed.resetDate !== 'string'
    ) {
      console.warn('Invalid usage data structure, resetting');
      return createInitialUsageData();
    }

    // Check if data should be reset
    if (shouldResetUsage(parsed.resetDate)) {
      console.log('Usage limit reset time reached, creating new data');
      return createInitialUsageData();
    }

    return parsed;
  } catch (error) {
    console.error('Error loading usage data:', error);
    return createInitialUsageData();
  }
}

/**
 * Saves usage data to localStorage
 */
function saveUsageData(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving usage data:', error);
  }
}

export function useUsageTracking() {
  const [usage, setUsage] = useState<UsageData>(createInitialUsageData);
  const [isLoading, setIsLoading] = useState(true);

  // Load usage data on mount
  useEffect(() => {
    const loadedUsage = loadUsageData();
    setUsage(loadedUsage);
    setIsLoading(false);
  }, []);

  // Increment usage count
  const incrementUsage = useCallback(() => {
    setUsage(currentUsage => {
      // Check if we've hit the limit
      if (currentUsage.analysesRemaining <= 0) {
        console.warn('Usage limit reached, cannot increment');
        return currentUsage;
      }

      const newUsage: UsageData = {
        ...currentUsage,
        analysesUsed: currentUsage.analysesUsed + 1,
        analysesRemaining: currentUsage.analysesRemaining - 1,
        lastAnalysisDate: new Date().toISOString(),
      };

      // Save to localStorage
      saveUsageData(newUsage);
      
      return newUsage;
    });
  }, []);

  // Reset usage manually (for testing or admin purposes)
  const resetUsage = useCallback(() => {
    const newUsage = createInitialUsageData();
    setUsage(newUsage);
    saveUsageData(newUsage);
  }, []);

  // Check if usage can be incremented
  const hasUsageRemaining = usage.analysesRemaining > 0;

  // Get time until reset
  const getTimeUntilReset = useCallback(() => {
    const now = new Date();
    const reset = new Date(usage.resetDate);
    const diff = reset.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { hours: 0, minutes: 0 };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
  }, [usage.resetDate]);

  // Get usage percentage
  const getUsagePercentage = useCallback(() => {
    return Math.round((usage.analysesUsed / APP_CONFIG.FREE_ANALYSIS_LIMIT) * 100);
  }, [usage.analysesUsed]);

  // Check if usage should be reset and reset if needed
  useEffect(() => {
    if (shouldResetUsage(usage.resetDate) && !isLoading) {
      console.log('Auto-resetting usage data');
      resetUsage();
    }
  }, [usage.resetDate, isLoading, resetUsage]);

  return {
    usage,
    incrementUsage,
    resetUsage,
    hasUsageRemaining,
    isLoading,
    getTimeUntilReset,
    getUsagePercentage,
  };
}