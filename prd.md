# YouTube Transcript AI Analyzer - Product Requirements Document

## 1. Project Overview

### Product Vision

Build an intelligent YouTube transcript analyzer that extracts, analyzes, and summarizes video content using AWS Bedrock Claude Sonnet 4, providing users with key insights, actionable steps, and examples in a beautifully formatted dark-themed interface with modern glassmorphism effects.

### Core Features

- YouTube URL input and transcript extraction
- AI-powered analysis with Claude Sonnet 4
- Markdown-formatted output with key points, actionable steps, and examples
- Usage limits (2 free transcripts, max 15-minute videos)
- Copy-to-clipboard functionality
- Responsive, modern dark UI with gradient accents and glassmorphism effects

## 2. Technology Stack

### Frontend

- **Framework**: Next.js 15.3.4 (App Router)
- **React**: v19.0.0 (Latest with concurrent features)
- **Styling**: Tailwind CSS v4 (Latest with container queries and modern features)
- **Components**: shadcn/ui v2 (Compatible with Next.js 15)
- **State Management**: React useState/useReducer + TanStack Query v5
- **TypeScript**: v5 (Strict mode enabled)

### Backend

- **API Routes**: Next.js 15 API routes with enhanced performance
- **Database**: Neon PostgreSQL
- **ORM**: Prisma v6 (Latest with enhanced performance)
- **AI Service**: AWS Bedrock Claude Sonnet 4
- **Authentication**: NextAuth.js v5 (Auth.js)

### Deployment & Infrastructure

- **Hosting**: Vercel (Optimized for Next.js 15)
- **Database**: Neon DB (PostgreSQL)
- **CDN**: Vercel Edge Network
- **Environment**: Serverless with Edge Runtime support

## 3. UI/UX Design Specifications

### Design System (Based on ui.json)

#### Color Palette - Modern Dark Theme

```css
/* Dark Theme Primary Colors */
--background: #1a1a2e
--surface: #16213e
--text: #ffffff
--text-secondary: #a0a0a0

/* Gradient Accents */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--gradient-background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)

/* Semantic Colors */
--success: #4ecdc4
--warning: #ffe66d
--error: #ff6b6b
--info: #4dabf7
--highlight: #ff6b6b
```

#### Typography Scale (Inter Font Family)

```css
/* Typography using Inter font */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

/* Scale */
--text-hero: 4rem; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em
--text-h1: 3rem; font-weight: 600; line-height: 1.2
--text-h2: 2rem; font-weight: 600; line-height: 1.3
--text-body: 1rem; font-weight: 400; line-height: 1.6
--text-caption: 0.875rem; font-weight: 400; line-height: 1.5
```

#### Glassmorphism Effects

```css
/* Glass morphism for modern look */
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Card shadows */
.card-shadow {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* Button gradient shadow */
.button-shadow {
  box-shadow: 0 4px 16px rgba(240, 147, 251, 0.3);
}
```

### Layout Structure

#### Header Component
- Fixed position with blur backdrop
- Logo with gradient text effect
- Theme toggle (dark/light)
- Usage counter with gradient badge
- Responsive hamburger menu (mobile)

#### Hero Section
- Centered layout with max-width 800px
- Gradient text on key terms
- Large CTA button with gradient background
- Supporting microcopy

#### Main Content Area
- Glass-morphism cards for content sections
- Gradient borders and accents
- Loading states with skeleton UI and blur effects
- Error states with glassmorphism styling

### Component Specifications

#### Input Form with Glassmorphism

```typescript
interface InputFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
  disabled: boolean;
  remainingUsage: number;
}

// Styling: Glass input with gradient button
// Background: rgba(255,255,255,0.05) with blur(10px)
// Border: 2px solid rgba(255,255,255,0.1)
// Button: Gradient background with hover lift effect
```

#### Analysis Results with Dark Theme

```typescript
interface AnalysisResultProps {
  transcript: string;
  analysis: string;
  videoMetadata: {
    title: string;
    duration: string;
    thumbnail: string;
  };
  onCopy: () => void;
}

// Styling: Dark cards with gradient accents
// Glass morphism effects for depth
// Gradient text for section headings
```

### Responsive Breakpoints (Tailwind CSS 4)

```css
/* Tailwind CSS 4 breakpoints */
@breakpoint sm(640px) { /* Mobile landscape */ }
@breakpoint md(768px) { /* Tablet */ }
@breakpoint lg(1024px) { /* Desktop */ }
@breakpoint xl(1280px) { /* Large desktop */ }
@breakpoint 2xl(1536px) { /* Extra large */ }
```

### Animation Guidelines

- **Micro-interactions**: 300ms ease transition
- **Page transitions**: Smooth with blur effects
- **Loading states**: Skeleton with subtle pulse
- **Hover effects**: Lift transform with shadow enhancement
- **Focus states**: Gradient outline rings

## 4. Coding Style Guide

### File Structure (Next.js 15)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   ├── analyze/
│   │   ├── transcript/
│   │   ├── usage/
│   │   └── auth/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── forms/
│   ├── layout/
│   └── features/
├── lib/
│   ├── utils.ts
│   ├── db.ts
│   ├── auth.ts
│   ├── aws-bedrock.ts
│   └── youtube-api.ts
├── hooks/
├── types/
└── constants/
```

### Next.js 15 Specific Features

#### App Router Enhancements

```typescript
// app/layout.tsx - Root layout with React 19
import { Inter } from 'next/font/google';
import { Metadata, Viewport } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'YouTube Transcript AI Analyzer',
  description: 'AI-powered YouTube video analysis with Claude Sonnet 4',
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
```

#### Server Components with React 19

```typescript
// app/page.tsx - Server component with React 19 features
import { Suspense } from 'react';
import { YouTubeAnalyzer } from '@/components/features/youtube-analyzer';
import { AnalysisResultsSkeleton } from '@/components/ui/loading-skeletons';

