"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle, Lightbulb, Clock, Star, ExternalLink, Play, User, Calendar } from "lucide-react";
import { CopyToClipboard } from "./copy-to-clipboard";
import type { YouTubeAnalysisResult, YouTubeVideo } from "@/types";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  analysisResult: YouTubeAnalysisResult;
  videoData: YouTubeVideo;
  className?: string;
}

export function ResultsDisplay({ analysisResult, videoData, className }: ResultsDisplayProps) {
  const [activeSection, setActiveSection] = useState<"summary" | "keyInsights" | "actionableSteps" | "examples">(
    "summary",
  );

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto space-y-8 p-4", className)}>
      {/* Video Info Header - Updated for dark mode compatibility */}
      <Card className="overflow-hidden border-0 shadow-2xl bg-card dark:bg-card">
        <CardHeader className="pb-6 bg-transparent">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative group flex-shrink-0">
              <div className="relative overflow-hidden rounded-sm shadow-lg w-full max-w-sm mx-auto lg:mx-0">
                <Image
                  src={videoData.thumbnailUrl || "/placeholder.svg"}
                  alt={videoData.title}
                  width={480}
                  height={270}
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl lg:text-3xl font-bold leading-tight text-foreground dark:text-foreground">
                  {videoData.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground dark:text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{videoData.channel}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary border-primary/30 dark:border-primary/40">
                  <Clock className="w-3 h-3 mr-1.5" />
                  {formatDuration(videoData.duration)}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-chart-1/20 dark:bg-chart-1/30 text-chart-1 dark:text-chart-1 border-chart-1/30 dark:border-chart-1/40">
                  <Star className="w-3 h-3 mr-1.5" />
                  {analysisResult.difficulty}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-chart-4/20 dark:bg-chart-4/30 text-chart-4 dark:text-chart-4 border-chart-4/30 dark:border-chart-4/40">
                  <BookOpen className="w-3 h-3 mr-1.5" />
                  {analysisResult.estimatedReadTime}min read
                </Badge>
              </div>

              <Button
                className="border rounded-md border-gray-600 dark:border-gray-200"
                onClick={() => window.open(videoData.url, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Watch Original Video
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Card className="border-0 shadow-lg backdrop-blur-sm bg-card/80">
        <CardContent className="p-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 rounded-md">
            {[
              { key: "summary", label: "Summary", icon: BookOpen, colorClass: "text-primary bg-primary/20" },
              { key: "keyInsights", label: "Key Insights", icon: Lightbulb, colorClass: "text-chart-3 bg-chart-3/20" },
              { key: "actionableSteps", label: "Action Steps", icon: CheckCircle, colorClass: "text-chart-1 bg-chart-1/20" },
              { key: "examples", label: "Examples", icon: Star, colorClass: "text-chart-4 bg-chart-4/20" },
            ].map(({ key, label, icon: Icon, colorClass }) => (
              <Button
                key={key}
                variant={activeSection === key ? "default" : "ghost"}
                size="lg"
                onClick={() => setActiveSection(key as typeof activeSection)}
                className={cn(
                  "h-auto p-4 flex flex-col gap-2 transition-all duration-200 rounded-md",
                  activeSection === key
                    ? `${colorClass} shadow-lg`
                    : "bg-transparent text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium ">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Summary Section */}
        {activeSection === "summary" && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl text-primary">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  Executive Summary
                </CardTitle>
                <CopyToClipboard text={analysisResult.summary} className="opacity-60 hover:opacity-100" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground/80 leading-relaxed text-lg">{analysisResult.summary}</p>
              </div>

              {analysisResult.tags.length > 0 && (
                <div className="space-y-3">
                  <Separator className="bg-primary/20" />
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-3">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-background/60 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Key Insights Section */}
        {activeSection === "keyInsights" && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-chart-3/5 to-chart-3/10 animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl text-chart-3">
                  <div className="p-2 bg-chart-3/20 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-chart-3" />
                  </div>
                  Key Insights ({analysisResult.keyInsights.length})
                </CardTitle>
                <CopyToClipboard
                  text={analysisResult.keyInsights.map((insight, i) => `${i + 1}. ${insight}`).join("\n")}
                  className="opacity-60 hover:opacity-100"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.keyInsights.map((insight, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl bg-card/70 backdrop-blur-sm border border-chart-3/20 hover:shadow-lg transition-all duration-200 hover:bg-card/90"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-chart-3/80 to-chart-3 flex items-center justify-center shadow-sm">
                      <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground/80 leading-relaxed text-base">{insight}</p>
                    </div>
                    <CopyToClipboard
                      text={insight}
                      size="sm"
                      className="opacity-0 group-hover:opacity-60 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Actionable Steps Section */}
        {activeSection === "actionableSteps" && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-chart-1/5 to-chart-1/10 animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl text-chart-1">
                  <div className="p-2 bg-chart-1/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-chart-1" />
                  </div>
                  Action Plan ({analysisResult.actionableSteps.length} steps)
                </CardTitle>
                <CopyToClipboard
                  text={analysisResult.actionableSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}
                  className="opacity-60 hover:opacity-100"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.actionableSteps.map((step, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl bg-card/70 backdrop-blur-sm border border-chart-1/20 hover:shadow-lg transition-all duration-200 hover:bg-card/90"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-chart-1/80 to-chart-1 flex items-center justify-center shadow-sm">
                      <CheckCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-chart-1">Step {index + 1}</h4>
                      <p className="text-foreground/70 leading-relaxed">{step}</p>
                    </div>
                    <CopyToClipboard
                      text={`Step ${index + 1}: ${step}`}
                      size="sm"
                      className="opacity-0 group-hover:opacity-60 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Examples Section */}
        {activeSection === "examples" && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-chart-4/5 to-chart-4/10 animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl text-chart-4">
                  <div className="p-2 bg-chart-4/20 rounded-lg">
                    <Star className="w-5 h-5 text-chart-4" />
                  </div>
                  Examples & Use Cases ({analysisResult.examples.length})
                </CardTitle>
                <CopyToClipboard
                  text={analysisResult.examples.map((ex) => `${ex.title}: ${ex.description}`).join("\n\n")}
                  className="opacity-60 hover:opacity-100"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.examples.map((example, index) => (
                <div
                  key={index}
                  className="group p-5 rounded-xl bg-card/70 backdrop-blur-sm border border-chart-4/20 hover:shadow-lg transition-all duration-200 hover:bg-card/90"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-chart-4 text-lg">{example.title}</h4>
                      <div className="flex items-center gap-2">
                        {example.timestamp && (
                          <Badge
                            variant="outline"
                            className="bg-chart-4/10 border-chart-4/30 text-chart-4"
                          >
                            {Math.floor(example.timestamp / 60)}:{(example.timestamp % 60).toString().padStart(2, "0")}
                          </Badge>
                        )}
                        <CopyToClipboard
                          text={`${example.title}: ${example.description}`}
                          size="sm"
                          className="opacity-0 group-hover:opacity-60 transition-opacity"
                        />
                      </div>
                    </div>
                    <p className="text-foreground/70 leading-relaxed">{example.description}</p>
                    {example.timestamp && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const url = new URL(videoData.url);
                          url.searchParams.set("t", example.timestamp!.toString());
                          window.open(url.toString(), "_blank");
                        }}
                        className="text-chart-4 hover:bg-chart-4/10 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-1.5" />
                        Jump to timestamp
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-muted/50 to-muted">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Analysis completed on {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex gap-3">
              <CopyToClipboard
                text={`${analysisResult.summary}\n\nKey Insights:\n• ${analysisResult.keyInsights.join("\n• ")}\n\nActionable Steps:\n${analysisResult.actionableSteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}`}
                variant="outline"
              // className="bg-card  border-border p-6"
              >
                Export Results
              </CopyToClipboard>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="bg-card hover:bg-card/80 border-border"
              >
                Print Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResultsDisplay;