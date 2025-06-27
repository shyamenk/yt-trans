'use client';

import { ResultsDisplay } from '@/components/features/results-display';
import type { YouTubeAnalysisResult, YouTubeVideo } from '@/types';

const sampleVideoData: YouTubeVideo = {
  id: 'dQw4w9WgXcQ',
  title: 'Advanced React Patterns: Building Scalable Components',
  channel: 'Tech Educator',
  duration: 1847,
  views: 125000,
  uploadDate: '2024-01-15',
  description: 'Learn advanced React patterns.',
  thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

const sampleAnalysisResult: YouTubeAnalysisResult = {
  summary: 'This comprehensive tutorial covers advanced React patterns essential for building scalable applications.',
  keyInsights: [
    'Compound components provide better API design',
    'Render props pattern enables flexible component composition',
    'Custom hooks allow for better state logic reusability'
  ],
  actionableSteps: [
    'Refactor existing components to use compound component pattern',
    'Implement custom hooks for common state logic',
    'Add TypeScript interfaces for better type safety'
  ],
  examples: [
    {
      title: 'Compound Component Example',
      description: 'Modal component with sub-components',
      timestamp: 425
    }
  ],
  tags: ['React', 'TypeScript', 'Patterns'],
  difficulty: 'Advanced',
  estimatedReadTime: 8
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <ResultsDisplay
        analysisResult={sampleAnalysisResult}
        videoData={sampleVideoData}
      />
    </div>
  );
}
