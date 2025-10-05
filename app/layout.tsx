import type React from "react";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";
import { FloatingCTA } from "@/components/floating-cta";
import { Toaster } from "sonner";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "Surge Innovations - Your Tech Partner for Scalable Impact",
    template: "%s | Surge Innovations",
  },
  description:
    "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/surge-logo-favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Surge Innovations - Your Tech Partner for Scalable Impact",
    description:
      "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
    url: "https://surgeinnovations.com",
    siteName: "Surge Innovations",
    images: [
      {
        url: "/surge-og-image.png",
        width: 1200,
        height: 630,
        alt: "Surge Innovations - Scalable Impact",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surge Innovations - Your Tech Partner for Scalable Impact",
    description:
      "We design and build custom digital platforms that simplify work, automate tasks, and give you clarity across your operations.",
    images: ["/surge-og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <main>{children}</main>
        </Suspense>
        <FloatingCTA />
        <Analytics />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
