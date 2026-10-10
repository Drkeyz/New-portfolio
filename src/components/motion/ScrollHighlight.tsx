"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Words light up one by one as the passage scrolls through the viewport.
 * The full text is always in the DOM (and read normally by screen readers).
 */
export function ScrollHighlight({
  text,
  accent = [],
  className = "",
  as: Tag = "p",
}: {
  text: string;
  accent?: string[];
  className?: string;
  as?: "p" | "h2" | "blockquote";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
          <span className={accent.includes(w) ? "t-accent" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </Word>
      ))}
    </MotionTag>
  );
}

function Word({
  progress,
  range,
  still,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>;
}
