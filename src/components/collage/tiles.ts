/**
 * Collage landing tiles — desktop layout config.
 *
 * The homepage collage is a set of overlapping tiles scattered across a fixed
 * 960 x 760 canvas (see CANVAS below). Everything here is a percentage so the
 * canvas can scale down without the layout coming apart.
 *
 * Rotation lives here, not in the artwork. The art files stay square-on and
 * upright; CSS tilts them. That way a tile can be re-angled without re-exporting
 * an image, and the image itself stays reusable elsewhere.
 *
 * Mobile is a separate, hand-placed layout at the 640px breakpoint — a later
 * task. Nothing here describes mobile.
 */

export interface CollageTile {
  /** Route this tile links to. */
  href: string;
  /** Human label — shown on the placeholder, and the link's accessible name. */
  label: string;
  /** Left edge, as a percent of canvas width. */
  x: number;
  /** Top edge, as a percent of canvas height. */
  y: number;
  /** Tile width, as a percent of canvas width. */
  w: number;
  /** Tile width / height. Height is derived from w so art keeps its proportions. */
  aspect: number;
  /** Tilt in degrees. Applied by CSS, never baked into the art. */
  rotate: number;
  /** Stacking order. Higher sits on top. */
  z: number;
  /**
   * Path to the tile artwork under /public.
   *
   * Unused for now — placeholders ship first. The real-image swap is a separate
   * task: it reads this field and renders the art instead of the placeholder box.
   */
  imageSrc?: string;
}

/**
 * Canvas the percentages above are measured against.
 * The rendered canvas is `min(960px, 100%)` wide and holds this aspect ratio.
 */
export const CANVAS = { width: 960, height: 760 } as const;

/**
 * Nine tiles: the seven real nav routes (src/lib/nav.ts), plus /about, plus one
 * signature tile.
 *
 * Layout logic, roughly: three across the top, three through the middle band,
 * three along the bottom, each row offset from the one above so the tiles
 * interlock instead of sitting in a grid. /about is the visual anchor — biggest
 * z in the middle of the canvas, since it's the "who is this guy" tile.
 */
export const collageTiles: CollageTile[] = [
  // ── Top band ──────────────────────────────────────────────
  { href: "/now", label: "Field Notes", x: 2, y: 4, w: 30, aspect: 1.35, rotate: -4, z: 3 },
  { href: "/essays", label: "Essays", x: 30, y: 0, w: 26, aspect: 0.78, rotate: 3, z: 5 },
  { href: "/rants", label: "Rants", x: 57, y: 6, w: 30, aspect: 1.5, rotate: -6, z: 2 },

  // ── Middle band ───────────────────────────────────────────
  { href: "/projects", label: "Projects", x: 4, y: 34, w: 27, aspect: 1.1, rotate: 5, z: 6 },
  // /about is added by a sibling branch. The route will exist once branches merge.
  { href: "/about", label: "About", x: 33, y: 30, w: 30, aspect: 1.25, rotate: -2, z: 8 },
  { href: "/work", label: "Work", x: 64, y: 30, w: 26, aspect: 0.95, rotate: 4, z: 4 },

  // ── Bottom band ───────────────────────────────────────────
  { href: "/playbook", label: "The Homies", x: 12, y: 64, w: 28, aspect: 1.4, rotate: -3, z: 7 },
  { href: "/resume", label: "CV", x: 42, y: 62, w: 24, aspect: 1.6, rotate: 6, z: 5 },
  // Ninth tile: Austin's signature phrase as a sticker. Points back at "/" —
  // it's an easter egg, not navigation, so it doesn't need its own route.
  {
    href: "/",
    label: "It Always Buffs Out",
    x: 68,
    y: 62,
    w: 22,
    aspect: 1.2,
    rotate: -8,
    z: 9,
  },
];
