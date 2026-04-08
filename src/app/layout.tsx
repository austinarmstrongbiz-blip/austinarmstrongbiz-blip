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
  { href: "/now",    label: "Now"    },
  { href: "/essays", label: "Essays" },
  { href: "/resume", label: "CV"     },
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

              <ul
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
            <span className="folio">austin-armstrong.me · {new Date().getFullYear()}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
