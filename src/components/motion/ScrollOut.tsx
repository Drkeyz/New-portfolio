"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Lifts and fades its content as it scrolls out of the top of the viewport. */
export function ScrollOut({ children, className = "", lift = 120 }: { children: React.ReactNode; className?: string; lift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -lift]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}
