/**
 * SectionHeader — the label + thick rule pattern used at the top of every section.
 *
 * Usage:
 *   <SectionHeader label="Experience" />
 *   <SectionHeader label="Reading" style={{ marginBottom: "4rem" }} />
 */
interface SectionHeaderProps {
  label: string;
  style?: React.CSSProperties;
}

export default function SectionHeader({ label, style }: SectionHeaderProps) {
  return (
    <div style={style}>
      <div className="text-label" style={{ marginBottom: "0.5rem" }}>
        {label}
      </div>
      <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
    </div>
  );
}
