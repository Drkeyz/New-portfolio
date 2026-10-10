"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

type Note = { x: number; y: number; title: string; body: string };
type Item = { tab: string; src: string; width: number; height: number; alt: string; notes: Note[] };

/**
 * Several states of one screen, behind tabs (e.g. the steps of a flow).
 * Screens are stacked and cross-fade, so the frame never jumps. Each step has
 * its own numbered call-outs; the pins are decorative, the list carries the
 * meaning. Tabs follow the ARIA tabs pattern (arrow keys, Home, End).
 */
export function ScreenTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const current = items[active];

  return (
    <figure data-span="mid">
      <div role="tablist" aria-label="Steps" className="mb-5 inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-(--cs-line) p-1 [scrollbar-width:none]">
        {items.map((it, i) => (
          <button
            key={it.tab}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-[0.875rem] transition-colors duration-300 md:px-5 ${
              i === active ? "bg-(--cs-accent) font-medium text-(--cs-bg)" : "text-(--cs-muted) hover:text-(--cs-text)"
            }`}
          >
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> {it.tab}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        <div className="screen" style={{ aspectRatio: `${current.width} / ${current.height}` }}>
          {items.map((it, i) => (
            <Image
              key={it.src}
              src={it.src}
              alt={i === active ? it.alt : ""}
              aria-hidden={i !== active}
              width={it.width}
              height={it.height}
              sizes="(min-width: 1024px) 1060px, 100vw"
              className={`absolute inset-0 h-auto w-full transition-opacity duration-500 ease-rhythm ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {current.notes.map((n, i) => (
            <span
              key={`${active}-${n.title}`}
              aria-hidden
              className="absolute z-[3] grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--cs-accent) text-[0.6875rem] font-semibold text-(--cs-bg) shadow-[0_0_0_4px_rgba(23,207,170,0.25)] tabular-nums md:size-8 md:text-[0.8125rem]"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <ol className="mt-8 grid gap-x-[var(--col-gap)] gap-y-8 sm:grid-cols-2">
          {current.notes.map((n, i) => (
            <li key={`${active}-${n.title}`} className="border-t border-(--cs-line) pt-5">
              <p className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-(--cs-accent) text-[0.6875rem] font-semibold text-(--cs-accent) tabular-nums">
                  {i + 1}
                </span>
                <span className="cs-display font-medium">{n.title}</span>
              </p>
              <p className="mt-3 text-pretty text-[0.9375rem] text-(--cs-muted)">{n.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
