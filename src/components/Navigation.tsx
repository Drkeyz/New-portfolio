"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@content/site";
import { ThemeToggle } from "./ThemeToggle";
import { SoundButton } from "./piano/SoundButton";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dark, setDark] = useState(false);
  // A light-themed page (e.g. a showcase) under the bar, whatever the site theme is.
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const focusWithin = useRef(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCompact(y > 40);
      if (!focusWithin.current) {
        if (y > 160 && y > lastY + 4) setHidden(true);
        else if (y < lastY - 4 || y <= 160) setHidden(false);
      }
      lastY = y;
      // Is a dark section currently under the bar?
      const probe = 32;
      let isDark = false;
      let isLight = false;
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          if (el.dataset.theme === "dark") isDark = true;
          if (el.dataset.theme === "light") isLight = true;
        }
      });
      setDark(isDark);
      setLight(isLight && !isDark);
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
  }, []);

  const tone = dark
    ? "text-snow [--focus:var(--color-snow)] [--color-paper:var(--color-stage)]"
    : light
      ? "text-coal [--focus:var(--color-coal)] [--color-ink:var(--color-coal)] [--color-paper:#FBF8FC] [--color-muted:#5E5270]"
      : "text-ink [--focus:var(--color-ink)]";
  const surface = compact ? (dark ? "bg-stage" : "bg-paper") : "bg-transparent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-rhythm ${surface} ${tone} ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
        onFocusCapture={() => {
          focusWithin.current = true;
          setHidden(false);
        }}
        onBlurCapture={() => {
          focusWithin.current = false;
        }}
      >
        <nav
          aria-label="Primary"
          className={`wrap flex items-center justify-between transition-[padding] duration-500 ${
            compact ? "py-3" : "py-5 md:py-7"
          }`}
        >
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-[-0.03em]"
          >
            {site.shortName}
            <span className="sr-only">, {site.role} — home</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <p className={`flex items-center gap-2 text-sm ${dark ? "text-muted-dark" : "text-muted"}`}>
              <span aria-hidden className="size-1.5 rounded-full bg-brass" />
              {site.availability}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <ul className="hidden items-center gap-7 md:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-[0.95rem]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center md:-mr-3">
              <SoundButton />
              <ThemeToggle className="-mr-1 md:mr-0" />
            </div>
            <button
              type="button"
              className="-mr-3 flex min-h-11 min-w-11 items-center justify-center px-3 text-[0.95rem] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={close} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const root = ref.current;
    document.body.style.overflow = "hidden";
    root?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !root) return;
      const items = root.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-coal text-snow [--focus:var(--color-snow)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.4, ease }}
        >
          <div className="wrap flex items-center justify-between py-5">
            <span className="font-display text-lg font-semibold tracking-[-0.03em]">{site.shortName}</span>
            <button
              type="button"
              className="-mr-3 flex min-h-11 min-w-11 items-center justify-center px-3"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <ul className="wrap mt-auto flex flex-col gap-1 pb-10">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <motion.div
                  initial={reduce ? { opacity: 0 } : { y: "100%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.08 * i + 0.1 }}
                >
                  <Link href={item.href} onClick={onClose} className="t-display block py-1">
                    {item.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
          <div className="wrap flex flex-col gap-1 border-t border-white/15 py-6 text-sm text-muted-dark">
            <p className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-brass" />
              {site.availability}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
