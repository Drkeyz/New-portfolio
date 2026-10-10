"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Oversized lines that slide in from alternating sides as they scroll into
 * place, then settle — a closing cadence.
 */
export function KineticLines({ id, lines, className = "" }: { id?: string; lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end 0.75"] });

  return (
    <h2 ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <Line key={line} index={i} progress={scrollYProgress} still={!!reduce}>
          {line}
        </Line>
      ))}
    </h2>
  );
}

function Line({
  index,
  progress,
  still,
  children,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  still: boolean;
  children: React.ReactNode;
}) {
  const dir = index % 2 === 0 ? -1 : 1;
  const start = index * 0.12;
  const x = useTransform(progress, [start, Math.min(1, start + 0.55)], [`${dir * 28}%`, "0%"]);
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.35)], [0, 1]);
  return (
    <motion.span className="block whitespace-nowrap" style={still ? undefined : { x, opacity }}>
      {children}
    </motion.span>
  );
}