export default async function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center space-y-8 mb-16">
        <h1 className="text-6xl font-bold">
          <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            AI-Powered
          </span>{' '}
          YouTube Analysis
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Extract insights, actionable steps, and examples from any YouTube video 
          using advanced AI analysis
        </p>
      </section>
      
      <Suspense fallback={<AnalysisResultsSkeleton />}>
        <YouTubeAnalyzer />
      </Suspense>
    </main>
  );
}
```

#### Enhanced API Routes (Next.js 15)

```typescript
// app/api/analyze/route.ts - Enhanced with Next.js 15 features
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'edge'; // Edge runtime for better performance

export async function POST(request: NextRequest) {
  try {
    // Enhanced rate limiting
    await rateLimit(request.ip ?? 'anonymous');
    
    // Session handling with Auth.js v5
    const session = await auth();
    
    const body = await request.json();
    // ... rest of implementation
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Tailwind CSS 4 Configuration

```typescript
// tailwind.config.ts - Tailwind CSS 4
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        background: '#1a1a2e',
        surface: '#16213e',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-bg': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

## 5. Security Best Practices

### Environment Variables Security

```typescript
// lib/env.ts - Server-side only
import { z } from "zod";

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().default("us-east-1"),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### API Security

#### Rate Limiting

```typescript
// lib/rate-limit.ts
import { headers } from "next/headers";

const rateLimitMap = new Map();

export async function rateLimit(identifier: string, limit = 10) {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute window

  const requests = rateLimitMap.get(identifier) || [];
  const recentRequests = requests.filter((time: number) => time > windowStart);

  if (recentRequests.length >= limit) {
    throw new Error("Rate limit exceeded");
  }

  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
}
```

#### Input Validation

```typescript
// lib/validation.ts
import { z } from "zod";

export const youtubeUrlSchema = z
  .string()
  .url("Invalid URL format")
  .refine((url) => {
    const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/;
    return youtubeRegex.test(url);
  }, "Must be a valid YouTube URL");

export const analyzeRequestSchema = z.object({
  videoUrl: youtubeUrlSchema,
  userId: z.string().optional(),
});
```

#### CORS Configuration

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.ALLOWED_ORIGINS || "https://yourdomain.com",
          },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
```

### Data Protection

#### Sanitization

```typescript
// lib/sanitize.ts
import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["p", "strong", "em", "ul", "ol", "li", "h1", "h2", "h3"],
    ALLOWED_ATTR: [],
  });
}
```

#### Database Security

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fieldReference"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique @db.VarChar(255)
  // Add indices for performance
  @@index([email])
  @@map("users")
}
```

## 6. Vercel Deployment Configuration

### Project Structure for Deployment

```
project-root/
├── .env.local (local development)
├── .env.example (template)
├── next.config.ts (TypeScript config)
├── vercel.json
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── app/ (Next.js 15 app directory)
```

### Next.js 15 Configuration

```typescript
// next.config.ts - TypeScript configuration for Next.js 15
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js 15 specific optimizations
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk'],
    ppr: true, // Partial Pre-rendering
    reactCompiler: true, // React Compiler integration
  },
  
  // Image optimization with modern formats
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Enhanced security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://img.youtube.com https://i.ytimg.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.youtube.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  
  // Bundle optimization
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Client-side optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
  
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
```

### Vercel Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm ci",
  "outputDirectory": ".next",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30,
      "runtime": "nodejs20.x"
    }
  },
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "SKIP_ENV_VALIDATION": "1",
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://your-domain.com"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### Environment Variables Setup

```bash
# Production Environment Variables (Vercel Dashboard)
# Database
DATABASE_URL=postgresql://username:password@host:5432/dbname
SHADOW_DATABASE_URL=postgresql://username:password@host:5432/dbname_shadow

# AWS Bedrock
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# YouTube API
YOUTUBE_API_KEY=your-youtube-api-key

# NextAuth.js (Auth.js v5)
AUTH_SECRET=your-32-character-secret
AUTH_URL=https://your-app.vercel.app

# Optional: Monitoring
SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ID=your-analytics-id

# Feature flags
ENABLE_ANALYTICS=true
ENABLE_ERROR_TRACKING=true
```

### Build Configuration

```typescript
// Build optimization for Next.js 15
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static generation optimizations
  output: 'standalone',
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
        })
      );
      return config;
    },
  }),
  
  // Environment-specific configurations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
};

module.exports = nextConfig;
```

### Deployment Script

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "build:analyze": "ANALYZE=true npm run build",
    "deploy": "vercel --prod",
    "deploy:preview": "vercel",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "postinstall": "prisma generate",
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

## 7. Neon DB Configuration

### Database Setup

```sql
-- Initial setup script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analyses_created_at ON analyses(created_at);
```

### Connection Configuration

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### Migration Strategy

```bash
# Development
npx prisma db push

# Production
npx prisma migrate deploy
```

## 8. Prisma ORM Configuration

### Schema Design

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String?   @unique @db.VarChar(255)
  name          String?   @db.VarChar(255)
  image         String?
  usage         Int       @default(0)
  usageResetAt  DateTime  @default(now())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  analyses      Analysis[]
  accounts      Account[]
  sessions      Session[]

  @@index([email])
  @@index([usage])
  @@map("users")
}

