"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Phone, type Screen } from "./Phone";

// How far each phone drifts against the scroll (px). Alternating, so the row breathes.
const DRIFT = [70, -50, 110, -30, 60];

function Drift({ progress, amount, children }: { progress: MotionValue<number>; amount: number; children: React.ReactNode }) {
  const y = useTransform(progress, [0, 1], [amount, -amount]);
  return <motion.div style={{ y }}>{children}</motion.div>;
}

/**
 * Every screen in a row, like a product lineup. On desktop the phones drift
 * at different speeds as the row passes (transform only); on phones the row
 * becomes a swipeable rail. Reduced motion: a still row.
 */
export function PhoneLineup({ items }: { items: (Screen & { label: string })[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <figure data-span="bleed" ref={ref}>
      <ul
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 pt-4 md:grid md:justify-center md:snap-none md:overflow-visible md:pb-0 md:pt-24"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 300px))` }}
      >
        {items.map((it, i) => {
          const phone = <Phone screen={it} sizes="(min-width: 768px) 19vw, 62vw" />;
          return (
            <li key={it.src} className="w-[62vw] shrink-0 snap-center md:w-auto">
              {reduce ? phone : <Drift progress={scrollYProgress} amount={DRIFT[i % DRIFT.length]}>{phone}</Drift>}
              <p className="mt-6 flex items-baseline gap-3 text-[0.9375rem]">
                <span className="t-label tabular-nums text-(--cs-accent)">{String(i + 1).padStart(2, "0")}</span>
                {it.label}
              </p>
            </li>
          );
        })}
      </ul>
      <figcaption className="sr-only">All five screens of the app, side by side.</figcaption>
    </figure>
  );
}
