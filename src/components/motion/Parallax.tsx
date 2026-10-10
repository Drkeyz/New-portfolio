"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Moves its content against the scroll by ±`amount` (% of its own height). */
export function Parallax({
  children,
  amount = 8,
  className = "",
  scale = true,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
  /** Scale up slightly to hide the edges while moving. Turn off for content smaller than its frame. */
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y, scale: reduce || !scale ? 1 : 1 + amount / 50 }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