model Analysis {
  id          String   @id @default(cuid())
  videoUrl    String   @db.VarChar(500)
  videoId     String   @db.VarChar(50)
  title       String?  @db.VarChar(500)
  duration    Int?     // in seconds
  transcript  String   @db.Text
  analysis    String   @db.Text
  keyPoints   String[] @db.Text[]
  actionSteps String[] @db.Text[]
  examples    String[] @db.Text[]

  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([videoId])
  @@index([createdAt])
  @@map("analyses")
}

// NextAuth.js required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

### Query Patterns

```typescript
// lib/queries/user.ts
export async function getUserUsage(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      usage: true,
      usageResetAt: true,
    },
  });
}

export async function incrementUserUsage(userId: string) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      usage: { increment: 1 },
    },
  });
}

// lib/queries/analysis.ts
export async function createAnalysis(data: {
  videoUrl: string;
  videoId: string;
  transcript: string;
  analysis: string;
  userId?: string;
}) {
  return await prisma.analysis.create({
    data,
  });
}

export async function getUserAnalyses(userId: string, limit = 10) {
  return await prisma.analysis.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
```

## 9. shadcn/ui Component Integration

### Installation & Setup (Compatible with Next.js 15 & Tailwind CSS 4)

```bash
# Initialize shadcn/ui with Tailwind CSS 4 support
npx shadcn@latest init

# Install core components
npx shadcn@latest add button card input textarea
npx shadcn@latest add dialog alert progress badge
npx shadcn@latest add dropdown-menu separator
npx shadcn@latest add skeleton toast tabs
npx shadcn@latest add avatar scroll-area
```

### Theme Configuration (Dark Theme Focus)

```typescript
// tailwind.config.ts - Tailwind CSS 4 with dark theme
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.05)',
        ring: '#667eea',
        background: '#1a1a2e',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#667eea',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#16213e',
          foreground: '#a0a0a0',
        },
        destructive: {
          DEFAULT: '#ff6b6b',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          foreground: '#a0a0a0',
        },
        accent: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#16213e',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          foreground: '#ffffff',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '6px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '10px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Global CSS with Glass Morphism (app/globals.css)

```css
@import 'tailwindcss';

@layer base {
  :root {
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-gradient-to-br from-background to-secondary text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  /* Glass morphism utility classes */
  .glass {
    @apply bg-white/5 backdrop-blur-sm border border-white/10;
  }
  
  .glass-strong {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }
  
  .gradient-text {
    @apply bg-gradient-primary bg-clip-text text-transparent;
  }
  
  .gradient-border {
    @apply border border-transparent bg-gradient-primary bg-clip-border;
  }
  
  /* Custom scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Focus styles */
  .focus-visible:focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-background;
  }
}

