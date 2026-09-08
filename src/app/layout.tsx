import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — Austin Armstrong",
    default: "Austin Armstrong — Generalist Operator, Writer, Builder",
  },
  description:
    "Austin Armstrong — Generalist operator at the intersection of enterprise IT finance, AI go-to-market, and organizational change. Writer on Lifestyle Design, AI, Finance, and Personal Development.",
  metadataBase: new URL("https://austin-armstrong.me"),
  keywords: [
    "Austin Armstrong",
    "IT Financial Analyst",
    "IT Budget Management",
    "Apptio",
    "Healthcare IT",
    "Lifestyle Design",
    "Artificial Intelligence",
    "Personal Finance",
    "Personal Development",
  ],
  authors: [{ name: "Austin Armstrong", url: "https://austin-armstrong.me" }],
  alternates: {
    canonical: "https://austin-armstrong.me",
    types: {
      "application/rss+xml": "https://austin-armstrong.me/feed.xml",
    },
  },
  openGraph: {
    siteName: "Austin Armstrong",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Austin Armstrong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@austin_2020",
    creator: "@austin_2020",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Document shell only: html, body, fonts, analytics.
 *
 * Page chrome lives in the route-group layouts — (site) has the header and
 * footer, (bare) has neither — so the collage landing page can render full
 * bleed without either.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--color-bg)", color: "var(--color-ink)" }}
      >
        {/* ── Google Fonts ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..900;1,9..40,100..900&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
