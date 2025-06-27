# Project Structure Documentation

This document explains the organized file structure for the YouTube Transcript AI Analyzer project.

## 📁 Directory Structure

```
yt-trans/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout with font integration
│   ├── page.tsx                 # Landing page (Issue #10 ✅)
│   ├── globals.css              # Design system & Tailwind CSS 4
│   └── favicon.ico              # App icon
│
├── components/                   # React components organized by purpose
│   ├── index.ts                 # Main barrel exports
│   ├── ui/                      # shadcn/ui components (Issue #3 ✅)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (13 components total)
│   ├── layout/                  # Layout-specific components
│   │   ├── index.ts
│   │   ├── header.tsx           # Header component (placeholder)
│   │   ├── footer.tsx           # Footer component (placeholder)
│   │   ├── navigation.tsx       # Navigation component (placeholder)
│   │   └── sidebar.tsx          # Sidebar component (placeholder)
│   ├── forms/                   # Form-specific components
│   │   ├── index.ts
│   │   ├── youtube-url-form.tsx # YouTube URL input (Issue #8)
│   │   ├── analysis-form.tsx    # Analysis form (placeholder)
│   │   └── feedback-form.tsx    # Feedback form (placeholder)
│   └── features/                # Feature-specific components
│       ├── index.ts
│       ├── youtube-analyzer.tsx # Main analyzer component
│       ├── usage-counter.tsx    # Usage tracking (Issue #9)
│       ├── results-display.tsx  # Analysis results display
│       └── copy-to-clipboard.tsx # Copy functionality
│
├── lib/                         # Utility functions and configurations
│   ├── index.ts                 # Barrel exports
│   ├── utils.ts                 # shadcn/ui utilities (Issue #3 ✅)
│   ├── validations.ts           # Form validation logic (Issue #8)
│   └── constants.ts             # App-wide constants and config
│
├── hooks/                       # Custom React hooks
│   ├── index.ts                 # Barrel exports
│   ├── use-youtube-analysis.ts  # YouTube analysis logic
│   ├── use-usage-tracking.ts    # Usage tracking logic (Issue #9)
│   └── use-clipboard.ts         # Clipboard functionality
│
├── types/                       # TypeScript type definitions
│   └── index.ts                 # All application types
│
├── public/                      # Static assets
│   ├── next.svg
│   ├── vercel.svg
│   └── ... (other assets)
│
├── issues.md                    # GitHub issues tracking
├── tasks.md                     # Task breakdown
├── prd.md                       # Product Requirements Document
├── PROJECT_STRUCTURE.md         # This file
└── ... (config files)
```

## 🎯 Import Strategy

### Clean Imports with Barrel Exports

All directories include `index.ts` files for clean importing:

```typescript
// ✅ Clean imports
import { Button, Card, Badge } from '@/components/ui';
import { YouTubeUrlForm } from '@/components/forms';
import { UsageCounter } from '@/components/features';
import { useYouTubeAnalysis } from '@/hooks';
import { APP_CONFIG } from '@/lib/constants';
import type { AnalysisResult } from '@/types';

// ❌ Avoid deep imports
import { Button } from '@/components/ui/button';
import { YouTubeUrlForm } from '@/components/forms/youtube-url-form';
```

### Path Aliases (tsconfig.json)

```json
{
  "paths": {
    "@/*": ["./*"],
    "@/components/*": ["./components/*"],
    "@/lib/*": ["./lib/*"],
    "@/hooks/*": ["./hooks/*"],
    "@/types/*": ["./types/*"]
  }
}
```

## 📋 Implementation Status

### ✅ Completed (Issue #5)
- Directory structure created
- Barrel export files for all directories
- Placeholder components for future implementation
- TypeScript type definitions
- Custom React hooks structure
- Utility functions organization
- Constants and configuration setup

### 🔄 Ready for Implementation
- **Issue #6**: App Layout improvements
- **Issue #8**: YouTube URL Form validation logic
- **Issue #9**: Dynamic usage tracking logic

## 🚀 Next Steps

1. **Issue #6** - Enhance `app/layout.tsx` with proper metadata and optimization
2. **Issue #8** - Implement form validation in `lib/validations.ts`
3. **Issue #9** - Add dynamic logic to `hooks/use-usage-tracking.ts`

## 📝 Notes

- All placeholder components return simple divs - they will be implemented in their respective issues
- Barrel exports prevent linting errors while maintaining clean import structure
- TypeScript strict mode compatible
- Ready for backend integration phase
- Follows Next.js 15 best practices and conventions

This structure provides a scalable foundation for the YouTube Transcript AI Analyzer application! 🎉 