@layer components {
  /* Button variants with gradients */
  .btn-gradient {
    @apply bg-gradient-accent text-white font-medium px-4 py-2 rounded-lg;
    @apply hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200;
    @apply focus-visible:ring-2 focus-visible:ring-pink-400;
  }
  
  .btn-glass {
    @apply glass text-white font-medium px-4 py-2 rounded-lg;
    @apply hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200;
  }
}
```

### Enhanced Component Examples with Dark Theme

```typescript
// components/ui/loading-button.tsx
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(({ loading, loadingText, children, disabled, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      disabled={loading || disabled}
      className={cn(
        'bg-gradient-accent hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  );
});

LoadingButton.displayName = 'LoadingButton';
```

### Component Composition Pattern with Glass Morphism

```typescript
// components/features/youtube-form.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface YouTubeFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
  remainingUsage: number;
}

export function YouTubeForm({ onSubmit, loading, remainingUsage }: YouTubeFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      await onSubmit(url.trim());
    }
  };

  return (
    <Card className="glass-strong border-white/20 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <PlayCircle className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold">
            <span className="gradient-text">AI-Powered</span> Video Analysis
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Extract insights, actionable steps, and examples from any YouTube video
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge 
            variant={remainingUsage > 0 ? 'default' : 'destructive'}
            className={cn(
              'px-3 py-1',
              remainingUsage > 0 
                ? 'bg-gradient-primary text-white' 
                : 'bg-destructive text-destructive-foreground'
            )}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {remainingUsage}/2 analyses remaining
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="glass border-white/20 text-white placeholder:text-white/50 h-12"
              disabled={loading || remainingUsage === 0}
            />
          </div>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingText="Analyzing video..."
            disabled={remainingUsage === 0 || !url.trim()}
            className="w-full h-12 text-lg font-semibold"
          >
            {remainingUsage === 0 ? 'Usage Limit Reached' : 'Analyze Video'}
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Dark Theme Analysis Results Component

```typescript
// components/features/analysis-results.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Copy, 
  CheckCircle, 
  Lightbulb, 
  Target, 
  BookOpen, 
  Clock 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  analysis: {
    keyPoints: string[];
    actionableSteps: string[];
    examples: string[];
    summary: string;
    videoMetadata: {
      title: string;
      duration: string;
      thumbnail: string;
    };
  };
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const content = `
# ${analysis.videoMetadata.title}

## Summary
${analysis.summary}

## Key Points
${analysis.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

## Actionable Steps
${analysis.actionableSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Examples
${analysis.examples.map((example, i) => `${i + 1}. ${example}`).join('\n')}
    `.trim();
    
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Video Metadata */}
      <Card className="glass-strong border-white/20">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">
              {analysis.videoMetadata.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="glass">
                <Clock className="h-3 w-3 mr-1" />
                {analysis.videoMetadata.duration}
              </Badge>
            </div>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className={cn(
              'glass border-white/20 transition-all duration-200',
              copied && 'bg-green-500/20 border-green-500/50'
            )}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Results
              </>
            )}
          </Button>
        </CardHeader>
      </Card>

      {/* Summary */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {analysis.summary}
          </p>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Key Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            <ul className="space-y-3">
              {analysis.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-gradient-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Actionable Steps */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Actionable Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            <ol className="space-y-3">
              {analysis.actionableSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-gradient-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Examples */}
      {analysis.examples.length > 0 && (
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Examples & Case Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {analysis.examples.map((example, index) => (
                  <div key={index} className="glass-strong p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="glass">
                        {index + 1}
                      </Badge>
                      <p className="text-foreground leading-relaxed">{example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

## 10. Tailwind CSS Styling Guidelines

### Utility-First Approach

```typescript
// ✅ Good - Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <Badge className="bg-blue-100 text-blue-800">New</Badge>
</div>

// ❌ Bad - Custom CSS classes
<div className="custom-header">
  <h2 className="custom-title">Title</h2>
  <Badge className="custom-badge">New</Badge>
</div>
```

### Responsive Design Patterns

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text sizing */}
</div>

<div className="p-4 md:p-6 lg:p-8">
  {/* Responsive padding */}
</div>
```

### Component-Specific Styling

```typescript
// components/ui/analysis-card.tsx
export function AnalysisCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        "transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Animation Classes

```css
/* globals.css - Custom animations */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }

  .animate-pulse-slow {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 11. Cursor IDE Rules & Configuration

### Cursor Rules File

```yaml
# .cursorrules
# YouTube Transcript Analyzer - Cursor IDE Rules

## Project Context
This is a Next.js 14+ application using TypeScript, Tailwind CSS, shadcn/ui, Prisma ORM, and AWS Bedrock for AI analysis.

## File Structure Rules
- Use TypeScript for all new files
- Place components in `src/components/` with appropriate subfolders
- API routes go in `src/app/api/`
- Use the app router structure
- Database queries go in `src/lib/queries/`
- Utilities go in `src/lib/utils/`

## Coding Standards
1. **TypeScript**: Always use strict TypeScript with proper typing
2. **Components**: Use React functional components with hooks
3. **Styling**: Use Tailwind utility classes, avoid custom CSS
4. **State Management**: Prefer useState and useReducer over external libraries
5. **Error Handling**: Always implement proper error boundaries and try-catch blocks
6. **Performance**: Use React.memo, useMemo, and useCallback appropriately

## Import Organization
```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from 'next/server';

// 2. Third-party libraries
import { z } from 'zod';
import { prisma } from '@/lib/db';

// 3. Internal utilities and types
import { cn } from '@/lib/utils';
import type { AnalysisResult } from '@/types';

// 4. UI components (shadcn/ui)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 5. Custom components
import { YouTubeForm } from '@/components/features/youtube-form';
```

## Component Patterns

- Always use interface for props
- Export components as named exports
- Use forwardRef for components that need ref forwarding
- Implement proper loading and error states

## API Route Patterns

- Validate input with Zod schemas
- Use proper HTTP status codes
- Implement rate limiting
- Always handle errors gracefully
- Use TypeScript for request/response types

## Database Patterns

- Use Prisma for all database operations
- Implement proper indexing
- Use transactions for related operations
- Always handle connection errors

## Security Rules

- Never expose sensitive environment variables to client
- Validate all user inputs
- Implement proper authentication checks
- Use HTTPS for all external API calls
- Sanitize user-generated content

## Performance Rules

- Implement proper caching strategies
- Use Next.js Image component for images
- Lazy load non-critical components
- Optimize bundle size with dynamic imports

## Testing Patterns

- Write unit tests for utilities
- Test API routes with proper mocking
- Test components with React Testing Library
- Use MSW for API mocking in tests

## Documentation Rules

- Document complex functions with JSDoc
- Add README for each major feature
- Keep inline comments minimal but meaningful
- Document environment variables in .env.example
```

### VSCode/Cursor Settings
```json
// .vscode/settings.json
{
  "typescript.preferences.preferTypeOnlyAutoImports": true,
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "typescriptreact",
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Snippets Configuration

```json
// .vscode/snippets/typescript-react.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:Component}Props {",
      "  ${2:// props}",
      "}",
      "",
      "export function ${1:Component}({ ${3:props} }: ${1:Component}Props) {",
      "  return (",
      "    <div>",
      "      ${4:// content}",
      "    </div>",
      "  );",
      "}"
    ]
  },
  "API Route Handler": {
    "prefix": "api",
    "body": [
      "import { NextRequest, NextResponse } from 'next/server';",
      "import { z } from 'zod';",
      "",
      "const requestSchema = z.object({",
      "  ${1:// schema}",
      "});",
      "",
      "export async function ${2:POST}(request: NextRequest) {",
      "  try {",
      "    const body = await request.json();",
      "    const validatedData = requestSchema.parse(body);",
      "    ",
      "    ${3:// implementation}",
      "    ",
      "    return NextResponse.json({ success: true, data: result });",
      "  } catch (error) {",
      "    console.error('API Error:', error);",
      "    return NextResponse.json(",
      "      { error: 'Internal server error' },",
      "      { status: 500 }",
      "    );",
      "  }",
      "}"
    ]
  },
  "Custom Hook": {
    "prefix": "hook",
    "body": [
      "import { useState, useEffect } from 'react';",
      "",
      "interface Use${1:Hook}Return {",
      "  ${2:// return type}",
      "}",
      "",
      "export function use${1:Hook}(): Use${1:Hook}Return {",
      "  ${3:// implementation}",
      "  ",
      "  return {",
      "    ${4:// return values}",
      "  };",
      "}"
    ]
  }
}
```

### Extensions Recommended

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "ms-playwright.playwright",
    "vitest.explorer",
    "prisma.prisma",
    "aws-amplify.aws-amplify-vscode"
  ]
}
```

## 12. AWS Bedrock Claude Integration

### AWS Configuration

```typescript
// lib/aws-bedrock.ts
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface AnalysisPrompt {
  transcript: string;
  videoTitle?: string;
  videoDuration?: number;
}

export interface AnalysisResponse {
  keyPoints: string[];
  actionableSteps: string[];
  examples: string[];
  summary: string;
  analysis: string;
}

export async function analyzeTranscriptWithClaude(
  prompt: AnalysisPrompt
): Promise<AnalysisResponse> {
  const systemPrompt = `You are an expert content analyzer. Analyze the provided YouTube video transcript and extract:

1. **Key Points**: 3-5 main insights or concepts (bullet points)
2. **Actionable Steps**: 3-7 specific steps viewers can take
3. **Examples**: Real examples or case studies mentioned
4. **Summary**: 2-3 sentence overview
5. **Analysis**: Detailed analysis in markdown format

Format your response as valid JSON with these exact keys: keyPoints, actionableSteps, examples, summary, analysis.

Each keyPoints and actionableSteps item should be concise (1-2 sentences).
Examples should include context and details.
Analysis should be comprehensive and well-structured in markdown.`;

  const userPrompt = `Video Title: ${prompt.videoTitle || "Not provided"}
Duration: ${prompt.videoDuration ? `${Math.floor(prompt.videoDuration / 60)} minutes` : "Unknown"}

Transcript:
${prompt.transcript}

Please analyze this transcript and provide insights in the requested JSON format.`;

  const requestBody = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 4000,
    temperature: 0.7,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  };

  try {
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(requestBody),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    // Parse Claude's response
    const content = responseBody.content[0].text;
    const analysisResult = JSON.parse(content);

    return {
      keyPoints: analysisResult.keyPoints || [],
      actionableSteps: analysisResult.actionableSteps || [],
      examples: analysisResult.examples || [],
      summary: analysisResult.summary || "",
      analysis: analysisResult.analysis || "",
    };
  } catch (error) {
    console.error("AWS Bedrock Error:", error);
    throw new Error("Failed to analyze transcript with Claude");
  }
}
```

### Error Handling & Retry Logic

```typescript
// lib/aws-bedrock-retry.ts
export class BedrockRetryError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryAfter?: number
  ) {
    super(message);
    this.name = "BedrockRetryError";
  }
}

export async function analyzeWithRetry(
  prompt: AnalysisPrompt,
  maxRetries = 3
): Promise<AnalysisResponse> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await analyzeTranscriptWithClaude(prompt);
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.warn(`Bedrock attempt ${attempt} failed, retrying in ${delay}ms`);
    }
  }

  throw new BedrockRetryError(
    `Failed to analyze transcript after ${maxRetries} attempts: ${lastError.message}`
  );
}
```

## 13. YouTube API Integration

### Transcript Extraction

```typescript
// lib/youtube-api.ts
interface YouTubeVideoInfo {
  id: string;
  title: string;
  duration: number;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
}

interface TranscriptItem {
  text: string;
  start: number;
  duration: number;
}

export async function getVideoInfo(videoId: string): Promise<YouTubeVideoInfo> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video information");
  }

  const data = await response.json();
  const video = data.items[0];

  if (!video) {
    throw new Error("Video not found");
  }

  return {
    id: videoId,
    title: video.snippet.title,
    duration: parseDuration(video.contentDetails.duration),
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    thumbnail: video.snippet.thumbnails.high.url,
  };
}

export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    // Using youtube-transcript library or similar
    const { YoutubeTranscript } = await import('youtube-transcript');
    
    const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
    
    return transcriptItems
      .map((item: TranscriptItem) => item.text)
      .join(' ')
      .replace(/\[.*?\]/g, '') // Remove captions like [Music]
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  } catch (error) {
    console.error('Transcript extraction error:', error);
    throw new Error('Failed to extract transcript. Video may not have captions or captions may be disabled.');
  }
}

function parseDuration(duration: string): number {
  // Parse ISO 8601 duration (PT15M33S) to seconds
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function validateVideoConstraints(videoInfo: YouTubeVideoInfo): void {
  const MAX_DURATION = 15 * 60; // 15 minutes in seconds

  if (videoInfo.duration > MAX_DURATION) {
    throw new Error(
      `Video is too long (${Math.floor(videoInfo.duration / 60)} minutes). Maximum allowed duration is 15 minutes.`
    );
  }
}
```

## 14. Testing Strategy

### Unit Testing Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```typescript
// test/setup.ts
import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock AWS SDK
vi.mock('@aws-sdk/client-bedrock-runtime', () => ({
  BedrockRuntimeClient: vi.fn(),
  InvokeModelCommand: vi.fn(),
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(() => {
  cleanup();
});
```

### Test Examples

```typescript
// __tests__/components/youtube-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { YouTubeForm } from '@/components/features/youtube-form';

describe('YouTubeForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form with input and button', () => {
    render(
      <YouTubeForm 
        onSubmit={mockOnSubmit}
        loading={false}
        remainingUsage={2}
      />
    );

    expect(screen.getByPlaceholderText(/youtube.com/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze video/i })).toBeInTheDocument();
    expect(screen.getByText('2/2 remaining')).toBeInTheDocument();
  });

  it('disables submit when no usage remaining', () => {
    render(
      <YouTubeForm 
        onSubmit={mockOnSubmit}
        loading={false}
        remainingUsage={0}
      />
    );

    const button = screen.getByRole('button', { name: /analyze video/i });
    expect(button).toBeDisabled();
    expect(screen.getByText('0/2 remaining')).toBeInTheDocument();
  });

  it('submits valid YouTube URL', async () => {
    render(
      <YouTubeForm 
        onSubmit={mockOnSubmit}
        loading={false}
        remainingUsage={1}
      />
    );

    const input = screen.getByPlaceholderText(/youtube.com/);
    const button = screen.getByRole('button', { name: /analyze video/i });

    fireEvent.change(input, { 
      target: { value: 'https://youtube.com/watch?v=dQw4w9WgXcQ' } 
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('https://youtube.com/watch?v=dQw4w9WgXcQ');
    });
  });
});
```

```typescript
// __tests__/lib/youtube-api.test.ts
import { extractVideoId, validateVideoConstraints } from '@/lib/youtube-api';

describe('YouTube API Utils', () => {
  describe('extractVideoId', () => {
    it('extracts video ID from various YouTube URL formats', () => {
      const testCases = [
        ['https://youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
        ['https://youtu.be/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
        ['https://youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
        ['invalid-url', null],
      ];

      testCases.forEach(([url, expected]) => {
        expect(extractVideoId(url)).toBe(expected);
      });
    });
  });

  describe('validateVideoConstraints', () => {
    it('throws error for videos longer than 15 minutes', () => {
      const longVideo = {
        id: 'test',
        title: 'Long Video',
        duration: 16 * 60, // 16 minutes
        channelTitle: 'Test Channel',
        publishedAt: '2024-01-01',
        thumbnail: 'thumb.jpg',
      };

      expect(() => validateVideoConstraints(longVideo)).toThrow(
        'Video is too long'
      );
    });

    it('passes for videos under 15 minutes', () => {
      const shortVideo = {
        id: 'test',
        title: 'Short Video',
        duration: 10 * 60, // 10 minutes
        channelTitle: 'Test Channel',
        publishedAt: '2024-01-01',
        thumbnail: 'thumb.jpg',
      };

      expect(() => validateVideoConstraints(shortVideo)).not.toThrow();
    });
  });
});
```

### API Route Testing

```typescript
// __tests__/api/analyze.test.ts
import { POST } from '@/app/api/analyze/route';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/lib/youtube-api');
vi.mock('@/lib/aws-bedrock');
vi.mock('@/lib/db');

describe('/api/analyze', () => {
  it('returns 400 for invalid YouTube URL', async () => {
    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ videoUrl: 'invalid-url' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Invalid YouTube URL');
  });

  it('returns 429 when usage limit exceeded', async () => {
    // Mock user with exceeded usage
    vi.mocked(getUserUsage).mockResolvedValue({
      usage: 2,
      usageResetAt: new Date(),
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ 
        videoUrl: 'https://youtube.com/watch?v=test' 
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(429);
  });
});
```

### E2E Testing with Playwright

```typitten
// tests/e2e/analyze-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('YouTube Analysis Flow', () => {
  test('complete analysis workflow', async ({ page }) => {
    await page.goto('/');

    // Check initial state
    await expect(page.getByText('2/2 remaining')).toBeVisible();
    
    // Input YouTube URL
    await page.fill(
      'input[placeholder*="youtube.com"]',
      'https://youtube.com/watch?v=dQw4w9WgXcQ'
    );

    // Submit analysis
    await page.click('button:has-text("Analyze Video")');

    // Wait for loading state
    await expect(page.getByText('Analyzing...')).toBeVisible();

    // Wait for results (with generous timeout for AI processing)
    await expect(page.getByText('Analysis Complete')).toBeVisible({
      timeout: 30000,
    });

    // Check results are displayed
    await expect(page.getByText('Key Points')).toBeVisible();
    await expect(page.getByText('Actionable Steps')).toBeVisible();
    await expect(page.getByText('Examples')).toBeVisible();

    // Test copy functionality
    await page.click('button:has-text("Copy Results")');
    await expect(page.getByText('Copied to clipboard')).toBeVisible();

    // Check usage counter updated
    await expect(page.getByText('1/2 remaining')).toBeVisible();
  });

  test('handles video too long error', async ({ page }) => {
    await page.goto('/');

    // Input URL for long video (mock response needed)
    await page.fill(
      'input[placeholder*="youtube.com"]',
      'https://youtube.com/watch?v=long-video'
    );

    await page.click('button:has-text("Analyze Video")');

    // Should show error for long video
    await expect(
      page.getByText('Video is too long')
    ).toBeVisible();
  });
});
```

## 15. Performance Requirements

### Core Performance Metrics

```typescript
// lib/performance.ts
export const PERFORMANCE_TARGETS = {
  // Page Load Performance
  FCP: 1500, // First Contentful Paint (ms)
  LCP: 2500, // Largest Contentful Paint (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FID: 100,  // First Input Delay (ms)

  // API Performance
  TRANSCRIPT_EXTRACTION: 10000, // 10 seconds max
  AI_ANALYSIS: 30000,           // 30 seconds max
  DATABASE_QUERY: 500,          // 500ms max

  // Bundle Size
  INITIAL_JS: 200,  // KB
  TOTAL_JS: 500,    // KB
} as const;

export function measurePerformance<T>(
  operationName: string,
  operation: () => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    
    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      
      console.log(`⚡ ${operationName}: ${duration}ms`);
      
      // Send metrics to monitoring service
      if (process.env.NODE_ENV === 'production') {
        // Analytics.track('performance', {
        //   operation: operationName,
        //   duration,
        //   timestamp: new Date().toISOString(),
        // });
      }
      
      resolve(result);
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ ${operationName} failed after ${duration}ms:`, error);
      reject(error);
    }
  });
}
```

### Caching Strategy

```typescript
// lib/cache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = new MemoryCache();

// Cache video info for repeated requests
export async function getCachedVideoInfo(videoId: string) {
  const cacheKey = `video:${videoId}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const videoInfo = await getVideoInfo(videoId);
  cache.set(cacheKey, videoInfo, 30 * 60 * 1000); // 30 minutes
  
  return videoInfo;
}
```

### Bundle Optimization

```javascript
// next.config.js optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk'],
  },
  
  // Image optimization
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce client bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Tree shaking for AWS SDK
    config.externals = [...(config.externals || []), '@aws-sdk'];
    
    return config;
  },
  
  // Compression
  compress: true,
  
  // Static optimization
  generateStaticParams: true,
  
  // Progressive Web App
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
};

module.exports = nextConfig;
```

## 16. Monitoring & Analytics

### Error Monitoring

```typescript
// lib/monitoring.ts
interface ErrorLog {
  message: string;
  stack?: string;
  userId?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export function logError(error: Error, context?: Partial<ErrorLog>): void {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    severity: 'medium',
    ...context,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('🔥 Error logged:', errorLog);
  }

  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Integration with services like Sentry, LogRocket, etc.
    // Sentry.captureException(error, { extra: context });
  }

  // Store critical errors in database
  if (errorLog.severity === 'critical') {
    // Store in database for admin dashboard
    prisma.errorLog.create({
      data: errorLog,
    }).catch(console.error);
  }
}

