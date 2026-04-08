/**
 * Section — standard section wrapper.
 * Optionally renders a 4px yellow top strip (like the CV/Essays headers).
 *
 * Usage:
 *   <Section yellowStrip border="bottom" paddingTop="5rem" paddingBottom="4rem">
 *     ...
 *   </Section>
 */
interface SectionProps {
  children: React.ReactNode;
  /** Render the 4px yellow accent bar at the very top */
  yellowStrip?: boolean;
  /** Border variant */
  border?: "bottom" | "bottom-thick" | "top" | "none";
  paddingTop?: string;
  paddingBottom?: string;
  background?: string;
  style?: React.CSSProperties;
}

export default function Section({
  children,
  yellowStrip = false,
  border = "none",
  paddingTop = "4rem",
  paddingBottom = "4rem",
  background,
  style,
}: SectionProps) {
  const borderMap: Record<string, string> = {
    bottom: "1px solid var(--color-rule)",
    "bottom-thick": "2px solid var(--color-ink)",
    top: "1px solid var(--color-rule)",
    none: "none",
  };

  const borderStyle =
    border === "top"
      ? { borderTop: borderMap[border] }
      : border === "none"
      ? {}
      : { borderBottom: borderMap[border] };

  return (
    <section
      style={{
        paddingTop,
        paddingBottom,
        background,
        ...borderStyle,
        ...style,
      }}
    >
      {yellowStrip && (
        <div style={{ height: "4px", background: "var(--color-yellow)" }} />
      )}
      {children}
    </section>
  );
}
