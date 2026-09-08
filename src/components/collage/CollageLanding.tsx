/**
 * CollageLanding — the clickable image collage for the homepage.
 *
 * Server component. Every tile is a real link with a real href, so it is
 * keyboard-reachable and crawlable out of the box (the newsletter tile is an
 * outbound anchor; the rest are next/link routes). Each link carries an explicit
 * aria-label from tile.label, since the visible placeholder text goes away once
 * real art swaps in — the accessible name can't depend on it. `collageTiles` in
 * tiles.ts is ordered top-to-bottom, left-to-right, so DOM order matches reading
 * order regardless of the absolute placement. The visible focus ring comes from
 * the site-wide a:focus-visible rule in globals.css.
 *
 * Tiles render as bordered placeholders for now. The real-image swap is a
 * separate task — see the PLACEHOLDER block below and `imageSrc` in tiles.ts.
 *
 * Two genuinely separate collages, not a CSS reflow of one: the wide canvas
 * (".collage-desktop", each tile's `desktop` placement) and a narrow one
 * (".collage-mobile", each tile's `mobile` placement on MOBILE_CANVAS). A phone
 * is tall and thin, so reusing the desktop percentages would pile the tiles into
 * mush; the mobile coordinates are hand-placed. The swap is pure CSS — same
 * convention as .desktop-nav / .mobile-menu-btn in globals.css: inline style
 * sets the desktop-visible default, the max-width:640px media query flips both
 * with !important. No client JS.
 *
 * Both canvases render the same nine links, so a screen reader on a phone hears
 * the list twice. The hidden one is display:none, which removes it from the
 * accessibility tree, so only one is ever exposed.
 *
 * Not wired to "/" yet. Preview it at /collage-preview.
 */

import Link from "next/link";
import { CANVAS, MOBILE_CANVAS, collageTiles } from "./tiles";
import type { CollageTile, TilePlacement } from "./tiles";

/**
 * One tile's link. The newsletter tile leaves the site, so it renders as a
 * plain anchor with the usual new-tab safety attributes; everything else is a
 * next/link route.
 */
function TileLink({
  tile,
  style,
  children,
}: {
  tile: CollageTile;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (tile.external) {
    return (
      <a
        href={tile.href}
        aria-label={`${tile.label} (opens in a new tab)`}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={tile.href} aria-label={tile.label} style={style}>
      {children}
    </Link>
  );
}

/**
 * PLACEHOLDER — the bordered box standing in for artwork. The real-image task
 * replaces this with the art at tile.imageSrc; the wrapping link keeps its
 * geometry either way.
 */
function TilePlaceholder({ tile, index }: { tile: CollageTile; index: number }) {
  return (
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
        gap: "0.4rem",
        padding: "0.5rem",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.14em",
          color: "var(--color-ink-muted)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 2.2vw, 1.4rem)",
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
          color: "var(--color-ink-muted)",
          overflowWrap: "anywhere",
        }}
      >
        {tile.external ? "substack.com" : tile.href}
      </span>
    </div>
  );
}

function linkStyle(p: TilePlacement): React.CSSProperties {
  return {
    position: "absolute",
    left: `${p.x}%`,
    top: `${p.y}%`,
    width: `${p.w}%`,
    aspectRatio: `${p.aspect}`,
    zIndex: p.z,
    transform: `rotate(${p.rotate}deg)`,
    display: "block",
    // Tiles are far larger than this, but it holds if a placement is ever
    // hand-edited down to something untappable.
    minWidth: "44px",
    minHeight: "44px",
  };
}

export default function CollageLanding() {
  return (
    <div
      style={{
        // Breathing room so rotated tiles near the edges don't get clipped.
        padding: "2rem 1.5rem 3rem",
      }}
    >
      {/* ── Wide collage (>=640px) — each tile's `desktop` placement ── */}
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
          <TileLink key={tile.href} tile={tile} style={linkStyle(tile.desktop)}>
            <TilePlaceholder tile={tile} index={i} />
          </TileLink>
        ))}
      </div>

      {/* ── Narrow collage (<640px) — each tile's hand-placed `mobile` ── */}
      <div
        className="collage-mobile"
        style={{
          display: "none", // shown by the max-width:640px rule in globals.css
          position: "relative",
          width: "100%",
          maxWidth: `${MOBILE_CANVAS.width}px`,
          aspectRatio: `${MOBILE_CANVAS.width} / ${MOBILE_CANVAS.height}`,
          marginInline: "auto",
        }}
      >
        {collageTiles.map((tile, i) => (
          <TileLink key={tile.href} tile={tile} style={linkStyle(tile.mobile)}>
            <TilePlaceholder tile={tile} index={i} />
          </TileLink>
        ))}
      </div>
    </div>
  );
}
