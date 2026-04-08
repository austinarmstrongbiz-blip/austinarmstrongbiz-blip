/**
 * Badge — a mono-font pill/tag.
 * Variants:
 *   "interest" — bordered interest tag (hover → yellow fill)
 *   "pillar"   — solid colored top-border card tag
 *   "outline"  — dark-bordered tag (used in featured essay)
 */
interface BadgeProps {
  children: React.ReactNode;
  variant?: "interest" | "outline";
  style?: React.CSSProperties;
}

export default function Badge({ children, variant = "interest", style }: BadgeProps) {
  if (variant === "outline") {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.2rem 0.5rem",
          border: "1px solid var(--color-ink)",
          color: "var(--color-ink)",
          display: "inline-block",
          ...style,
        }}
      >
        {children}
      </span>
    );
  }

  // default: "interest"
  return (
    <span className="interest-tag" style={style}>
      {children}
    </span>
  );
}
