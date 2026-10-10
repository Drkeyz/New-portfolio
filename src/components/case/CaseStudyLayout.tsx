import Link from "next/link";
import type { Media as MediaType, Project } from "@content/projects";
import { Media } from "../Media";
import { SplitWords } from "../motion/SplitWords";
import { CaseIndex } from "./CaseIndex";
import { Glance, slugify } from "./blocks";
import { Video, type VideoSource } from "./Video";

export type CaseTheme = {
  bg: string;
  surface: string;
  text: string;
  /** Secondary text. Must reach 4.5:1 on `bg`. */
  muted: string;
  /** Hairlines; decorative. */
  line: string;
  accent: string;
  attention?: string;
  danger?: string;
  /** A second data colour (e.g. capital lent out). */
  lend?: string;
  dark: boolean;
  /** "grotesk" = Space Grotesk, "display" = the site's Inter Tight. */
  font?: "grotesk" | "display";
};

export type CaseFrontmatter = {
  title: string;
  titleAccent?: string;
  /** One or two sentences under the title. */
  intro?: string;
  meta: { label: string; value: string }[];
  caption?: string;
  hero: MediaType & {
    /** On phones, show a larger crop of the left side (for wide dashboards). */
    mobileCrop?: boolean;
  };
  /** Walkthrough video played over the hero image. */
  video?: VideoSource;
  /** The whole story in four lines. */
  glance?: { label: string; body: string }[];
  theme: CaseTheme;
};

// The standard story. Every case study uses these eight sections, in order.
export const CASE_SECTIONS = [
  "Context",
  "Problem",
  "Research",
  "Thinking",
  "Design",
  "Iteration",
  "Outcome",
  "What I learned",
].map((title) => ({ id: slugify(title), title }));

