"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@content/projects";

/**
 * The lead project as a cinematic, scroll-scrubbed moment (desktop):
 * a framed panel opens to fill the screen, the product settles into place,
 * then the title and link rise in. Pinned with position: sticky, never
 * scroll-jacked. On small screens and with reduced motion it's a still card.
 */
export function FeatureReveal({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState<boolean | null>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const open = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const top = useTransform(open, (v) => `${v * 14}%`);
  const side = useTransform(open, (v) => `${v * 21}%`);
  const round = useTransform(open, (v) => `${v * 28}px`);
  const clipPath = useMotionTemplate`inset(${top} ${side} ${top} ${side} round ${round})`;
  // The dashboard settles to full size as the frame opens, then drifts up and
  // recedes so the title can take the stage.
  const productScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.84, 1, 0.94]);
  const productY = useTransform(scrollYProgress, [0, 0.45, 1], ["6%", "0%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.78], [60, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(v > 0.3 && v < 0.999));

  const animated = desktop === true && !reduce;
  const m = project.media;

  return (
    <section
      ref={ref}
      aria-labelledby={`p-${project.slug}`}
      data-theme={animated && !lit ? undefined : "dark"}
      className={animated ? "relative h-[260vh]" : "relative"}
    >
      <div className={animated ? "sticky top-0 h-svh overflow-hidden" : "relative"}>
        <motion.div
          className={animated ? "absolute inset-0" : "relative flex flex-col gap-8 py-14"}
          style={{
            // Signal-green glow behind the product, very low key.
            backgroundColor: m.matte ?? project.theme.bg,
            backgroundImage: `radial-gradient(60% 50% at 50% 45%, ${project.theme.accent}1F, transparent 70%)`,
            clipPath: animated ? clipPath : undefined,
          }}
        >
          {/* Product */}
          <div
            className={
              animated ? "absolute inset-0 grid place-items-center px-[var(--gutter)]" : "order-2 px-[var(--gutter)]"
            }
          >
            <motion.div
              style={animated ? { scale: productScale, y: productY } : undefined}
              className="w-full"
            >
              {/* Never wider than the source, and on desktop never taller than the viewport allows. */}
              <div
                className="mx-auto overflow-hidden rounded-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:rounded-[10px]"
                style={{
                  width: animated
                    ? `min(${m.width / 2}px, 100%, calc((100svh - 9rem) * ${m.width / m.height}))`
                    : `min(${m.width / 2}px, 100%)`,
                }}
              >
                {m.src && (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={m.width}
                    height={m.height}
                    sizes="(min-width: 768px) 90vw, 100vw"
                    className="h-auto w-full"
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Scrim: fades in under the title so it keeps AA contrast over the screenshot. */}
          {animated && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
              style={{
                opacity: textOpacity,
                backgroundImage: `linear-gradient(to top, ${project.theme.bg} 30%, ${project.theme.bg}E6 55%, transparent)`,
              }}
            />
          )}

          {/* Title + link */}
          <motion.div
            style={animated ? { opacity: textOpacity, y: textY } : undefined}
            className={`text-snow [--focus:var(--color-snow)] ${
              animated ? "absolute inset-0 flex flex-col justify-end gap-8 p-[var(--gutter)] pb-12" : "contents"
            }`}
          >
            <p className={`t-label order-1 flex flex-wrap items-center gap-3 text-muted-dark ${animated ? "" : "px-[var(--gutter)]"}`}>
              <span className="tabular-nums text-snow">{project.index}</span>
              <span aria-hidden className="h-px w-8" style={{ backgroundColor: project.theme.accent }} />
              {project.industry} · {project.role} · {project.year}
            </p>
            <div className={`relative order-3 grid gap-6 md:grid-cols-12 md:items-end ${animated ? "" : "px-[var(--gutter)]"}`}>
              <h3 id={`p-${project.slug}`} className="t-mega md:col-span-7">
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="View case study"
                  className="[--cursor-color:#17CFAA] after:absolute after:inset-0 after:content-['']"
                >
                  {project.name}
                </Link>
              </h3>
              <div className="relative z-10 md:col-span-4 md:col-start-9">
                <p className="t-sub text-pretty">{project.oneLiner}</p>
                {project.results && (
                  <dl className="mt-6 grid grid-cols-3 gap-x-4 border-t border-white/15 pt-4">
                    {project.results.map((r) => (
                      <div key={r.label}>
                        <dt className="sr-only">{r.label}</dt>
                        <dd className="font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums" style={{ color: project.theme.accent }}>
                          {r.value}
                        </dd>
                        <dd aria-hidden className="mt-2 text-pretty text-[0.75rem] leading-snug text-muted-dark">
                          {r.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
                <p className="mt-4 text-[0.9375rem] text-muted-dark">{project.capabilities.join(" · ")}</p>
                <span
                  aria-hidden
                  className="mt-6 inline-flex items-center gap-2 text-[0.95rem]"
                  style={{ color: project.theme.accent }}
                >
                  View case study →
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
