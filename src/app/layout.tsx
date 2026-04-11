import type { Metadata } from "next";
import Link from "next/link";
import MobileNav from "@/components/ui/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — Austin Armstrong",
    default: "Austin Armstrong — IT Financial Analyst, Writer, Builder",
  },
  description:
    "Austin Armstrong — Senior IT Financial Analyst who managed $650M+ in IT budgets across Fortune 500 health systems. Writer on Lifestyle Design, AI, Finance, and Personal Development.",
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

const navItems = [
  { href: "/now",      label: "Now"      },
  { href: "/essays",   label: "Essays"   },
  { href: "/projects", label: "Projects" },
  { href: "/resume",   label: "CV"       },
];

/* The brand logo — "Austin Armstrong." in Basilia Bold Italic
   with the yellow highlight bar sitting under "Armstrong." */
function LogoWordmark() {
  return (
    <Link
      href="/"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: "1.1rem",
        lineHeight: 1,
        color: "var(--color-ink)",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.3em",
      }}
      aria-label="Austin Armstrong — home"
    >
      <span>Austin</span>
      {/* "Armstrong." with yellow highlight bar behind it */}
      <span
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: "-0.08em",
            right: "-0.08em",
            bottom: "-0.08em",
            height: "0.42em",
            background: "var(--color-yellow)",
            zIndex: 0,
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>Armstrong.</span>
      </span>
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

        {/* ── Navigation ── */}
        <header
          style={{
            borderBottom: "1px solid var(--color-rule)",
            background: "rgba(249,249,249,0.94)",
            backdropFilter: "blur(10px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div className="container-editorial">
            <nav
              style={{
                height: "3.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              aria-label="Primary"
            >
              <LogoWordmark />

              {/* Desktop nav — hidden on mobile */}
              <ul
                className="desktop-nav"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile nav — hamburger + drawer */}
              <MobileNav />
            </nav>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: "2px solid var(--color-ink)",
            marginTop: "auto",
          }}
        >
          {/* Yellow accent strip */}
          <div style={{ height: "4px", background: "var(--color-yellow)" }} />
          <div
            className="container-editorial"
            style={{
              paddingTop: "1.75rem",
              paddingBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--color-ink)",
              }}
            >
              Austin Armstrong.
            </span>

            {/* Social links */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <a
                href="https://www.instagram.com/austinarmstrong20/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://x.com/austin_2020"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="social-icon"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/austin-armstrong20/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            <span className="folio">austin-armstrong.me · {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
