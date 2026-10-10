"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Starts tight on a detail (origin) and widens to the full frame as the
 * image scrolls toward the centre of the viewport. Transform only.
 */
export function ScrollCrop({
  children,
  origin,
  from = 1.6,
  className = "",
}: {
  children: React.ReactNode;
  /** CSS transform-origin of the detail to start on, e.g. "62% 68%". */
  origin: string;
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : scale, transformOrigin: origin }}>
        {children}
      </motion.div>
    </div>
  );
}
