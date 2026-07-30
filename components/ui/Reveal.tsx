"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Stagger index — later items arrive later. */
  delay?: number;
  /** Small rotation on entry so reveals don't all feel mechanical. */
  rotate?: number;
  y?: number;
  className?: string;
}

/**
 * Scroll reveal. Deliberately subtle: a long slow fade-up is the house style
 * of generated pages. Short travel, slight rotation, quick settle.
 */
export function Reveal({ children, delay = 0, rotate = 0, y = 26, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate: rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.2, 0.8, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
