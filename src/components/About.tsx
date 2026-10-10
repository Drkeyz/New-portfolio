import { about } from "@content/site";
import { ScrollHighlight } from "./motion/ScrollHighlight";
import { SplitWords } from "./motion/SplitWords";

/** Typographic About: no photo. Pull-quote, narrow bio, two-column timeline. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-48">
      <div className="wrap">
        <div className="grid-12 gap-y-6">
          <p className="t-label col-span-12 text-muted md:col-span-3" data-reveal="fade">
            About
          </p>
          <h2 id="about-title" className="t-display col-span-12 text-balance md:col-span-9" data-reveal="words">
            <SplitWords text={about.headline} accent={["nature."]} />
          </h2>
        </div>

        <blockquote className="grid-12 mt-24 md:mt-40">
          <span aria-hidden className="t-accent col-span-12 -mb-8 text-[clamp(6rem,14vw,12rem)] leading-none text-brass md:col-span-1 md:col-start-2 md:mb-0">
            “
          </span>
          <ScrollHighlight
            className="t-display col-span-12 text-balance md:col-span-9"
            text={about.pullQuote}
            accent={["space."]}
          />
        </blockquote>

        <div className="grid-12 mt-20 gap-y-16 md:mt-32">
          <div className="col-span-12 max-w-[60ch] space-y-6 md:col-span-5 md:col-start-4">
            {about.bio.map((para, i) => (
              <p key={i} data-reveal style={{ "--d": i } as React.CSSProperties}>
                {para}
              </p>
            ))}
            <p className="text-muted" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              {about.proofPoint}
            </p>
          </div>
        </div>

        <div className="grid-12 mt-24 gap-y-16 md:mt-36">
          <div className="col-span-12 md:col-span-3">
            <h3 className="t-label text-muted">Experience</h3>
          </div>
          <ol className="col-span-12 md:col-span-9">
            {about.timeline.map((t, i) => (
              <li
                key={`${t.org}-${t.dates}`}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 border-b border-line/40 py-4 first:border-t sm:grid-cols-12 sm:gap-x-[var(--col-gap)]"
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
              >
                <span className="font-medium sm:col-span-5">{t.org}</span>
                <span className="whitespace-nowrap text-right text-[0.9375rem] tabular-nums text-muted sm:order-last sm:col-span-3">{t.dates}</span>
                <span className="col-span-2 text-muted sm:col-span-4">{t.role}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid-12 mt-20 gap-y-10">
          <ListBlock title="Skills" items={about.skills} className="md:col-start-4" />
          <ListBlock title="Tools" items={about.tools} />
          <ListBlock title="Certifications" items={about.certifications} />
        </div>
      </div>
    </section>
  );
}

function ListBlock({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  return (
    <div className={`col-span-12 sm:col-span-4 md:col-span-3 ${className}`} data-reveal>
      <h3 className="t-label text-muted">{title}</h3>
      <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
