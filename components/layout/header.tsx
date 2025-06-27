'use client';
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">YouTube AI Analyzer</span>
        </div>
        <div className="text-sm text-muted-foreground">Powered by Claude Sonnet 4</div>
      </div>
    </header>
  );
} 