export function CaseStudyLayout({
  project,
  next,
  fm,
  children,
}: {
  project: Project;
  next: Project;
  fm: CaseFrontmatter;
  children: React.ReactNode;
}) {
  const t = fm.theme;
  const style = {
    "--cs-bg": t.bg,
    "--cs-surface": t.surface,
    "--cs-text": t.text,
    "--cs-muted": t.muted,
    "--cs-line": t.line,
    "--cs-accent": t.accent,
    "--cs-attention": t.attention ?? t.accent,
    "--cs-danger": t.danger ?? t.accent,
    "--cs-lend": t.lend ?? t.accent,
    "--cs-stroke": t.dark ? "rgba(245, 245, 242, 0.16)" : "rgba(40, 20, 10, 0.12)",
    "--cs-font": t.font === "grotesk" ? "var(--font-grotesk)" : "var(--font-display)",
    "--cursor-color": t.accent,
    "--focus": t.text,
    backgroundColor: t.bg,
    color: t.text,
  } as React.CSSProperties;
  const titleWords = fm.title.split(" ").length;

  return (
    <main id="main" style={style} data-theme={t.dark ? "dark" : "light"} className="min-h-svh pt-28 md:pt-36">
      <article>
        {/* Title */}
        <header className="wrap">
          <p className="t-label flex flex-wrap items-center gap-3 text-(--cs-muted)" data-reveal="fade">
            <Link href="/#work" className="link-underline inline-flex min-h-11 items-center">
              <span aria-hidden className="mr-2">←</span>Selected work
            </Link>
            <span aria-hidden className="h-px w-6 bg-(--cs-line)" />
            <span className="tabular-nums text-(--cs-accent)">{project.index}</span>
            {project.industry} · {project.role}
          </p>

          <h1 className="mt-8 text-balance md:mt-12" data-reveal="words">
            <span className="cs-display block text-[clamp(3rem,15vw,15rem)] break-words pb-[0.16em] font-medium leading-[0.82] tracking-[-0.06em]">
              <SplitWords text={fm.title} />
            </span>
            {fm.titleAccent && (
              <span className="t-accent mt-4 block text-[clamp(2.5rem,6.6vw,6.5rem)] leading-[1.1] text-(--cs-muted) md:mt-6">
                <SplitWords text={fm.titleAccent} offset={titleWords} />
              </span>
            )}
          </h1>

          <div className="grid-12 mt-14 gap-y-12 md:mt-20">
            {fm.intro && (
              <p className="cs-display t-sub col-span-12 max-w-[38ch] text-pretty lg:col-span-6" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                {fm.intro}
              </p>
            )}
            <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
              <dl className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-6">
                {fm.meta.map((m) => (
                  <div key={m.label} className="border-t border-(--cs-line) pt-3">
                    <dt className="t-label text-(--cs-muted)">{m.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-snug">{m.value}</dd>
                  </div>
                ))}
              </dl>
              {project.links.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline inline-flex min-h-11 items-center text-(--cs-accent)"
                        data-cursor="Open project"
                      >
                        {l.label} <span aria-hidden className="ml-1.5">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Hero: the product, wider than the text measure. */}
        <figure className="mx-auto mt-16 max-w-[1600px] px-[var(--gutter)] md:mt-28">
          {/* On phones a full desktop screen is too small to read: show a larger crop of its left side. */}
          <div
            data-reveal="clip"
            className={`relative isolate ${
              fm.hero.mobileCrop
                ? "max-md:[&_.screen]:aspect-[5/4] max-md:[&_.screen_img]:w-[190%] max-md:[&_.screen_img]:max-w-none"
                : ""
            }`}
          >
            {/* A low signal-green glow behind the product. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[10%] -top-[15%] bottom-0 -z-10"
              style={{ background: `radial-gradient(50% 45% at 50% 40%, ${t.accent}26, transparent 70%)` }}
            />
            {fm.hero.src ? (
              <Video
                video={fm.video}
                poster={{ src: fm.hero.src, width: fm.hero.width, height: fm.hero.height, alt: fm.hero.alt }}
                sizes={fm.hero.mobileCrop ? "(min-width: 1640px) 1600px, (min-width: 768px) 100vw, 190vw" : "(min-width: 1640px) 1600px, 100vw"}
                priority
              />
            ) : (
              <Media media={fm.hero} sizes="(min-width: 1640px) 1600px, 100vw" bg={t.surface} fg={t.text} priority />
            )}
          </div>
          {fm.caption && <figcaption className="mt-4 text-[0.9375rem] text-(--cs-muted)">{fm.caption}</figcaption>}
        </figure>

        {fm.glance && (
          <section aria-label="At a glance" className="wrap mt-24 md:mt-36">
            <Glance items={fm.glance} />
          </section>
        )}

        <div id="case-story" className="wrap mt-24 md:mt-36">
          {children}
        </div>
      </article>

      <CaseIndex sections={CASE_SECTIONS} containerId="case-story" />

      {/* Next */}
      <nav aria-label="Next case study" className="border-t border-(--cs-line)">
        <Link
          href={`/work/${next.slug}`}
          className="wrap group grid-12 items-end gap-y-10 py-24 md:py-40"
          data-cursor={next.caseStudy ? "View case study" : "Open project"}
        >
          <div className="col-span-12 md:col-span-6">
            <p className="t-label text-(--cs-muted)">Next case study · {next.index}</p>
            <p className="cs-display mt-6 flex items-baseline gap-6 text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              {next.name}
              <span
                aria-hidden
                className="inline-block text-(--cs-accent) transition-transform duration-700 ease-rhythm group-hover:translate-x-4"
              >
                →
              </span>
            </p>
            <p className="mt-6 max-w-[44ch] text-(--cs-muted)">{next.description}</p>
          </div>
          <div className="col-span-12 overflow-hidden md:col-span-5 md:col-start-8">
            <div className="transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.03]">
              <Media media={next.media} sizes="(min-width: 768px) 40vw, 100vw" bg={next.theme.bg} fg={next.theme.fg} />
            </div>
          </div>
        </Link>
      </nav>
    </main>
  );
}
