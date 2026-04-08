/**
 * Card — reusable bordered card for essays, books, thoughts.
 * Renders children inside a padded block with a bottom rule.
 *
 * Usage:
 *   <Card>...</Card>
 *   <Card noBorder>...</Card>
 */
interface CardProps {
  children: React.ReactNode;
  noBorder?: boolean;
  style?: React.CSSProperties;
}

export default function Card({ children, noBorder = false, style }: CardProps) {
  return (
    <article
      style={{
        padding: "2.5rem 0",
        borderBottom: noBorder ? "none" : "1px solid var(--color-rule)",
        ...style,
      }}
    >
      {children}
    </article>
  );
}
