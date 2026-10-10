"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

type Page = { tab: string; path: string; src: string; width: number; height: number; alt: string; note?: string };

/**
 * A browser window with real tabs: one per page of the site. Switching a tab
 * swaps the page (and the address bar); each page scrolls inside the window,
 * the way a visitor would read it. Tabs follow the ARIA tabs pattern.
 */
export function BrowserTabs({ domain, pages }: { domain: string; pages: Page[] }) {
  const [active, setActive] = useState(0);
  // Until the first interaction, the tabs invite a click.
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewport = useRef<HTMLDivElement>(null);
  const id = useId();
  const current = pages[active];

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
    viewport.current?.scrollTo({ top: 0 });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = pages.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <figure data-span="wide" className={touched ? "" : "tabs-invite"}>
      {/* The invitation: a pill pointing down at the tab strip. */}
      <p
        aria-hidden
        className={`tabs-hint t-label mb-4 inline-flex items-center gap-2 rounded-full bg-(--cs-accent) px-4 py-2 text-[0.6875rem] text-(--cs-bg) transition-opacity duration-500 ${
          touched ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-(--cs-bg) opacity-60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-(--cs-bg)" />
        </span>
        Live prototype · try a tab
        <span className="tabs-hint-arrow inline-block">↓</span>
      </p>
      <div className="browser">
        {/* Tab strip */}
        <div className="flex items-end gap-1 overflow-x-auto bg-(--cs-surface) px-2 pt-2 [scrollbar-width:none]">
          <span aria-hidden className="mb-3 ml-2 mr-3 hidden shrink-0 gap-1.5 sm:flex">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
          </span>
          <div role="tablist" aria-label="Pages of the site" className="flex gap-1">
            {pages.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.tab}
                  style={{ "--i": i } as React.CSSProperties}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${id}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`tab-btn flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-t-[10px] px-4 text-[0.8125rem] whitespace-nowrap transition-colors duration-300 ${
                    on ? "bg-(--cs-bg) text-(--cs-text)" : "text-(--cs-muted) hover:bg-(--cs-bg)/50 hover:text-(--cs-text)"
                  }`}
                >
                  <span aria-hidden className={`size-1.5 rounded-full ${on ? "bg-(--cs-accent)" : "bg-(--cs-line)"}`} />
                  {p.tab}
                </button>
              );
            })}
          </div>
        </div>
        {/* Address bar */}
        <div aria-hidden className="flex h-11 items-center bg-(--cs-bg) px-4">
          <span className="browser-url !max-w-none !bg-(--cs-surface) text-left">
            {domain}
            <span className="text-(--cs-text)">{current.path}</span>
          </span>
        </div>
        {/* Page */}
        <div
          ref={viewport}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
          onScroll={() => setTouched(true)}
          className="relative h-[min(78svh,820px)] overflow-y-auto overscroll-contain bg-white [scrollbar-color:var(--cs-accent)_transparent] [scrollbar-width:thin]"
        >
          {pages.map((p, i) => (
            <Image
              key={p.src}
              src={p.src}
              width={p.width}
              height={p.height}
              alt={i === active ? p.alt : ""}
              aria-hidden={i !== active}
              sizes="(min-width: 1360px) 1280px, 100vw"
              className={`h-auto w-full ${i === active ? "block" : "hidden"}`}
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[0.9375rem] text-(--cs-muted)">
        <span>{touched ? (current.note ?? "") : "Five pages, fully explorable: switch tabs, then scroll inside the window."}</span>
        <span className="t-label tabular-nums text-(--cs-accent)">
          {String(active + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
        </span>
      </figcaption>
    </figure>
  );
}