export function trackAnalyticsEvent(
  event: string,
  properties?: Record<string, any>
): void {
  const analyticsData = {
    event,
    properties: {
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      ...properties,
    },
  };

  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Integration with analytics services
    // Analytics.track(event, properties);
  }

  console.log('📊 Analytics:', analyticsData);
}
```

### Health Checks

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { BedrockRuntimeClient, ListFoundationModelsCommand } from '@aws-sdk/client-bedrock-runtime';

export async function GET() {
  const checks = {
    database: false,
    aws_bedrock: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // Database health check
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  try {
    // AWS Bedrock health check
    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
    await client.send(new ListFoundationModelsCommand({}));
    checks.aws_bedrock = true;
  } catch (error) {
    console.error('AWS Bedrock health check failed:', error);
  }

  const allHealthy = Object.values(checks).every(
    (check) => typeof check === 'boolean' ? check : true
  );

  return NextResponse.json(
    { status: allHealthy ? 'healthy' : 'unhealthy', checks },
    { status: allHealthy ? 200 : 503 }
  );
}
```

## 17. Deployment Pipeline

### CI/CD Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run tests
        run: npm run test
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  deploy-preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Run Database Migrations
        run: npm run db:migrate:deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Environment Configuration

```bash
# .env.example
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/youtube_analyzer"
SHADOW_DATABASE_URL="postgresql://username:password@localhost:5432/youtube_analyzer_shadow"

# AWS Bedrock
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="us-east-1"

# YouTube API
YOUTUBE_API_KEY="your_youtube_api_key"

# NextAuth.js
NEXTAUTH_SECRET="your_32_character_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Optional: Error Monitoring
SENTRY_DSN="your_sentry_dsn"

# Production Only
VERCEL_URL="your-app.vercel.app"
```

