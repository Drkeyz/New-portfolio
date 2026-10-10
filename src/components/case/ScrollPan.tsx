"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Where the frame sticks (matches top-24).
const STICK_TOP = 96;

/**
 * A very tall screen shown through a fixed-height window that pans from top
 * to bottom as the page scrolls past (position: sticky, never scroll-jacked).
 * The track is exactly as tall as the pan needs, so one pixel of scroll moves
 * the screen one pixel and nothing is left over at the end.
 * With `url`, the window is a browser. With reduced motion it's simply the
 * whole screen, scrolled like any image.
 */
export function ScrollPan({
  src,
  width,
  height,
  alt,
  caption,
  url,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** Show a browser bar with this address. */
  url?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [travel, setTravel] = useState(0);
  const travelRef = useRef(0);
  const animated = ready && !reduce;

  useEffect(() => setReady(true), []);

  // How far the image has to travel so its bottom edge meets the window's.
  useEffect(() => {
    const el = viewport.current;
    if (!animated || !el) return;
    const measure = () => {
      travelRef.current = Math.max(0, (el.clientWidth * height) / width - el.clientHeight);
      setTravel(travelRef.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [animated, width, height]);

  // Distance scrolled since the frame stuck, clamped to the travel.
  const { scrollY } = useScroll();
  const scrolled = useTransform(scrollY, () => {
    const top = track.current?.getBoundingClientRect().top ?? 0;
    return Math.min(Math.max(STICK_TOP - top, 0), travelRef.current);
  });
  const y = useTransform(scrolled, (v) => -v);
  const progress = useTransform(scrolled, (v) => (travelRef.current ? v / travelRef.current : 0));

  const image = (
    <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1360px) 1280px, 100vw" className="h-auto w-full" />
  );

  return (
    <figure data-span="wide">
      <div
        ref={track}
        className="relative"
        style={animated ? { height: `calc(100svh - 8rem + ${travel}px)` } : undefined}
      >
        <div
          className={`${url ? "browser" : "screen"} ${animated ? "sticky top-24 flex h-[calc(100svh-8rem)] flex-col" : ""}`}
        >
          {url && (
            <div aria-hidden className="browser-bar shrink-0">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </span>
              <span className="browser-url">{url}</span>
              <span className="w-10" />
            </div>
          )}
          <div ref={viewport} className={`relative overflow-hidden ${animated ? "flex-1" : ""}`}>
            {animated ? <motion.div style={{ y }}>{image}</motion.div> : image}
            {animated && (
              // Progress rail
              <motion.span
                aria-hidden
                className="absolute right-3 top-3 z-[3] w-1 origin-top rounded-full bg-(--cs-accent)"
                style={{ height: "calc(100% - 1.5rem)", scaleY: progress }}
              />
            )}
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-4 max-w-[64ch] text-[0.9375rem] text-(--cs-muted)">{caption}</figcaption>}
    </figure>
  );
}
