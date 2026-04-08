/**
 * PullQuote — yellow left-border editorial quote block.
 *
 * Usage:
 *   <PullQuote>The generalist sees connections the specialist never will.</PullQuote>
 */
interface PullQuoteProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function PullQuote({ children, style }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote" style={style}>
      {children}
    </blockquote>
  );
}