## 18. User Experience Flow

### User Journey Map

```mermaid
graph TD
    A[User visits site] --> B[See landing page with form]
    B --> C{Has remaining usage?}
    C -->|Yes| D[Enter YouTube URL]
    C -->|No| E[Show usage exceeded message]
    D --> F[Submit form]
    F --> G[Validate URL]
    G --> H{Valid YouTube URL?}
    H -->|No| I[Show error message]
    H -->|Yes| J[Extract video info]
    J --> K{Video under 15 min?}
    K -->|No| L[Show duration error]
    K -->|Yes| M[Extract transcript]
    M --> N{Transcript available?}
    N -->|No| O[Show no captions error]
    N -->|Yes| P[Show loading state]
    P --> Q[Send to AWS Bedrock]
    Q --> R[Process with Claude]
    R --> S[Format response]
    S --> T[Display results]
    T --> U[User can copy results]
    U --> V[Usage counter decrements]
```

### Loading States

```typescript
// components/ui/loading-states.tsx
export function TranscriptLoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
    </div>
  );
}

export function AnalysisLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-32"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-40"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-5/6"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Error Handling UI

```typescript
// components/ui/error-display.tsx
interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorDisplay({ error, onRetry, showRetry = true }: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Analysis Failed
          </h3>
          <p className="text-sm text-red-700 mt-1">
            {errorMessage}
          </p>
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-red-800 hover:text-red-900"
            >
              Try again →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 19. Accessibility Requirements

### WCAG 2.1 AA Compliance

```typescript
// components/ui/accessible-button.tsx
import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

interface AccessibleButtonProps extends ButtonProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, 'aria-label': ariaLabel, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
```

### Screen Reader Support

```typescript
// components/features/analysis-results.tsx
export function AnalysisResults({ analysis }: { analysis: AnalysisResponse }) {
  return (
    <div role="region" aria-labelledby="analysis-heading">
      <h2 id="analysis-heading" className="sr-only">
        Video Analysis Results
      </h2>
      
      <section aria-labelledby="key-points-heading">
        <h3 id="key-points-heading" className="text-lg font-semibold mb-3">
          Key Points
        </h3>
        <ul role="list" className="space-y-2">
          {analysis.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="sr-only">Key point {index + 1}:</span>
              <span className="text-blue-500 mr-2">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section aria-labelledby="actionable-steps-heading" className="mt-6">
        <h3 id="actionable-steps-heading" className="text-lg font-semibold mb-3">
          Actionable Steps
        </h3>
        <ol role="list" className="space-y-2">
          {analysis.actionableSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="sr-only">Step {index + 1}:</span>
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
```

### Keyboard Navigation

```css
/* globals.css - Focus styles */
@layer utilities {
  .focus-visible:focus-visible {
    @apply ring-2 ring-blue-500 ring-offset-2 outline-none;
  }
  
  .skip-link {
    @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50;
    @apply bg-blue-600 text-white px-4 py-2 rounded-md;
  }
}
```

## 20. Content Guidelines

### AI Analysis Prompt Engineering

```typescript
// lib/prompts.ts
export const ANALYSIS_PROMPTS = {
  SYSTEM: `You are an expert content analyzer specializing in extracting actionable insights from video content. Your analysis should be:

1. **Practical**: Focus on actionable takeaways viewers can implement
2. **Structured**: Organize insights into clear categories
3. **Concise**: Keep points focused and easy to understand
4. **Valuable**: Highlight the most important concepts and insights

Format your response as valid JSON with these exact fields:
- keyPoints: Array of 3-5 main insights (each 1-2 sentences)
- actionableSteps: Array of 3-7 specific action items (each 1-2 sentences)
- examples: Array of real examples or case studies mentioned
- summary: Brief 2-3 sentence overview
- analysis: Detailed markdown analysis with structure and formatting`,

  USER_TEMPLATE: (transcript: string, title?: string, duration?: number) => `
**Video Details:**
- Title: ${title || 'Not provided'}
- Duration: ${duration ? `${Math.floor(duration / 60)} minutes` : 'Unknown'}

**Transcript:**
${transcript}

**Instructions:**
Analyze this video transcript and extract the most valuable insights. Focus on:
1. Key concepts and main ideas
2. Specific steps or strategies mentioned
3. Real examples, case studies, or data points
4. Actionable advice viewers can apply

Ensure your analysis is comprehensive yet concise, suitable for someone who wants to quickly understand and apply the video's content.`,
};
```

### Content Quality Standards

```typescript
// lib/content-validation.ts
interface ContentQuality {
  score: number;
  issues: string[];
  suggestions: string[];
}

