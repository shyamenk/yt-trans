 // Application constants and configuration
// This contains all app-wide constants from the PRD

export const APP_CONFIG = {
  // Usage limits
  FREE_ANALYSIS_LIMIT: 2,
  MAX_VIDEO_DURATION_MINUTES: 15,
  
  // YouTube API
  YOUTUBE_URL_PATTERNS: [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ],
  
  // AI Analysis
  CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',
  MAX_TRANSCRIPT_LENGTH: 100000,
  
  // UI
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 4000,
} as const;

export const ROUTES = {
  HOME: '/',
  ANALYSIS: '/analysis',
  RESULTS: '/results',
  ABOUT: '/about',
} as const;

export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  TRANSCRIPT: '/api/transcript',
  USAGE: '/api/usage',
} as const;