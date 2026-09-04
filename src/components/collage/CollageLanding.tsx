/**
 * CollageLanding — the clickable image collage for the homepage.
 *
 * Server component. Every tile is a real <Link> with a real href, so it is
 * keyboard-reachable and crawlable out of the box. Each Link also carries an
 * explicit aria-label from tile.label, since the visible placeholder text is
 * going away once real art swaps in — the accessible name can't depend on it.
 * `collageTiles` in tiles.ts is already ordered top-to-bottom, left-to-right,
 * so DOM order (this .map()) matches reading order regardless of the absolute
 * x/y placement below. The visible focus ring comes from the site-wide
 * a:focus-visible rule in globals.css — nothing tile-specific suppresses it.
 *
 * Tiles render as bordered placeholders for now. The real-image swap is a
 * separate task — see the PLACEHOLDER block below and `imageSrc` in tiles.ts.
 *
 * Two genuinely separate layouts below 640px, not a CSS reflow of the desktop
 * percentages: the absolute-position collage (".collage-desktop", tiles.ts
 * coordinates untouched) and a hand-placed single-column list of the same
 * nine tiles (".collage-mobile"). The swap is pure CSS — same convention as
 * .desktop-nav / .mobile-menu-btn in globals.css: inline style sets the
 * desktop-visible default, the max-width:640px media query flips both with
 * !important. No client JS needed.
 *
 * Not wired to "/" yet. Preview it at /collage-preview.
 */

import Link from "next/link";
import { CANVAS, collageTiles } from "./tiles";

export default function CollageLanding() {
  return (
    <div
      style={{
        // Breathing room so rotated tiles near the edges don't get clipped.
        padding: "2rem 1.5rem 3rem",
      }}
    >
      {/* ── Desktop collage (>=640px) — absolute-position, tiles.ts coords ── */}
      <div
        className="collage-desktop"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: `${CANVAS.width}px`,
          aspectRatio: `${CANVAS.width} / ${CANVAS.height}`,
          marginInline: "auto",
        }}
      >
        {collageTiles.map((tile, i) => (
          <Link
            key={tile.href}
            href={tile.href}
            aria-label={tile.label}
            style={{
              position: "absolute",
              left: `${tile.x}%`,
              top: `${tile.y}%`,
              width: `${tile.w}%`,
              aspectRatio: `${tile.aspect}`,
              zIndex: tile.z,
              transform: `rotate(${tile.rotate}deg)`,
              display: "block",
            }}
          >
            {/* ── PLACEHOLDER ──────────────────────────────────────────
                The real-image task replaces this box with the artwork at
                tile.imageSrc. The wrapper <Link> above keeps its geometry. */}
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid var(--color-ink)",
                background: "var(--color-bg-warm)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  color: "var(--color-ink-muted)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  lineHeight: 1.1,
                  color: "var(--color-ink)",
                }}
              >
                {tile.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-muted)",
                }}
              >
                {tile.href}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Mobile list (<640px) — hand-placed single column, same 9 tiles ── */}
      <ul
        className="collage-mobile"
        style={{
          display: "none", // shown by the max-width:640px rule in globals.css
          flexDirection: "column",
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxWidth: "480px",
          marginInline: "auto",
        }}
      >
        {collageTiles.map((tile, i) => (
          <li key={tile.href} style={{ borderBottom: "1px solid var(--color-rule)" }}>
            <Link
              href={tile.href}
              aria-label={tile.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                minHeight: "44px",
                minWidth: "44px",
                padding: "0.875rem 0.25rem",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    lineHeight: 1.1,
                    color: "var(--color-ink)",
                  }}
                >
                  {tile.label}
                </span>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-ink-muted)",
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
