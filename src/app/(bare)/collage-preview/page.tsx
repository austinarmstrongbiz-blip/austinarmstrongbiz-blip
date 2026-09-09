/**
 * Dev-only preview of the homepage collage.
 *
 * Exists so CollageLanding can actually be looked at before anything is wired
 * to "/". Not linked from anywhere and marked noindex. Delete this route once
 * the collage ships on the homepage.
 */

import type { Metadata } from "next";
import CollageLanding from "@/components/collage/CollageLanding";

export const metadata: Metadata = {
  title: "Collage Preview",
  robots: { index: false, follow: false },
};

export default function CollagePreviewPage() {
  return (
    <>
      {/* Preview-only banner. Absolutely positioned so it does not push the
          collage down and change the full-height layout being reviewed. */}
      <p
        className="text-label"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1.5rem",
          zIndex: 20,
          color: "var(--color-ink-muted)",
        }}
      >
        Preview — not the live homepage
      </p>
      <CollageLanding />
    </>
  );
}
