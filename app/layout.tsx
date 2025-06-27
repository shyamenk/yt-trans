import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import NextAuthSessionProvider from "./SessionProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YouTube AI Analyzer | Extract Insights with Claude Sonnet 4",
  description: "AI-powered YouTube video analysis tool that extracts insights, actionable steps, and examples using Claude Sonnet 4. Get comprehensive video summaries in seconds.",
  keywords: ["YouTube", "AI analysis", "Claude Sonnet 4", "video insights", "transcript analysis", "actionable steps"],
  authors: [{ name: "YouTube AI Analyzer" }],
  creator: "YouTube AI Analyzer",
  publisher: "YouTube AI Analyzer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yt-trans.vercel.app"),
  openGraph: {
    title: "YouTube AI Analyzer | Extract Insights with Claude Sonnet 4",
    description: "AI-powered YouTube video analysis tool that extracts insights, actionable steps, and examples using Claude Sonnet 4.",
    url: "https://yt-trans.vercel.app",
    siteName: "YouTube AI Analyzer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube AI Analyzer | Extract Insights with Claude Sonnet 4",
    description: "AI-powered YouTube video analysis tool that extracts insights, actionable steps, and examples using Claude Sonnet 4.",
    creator: "@youtubeai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <NextAuthSessionProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
