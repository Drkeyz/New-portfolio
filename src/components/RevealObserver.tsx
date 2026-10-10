"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for every [data-reveal] element on the page. Elements are
 * visible without JavaScript; the `js` class on <html> hides them until they
 * scroll into view. Stagger with style={{ "--d": n }}.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
