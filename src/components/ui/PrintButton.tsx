"use client";

export default function PrintButton() {
  return (
    <button
      className="btn-yellow"
      onClick={() => window.print()}
    >
      Print / Save PDF
    </button>
  );
}
