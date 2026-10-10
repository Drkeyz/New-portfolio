import Link from "next/link";
import { alsoWorkedOn, isPending, landingPages, projects } from "@content/projects";
import { work } from "@content/site";
import { FeatureReveal } from "./FeatureReveal";
import { Media } from "./Media";
import { SplitWords } from "./motion/SplitWords";
import { ProjectCard } from "./ProjectCard";

const isDev = process.env.NODE_ENV !== "production";

export function SelectedWork() {
  const [lead, ...rest] = projects;
  // Unverified "also worked on" entries show in development only.
  const others = alsoWorkedOn.filter((o) => isDev || !(isPending(o.description) || isPending(o.context)));

  return (
    <section id="work" aria-labelledby="work-title" className="pt-20 md:pt-40">
      <header className="wrap grid-12 gap-y-8 pb-6 md:pb-24">
        <h2 id="work-title" className="t-mega col-span-12 md:col-span-10" data-reveal="words">
          <SplitWords text={work.title} />
        </h2>
        <div
          className="col-span-12 self-end md:col-span-4 md:col-start-9"
          data-reveal
          style={{ "--d": 4 } as React.CSSProperties}
        >
          <p className="t-label tabular-nums text-muted">({String(projects.length).padStart(2, "0")}) Case studies · 2023 — 2026</p>
          <p className="mt-4 max-w-[32ch] text-pretty text-muted">{work.intro}</p>
        </div>
      </header>

      {/* 01: the cinematic moment, full-bleed. */}
      <FeatureReveal project={lead} />

      <div className="wrap mt-16 flex flex-col gap-24 md:mt-48 md:gap-48">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {/* Breathing room, then the denser index. */}
      <div className="wrap mt-28 md:mt-56">
        <div className="grid-12 gap-y-8">
          <h3 className="t-label col-span-12 text-muted md:col-span-3" data-reveal="fade">
            Also worked on
          </h3>
          <ul className="col-span-12 border-t border-line/40 md:col-span-9">
            {others.map((o, i) => {
              const body = (
                <>
                  <span className="font-display text-xl font-semibold tracking-[-0.02em] transition-transform duration-700 ease-expo group-hover:translate-x-3 md:col-span-4">
                    {o.name}
                    {o.href && (
                      <span aria-hidden className="ml-2 inline-block text-muted transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1">
                        ↗
                      </span>
                    )}
                  </span>
                  <span className="text-[0.9375rem] text-muted md:col-span-3">{o.context}</span>
                  <span className="text-[0.9375rem] md:col-span-5">{o.description}</span>
                  <span
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-700 ease-expo group-hover:scale-x-100"
                  />
                </>
              );
              const row = "group relative grid gap-1 py-6 md:grid-cols-12 md:gap-x-[var(--col-gap)]";
              return (
                <li key={o.name} className="border-b border-line/40" data-reveal style={{ "--d": i } as React.CSSProperties}>
                  {o.href ? (
                    <a href={o.href} target="_blank" rel="noreferrer" className={row} data-cursor="Open project">
                      {body}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className={row}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid-12 mt-24 gap-y-8 md:mt-40">
          <h3 className="t-label col-span-12 text-muted md:col-span-3" data-reveal="fade">
            Design showcases
          </h3>
          <ul className="col-span-12 grid gap-x-[var(--col-gap)] gap-y-14 sm:grid-cols-2 md:col-span-9">
            {landingPages.map((lp, i) => {
              const internal = Boolean(lp.slug);
              const body = (
                <>
                  <div data-reveal="clip" style={{ "--d": i } as React.CSSProperties} className="relative">
                    <div className="overflow-hidden">
                      <Media
                        media={lp}
                        sizes="(min-width: 768px) 36vw, (min-width: 640px) 50vw, 100vw"
                        imgClassName="object-top transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.02]"
                      />
                    </div>
                    {lp.note && (
                      <>
                        <span className="t-label absolute left-3 top-3 z-10 rounded-full bg-coal/85 px-3 py-1.5 text-[0.625rem] text-snow">
                          {lp.note.badge}
                        </span>
                        {/* Revealed on hover / keyboard focus, on devices that can hover. */}
                        <span
                          aria-hidden
                          className="absolute inset-0 z-10 hidden flex-col justify-end bg-[#1F0E33]/90 p-6 text-snow opacity-0 transition-opacity duration-500 ease-rhythm group-hover:opacity-100 group-focus-visible:opacity-100 md:p-8 [@media(hover:hover)]:flex"
                        >
                          <span className="block translate-y-3 transition-transform duration-700 ease-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
                            <span className="t-label block text-[#D9B8F5]">{lp.note.badge}</span>
                            <span className="t-sub mt-3 block">{lp.note.title}</span>
                            <span className="mt-3 block max-w-[40ch] text-[0.9375rem] leading-relaxed text-snow/85">{lp.note.body}</span>
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                  <span className="mt-4 flex items-baseline justify-between gap-4 border-b border-line/40 pb-3">
                    <span className="font-medium transition-transform duration-700 ease-expo group-hover:translate-x-2">
                      {lp.label} <span aria-hidden className="text-muted">{internal ? "→" : "↗"}</span>
                    </span>
                    <span className="text-[0.875rem] tabular-nums text-muted">
                      {[lp.kind, lp.year].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  {lp.note && (
                    // Touch screens see the note here; on hover devices it's for screen readers (the overlay is decorative).
                    <span className="mt-3 block max-w-[46ch] text-[0.9375rem] text-muted [@media(hover:hover)]:sr-only">
                      {lp.note.title} {lp.note.body}
                    </span>
                  )}
                </>
              );
              return (
                <li key={lp.label} className={i % 2 === 1 ? "sm:mt-24" : ""}>
                  {internal ? (
                    <Link href={lp.href} className="group block" data-cursor="View project">
                      {body}
                    </Link>
                  ) : (
                    <a href={lp.href} target="_blank" rel="noreferrer" className="group block" data-cursor="Open project">
                      {body}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
