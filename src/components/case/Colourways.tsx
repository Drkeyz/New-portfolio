"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screen } from "./Phone";

type Item = Screen & { name: string; price: string; colour: string };

/**
 * Pick a sneaker and the product page changes with it, along with the light
 * behind the phone, which takes that sneaker's colour the same way the
 * screen's rotation ring does. Arrow keys move between options.
 */
export function Colourways({ items, caption }: { items: Item[]; caption?: string }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <figure data-span="wide" className="grid-12 items-center gap-y-12">
      {/* Phone, lit by the chosen colourway */}
      <div className="relative col-span-12 flex justify-center py-6 md:col-span-6">
        <div
          aria-hidden
          className="absolute inset-0 transition-[background] duration-700"
          style={{ background: `radial-gradient(45% 50% at 50% 50%, ${current.colour}55, transparent 72%)` }}
        />
        <div className="phone relative w-[min(74vw,360px)]">
          <div className="phone-body">
            <div className="phone-screen" style={{ aspectRatio: `${items[0].width} / ${items[0].height}` }}>
              {items.map((it, i) => (
                <Image
                  key={it.src}
                  src={it.src}
                  width={it.width}
                  height={it.height}
                  alt={i === active ? it.alt : ""}
                  aria-hidden={i !== active}
                  sizes="(min-width: 768px) 360px, 74vw"
                  className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-rhythm ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="col-span-12 md:col-span-5 md:col-start-8">
        <p className="t-label text-(--cs-muted)" id="colourways-label">
          Choose a sneaker
        </p>
        <div role="radiogroup" aria-labelledby="colourways-label" className="mt-5 border-t border-(--cs-line)">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={it.name}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex min-h-16 w-full items-center gap-4 border-b border-(--cs-line) py-4 text-left"
              >
                <span
                  aria-hidden
                  className="size-3.5 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-(--cs-bg) transition-[box-shadow,transform] duration-500"
                  style={{ backgroundColor: it.colour, ["--tw-ring-color" as string]: on ? it.colour : "transparent" }}
                />
                <span
                  className={`cs-display flex-1 text-[clamp(1.375rem,2.4vw,2rem)] font-medium tracking-[-0.02em] transition-[color,transform] duration-500 ease-rhythm ${
                    on ? "translate-x-1 text-(--cs-text)" : "text-(--cs-muted) group-hover:text-(--cs-text)"
                  }`}
                >
                  {it.name}
                </span>
                <span className={`tabular-nums transition-colors duration-500 ${on ? "text-(--cs-text)" : "text-(--cs-muted)"}`}>{it.price}</span>
              </button>
            );
          })}
        </div>
        {caption && <p className="mt-6 max-w-[46ch] text-pretty text-[0.9375rem] text-(--cs-muted)">{caption}</p>}
      </div>
    </figure>
  );
}
