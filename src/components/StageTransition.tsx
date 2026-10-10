"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll-scrubbed light → dark transition for the Creative section.
 * A charcoal layer fades in behind the content (opacity only). Text that is
 * visible during the fade uses --stage-fg, which flips from ink to paper at
 * the midpoint, the point where both colours meet AA large-text contrast
 * (≥ 3:1) against the blended background. Everything below the intro
 * appears only after the layer is fully opaque.
 *
 * Server-rendered and no-JS state is fully dark, so content is never
 * light-on-light.
 */
export function StageTransition({
  id,
  labelledBy,
  children,
}: {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lit, setLit] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.2"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    setMounted(true);
    setLit(scrollYProgress.get() >= 0.5);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(v >= 0.5));

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-theme="dark"
      data-stage
      data-lit={lit}
      className="relative isolate text-snow"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-stage"
        style={{ opacity: mounted ? opacity : 1 }}
      >
        {/* Soft spotlight + grain: atmosphere, not decoration. */}
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          <div className="absolute left-1/2 top-[-20%] h-[90svh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,155,60,0.16),transparent)]" />
          <div className="grain absolute inset-0" />
        </div>
      </motion.div>
      {children}
    </section>
  );
}
