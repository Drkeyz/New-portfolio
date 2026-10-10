"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Before/after comparison. Drag anywhere on the frame, or focus the handle
 * and use ← → (Shift for bigger steps), Home and End.
 */
export function ComparisonSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  label = "Comparison",
  span = "wide",
  stroke,
  radius,
  labels = "inside",
  maxWidth,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  label?: string;
  /** How wide it sits in a case study's flow. */
  span?: "wide" | "mid";
  /** Frame stroke colour and corner radius (px), e.g. to match a UI panel. */
  stroke?: string;
  radius?: number;
  /** "below" keeps the labels off the image, for crops with content at the edges. */
  labels?: "inside" | "below";
  /** Cap the width (px) and centre it, e.g. for a single phone screen. */
  maxWidth?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pos - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <figure data-span={span} style={maxWidth ? { maxWidth, marginInline: "auto", width: "100%" } : undefined}>
      <div
        ref={frame}
        className="screen relative touch-pan-y select-none"
        style={{ "--screen-stroke": stroke, borderRadius: radius } as React.CSSProperties}
        data-cursor="Drag"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div>{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {before}
        </div>

        {labels === "inside" && (
          <>
          <span className="t-label pointer-events-none absolute z-[3] bottom-3 left-3 rounded-full bg-black/80 px-3 py-1.5 text-white md:bottom-5 md:left-5">
          {beforeLabel}
          </span>
          <span className="t-label pointer-events-none absolute z-[3] bottom-3 right-3 rounded-full bg-black/80 px-3 py-1.5 text-white md:bottom-5 md:right-5">
          {afterLabel}
          </span>

          </>
        )}

        <div className="pointer-events-none absolute inset-y-0 z-[3]" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white" />
          <button
            type="button"
            role="slider"
            aria-label={`${label}: drag to compare ${beforeLabel} and ${afterLabel}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
            onKeyDown={onKey}
            className="pointer-events-auto absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
          >
            <span aria-hidden className="text-sm">⟷</span>
          </button>
        </div>
      </div>
      {labels === "below" && (
        <div aria-hidden className="t-label mt-4 flex justify-between text-(--cs-text)">
          <span>← {beforeLabel}</span>
          <span>{afterLabel} →</span>
        </div>
      )}
      <figcaption className="mt-4 text-[0.9375rem] text-(--cs-muted)">
        {label}. Drag, or use the arrow keys on the handle.
      </figcaption>
    </figure>
  );
}
