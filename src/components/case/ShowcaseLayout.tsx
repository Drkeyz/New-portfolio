import Image from "next/image";
import Link from "next/link";
import type { Showcase } from "@content/projects";
import { Media } from "../Media";
import { SplitWords } from "../motion/SplitWords";
import { Crop } from "./blocks";
import type { CaseTheme } from "./CaseStudyLayout";
import { Browser } from "./Phone";

export type ShowcaseFrontmatter = {
  title: string;
  titleAccent?: string;
  intro: string;
  meta: { label: string; value: string }[];
  /** Big outbound links, e.g. the live site. */
  links?: { label: string; href: string }[];
  /** A short line shown above the title (e.g. "Pro bono"). */
  badge?: string;
  hero: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** Show inside a browser window with this address. */
    url?: string;
    /** Crop [x, y, w, h] in source pixels. */
    region?: [number, number, number, number];
  };
  theme: CaseTheme;
};

/**
 * Design showcases: lighter than a case study, built to let the work speak.
 * Same palette system as case studies (frontmatter theme → --cs-* variables),
 * so every block works here too.
 */
export function ShowcaseLayout({
  item,
  next,
  fm,
  children,
}: {
  item: Showcase;
  next: Showcase;
  fm: ShowcaseFrontmatter;
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
    "--cs-stroke": t.dark ? "rgba(245, 245, 242, 0.16)" : "rgba(31, 14, 51, 0.12)",
    "--cs-font": t.font === "grotesk" ? "var(--font-grotesk)" : "var(--font-display)",
    "--cursor-color": t.accent,
    "--focus": t.text,
    backgroundColor: t.bg,
    color: t.text,
  } as React.CSSProperties;
  const h = fm.hero;
  const titleWords = fm.title.split(" ").length;

  const heroImage = h.region ? (
    <Crop src={h.src} width={h.width} height={h.height} alt={h.alt} region={h.region} />
  ) : (
    <Image src={h.src} width={h.width} height={h.height} alt={h.alt} priority sizes="(min-width: 1640px) 1600px, 100vw" className="h-auto w-full" />
  );

  return (
    <main id="main" style={style} data-theme={t.dark ? "dark" : "light"} className="min-h-svh pt-28 md:pt-36">
      <article>
        <header className="wrap">
          <p className="t-label flex flex-wrap items-center gap-3 text-(--cs-muted)" data-reveal="fade">
            <Link href="/#work" className="link-underline inline-flex min-h-11 items-center">
              <span aria-hidden className="mr-2">←</span>Selected work
            </Link>
            <span aria-hidden className="h-px w-6 bg-(--cs-line)" />
            Design showcase · {item.kind} · {item.year}
          </p>

          {fm.badge && (
            <p className="t-label mt-8 inline-flex items-center gap-2 rounded-full border border-(--cs-accent) px-3 py-1.5 text-(--cs-accent)" data-reveal="fade">
              <span aria-hidden className="size-1.5 rounded-full bg-(--cs-accent)" />
              {fm.badge}
            </p>
          )}

          <h1 className="mt-6 text-balance md:mt-8" data-reveal="words">
            <span className="cs-display block text-[clamp(3.75rem,12vw,12rem)] font-medium leading-[0.86] tracking-[-0.055em]">
              <SplitWords text={fm.title} />
            </span>
            {fm.titleAccent && (
              <span className="t-accent mt-3 block text-[clamp(2.5rem,6.6vw,6.5rem)] leading-[1.1] text-(--cs-accent) md:mt-4">
                <SplitWords text={fm.titleAccent} offset={titleWords} />
              </span>
            )}
          </h1>

          <div className="grid-12 mt-14 gap-y-12 md:mt-20">
            <p className="cs-display t-sub col-span-12 max-w-[38ch] text-pretty lg:col-span-6" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              {fm.intro}
            </p>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
              <dl className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-6">
                {fm.meta.map((m) => (
                  <div key={m.label} className="border-t border-(--cs-line) pt-3">
                    <dt className="t-label text-(--cs-muted)">{m.label}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-snug">{m.value}</dd>
                  </div>
                ))}
              </dl>
              {fm.links && (
                <ul className="mt-8 flex flex-wrap gap-3">
                  {fm.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-(--cs-accent) px-6 text-[0.95rem] font-medium text-(--cs-bg)"
                        data-cursor="Open site"
                      >
                        {l.label}
                        <span aria-hidden className="transition-transform duration-500 ease-rhythm group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <figure className="mx-auto mt-16 max-w-[1600px] px-[var(--gutter)] md:mt-28">
          <div data-reveal="clip">
            {h.url ? (
              <Browser url={h.url} className="clip-zoom">
                {heroImage}
              </Browser>
            ) : (
              <div className="screen clip-zoom">{heroImage}</div>
            )}
          </div>
        </figure>

        <div className="wrap mt-8 md:mt-16">{children}</div>
      </article>

      {/* Next */}
      <nav aria-label="Next project" className="border-t border-(--cs-line)">
        <Link href={next.href} className="wrap group grid-12 items-end gap-y-10 py-24 md:py-40" data-cursor="View project">
          <div className="col-span-12 md:col-span-6">
            <p className="t-label text-(--cs-muted)">Next showcase</p>
            <p className="cs-display mt-6 flex items-baseline gap-6 text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              {next.label}
              <span aria-hidden className="inline-block text-(--cs-accent) transition-transform duration-700 ease-rhythm group-hover:translate-x-4">
                →
              </span>
            </p>
            <p className="mt-6 text-(--cs-muted)">
              {next.kind} · {next.year}
            </p>
          </div>
          <div className="col-span-12 overflow-hidden md:col-span-5 md:col-start-8">
            <div className="transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.03]">
              <Media media={next} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </div>
        </Link>
        <p className="wrap pb-16">
          <Link href="/#work" className="link-underline text-(--cs-muted) hover:text-(--cs-text)">
            ← Back to all work
          </Link>
        </p>
      </nav>
    </main>
  );
}
