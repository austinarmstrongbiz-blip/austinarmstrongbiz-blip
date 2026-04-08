"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { href: "/now",    label: "Now"    },
  { href: "/essays", label: "Essays" },
  { href: "/resume", label: "CV"     },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Hamburger button — only visible on small screens */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        style={{
          display: "none",          // hidden by default; CSS below overrides on mobile
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          gap: "5px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "2rem",
          height: "2rem",
        }}
        className="mobile-menu-btn"
      >
        {/* Three bars that animate to an X */}
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "var(--color-ink)",
            transition: "transform 0.2s ease, opacity 0.2s ease",
            transform: open ? "translateY(7px) rotate(45deg)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "var(--color-ink)",
            transition: "opacity 0.2s ease",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "var(--color-ink)",
            transition: "transform 0.2s ease, opacity 0.2s ease",
            transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(35,31,32,0.4)",
            zIndex: 98,
            backdropFilter: "blur(2px)",
          }}
          aria-hidden
        />
      )}

      {/* Slide-in drawer */}
      <nav
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(80vw, 320px)",
          background: "var(--color-bg)",
          zIndex: 99,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          boxShadow: open ? "-4px 0 32px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "1rem",
              color: "var(--color-ink)",
              textDecoration: "none",
            }}
          >
            Austin Armstrong.
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink-muted)",
              fontSize: "1.25rem",
              lineHeight: 1,
              padding: "0.25rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Yellow accent line */}
        <div
          style={{
            height: "3px",
            background: "var(--color-yellow)",
            marginBottom: "2rem",
          }}
        />

        {/* Nav links */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0" }}>
          {navItems.map((item) => (
            <li key={item.href} style={{ borderBottom: "1px solid var(--color-rule)" }}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.25rem 0",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  letterSpacing: "-0.01em",
                  color: "var(--color-ink)",
                  textDecoration: "none",
                }}
              >
                {item.label}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom folio */}
        <div style={{ marginTop: "auto" }}>
          <span className="folio">austin-armstrong.me</span>
        </div>
      </nav>
    </>
  );
}
