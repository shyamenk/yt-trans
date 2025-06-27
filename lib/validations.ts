// Validation utilities for forms and inputs
// YouTube URL validation implementation for Issue #8

import { APP_CONFIG } from './constants';

/**
 * Validates if a given URL is a valid YouTube URL
 * @param url - The URL to validate
 * @returns boolean - True if valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Trim whitespace and ensure URL has protocol
  const trimmedUrl = url.trim();
  const urlToCheck = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;

  try {
    const urlObj = new URL(urlToCheck);
    const hostname = urlObj.hostname;
    return APP_CONFIG.YOUTUBE_URL_PATTERNS.some(pattern => pattern.test(urlToCheck)) && 
           (hostname.includes('youtube.com') || hostname === 'youtu.be');
  } catch {
    return false;
  }
}

/**
 * Extracts video ID from YouTube URL
 * @param url - The YouTube URL
 * @returns string | null - Video ID if found, null otherwise
 */
export function extractVideoId(url: string): string | null {
  if (!isValidYouTubeUrl(url)) {
    return null;
  }

  const trimmedUrl = url.trim();
  const urlToCheck = trimmedUrl.startsWith('http') ? trimmedUrl : `https://${trimmedUrl}`;

  try {
    const urlObj = new URL(urlToCheck);
    
    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
      const videoParam = urlObj.searchParams.get('v');
      return videoParam !== null ? videoParam : null;
    }
    
    // Handle youtu.be/VIDEO_ID
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1); // Remove leading slash
    }
    
    // Handle youtube.com/embed/VIDEO_ID
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      const embedPath = urlObj.pathname.split('/embed/')[1];
      return embedPath || null;
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * YouTube URL validation result interface
 */
export interface YouTubeValidationResult {
  isValid: boolean;
  videoId: string | null;
  error: string | null;
  normalizedUrl: string | null;
}

/**
 * Comprehensive YouTube URL validation with detailed results
 * @param url - The URL to validate
 * @returns YouTubeValidationResult - Detailed validation result
 */
export function validateYouTubeUrl(url: string): YouTubeValidationResult {
  // Check if URL is empty
  if (!url || !url.trim()) {
    return {
      isValid: false,
      videoId: null,
      error: 'Please enter a YouTube URL',
      normalizedUrl: null,
    };
  }

  const trimmedUrl = url.trim();

  // Check if URL is valid YouTube URL
  if (!isValidYouTubeUrl(trimmedUrl)) {
    return {
      isValid: false,
      videoId: null,
      error: 'Please enter a valid YouTube URL (youtube.com/watch?v=... or youtu.be/...)',
      normalizedUrl: null,
    };
  }

  // Extract video ID
  const videoId = extractVideoId(trimmedUrl);
  if (!videoId) {
    return {
      isValid: false,
      videoId: null,
      error: 'Could not extract video ID from the URL',
      normalizedUrl: null,
    };
  }

  // Validate video ID format (should be 11 characters)
  if (videoId.length !== 11) {
    return {
      isValid: false,
      videoId: null,
      error: 'Invalid YouTube video ID format',
      normalizedUrl: null,
    };
  }

  // Create normalized URL
  const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return {
    isValid: true,
    videoId,
    error: null,
    normalizedUrl,
  };
}

/**
 * Form validation utilities
 */
export const formValidation = {
  /**
   * Validates required fields
   */
  required: (value: string, fieldName: string = 'Field'): string | null => {
    return !value || !value.trim() ? `${fieldName} is required` : null;
  },

  /**
   * Validates email format
   */
  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
  },

  /**
   * Validates minimum length
   */
  minLength: (value: string, min: number, fieldName: string = 'Field'): string | null => {
    return value.length < min ? `${fieldName} must be at least ${min} characters` : null;
  },
}; 