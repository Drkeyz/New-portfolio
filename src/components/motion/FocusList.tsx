"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Items sharpen as they pass the middle of the viewport and recede after. */
export function FocusList({ items }: { items: string[] }) {
  return (
    <ol className="border-t border-line/40">
      {items.map((item, i) => (
        <FocusItem key={item} index={i} text={item} />
      ))}
    </ol>
  );
}

function FocusItem({ index, text }: { index: number; text: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 0.9], [0.18, 1, 1, 0.18]);
  const x = useTransform(scrollYProgress, [0.15, 0.45], [-24, 0]);
  const rule = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  return (
    <li ref={ref} className="relative grid grid-cols-[3.5rem_1fr] items-baseline border-b border-line/40 py-10 md:grid-cols-[5rem_1fr] md:py-14">
      <span className="t-label tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
      <motion.span className="t-display block" style={reduce ? undefined : { opacity, x }}>
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-brass"
        style={{ scaleX: reduce ? 1 : rule }}
      />
    </li>
  );
}
