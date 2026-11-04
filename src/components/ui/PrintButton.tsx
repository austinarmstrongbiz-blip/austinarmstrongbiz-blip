"use client";

export default function PrintButton({ className = "btn-yellow" }: { className?: string }) {
  return (
    <button className={className} onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
