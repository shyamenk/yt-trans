// Application-wide TypeScript definitions
// This will be expanded as we implement features

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  duration: number;
  views: number;
  uploadDate: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface YouTubeTranscript {
  text: string;
  start: number;
  duration: number;
}

export interface YouTubeAnalysisResult {
  summary: string;
  keyInsights: string[];
  actionableSteps: string[];
  examples: Array<{
    title: string;
    description: string;
    timestamp?: number;
  }>;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedReadTime: number;
}

export interface YouTubeValidationResult {
  isValid: boolean;
  videoId: string | null;
  error: string | null;
  normalizedUrl: string | null;
}

export interface AnalysisResult {
  keyPoints: string[];
  actionableSteps: string[];
  examples: string[];
  summary: string;
  timestamp: Date;
}

export interface UsageData {
  analysesUsed: number;
  analysesRemaining: number;
  resetDate: string;
  lastAnalysisDate?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalysisApiResponse extends APIResponse<YouTubeAnalysisResult> {
  usage: {
    analysesUsed: number;
    analysesRemaining: number;
    resetDate: string;
  };
}

// Form types
export interface YouTubeUrlFormData {
  url: string;
}

// Component props types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface AnalysisRequest {
  url: string;
  videoId: string;
  analysisType?: 'summary' | 'detailed' | 'insights';
  includeTimestamps?: boolean;
} 