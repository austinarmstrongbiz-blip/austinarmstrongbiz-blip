import Link from "next/link";
import { navItems } from "@/lib/nav";
import MobileNav from "@/components/ui/MobileNav";
import MotionProvider from "@/components/ui/MotionProvider";
import NewsletterForm from "@/components/ui/NewsletterForm";
import SocialLinks from "@/components/ui/SocialLinks";

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

/**
 * The chrome every normal page wears: sticky header, main, footer.
 *
 * This lives in a route group rather than the root layout because the collage
 * landing page deliberately has neither header nor footer — it is the door, and
 * the rooms behind it are what carry navigation. Route groups do not appear in
 * URLs, so nothing here changes a path.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
      <main className="flex-1">
        <MotionProvider>{children}</MotionProvider>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "2px solid var(--color-ink)",
          marginTop: "auto",
        }}
      >
        {/* Yellow accent strip */}
        <div style={{ height: "4px", background: "var(--color-yellow)" }} />

        {/* Newsletter capture */}
        <div
          className="container-editorial"
          style={{
            paddingTop: "3rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <NewsletterForm variant="light" />
        </div>

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

          <SocialLinks />

          <span className="folio">austin-armstrong.me · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}
