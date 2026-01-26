import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import "./globals.css";
import { FloatingCTA } from "@/components/floating-cta";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Surge Innovations - Strategy, Code & Scalable Impact",
    template: "%s | Surge Innovations",
  },
  description:
    "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
  
  // Added Keywords for SEO
  keywords: [
    "Digital Transformation",
    "Custom Software Development",
    "Business Automation",
    "Scalable Platforms",
    "Next.js Development",
    "Surge Innovations",
    "Operational Clarity",
    "Strategy and Code",
  ],
  
  authors: [{ name: "Surge Innovations" }],
  creator: "Surge Innovations Ltd",
  generator: "Surge",
  
  icons: {
    icon: "/logo/surge logo (2).ico",
    shortcut: "/logo/surge logo (2).ico",
    apple: "/logo/surge logo (2).ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Surge Innovations - Strategy, Code & Scalable Impact",
    description:
      "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
    url: "https://surgeinnovations.org",
    siteName: "Surge Innovations",
    images: [
      {
        url: "/logo/surge logo (2).ico",
        width: 1200,
        height: 630,
        alt: "Surge Innovations - Scalable Impact",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surge Innovations - Strategy, Code & Scalable Impact",
    description:
      "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
    images: ["/logo/surge logo (2).ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Navigation Loader */}
        <NextTopLoader
          color="#2563eb"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
          zIndex={1600}
        />

        {/* Theme Provider for Dark/Light mode support */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <main className="flex-1">{children}</main>
          </Suspense>
          
          <FloatingCTA />
          
          {/* Vercel Analytics & Insights */}
          <Analytics />
          <SpeedInsights />
          
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}