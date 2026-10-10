"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Floating section index (01–08). Appears once the story starts, shows where
 * you are, and opens into the full list. Desktop and tablet only.
 */
export function CaseIndex({
  sections: all,
  containerId,
}: {
  sections: { id: string; title: string }[];
  containerId: string;
}) {
  // Only the sections this case study actually has.
  const [sections, setSections] = useState(all);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setSections(all.filter((s) => document.getElementById(s.id)));
  }, [all]);

  // Which section is being read, and whether we're inside the story at all.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.4;
      let idx = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
      const box = document.getElementById(containerId)?.getBoundingClientRect();
      setVisible(Boolean(box && box.top < window.innerHeight * 0.5 && box.bottom > window.innerHeight * 0.6));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections, containerId]);

  // Close on Escape or outside click; return focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (!visible) setOpen(false);
    // Lets other floating UI (the piano dock) step out of the way.
    document.documentElement.toggleAttribute("data-case-index", visible);
    return () => document.documentElement.removeAttribute("data-case-index");
  }, [visible]);

  const current = sections[active];
  const shown = visible || open;

  return (
    <nav
      ref={root}
      aria-label="Case study sections"
      className={`fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 transition-[opacity,transform] duration-500 ease-rhythm md:block ${
        shown ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      // Keyboard users can always reach it, even before it fades in.
      onFocus={() => setVisible(true)}
    >
      <AnimatePresence>
        {open && (
          <motion.ol
            id="case-index-list"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 mb-2 w-72 -translate-x-1/2 rounded-2xl border border-(--cs-line) bg-(--cs-bg)/95 p-2 backdrop-blur-md"
          >
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={i === active ? "location" : undefined}
                  className={`flex min-h-10 items-center gap-3 rounded-xl px-3 text-[0.9375rem] transition-colors ${
                    i === active ? "bg-(--cs-surface) text-(--cs-text)" : "text-(--cs-muted) hover:text-(--cs-text)"
                  }`}
                >
                  <span className="tabular-nums text-(--cs-accent)">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>

      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="case-index-list"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 items-center gap-4 rounded-full border border-(--cs-line) bg-(--cs-bg)/90 py-2 pl-5 pr-4 text-[0.9375rem] backdrop-blur-md"
      >
        <span className="tabular-nums text-(--cs-accent)">
          {String(active + 1).padStart(2, "0")}
          <span className="text-(--cs-muted)"> / {String(sections.length).padStart(2, "0")}</span>
        </span>
        <span className="w-32 truncate text-left">{current?.title}</span>
        {/* Progress through the story */}
        <span aria-hidden className="relative h-px w-16 bg-(--cs-line)">
          <span
            className="absolute inset-y-0 left-0 origin-left bg-(--cs-accent) transition-[width] duration-500 ease-rhythm"
            style={{ width: `${((active + 1) / sections.length) * 100}%` }}
          />
        </span>
        <span aria-hidden className={`text-(--cs-muted) transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ⌃
        </span>
        <span className="sr-only">Show all sections</span>
      </button>
    </nav>
  );
}
