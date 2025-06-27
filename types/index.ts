// Application-wide TypeScript definitions
// This will be expanded as we implement features

export interface YouTubeVideo {
  id: string;
  title: string;
  duration: number;
  transcript?: string;
  thumbnail?: string;
}

export interface AnalysisResult {
  keyPoints: string[];
  actionableSteps: string[];
  examples: string[];
  summary: string;
  timestamp: Date;
}

export interface UsageData {
  count: number;
  limit: number;
  resetDate?: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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