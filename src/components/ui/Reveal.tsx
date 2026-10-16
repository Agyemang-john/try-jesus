"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Tags the reveal can render as. Resolved once at module scope — building the
 *  motion component inside render would remount the subtree on every pass. */
const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  figure: motion.figure,
  header: motion.header,
  p: motion.p,
} as const;

type RevealTag = keyof typeof TAGS;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Seconds. Small staggered values read best — roughly 0.06 per item. */
  delay?: number;
  /** `up` for copy blocks, `fade` for imagery that should not shift. */
  variant?: "up" | "fade";
};

/**
 * A single, restrained entrance: eight pixels and an opacity fade, once.
 *
 * Deliberately the only scroll animation in the project. Anyone who has asked
 * their system to reduce motion gets the finished state immediately — not a
 * shorter animation, no animation.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = TAGS[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: variant === "up" ? 8 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