export function validateAnalysisQuality(analysis: AnalysisResponse): ContentQuality {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check key points quality
  if (analysis.keyPoints.length < 3) {
    issues.push('Insufficient key points (minimum 3 required)');
    score -= 20;
  }

  if (analysis.keyPoints.some(point => point.length < 20)) {
    issues.push('Some key points are too brief');
    score -= 10;
  }

  // Check actionable steps
  if (analysis.actionableSteps.length < 3) {
    issues.push('Insufficient actionable steps (minimum 3 required)');
    score -= 20;
  }

  // Check for specific action words
  const actionWords = ['implement', 'create', 'start', 'build', 'develop', 'practice'];
  const hasActionWords = analysis.actionableSteps.some(step => 
    actionWords.some(word => step.toLowerCase().includes(word))
  );

  if (!hasActionWords) {
    suggestions.push('Include more specific action verbs in steps');
    score -= 5;
  }

  // Check summary quality
  if (analysis.summary.length < 100) {
    issues.push('Summary too brief (minimum 100 characters)');
    score -= 15;
  }

  // Provide suggestions for improvement
  if (score < 80) {
    suggestions.push('Consider re-analyzing with more detailed prompts');
  }

  return { score, issues, suggestions };
}
```

---

## 21. Project Completion Checklist

### Development Phase
- [ ] Set up Next.js 14+ project with TypeScript
- [ ] Configure Tailwind CSS and shadcn/ui components
- [ ] Implement YouTube URL validation and video ID extraction
- [ ] Set up Prisma ORM with Neon PostgreSQL
- [ ] Integrate AWS Bedrock Claude Sonnet 4
- [ ] Build YouTube transcript extraction functionality
- [ ] Create responsive UI components
- [ ] Implement usage tracking and limits
- [ ] Add copy-to-clipboard functionality
- [ ] Set up error handling and loading states

### Testing Phase
- [ ] Write unit tests for utilities and components
- [ ] Create API route tests
- [ ] Implement E2E tests with Playwright
- [ ] Test accessibility compliance
- [ ] Performance testing and optimization
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

### Security Phase
- [ ] Implement input validation with Zod
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Sanitize user inputs
- [ ] Secure environment variables
- [ ] Test for common vulnerabilities

### Deployment Phase
- [ ] Configure Vercel deployment
- [ ] Set up production environment variables
- [ ] Configure domain and SSL
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking
- [ ] Test production deployment

### Documentation Phase
- [ ] Complete API documentation
- [ ] Write user guide
- [ ] Create deployment guide
- [ ] Document environment setup
- [ ] Write troubleshooting guide

### Launch Phase
- [ ] Final security review
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics implementation
- [ ] Monitoring setup
- [ ] Production launch
- [ ] Post-launch monitoring

---

*This completes the comprehensive Product Requirements Document for the YouTube Transcript AI Analyzer. The document provides detailed specifications for building a production-ready application with modern web technologies, security best practices, and optimal user experience.*