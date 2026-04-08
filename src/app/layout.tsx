import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — Austin Armstrong",
    default: "Austin Armstrong",
  },
  description:
    "I am someone who is curious about the world, here are my notes about what I find.",
  metadataBase: new URL("https://austin-armstrong.me"),
  openGraph: {
    siteName: "Austin Armstrong",
    locale: "en_US",
    type: "website",
  },
};

const navItems = [
  { href: "/",       label: "Home"   },
  { href: "/now",    label: "Now"    },
  { href: "/essays", label: "Essays" },
  { href: "/resume", label: "CV"     },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--color-ink)", color: "var(--color-cream)" }}
      >
        {/* ── Top navigation bar ── */}
        <header
          style={{ borderBottom: "1px solid var(--color-rule)" }}
          className="sticky top-0 z-50"
          role="banner"
        >
          <div
            style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)" }}
            className="container-editorial"
          >
            <nav
              className="flex items-center justify-between"
              style={{ height: "3.5rem" }}
              aria-label="Primary"
            >
              {/* Wordmark */}
              <Link
                href="/"
                className="font-serif"
                style={{
                  fontSize: "1.05rem",
                  letterSpacing: "0.01em",
                  color: "var(--color-cream)",
                }}
              >
                Austin Armstrong
              </Link>

              {/* Nav links */}
              <ul className="flex items-center gap-8 list-none">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--color-rule)" }}>
          <div
            className="container-editorial flex items-center justify-between"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
          >
            <span className="folio">Austin Armstrong · {new Date().getFullYear()}</span>
            <span className="folio">austin-armstrong.me</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
