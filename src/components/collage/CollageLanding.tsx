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
 * A tile renders its artwork if `public/collage/<slug>.png` (or .webp/.jpg)
 * exists, and a bordered placeholder box if it does not. The art is decorative:
 * the link already carries the label as its accessible name, so the image is
 * alt="" and aria-hidden rather than repeating it to a screen reader.
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
 * Rendered inside the (bare) route group: no header, no footer. The collage
 * is the navigation, and the social row below it is the page's only other
 * chrome.
 *
 * Not wired to "/" yet. Preview it at /collage-preview.
 */

import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks";
import { CANVAS, MOBILE_CANVAS, collageTiles } from "./tiles";
import type { CollageTile, TilePlacement } from "./tiles";

/**
 * Artwork lookup. `public/collage/<slug>.(png|jpg|jpeg|webp)` is rendered if it
 * exists, and the placeholder box if it does not — so adding real art is just
 * dropping a correctly named file in, with no code change and no path to keep
 * in sync. Read once at module scope: this is a server component and the page
 * is static, so the directory is scanned at build time, never per request.
 */
const ART_DIR = path.join(process.cwd(), "public", "collage");
const EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg"];

interface Art {
  src: string;
  /**
   * The artwork's own width/height, used in place of the tile's configured
   * aspect. A tile then hugs its picture instead of leaving dead space inside
   * an arbitrary box — which matters because the box is the click target and
   * the caption hangs off its bottom edge. Null when the file's dimensions
   * could not be read, in which case the configured aspect stands.
   */
  aspect: number | null;
}

/** PNG dimensions live in the IHDR chunk at a fixed offset. No decoder needed. */
function pngAspect(file: string): number | null {
  try {
    const fd = fs.openSync(file, "r");
    const head = Buffer.alloc(24);
    fs.readSync(fd, head, 0, 24, 0);
    fs.closeSync(fd);
    if (head.toString("ascii", 1, 4) !== "PNG") return null;
    const w = head.readUInt32BE(16);
    const h = head.readUInt32BE(20);
    return w > 0 && h > 0 ? w / h : null;
  } catch {
    return null;
  }
}

const artBySlug: Record<string, Art> = (() => {
  const found: Record<string, Art> = {};
  const chosenExt: Record<string, string> = {};
  let files: string[];
  try {
    files = fs.readdirSync(ART_DIR);
  } catch {
    return found; // no art yet — every tile falls back to its placeholder
  }
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;
    const stem = path.basename(file, ext);
    // First matching extension in EXTENSIONS order wins, so a .png and a .jpg
    // of the same tile resolve predictably instead of by directory order.
    if (stem in chosenExt && EXTENSIONS.indexOf(ext) >= EXTENSIONS.indexOf(chosenExt[stem])) {
      continue;
    }
    chosenExt[stem] = ext;
    found[stem] = {
      src: `/collage/${file}`,
      aspect: ext === ".png" ? pngAspect(path.join(ART_DIR, file)) : null,
    };
  }
  return found;
})();

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
  const className = "collage-tile";
  if (tile.external) {
    return (
      <a
        href={tile.href}
        aria-label={`${tile.label} (opens in a new tab)`}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={tile.href} aria-label={tile.label} className={className} style={style}>
      {children}
    </Link>
  );
}

/**
 * PLACEHOLDER — the bordered box standing in for artwork. The real-image task
 * replaces this with the art at tile.imageSrc; the wrapping link keeps its
 * geometry either way.
 */
function TileArt({ tile, index }: { tile: CollageTile; index: number }) {
  const art = artBySlug[tile.slug];
  if (art) {
    return (
      <>
        {/* The nudge animates this wrapper, not the link, so it does not fight
            the link's own rotate() placement. */}
        <span className="collage-tile-art" style={{ display: "block", height: "100%" }}>
          {/* Plain <img>: these are hand-cut transparent PNGs sized to the tile,
              and next/image would add layout wrappers that fight the absolute
              placement. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={art.src}
            alt=""
            aria-hidden
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </span>
        {/* A cut-out photo does not say where it goes. On a pointer device this
            caption appears on hover or keyboard focus; on touch, where there is
            no hover, it is always visible. See globals.css. */}
        <span className="collage-tile-label" aria-hidden>
          {tile.label}
        </span>
      </>
    );
  }
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

/**
 * Vertical space the collage is not allowed to use on the wide canvas: the
 * wrapper's padding plus the social row. Phones are left to scroll — squeezing
 * the tall mobile zigzag into one screen would shrink the tiles to nothing.
 */
const CHROME_RESERVE = "9rem";

function linkStyle(p: TilePlacement, artAspect?: number | null): React.CSSProperties {
  return {
    position: "absolute",
    left: `${p.x}%`,
    top: `${p.y}%`,
    width: `${p.w}%`,
    aspectRatio: `${artAspect ?? p.aspect}`,
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
        // The collage is the whole page: no header above it, no footer below.
        // Fill the viewport and centre the canvas so it never floats in a
        // corner on a tall screen, but let it grow past 100dvh if the canvas
        // needs more room than the viewport has.
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        // Breathing room so rotated tiles near the edges don't get clipped.
        padding: "2rem 1.5rem 1.5rem",
      }}
    >
      {/* ── Wide collage (>=640px) — each tile's `desktop` placement ── */}
      <div
        className="collage-desktop"
        style={{
          position: "relative",
          margin: "auto",
          width: "100%",
          // Cap by height as well as width so the canvas and the social row
          // below it both fit one screen on a short laptop, instead of pushing
          // the socials under the fold. CHROME_RESERVE is the padding above and
          // below plus the social row itself.
          maxWidth: `min(${CANVAS.width}px, calc((100dvh - ${CHROME_RESERVE}) * ${CANVAS.width / CANVAS.height}))`,
          aspectRatio: `${CANVAS.width} / ${CANVAS.height}`,
        }}
      >
        {collageTiles.map((tile, i) => (
          <TileLink
            key={tile.href}
            tile={tile}
            style={linkStyle(tile.desktop, artBySlug[tile.slug]?.aspect)}
          >
            <TileArt tile={tile} index={i} />
          </TileLink>
        ))}
      </div>

      {/* ── Narrow collage (<640px) — each tile's hand-placed `mobile` ── */}
      <div
        className="collage-mobile"
        style={{
          display: "none", // shown by the max-width:640px rule in globals.css
          position: "relative",
          margin: "auto",
          width: "100%",
          maxWidth: `${MOBILE_CANVAS.width}px`,
          aspectRatio: `${MOBILE_CANVAS.width} / ${MOBILE_CANVAS.height}`,
        }}
      >
        {collageTiles.map((tile, i) => (
          <TileLink
            key={tile.href}
            tile={tile}
            style={linkStyle(tile.mobile, artBySlug[tile.slug]?.aspect)}
          >
            <TileArt tile={tile} index={i} />
          </TileLink>
        ))}
      </div>

      {/* ── Socials ── the page has no footer, so these sit under the collage. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          flexShrink: 0,
        }}
      >
        <SocialLinks gap="1.75rem" />
      </div>
    </div>
  );
}
