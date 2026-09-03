/**
 * CollageLanding — the clickable image collage for the homepage.
 *
 * Server component. Every tile is a real <Link> with a real href, so it is
 * keyboard-reachable and crawlable out of the box. Full keyboard / screen-reader
 * polish (reading order, focus treatment) is a separate task.
 *
 * Tiles render as bordered placeholders for now. The real-image swap is a
 * separate task — see the PLACEHOLDER block below and `imageSrc` in tiles.ts.
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
      <div
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
    </div>
  );
}
