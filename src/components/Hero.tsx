import Image from "next/image";
import { hero, site } from "@content/site";
import { Magnetic } from "./motion/Magnetic";
import { Parallax } from "./motion/Parallax";
import { ScrollOut } from "./motion/ScrollOut";
import portrait from "../../public/images/portrait-hero-bw.jpg";

/**
 * Editorial hero: headline in columns 1–7, portrait in 8–12 bleeding off the
 * right edge, with a clear gutter between them. Entrance is pure CSS
 * (.hero-word, .unmask), so it runs before JavaScript loads.
 */
export function Hero() {
  const words = hero.headline.lead.split(" ");
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

  return (
    <section aria-labelledby="hero-title" className="relative pt-24 md:pt-32">
      <div className="wrap grid-12 relative gap-y-10">
        <ScrollOut className="col-span-12 flex flex-col justify-end md:col-span-7 md:pb-[4svh] md:pr-6">
          <p className="hero-in t-label mb-8 flex items-center gap-3 text-muted md:mb-12" style={d(0)}>
            <span aria-hidden className="h-px w-8 bg-brass" />
            {site.name} — {site.role}
          </p>

          <h1 id="hero-title" className="t-hero text-balance">
            {words.map((word, i) => (
              <span key={i} className="w hero-word">
                <span style={d(i + 1)}>{word}</span>
                {" "}
              </span>
            ))}
            <span className="w hero-word">
              <span className="t-accent pr-[0.06em]" style={d(words.length + 1)}>
                {hero.headline.accent}
              </span>
            </span>
          </h1>

          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-[30rem]">
              <p className="hero-in t-sub" style={d(words.length + 3)}>
                {hero.intro}
              </p>
              <p className="hero-in mt-5 flex items-center gap-2 text-[0.95rem] text-muted" style={d(words.length + 4)}>
                <span aria-hidden className="size-1.5 rounded-full bg-brass" />
                {hero.location}
              </p>
            </div>
          </div>

          <div className="hero-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" style={d(words.length + 5)}>
            <Magnetic>
              <a
                href={hero.primaryCta.href}
                className="group inline-flex min-h-14 items-center gap-3 overflow-hidden rounded-full bg-ink px-7 text-[0.95rem] font-medium text-paper"
                data-cursor="Explore"
              >
                {hero.primaryCta.label}
                <span aria-hidden className="relative inline-block overflow-hidden">
                  <span className="inline-block transition-transform duration-500 ease-expo group-hover:translate-y-full">↓</span>
                  <span className="absolute left-0 top-0 inline-block -translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0">
                    ↓
                  </span>
                </span>
              </a>
            </Magnetic>
            <a href={hero.secondaryCta.href} className="link-underline inline-flex min-h-12 items-center text-[0.95rem] font-medium">
              {hero.secondaryCta.label} <span aria-hidden className="ml-2">→</span>
            </a>
          </div>
        </ScrollOut>

        {/* Portrait: 5 of 12 columns, bleeding off the right edge on desktop. */}
        <div className="relative col-span-12 md:col-span-5 md:col-start-8 md:mr-[calc(-1*(var(--gutter)+max(0px,(100vw-var(--max)-2*var(--gutter))/2)))]">
          <div className="unmask relative aspect-[4/4.4] w-full md:aspect-[4/5] md:max-h-[82svh]">
            <div className="unmask-outer absolute inset-0">
              <div className="unmask-inner absolute inset-0">
                <Parallax amount={6} className="absolute inset-0">
                  <Image
                    src={portrait}
                    alt={hero.portraitAlt}
                    fill
                    priority
                    placeholder="blur"
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-[50%_30%]"
                  />
                </Parallax>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Load sequence: the name arrives in beats while a brass line keeps time, then the panel lifts. CSS only. */
export function Intro() {
  const beats = ["Oladimeji", "Adebiyi"];
  return (
    <div className="intro" aria-hidden>
      <div className="text-center">
        <p className="t-display flex flex-wrap items-baseline justify-center gap-x-[0.25em] px-6">
          {beats.map((b, i) => (
            <span key={b} className="beat" style={{ "--d": i } as React.CSSProperties}>
              <span>{b}</span>
            </span>
          ))}
        </p>
        <p className="mt-4 flex justify-center">
          <span className="beat" style={{ "--d": 2 } as React.CSSProperties}>
            <span className="t-accent text-2xl text-muted-dark">Product Designer &amp; Design Engineer</span>
          </span>
        </p>
      </div>
      <span className="tempo" />
    </div>
  );
}
