import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { creative, socials } from "@content/site";
import { Media } from "./Media";
import { MusicPlayer } from "./MusicPlayer";
import { ScrollCrop } from "./ScrollCrop";
import { StageListen } from "./StageListen";
import { PlayInvite } from "./piano/SoundButton";
import { StageTransition } from "./StageTransition";
import { SplitWords } from "./motion/SplitWords";
import piano from "../../public/images/piano-stage.jpg";
import trumpet from "../../public/images/trumpet-stage.jpg";

// A "Listen" control only appears once its recording is in /public.
const has = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));
const { piano: pianoSound, trumpet: trumpetSound } = creative.performances;

function SubLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="t-label flex items-center gap-3 text-brass" data-reveal="fade">
      <span className="tabular-nums">{n}</span>
      <span aria-hidden className="h-px w-6 bg-brass" />
      {children}
    </p>
  );
}

/** Brass multiply + vignette on top of the stage-graded photo. */
function Grade({ vignette = 0.55 }: { vignette?: number }) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 bg-brass/25 mix-blend-multiply" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 55% 50%, transparent 35%, rgba(11,11,12,${vignette}) 100%)` }}
      />
    </>
  );
}

export function Creative() {
  return (
    <StageTransition id="creative" labelledBy="creative-title">
      {/* Intro: the only text visible while the stage fades in — large type, flipping colour at the midpoint. */}
      <div className="wrap flex min-h-[64svh] flex-col justify-center py-20 md:min-h-[100svh] md:py-32">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <h2
              id="creative-title"
              className="t-mega text-(--stage-fg) transition-colors duration-300"
              data-reveal="words"
            >
              <SplitWords text={creative.eyebrow} accent={["interface."]} />
            </h2>
            <p className="t-title mt-8 max-w-[22ch] text-(--stage-fg) transition-colors duration-300 md:mt-12">
              Design is what I do. Creativity is how I <span className="t-accent">see.</span>
            </p>
            <PlayInvite />
          </div>
        </div>
      </div>

      {/* 01 Music */}
      <div className="wrap py-14 md:py-32">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <SubLabel n="01">Music</SubLabel>
          </div>
          <div className="col-span-12 md:col-span-6" data-reveal>
            <MusicPlayer release={creative.release} />
          </div>
          <div className="col-span-12 flex flex-col gap-6 md:col-span-3 md:items-end md:text-right" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            <a
              href={creative.release.href}
              target="_blank"
              rel="noreferrer"
              className="t-sub link-underline"
              data-cursor="Play music"
            >
              Listen to my music <span aria-hidden>→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ul className="flex gap-5 text-[0.9375rem] text-muted-dark">
              {[socials.instagram, socials.tiktok, socials.fanlink].map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-snow">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 02 Piano — wide, cinematic; starts tight on hands and keys. */}
      <figure className="wrap py-12 md:py-24">
        <SubLabel n="02">Piano</SubLabel>
        <div className="relative mt-8">
        <ScrollCrop origin="56% 62%" className="aspect-[2600/1933] w-full md:aspect-[16/9]">
          <Image
            src={piano}
            alt="Oladimeji playing two keyboards on stage, with a violinist, guitarist and band behind him, in black and white"
            fill
            placeholder="blur"
            sizes="(min-width: 1360px) 1280px, 100vw"
            className="stage-grade object-cover object-[55%_55%]"
          />
          <Grade />
        </ScrollCrop>
          <StageListen {...pianoSound} available={has(pianoSound.src)} />
        </div>
        <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[0.9375rem] text-muted-dark">
          <span>Live, on keys.</span>
          {has(pianoSound.src) && (
            <span className="text-[0.8125rem]">
              Listen: {pianoSound.title}, {pianoSound.credit}
            </span>
          )}
        </figcaption>
      </figure>

      {/* 03 Trumpet — small source image (1108px), so never full-bleed: paired with type. */}
      <div className="wrap py-12 md:py-32">
        <div className="grid-12 gap-y-10">
          <figure className="col-span-12 md:col-span-7">
            <SubLabel n="03">Trumpet</SubLabel>
            {/* Crops out the top ~20% of the frame (LED screen text). */}
            <div className="relative mt-8 max-w-[1108px]">
            <ScrollCrop origin="52% 26%" from={1.5} className="aspect-[1108/1136] w-full">
              <Image
                src={trumpet}
                alt="Oladimeji playing trumpet on stage"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 58vw, 100vw"
                className="stage-grade object-cover object-bottom"
              />
              <Grade vignette={0.75} />
            </ScrollCrop>
              <StageListen {...trumpetSound} available={has(trumpetSound.src)} />
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-[0.9375rem] text-muted-dark">
              <span>Live, on trumpet.</span>
              {has(trumpetSound.src) && (
                <span className="text-[0.8125rem]">
                  Listen: {trumpetSound.title}, {trumpetSound.credit}
                </span>
              )}
            </figcaption>
          </figure>
          <div className="col-span-12 flex items-end md:col-span-4 md:col-start-9">
            <p className="t-display text-balance" data-reveal>
              Rhythm, structure, <span className="t-accent text-brass">timing.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 04 Photography — his photographs of places and objects. */}
      <div className="wrap py-14 md:py-32">
        <SubLabel n="04">Photography</SubLabel>
        <ul className="grid-12 mt-8 gap-y-6">
          {creative.photographs.map((p, i) => (
            <li
              key={p.label}
              className={["col-span-12 md:col-span-5", "col-span-12 md:col-span-4 md:mt-24", "col-span-12 md:col-span-3 md:mt-48"][i]}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
            >
              <figure>
                <div className="relative overflow-hidden">
                  <Media
                    media={{ ...p, alt: p.alt || `Photograph ${i + 1}` }}
                    sizes="(min-width: 768px) 42vw, 100vw"
                    bg="#17171A"
                    fg="#F5F5F2"
                    imgClassName="photo-grade"
                  />
                  {p.src && <div aria-hidden className="pointer-events-none absolute inset-0 bg-brass/15 mix-blend-multiply" />}
                </div>
                <figcaption className="mt-3 text-[0.875rem] text-muted-dark">{p.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Exit: static gradient back to paper before Contact. */}
      <div aria-hidden className="h-[22svh] bg-gradient-to-b from-transparent to-paper md:h-[40svh]" />
    </StageTransition>
  );
}
