/**
 * The homepage: the collage, and nothing else.
 *
 * Lives in the (bare) route group, so it renders with no header and no footer.
 * The collage is the navigation; the rooms behind it carry the site chrome.
 */

import type { Metadata } from "next";
import CollageLanding from "@/components/collage/CollageLanding";

export const metadata: Metadata = {
  title: "Austin Armstrong — Generalist Operator, Writer, Builder",
  alternates: { canonical: "https://austin-armstrong.me" },
};

export default function HomePage() {
  return <CollageLanding />;
}
