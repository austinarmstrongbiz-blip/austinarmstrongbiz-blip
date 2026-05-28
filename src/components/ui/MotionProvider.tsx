"use client";

import { MotionConfig } from "framer-motion";

/**
 * App-wide motion config. `reducedMotion="user"` makes every Framer Motion
 * animation respect the OS "reduce motion" accessibility setting — transform
 * and layout animations are disabled, opacity fades are kept.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
