import MotionProvider from "@/components/ui/MotionProvider";

/**
 * No header, no footer. Used by the collage landing page, which is the door to
 * the site rather than a page within it: navigation is the collage itself, so
 * a nav bar above it would just be the same links twice.
 *
 * Route groups do not appear in URLs, so this changes no paths.
 */
export default function BareLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <MotionProvider>{children}</MotionProvider>
    </main>
  );
}
