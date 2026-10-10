"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const QUERY = "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

/**
 * Small dot that follows the pointer and becomes a labelled pill over
 * elements with data-cursor="Label". Colour comes from the --cursor-color
 * CSS variable of whatever is under the pointer (brass in Creative, the
 * project accent on case studies). Fine pointers only.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? <CursorDot /> : null;
}

function CursorDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });
  const [label, setLabel] = useState<string | null>(null);
  const [color, setColor] = useState("#0E0E0E");
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      const c = getComputedStyle(target).getPropertyValue("--cursor-color").trim();
      if (c) setColor(c);
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  // Dark cursor gets light text, light/brass/accent cursors get dark text.
  const textColor = luminance(color) < 0.3 ? "#F5F5F2" : "#0E0E0E";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150]"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer divs centre on the pointer; inner motion divs only scale/fade. */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="size-2.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: label ? 0 : down ? 0.7 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <div className="absolute -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              className="t-label whitespace-nowrap rounded-full px-3.5 py-2 text-[0.6875rem]"
              style={{ backgroundColor: color, color: textColor }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: down ? 0.94 : 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function luminance(hex: string) {
  const m = hex.trim().match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return 0;
  const [r, g, b] = m.slice(1).map((h) => parseInt(h, 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
