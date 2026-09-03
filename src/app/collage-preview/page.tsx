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
    <section style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <div className="container-editorial" style={{ marginBottom: "2rem" }}>
        <p className="text-label">Preview — not the live homepage</p>
      </div>
      <CollageLanding />
    </section>
  );
}
