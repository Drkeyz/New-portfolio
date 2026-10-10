import Link from "next/link";
import type { Project } from "@content/projects";
import { Media } from "./Media";
import { Parallax } from "./motion/Parallax";
import { SplitWords } from "./motion/SplitWords";

/**
 * Project preview. `project.layout` sets the composition so Selected Work
 * keeps an asymmetric rhythm: offset (smaller, right) → full width → split.
 * (The lead project uses FeatureReveal.)
 */
export function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}`;
  const cursor = project.caseStudy ? "View case study" : "Open project";

  const layouts = {
    lead: { media: "col-span-12 md:col-span-8", info: "col-span-12 md:col-span-4 md:self-end", ratio: "16 / 10" },
    offset: {
      media: "col-span-12 md:col-span-7 md:col-start-6 md:row-start-1",
      info: "col-span-12 md:col-span-4 md:col-start-1 md:row-start-1 md:self-end",
      ratio: "4 / 3",
    },
    full: { media: "col-span-12", info: "col-span-12 md:grid md:grid-cols-12 md:gap-x-[var(--col-gap)]", ratio: "21 / 9" },
    split: { media: "col-span-12 md:col-span-7", info: "col-span-12 md:col-span-4 md:col-start-9 md:self-center", ratio: "16 / 11" },
  }[project.layout];

  const full = project.layout === "full";
  const media = (
    <Media
      media={project.media}
      // Real images keep their own proportions; the layout ratio only shapes placeholders.
      ratio={project.media.src ? undefined : layouts.ratio}
      sizes={full ? "(min-width: 1360px) 1280px, 100vw" : "(min-width: 768px) 60vw, 100vw"}
      bg={project.theme.bg}
      fg={project.theme.fg}
      className="clip-zoom"
      imgClassName="transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.015] group-focus-within:scale-[1.015]"
    />
  );

  return (
    <article className="group relative grid-12 gap-y-8" aria-labelledby={`p-${project.slug}`}>
      <div className={`${layouts.media} relative`}>
        <div data-reveal="clip">
          {/* Real covers are finished compositions (titles, devices near the edges): shown whole, never
              scaled or shifted. Only placeholders drift. */}
          {project.media.src ? (
            media
          ) : (
            <Parallax amount={5} className="relative">
              {media}
            </Parallax>
          )}
        </div>
      </div>

      <div className={layouts.info}>
        <div className={full ? "md:col-span-4" : ""}>
          <p className="t-label flex items-center gap-3 text-muted" data-reveal="fade">
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden className="h-px w-6 bg-line transition-[width,background-color] duration-700 ease-expo group-hover:w-12 group-hover:bg-brass" />
            {project.industry}
          </p>
          <h3 id={`p-${project.slug}`} className="t-display mt-4" data-reveal="words">
            {/* Stretched link: the whole card is clickable, but only the title is announced. */}
            <Link href={href} data-cursor={cursor} className="after:absolute after:inset-0 after:content-['']">
              <SplitWords text={project.name} />
            </Link>
          </h3>
        </div>

        <div className={full ? "md:col-span-4 md:col-start-5 md:pt-10" : ""} data-reveal style={{ "--d": 3 } as React.CSSProperties}>
          <p className="mt-5 max-w-[38ch] text-pretty">{project.description}</p>
          {project.results && (
            <dl className="mt-8 grid max-w-[30rem] grid-cols-3 gap-x-5 border-t border-line/40 pt-5">
              {project.results.map((r) => (
                <div key={r.label}>
                  <dt className="sr-only">{r.label}</dt>
                  <dd className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                    {r.value}
                  </dd>
                  <dd aria-hidden className="mt-2 text-pretty text-[0.8125rem] leading-snug text-muted">
                    {r.label}
                    {r.target && <span className="text-ink"> (target)</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={full ? "md:col-span-4 md:col-start-9 md:pt-10" : ""} data-reveal style={{ "--d": 5 } as React.CSSProperties}>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-line/40 pt-4 text-[0.9375rem]">
            <dt className="text-muted">Role</dt>
            <dd>{project.role}</dd>
            <dt className="text-muted">Year</dt>
            <dd>{project.year}</dd>
            <dt className="text-muted">Platform</dt>
            <dd>{project.platform}</dd>
            <dt className="text-muted">Capabilities</dt>
            <dd>{project.capabilities.join(" · ")}</dd>
          </dl>
          <p className="mt-5 max-w-[40ch] border-l border-brass pl-4 text-[0.9375rem] text-muted transition-colors duration-500 group-hover:text-ink">
            {project.oneLiner}
          </p>
        </div>
      </div>
    </article>
  );
}
