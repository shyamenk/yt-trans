import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Zap, Target, BookOpen, Play, Sparkles, Brain, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background dark font-sans">
      {/* Header */}
      <header className="border-b-4 border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary border-2 border-border flex items-center justify-center shadow-xs">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-wide">YOUTUBE AI ANALYZER</span>
          </div>
          <div className="text-base font-medium text-muted-foreground uppercase tracking-wider">Powered by Claude Sonnet 4</div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center max-w-6xl">
          <div className="space-y-12">
            {/* Hero Headline */}
            <div className="space-y-8">
              <h1 className="text-7xl md:text-8xl font-black leading-none tracking-wider uppercase">
                <span className="text-primary">AI-Powered</span>
                <br />
                <span className="text-foreground">YouTube</span>
                <br />
                <span className="text-foreground">Analysis</span>
              </h1>

              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-medium tracking-wide">
                Extract insights, actionable steps, and examples from any YouTube video using advanced AI analysis with Claude Sonnet 4
              </p>
            </div>

            {/* YouTube URL Input Form */}
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <Input
                    type="url"
                    placeholder="PASTE YOUTUBE URL HERE..."
                    className="text-lg h-16 px-8 bg-input border-4 border-border shadow-lg text-foreground placeholder:text-muted-foreground font-medium tracking-wide uppercase"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full lg:w-auto px-12 h-16 bg-primary border-4 border-border shadow-lg hover:shadow-xl text-primary-foreground font-black text-lg tracking-wider uppercase transition-all duration-200 hover:translate-x-1 hover:translate-y-1"
                >
                  Analyze Video
                </Button>
              </div>

              {/* Usage Counter Badge */}
              <div className="flex justify-center">
                <Badge className="px-6 py-3 bg-secondary border-4 border-border shadow-lg text-secondary-foreground font-black text-lg tracking-wider uppercase">
                  <Sparkles className="w-6 h-6 mr-3" />
                  2 Free Analyses Remaining
                </Badge>
              </div>

              {/* Supporting Text */}
              <p className="text-muted-foreground text-lg font-medium tracking-wide">
                Get AI-powered summaries, key insights, and actionable takeaways in seconds
              </p>
            </div>
          </div>
        </section>

        {/* Features Preview Section */}
        <section className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature Card 1 */}
            <Card className="text-center group bg-card border-4 border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:translate-x-2 hover:translate-y-2">
              <CardHeader className="space-y-6 p-8">
                <div className="mx-auto w-16 h-16 bg-primary border-4 border-border shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground font-black tracking-wider uppercase">Instant Analysis</CardTitle>
                <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                  Get comprehensive video insights in under 30 seconds using Claude Sonnet 4 AI
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature Card 2 */}
            <Card className="text-center group bg-card border-4 border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:translate-x-2 hover:translate-y-2">
              <CardHeader className="space-y-6 p-8">
                <div className="mx-auto w-16 h-16 bg-primary border-4 border-border shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground font-black tracking-wider uppercase">Structured Insights</CardTitle>
                <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                  Key points, actionable steps, and examples formatted in clean markdown
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature Card 3 */}
            <Card className="text-center group bg-card border-4 border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:translate-x-2 hover:translate-y-2">
              <CardHeader className="space-y-6 p-8">
                <div className="mx-auto w-16 h-16 bg-primary border-4 border-border shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground font-black tracking-wider uppercase">Copy & Use</CardTitle>
                <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                  One-click copy to clipboard for easy sharing and note-taking
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-24 max-w-5xl text-center">
          <div className="space-y-20">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-foreground tracking-wider uppercase">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-muted-foreground text-2xl font-medium tracking-wide max-w-3xl mx-auto">
                Simple 3-step process to unlock video insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary border-4 border-border shadow-md flex items-center justify-center text-primary-foreground text-2xl font-black tracking-wider">
                  1
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-wider uppercase">Paste URL</h3>
                <p className="text-muted-foreground text-lg font-medium tracking-wide">
                  Simply paste any YouTube video URL into the input field above
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary border-4 border-border shadow-md flex items-center justify-center text-primary-foreground text-2xl font-black tracking-wider">
                  2
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-wider uppercase">AI Analysis</h3>
                <p className="text-muted-foreground text-lg font-medium tracking-wide">
                  Our AI extracts transcript and analyzes content using Claude Sonnet 4
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary border-4 border-border shadow-md flex items-center justify-center text-primary-foreground text-2xl font-black tracking-wider">
                  3
                </div>
                <h3 className="text-2xl font-black text-foreground tracking-wider uppercase">Get Insights</h3>
                <p className="text-muted-foreground text-lg font-medium tracking-wide">
                  Receive structured insights, action items, and key takeaways instantly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-black text-foreground tracking-wider uppercase">
                What You <span className="text-primary">Get</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Key Points */}
              <Card className="bg-card border-4 border-border shadow-lg">
                <CardHeader className="space-y-6 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shadow-xs">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground font-black tracking-wider uppercase">Key Points</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                    3-5 main insights and concepts from the video, distilled into easy-to-understand bullet points
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Actionable Steps */}
              <Card className="bg-card border-4 border-border shadow-lg">
                <CardHeader className="space-y-6 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shadow-xs">
                      <Target className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground font-black tracking-wider uppercase">Action Steps</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                    3-7 specific steps you can take to implement the video's advice and strategies
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Examples */}
              <Card className="bg-card border-4 border-border shadow-lg">
                <CardHeader className="space-y-6 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shadow-xs">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground font-black tracking-wider uppercase">Examples</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                    Real examples, case studies, and data points mentioned in the video for context
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Summary */}
              <Card className="bg-card border-4 border-border shadow-lg">
                <CardHeader className="space-y-6 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary border-2 border-border flex items-center justify-center shadow-xs">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl text-foreground font-black tracking-wider uppercase">AI Summary</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg font-medium tracking-wide">
                    Comprehensive analysis in markdown format, perfect for notes and documentation
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24 text-center max-w-5xl">
          <div className="space-y-12">
            <div className="space-y-8">
              <Badge className="px-6 py-3 bg-secondary border-4 border-border shadow-lg text-secondary-foreground font-black text-lg tracking-wider uppercase">
                <Sparkles className="w-6 h-6 mr-3" />
                Powered by Claude Sonnet 4
              </Badge>
              <h2 className="text-5xl font-black text-foreground tracking-wider uppercase">
                Start analyzing videos <span className="text-primary">today</span>
              </h2>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium tracking-wide">
                Transform any YouTube video into actionable insights. No sign-up required for your first 2 analyses.
              </p>
            </div>

            <Button
              size="lg"
              className="px-16 py-6 bg-primary border-4 border-border shadow-xl hover:shadow-2xl text-primary-foreground font-black text-xl tracking-wider uppercase transition-all duration-200 hover:translate-x-2 hover:translate-y-2"
            >
              Try Free Analysis
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-border bg-card shadow-lg">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground text-lg font-medium tracking-wider uppercase">
            Built with Next.js 15, React 19, Tailwind CSS 4, and Claude Sonnet 4 AI
          </p>
        </div>
      </footer>
    </div>
  );
}
