import { SUBSTACK_URL } from "@/lib/substack";

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
 * Mobile is a separate, hand-placed layout on its own narrower canvas — see
 * each tile's `mobile` block and MOBILE_CANVAS. It is deliberately not a reflow
 * of the desktop coordinates.
 */

/** Where a tile sits on a canvas. Percentages, so the canvas can scale. */
export interface TilePlacement {
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
}

export interface CollageTile {
  /** Route this tile links to, or an absolute URL when `external` is set. */
  href: string;
  /** True when href leaves the site — rendered as a plain anchor, new tab. */
  external?: boolean;
  /** Human label — shown on the placeholder, and the link's accessible name. */
  label: string;
  /** Placement on the wide canvas. */
  desktop: TilePlacement;
  /**
   * Placement on the narrow canvas. Hand-placed, not a reflow of `desktop`:
   * a tall thin phone needs its own arrangement or the tiles stack into mush.
   */
  mobile: TilePlacement;
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
 * The narrow canvas, used below 640px. Tall and thin, with its own coordinates
 * in each tile's `mobile` block — the phone gets a real collage, not a list.
 */
export const MOBILE_CANVAS = { width: 360, height: 1000 } as const;

/**
 * Nine tiles: the seven real nav routes (src/lib/nav.ts), plus /about, plus the
 * newsletter — the only outbound link.
 *
 * Every tile is a real destination. A tenth "It Always Buffs Out" sticker was
 * cut: it pointed back at the homepage, so it took collage space and a tab stop
 * without going anywhere.
 *
 * Layout logic, roughly: three across the top, three through the middle band,
 * three along the bottom, each row offset from the one above so the tiles
 * interlock instead of sitting in a grid. /about is the visual anchor — biggest
 * z in the middle of the canvas, since it's the "who is this guy" tile.
 */
export const collageTiles: CollageTile[] = [
  {
    href: "/now",
    label: "Field Notes",
    desktop: { x: 2, y: 4, w: 30, aspect: 1.35, rotate: -4, z: 3 },
    mobile: { x: 2, y: 2, w: 52, aspect: 1.3, rotate: -4, z: 3 },
  },
  {
    href: "/essays",
    label: "Essays",
    desktop: { x: 30, y: 0, w: 26, aspect: 0.78, rotate: 3, z: 5 },
    mobile: { x: 50, y: 9, w: 46, aspect: 0.95, rotate: 5, z: 5 },
  },
  {
    href: "/matchday",
    label: "Matchday",
    desktop: { x: 57, y: 6, w: 30, aspect: 1.5, rotate: -6, z: 2 },
    mobile: { x: 4, y: 20, w: 54, aspect: 1.45, rotate: 3, z: 4 },
  },
  {
    href: "/projects",
    label: "Projects",
    desktop: { x: 4, y: 34, w: 27, aspect: 1.1, rotate: 5, z: 6 },
    mobile: { x: 46, y: 30, w: 50, aspect: 1.1, rotate: -6, z: 6 },
  },
  // /about is added by a sibling branch. The route will exist once branches merge.
  {
    href: "/about",
    label: "About",
    desktop: { x: 33, y: 30, w: 30, aspect: 1.25, rotate: -2, z: 8 },
    mobile: { x: 6, y: 41, w: 56, aspect: 1.25, rotate: -2, z: 8 },
  },
  {
    href: "/work",
    label: "Work",
    desktop: { x: 64, y: 30, w: 26, aspect: 0.95, rotate: 4, z: 4 },
    mobile: { x: 48, y: 52, w: 46, aspect: 0.95, rotate: 4, z: 7 },
  },
  {
    href: "/playbook",
    label: "The Homies",
    desktop: { x: 12, y: 64, w: 28, aspect: 1.4, rotate: -3, z: 7 },
    mobile: { x: 3, y: 61, w: 52, aspect: 1.4, rotate: 5, z: 6 },
  },
  {
    href: "/resume",
    label: "CV",
    desktop: { x: 42, y: 62, w: 24, aspect: 1.6, rotate: 6, z: 5 },
    mobile: { x: 46, y: 72, w: 44, aspect: 1.5, rotate: -5, z: 5 },
  },
  // The newsletter is the one tile that leaves the site.
  {
    href: SUBSTACK_URL,
    label: "None of the Above",
    external: true,
    desktop: { x: 66, y: 66, w: 26, aspect: 1.3, rotate: 7, z: 6 },
    mobile: { x: 8, y: 81, w: 54, aspect: 1.3, rotate: 6, z: 4 },
  },
];
