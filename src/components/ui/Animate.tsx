"use client";

import { motion, type Variants } from "framer-motion";

// ─── Shared easing ─────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

// ─── FadeUp ────────────────────────────────────────────────────────────────
// Triggers when element scrolls into view. Use for sections, cards, text blocks.
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "section" | "article" | "span" | "p" | "li" | "header" | "footer";
}

export function FadeUp({
  children,
  delay = 0,
  className,
  style,
  as = "div",
}: FadeUpProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

// ─── FadeIn ────────────────────────────────────────────────────────────────
// Fade only — no Y movement. Good for background bands, images.
export function FadeIn({
  children,
  delay = 0,
  className,
  style,
}: Omit<FadeUpProps, "as">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerList ───────────────────────────────────────────────────────────
// Wraps a list container and staggers each direct child.
// Children should use <StaggerItem>.
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "ul" | "ol" | "section";
}

export function StaggerList({ children, className, style, as = "div" }: StaggerListProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "li" | "article" | "span";
}

export function StaggerItem({
  children,
  className,
  style,
  as = "div",
}: StaggerItemProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag variants={staggerItem} className={className} style={style}>
      {children}
    </Tag>
  );
}

// ─── HeroText ──────────────────────────────────────────────────────────────
// For the hero name: animates on mount (not scroll), fast and impactful.
export function HeroText({
  children,
  delay = 0,
  className,
  style,
}: Omit<FadeUpProps, "as">) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.span>
  );
}

// ─── YellowBarReveal ───────────────────────────────────────────────────────
// Animates the yellow highlight bar from 0 → full width.
// Place this where the yellow bar span is; it scales from the left.
export function YellowBarReveal({
  delay = 0.3,
  style,
}: {
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.55, ease, delay }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "0.06em",
        height: "0.4em",
        background: "var(--color-yellow)",
        zIndex: 0,
        transformOrigin: "left center",
        ...style,
      }}
    />
  );
}

// ─── NavSlideDown ──────────────────────────────────────────────────────────
// Subtle nav entrance on mount.
export function NavSlideDown({
  children,
  className,
  style,
}: Omit<FadeUpProps, "as" | "delay">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
