"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Thousands separators, e.g. 542,000,000. */
  group?: boolean;
  duration?: number;
};

/**
 * Counts up once when it scrolls into view. Server HTML and reduced-motion
 * users get the final number; screen readers always get the final number.
 */
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, group = true, duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: group,
    })}${suffix}`;

  // Reset to zero after hydration (only if motion is allowed), then count when seen.
  useEffect(() => {
    if (reduce) return;
    setDisplay(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [armed, inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>{format(display)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
