'use client';

import { useState } from 'react';
import { Brain, Zap, BookOpen, CheckCircle, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { YouTubeUrlForm } from "@/components/forms/youtube-url-form";
import { UsageCounter } from "@/components/features/usage-counter";
import { useUsageTracking } from "@/hooks/use-usage-tracking";

export default function HomePage() {
  const { incrementUsage, hasUsageRemaining } = useUsageTracking();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisSubmit = async (data: { url: string; videoId: string; }) => {
    // Check if user has remaining analyses
    if (!hasUsageRemaining) {
      alert('You have reached your free analysis limit. Please try again tomorrow.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // TODO: Implement actual analysis logic in next issue
      console.log('Analysis requested for:', data);

      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Increment usage count
      incrementUsage();

      alert(`Analysis completed for video: ${data.videoId}\n\nThis will be replaced with actual analysis results in the next issue.`);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center max-w-5xl">
        <div className="space-y-12">
          {/* Hero Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-primary">AI-Powered</span>{" "}
              <span className="text-foreground">YouTube Analysis</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Extract insights, actionable steps, and examples from any YouTube video using advanced AI analysis with Claude Sonnet 4
            </p>
          </div>

          {/* YouTube URL Input */}
          <div className="w-full max-w-md mx-auto space-y-4">
            <YouTubeUrlForm
              onSubmit={handleAnalysisSubmit}
              isLoading={isAnalyzing}
              disabled={!hasUsageRemaining}
            />
          </div>

          {/* Usage Counter Badge */}
          <div className="flex justify-center">
            <UsageCounter />
          </div>

          {/* Supporting Text */}
          <p className="text-muted-foreground text-sm">
            Get AI-powered summaries, key insights, and actionable takeaways in seconds
          </p>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <Card className="text-center group bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="space-y-4 p-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">Instant Analysis</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Get comprehensive video insights in under 30 seconds using Claude Sonnet 4 AI
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 2 */}
          <Card className="text-center group bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="space-y-4 p-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">Structured Insights</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                Key points, actionable steps, and examples formatted in clean markdown
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Feature Card 3 */}
          <Card className="text-center group bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="space-y-4 p-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">Copy & Use</CardTitle>
              <CardDescription className="text-muted-foreground leading-relaxed">
                One-click copy to clipboard for easy sharing and note-taking
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 max-w-4xl text-center">
        <div className="space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple 3-step process to unlock video insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-semibold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">Paste URL</h3>
              <p className="text-muted-foreground">
                Simply paste any YouTube video URL into the input field above
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-semibold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI extracts transcript and analyzes content using Claude Sonnet 4
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-semibold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Insights</h3>
              <p className="text-muted-foreground">
                Receive structured insights, action items, and key takeaways instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              What You <span className="text-primary">Get</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Key Points */}
            <Card className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">Key Points</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  3-5 main insights and concepts from the video, distilled into easy-to-understand bullet points
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Actionable Steps */}
            <Card className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">Action Steps</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  3-7 specific steps you can take to implement the video&apos;s advice and strategies
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Examples */}
            <Card className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">Examples</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Real examples, case studies, and data points mentioned in the video for context
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Summary */}
            <Card className="bg-card border border-border rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">AI Summary</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Comprehensive analysis in markdown format, perfect for notes and documentation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Claude Sonnet 4
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              Start analyzing videos <span className="text-primary">today</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform any YouTube video into actionable insights. No sign-up required for your first 2 analyses.
            </p>
          </div>

          <Button
            size="lg"
            className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try Free Analysis
          </Button>
        </div>
      </section>
    </div>
  );
}
