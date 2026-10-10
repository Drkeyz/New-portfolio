"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { KEYS, setSound, strike, useLitKey, useSound } from "./store";

/**
 * While sound is on: a small floating piano at the bottom-left of every page,
 * plus the A–K computer keys. Mounted once in the root layout.
 */
export function PianoDock() {
  const on = useSound();
  const lit = useLitKey();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!on) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable='true']")) return;
      const k = KEYS.find((x) => x.key === e.key.toLowerCase());
      if (k) strike(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          role="group"
          aria-label="Piano: tap a key, or press A to K on your keyboard"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="piano-dock fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-2xl border border-white/10 bg-coal/95 py-2 pl-3 pr-2 text-snow shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:bottom-5 md:left-5"
        >
          <div className="flex">
            {KEYS.map((k) => (
              <button
                key={k.key}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  strike(k);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    strike(k);
                  }
                }}
                aria-label={`${k.note}, key ${k.key.toUpperCase()}`}
                className={`-ml-px flex h-12 w-7 items-end justify-center rounded-b-[4px] border border-black/40 pb-1 text-[0.625rem] uppercase transition-colors duration-150 first:ml-0 ${
                  lit === k.key ? "bg-brass text-coal" : "bg-snow text-coal/60 hover:bg-brass/40"
                }`}
              >
                {k.key}
              </button>
            ))}
          </div>
          <span className="hidden max-w-[7rem] text-[0.75rem] leading-tight text-muted-dark [@media(hover:hover)]:block">
            Tap, or press A–K
          </span>
          <button
            type="button"
            onClick={() => setSound(false)}
            aria-label="Turn sound off"
            className="grid size-11 place-items-center rounded-full text-muted-dark hover:text-snow"
          >
            <span aria-hidden className="text-lg leading-none">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
