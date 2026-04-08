/**
 * YellowHighlight — wraps text with the signature yellow bar behind it.
 * Used for "Armstrong." in the logo, hero, and CV header.
 *
 * Usage:
 *   <YellowHighlight fontSize="clamp(4rem, 10vw, 9rem)">Armstrong.</YellowHighlight>
 */
interface YellowHighlightProps {
  children: React.ReactNode;
  fontSize?: string;
  /** Extra inline styles for the outer wrapper span */
  style?: React.CSSProperties;
}

export default function YellowHighlight({ children, fontSize, style }: YellowHighlightProps) {
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: fontSize ?? "inherit",
        lineHeight: 1,
        letterSpacing: "-0.025em",
        color: "var(--color-ink)",
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "0.06em",
          height: "0.4em",
          background: "var(--color-yellow)",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
}
