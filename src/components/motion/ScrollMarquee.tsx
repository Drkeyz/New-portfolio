"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * A line of words that travels only when you scroll (no idle motion),
 * two rows in opposite directions.
 */
export function ScrollMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const row = [...items, ...items, ...items];

  return (
    <div ref={ref} aria-hidden className="overflow-hidden py-10 md:py-16">
      {[a, b].map((x, r) => (
        <motion.div
          key={r}
          style={{ x: reduce ? 0 : x }}
          className={`t-display flex w-max gap-[0.5em] whitespace-nowrap ${r === 1 ? "text-muted" : ""}`}
        >
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-[0.5em]">
              {item}
              <span className="inline-block size-[0.18em] rounded-full bg-brass" />
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
