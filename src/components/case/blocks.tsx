/**
 * Building blocks available inside every case study MDX file
 * (registered in src/mdx-components.tsx). They read the case study's
 * palette from CSS variables set by CaseStudyLayout:
 *   --cs-bg --cs-surface --cs-text --cs-muted --cs-line --cs-accent
 *   --cs-attention --cs-danger --cs-lend
 *
 * Layout: inside a <Section>, blocks flow through a 12-column grid.
 * Running text sits in the reading column; a block widens itself with
 * data-span ("lead" | "mid" | "wide" | "bleed").
 */
import Image from "next/image";
import { isPending, type Media as MediaType } from "@content/projects";
import { CountUp } from "../CountUp";
import { Media } from "../Media";
import { SplitWords } from "../motion/SplitWords";

const isDev = process.env.NODE_ENV !== "production";

type Span = "text" | "lead" | "mid" | "wide" | "bleed";
const span = (s: Span) => (s === "text" ? undefined : s);
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Splits "a *b c* d" into words, marking the positions of the *starred* ones. */
function parseAccent(text: string) {
  const accentAt: number[] = [];
  let inside = false;
  const words = text.split(" ").map((w, i) => {
    if (w.startsWith("*")) inside = true;
    if (inside) accentAt.push(i);
    if (/\*[.,:;]?$/.test(w)) inside = false;
    return w.replace(/\*/g, "");
  });
  return { text: words.join(" "), accentAt };
}

/* ------------------------------------------------------------------ */
/* Structure                                                          */
/* ------------------------------------------------------------------ */

/**
 * One of the eight story sections. `title` feeds the section index;
 * `headline` is the editorial line. Wrap accent words in *asterisks*.
 */
export function Section({
  n,
  title,
  headline,
  children,
}: {
  n: string;
  title: string;
  headline?: string;
  children: React.ReactNode;
}) {
  const id = slugify(title);
  const h = parseAccent(headline ?? title);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-(--cs-line) py-24 md:py-36">
      <header className="grid-12 mb-14 gap-y-6 md:mb-20">
        <p className="t-label col-span-12 flex items-center gap-3 pt-3 lg:col-span-3" data-reveal="fade">
          <span className="tabular-nums text-(--cs-accent)">{n}</span>
          <span aria-hidden className="h-px w-6 bg-(--cs-line)" />
          <span className="text-(--cs-muted)">{title}</span>
        </p>
        <h2
          id={`${id}-h`}
          className="cs-display cs-headline col-span-12 text-[clamp(2.25rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance lg:col-span-9"
          data-reveal="words"
        >
          <SplitWords text={h.text} accentAt={h.accentAt} />
        </h2>
      </header>
      <div className="case-flow">{children}</div>
    </section>
  );
}

/** Larger opening paragraph. */
export function Lead({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      data-span={wide ? "lead" : undefined}
      className="cs-display t-sub max-w-[40ch] text-pretty text-(--cs-text) md:text-[clamp(1.375rem,2vw,1.875rem)] md:leading-[1.3]"
      data-reveal
    >
      {children}
    </div>
  );
}

/** A sub-heading that opens a new beat inside a section. */
export function Sub({ kicker, children }: { kicker?: string; children: React.ReactNode }) {
  return (
    <div data-span="lead" className="mt-10 md:mt-20" data-reveal>
      {kicker && <p className="t-label mb-3 text-(--cs-accent)">{kicker}</p>}
      <h3 className="cs-display t-title text-balance">{children}</h3>
    </div>
  );
}

/** A single large statement: the line the section turns on. Wrap accent words in *asterisks*. */
export function Statement({ text, cite }: { text: string; cite?: string }) {
  const s = parseAccent(text);
  return (
    <figure data-span="mid" className="border-l-2 border-(--cs-accent) py-2 pl-6 md:pl-10">
      <blockquote className="cs-display cs-headline t-display text-balance" data-reveal="words">
        <SplitWords text={s.text} accentAt={s.accentAt} />
      </blockquote>
      {cite && <figcaption className="mt-6 text-[0.9375rem] text-(--cs-muted)">{cite}</figcaption>}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Summary                                                            */
/* ------------------------------------------------------------------ */

/** The case study in four lines, for the reader with two minutes. */
export function Glance({ items }: { items: { label: string; body: string }[] }) {
  return (
    <dl data-span="wide" className="grid gap-px bg-(--cs-line) sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <div key={it.label} className="bg-(--cs-bg) py-8 pr-6 sm:p-8" data-reveal="cell" style={d(i)}>
          <dt className="t-label flex items-center gap-3 text-(--cs-accent)">
            <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            {it.label}
          </dt>
          <dd className="mt-4 text-pretty text-[1.0625rem] leading-[1.55]">{it.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Numbers                                                            */
/* ------------------------------------------------------------------ */

/** Big number. Hidden automatically if `value` is still a [VERIFY]/[PLACEHOLDER] string. */
export function Stat({
  value,
  prefix,
  suffix,
  decimals,
  children,
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  children: React.ReactNode;
}) {
  if (typeof value === "string" && isPending(value)) return null;
  return (
    <div className="border-t border-(--cs-line) pt-6" data-reveal>
      <p className="cs-display text-[clamp(2.75rem,6.2vw,6rem)] font-medium leading-[0.95] tracking-[-0.045em] break-words">
        {typeof value === "number" ? (
          <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        ) : (
          value
        )}
      </p>
      <p className="mt-5 max-w-[34ch] text-[1.0625rem] text-(--cs-muted)">{children}</p>
    </div>
  );
}

export function StatRow({ children, source }: { children: React.ReactNode; source?: string }) {
  return (
    <div data-span="wide">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-[calc(var(--col-gap)*2)]">{children}</div>
      {source && <p className="mt-8 text-[0.875rem] text-(--cs-muted)">Source: {source}</p>}
    </div>
  );
}

/** Shipped results. Any metric whose value is still [VERIFY]/[PLACEHOLDER] is dropped. */
export function Metrics({
  items,
}: {
  items: { value: number | string; prefix?: string; suffix?: string; title?: string; label: string }[];
}) {
  const shown = items.filter((m) => !(typeof m.value === "string" && isPending(m.value)));
  if (!shown.length) return null;
  return (
    <ul data-span="wide" className="grid gap-px bg-(--cs-line) md:grid-cols-3">
      {shown.map((m, i) => (
        <li key={m.label} className="bg-(--cs-bg) py-10 pr-6 md:p-10" data-reveal="cell" style={d(i)}>
          <p className="cs-display text-[clamp(3.5rem,6vw,6rem)] font-medium leading-none tracking-[-0.045em] text-(--cs-accent)">
            {typeof m.value === "number" ? <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} /> : m.value}
          </p>
          {m.title && <p className="cs-display mt-8 text-xl font-medium">{m.title}</p>}
          <p className={`${m.title ? "mt-2" : "mt-6"} text-pretty text-(--cs-muted)`}>{m.label}</p>
        </li>
      ))}
    </ul>
  );
}

/** Simple data table (e.g. targets). */
export function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div data-span="mid" className="overflow-x-auto" data-reveal>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="t-label mb-5 text-left text-(--cs-attention)">{caption}</caption>
        <thead>
          <tr className="border-b border-(--cs-line)">
            {head.map((h) => (
              <th key={h} scope="col" className="t-label py-3 pr-6 font-medium text-(--cs-muted)">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-(--cs-line) align-top">
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="cs-display py-5 pr-6 text-lg font-medium">
                    {c}
                  </th>
                ) : (
                  <td
                    key={i}
                    className={`py-5 pr-6 ${i === r.length - 1 ? "cs-display text-right text-lg tabular-nums text-(--cs-accent)" : "text-(--cs-muted)"}`}
                  >
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Research                                                           */
/* ------------------------------------------------------------------ */

/** Numbered findings: a title and, optionally, the evidence behind it. */
export function Findings({ items }: { items: (string | { title: string; body?: string })[] }) {
  return (
    <ol data-span="wide" className="border-t border-(--cs-line)">
      {items.map((raw, i) => {
        const it = typeof raw === "string" ? { title: raw } : raw;
        return (
          <li
            key={it.title}
            className="grid gap-x-[var(--col-gap)] gap-y-3 border-b border-(--cs-line) py-7 md:grid-cols-12 md:py-9"
            data-reveal
            style={d(i)}
          >
            <span className="t-label pt-2 tabular-nums text-(--cs-accent) md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <span className="cs-display text-[clamp(1.375rem,2.2vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance md:col-span-5">
              {it.title}
            </span>
            {it.body && <span className="text-pretty text-(--cs-muted) md:col-span-5 md:col-start-8">{it.body}</span>}
          </li>
        );
      })}
    </ol>
  );
}

/** People / roles: a row of typographic columns. */
export function Columns({ items }: { items: { title: string; label?: string; need?: string; body: string }[] }) {
  return (
    <ul data-span="wide" className={`grid gap-px bg-(--cs-line) ${items.length === 2 || items.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {items.map((it, i) => (
        <li key={it.title} className="flex flex-col bg-(--cs-bg) py-8 pr-6 md:p-10" data-reveal="cell" style={d(i)}>
          {it.label && <p className="t-label tabular-nums text-(--cs-muted)">{it.label}</p>}
          <p className="cs-display mt-6 text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em]">{it.title}</p>
          {it.need && <p className="mt-4 text-[1.0625rem] text-(--cs-accent)">“{it.need}”</p>}
          <p className="mt-4 text-pretty text-(--cs-muted)">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** A process, told in steps. */
export function Steps({ items, start = 1 }: { items: { title: string; body: string }[]; start?: number }) {
  return (
    <ol data-span="wide" className="border-t border-(--cs-line)">
      {items.map((s, i) => (
        <li
          key={s.title}
          className="grid gap-x-[var(--col-gap)] gap-y-3 border-b border-(--cs-line) py-8 md:grid-cols-12 md:py-10"
          data-reveal
          style={d(i)}
        >
          <span className="cs-display text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-(--cs-accent) tabular-nums md:col-span-2">
            {String(start + i).padStart(2, "0")}
          </span>
          <span className="cs-display text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-[1.2] tracking-[-0.02em] text-balance md:col-span-4 md:col-start-3 md:pt-1">
            {s.title}
          </span>
          <span className="text-pretty text-(--cs-muted) md:col-span-5 md:col-start-8 md:pt-1">{s.body}</span>
        </li>
      ))}
    </ol>
  );
}

/** Architecture, as stacked layers. */
export function Layers({ items }: { items: { name: string; title: string; body: string }[] }) {
  return (
    <ol data-span="wide" className="grid gap-3">
      {items.map((l, i) => (
        <li
          key={l.name}
          className="grid gap-x-[var(--col-gap)] gap-y-4 border border-(--cs-line) bg-(--cs-surface)/40 p-6 md:grid-cols-12 md:items-center md:p-10"
          style={{ ...d(i), marginLeft: `calc(${i} * min(4vw, 3rem))` }}
          data-reveal
        >
          <div className="flex items-baseline gap-4 md:col-span-4">
            <span className="t-label tabular-nums text-(--cs-muted)">Layer {String(i + 1).padStart(2, "0")}</span>
            <span className="cs-display text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.04em] text-(--cs-accent)">
              {l.name}
            </span>
          </div>
          <p className="cs-display text-xl font-medium leading-snug md:col-span-4">{l.title}</p>
          <p className="text-pretty text-(--cs-muted) md:col-span-4">{l.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Pictures                                                           */
/* ------------------------------------------------------------------ */

type Shot = { src: string; width: number; height: number; alt: string };

/** A single screen, framed. */
export function Figure({
  caption,
  span: s = "wide",
  priority,
  ...shot
}: Shot & { caption?: React.ReactNode; span?: Span; priority?: boolean }) {
  const sizes = s === "text" ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1360px) 1280px, 100vw";
  return (
    <figure data-span={span(s)}>
      <div data-reveal="clip">
        <div className="screen">
          <Image {...shot} sizes={sizes} priority={priority} className="clip-zoom h-auto w-full" />
        </div>
      </div>
      {caption && <figcaption className="mt-4 max-w-[64ch] text-[0.9375rem] text-(--cs-muted)">{caption}</figcaption>}
    </figure>
  );
}

/**
 * A screen with numbered call-outs. `x`/`y` are percentages of the image.
 * The pins are decorative; the numbered list underneath carries the meaning.
 */
export function Annotated({
  notes,
  caption,
  kicker,
  columns = 4,
  start = 1,
  ...shot
}: Shot & {
  caption?: string;
  /** Small label above the screen, e.g. "Step 01". */
  kicker?: string;
  /** Columns for the notes list on desktop. */
  columns?: 2 | 4;
  /** Number of the first pin, to continue numbering across screens. */
  start?: number;
  notes: { x: number; y: number; title: string; body: string }[];
}) {
  return (
    <figure data-span="wide">
      {kicker && <p className="t-label mb-4 text-(--cs-accent)">{kicker}</p>}
      <div data-reveal="clip">
        <div className="screen">
          <Image {...shot} sizes="(min-width: 1360px) 1280px, 100vw" className="clip-zoom h-auto w-full" />
          {notes.map((n, i) => (
            <span
              key={n.title}
              aria-hidden
              className="absolute z-[3] grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--cs-accent) text-[0.6875rem] font-semibold text-(--cs-bg) shadow-[0_0_0_4px_rgba(23,207,170,0.25)] tabular-nums md:size-8 md:text-[0.8125rem]"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              {start + i}
            </span>
          ))}
        </div>
      </div>
      <figcaption>
        {caption && <p className="sr-only">{caption}</p>}
        <ol className={`mt-8 grid gap-x-[var(--col-gap)] gap-y-8 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : ""}`}>
          {notes.map((n, i) => (
            <li key={n.title} className="border-t border-(--cs-line) pt-5" data-reveal style={d(i)}>
              <p className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-(--cs-accent) text-[0.6875rem] font-semibold text-(--cs-accent) tabular-nums">
                  {start + i}
                </span>
                <span className="cs-display font-medium">{n.title}</span>
              </p>
              <p className="mt-3 text-pretty text-[0.9375rem] text-(--cs-muted)">{n.body}</p>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

/**
 * A close-up of one region of a screen, at native resolution.
 * `region` is [x, y, width, height] in source pixels.
 */
export function Detail({
  region,
  caption,
  label,
  span: s = "text",
  ...shot
}: Shot & { region: [number, number, number, number]; caption?: React.ReactNode; label?: string; span?: Span }) {
  return (
    <figure data-span={span(s)}>
      <div data-reveal="clip">
        <div className="screen">
          <Crop {...shot} region={region} column={s === "text" ? 760 : 1280} />
          {label && (
            <span className="t-label absolute bottom-3 left-3 rounded-full bg-(--cs-bg)/90 px-3 py-1.5 text-(--cs-text) md:bottom-4 md:left-4">
              {label}
            </span>
          )}
        </div>
      </div>
      {caption && <figcaption className="mt-4 max-w-[64ch] text-[0.9375rem] text-(--cs-muted)">{caption}</figcaption>}
    </figure>
  );
}

/**
 * Just the cropped image, sized by the region's aspect ratio. Also usable
 * inside a ComparisonSlider, to compare the same region of two screens.
 */
export function Crop({
  region,
  column = 1280,
  ...shot
}: Shot & { region: [number, number, number, number]; column?: number }) {
  const [x, y, w, h] = region;
  const scale = shot.width / w;
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <Image
        {...shot}
        // Rendered width of the whole source image when the crop fills its column.
        sizes={`(min-width: 1024px) ${Math.round(column * scale)}px, ${Math.round(100 * scale)}vw`}
        className="absolute h-auto max-w-none"
        style={{ width: `${scale * 100}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
      />
    </div>
  );
}

/**
 * A row of small, self-contained UI pieces (modals, cards) that carry their
 * own border, so they're shown unframed, top-aligned, each with a caption.
 */
export function Row({ items }: { items: (Shot & { caption?: string })[] }) {
  return (
    <ul data-span="wide" className={`grid items-start gap-[var(--col-gap)] gap-y-10 ${items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {items.map(({ caption, ...shot }, i) => (
        <li key={shot.src} data-reveal style={d(i)}>
          <div className="overflow-hidden rounded-[10px]">
            <Image {...shot} sizes="(min-width: 768px) 420px, 100vw" className="h-auto w-full" />
          </div>
          {caption && <p className="mt-4 text-pretty text-[0.9375rem] text-(--cs-muted)">{caption}</p>}
        </li>
      ))}
    </ul>
  );
}

/** Two details side by side. */
export function Pair({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div data-span="wide">
      <div className="grid gap-[var(--col-gap)] gap-y-10 md:grid-cols-2">{children}</div>
      {caption && <p className="mt-4 max-w-[64ch] text-[0.9375rem] text-(--cs-muted)">{caption}</p>}
    </div>
  );
}

/** A grid of screens. Each one is a Media entry (placeholder until `src` is set). */
export function Screens({ items, columns = 2 }: { items: MediaType[]; columns?: 1 | 2 | 3 }) {
  const cols = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3" }[columns];
  return (
    <ul data-span="wide" className={`grid gap-[var(--col-gap)] gap-y-10 ${cols}`}>
      {items.map((m, i) => (
        <li key={m.label} data-reveal style={d(i)}>
          <div className="screen">
            <Media
              media={m}
              sizes={columns === 1 ? "(min-width: 1360px) 1280px, 100vw" : "(min-width: 1024px) 640px, 100vw"}
              bg="var(--cs-surface)"
              fg="var(--cs-text)"
            />
          </div>
          <p className="mt-3 text-[0.875rem] text-(--cs-muted)">{m.label}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Diagrams                                                           */
/* ------------------------------------------------------------------ */

const BINS = 29;
const bell = (i: number, centre: number, spread: number) => Math.exp(-((i - centre) ** 2) / (2 * spread ** 2));

/**
 * The core mechanic, drawn: static-range liquidity going idle vs. DLMM bins
 * that know which capital is working and lend out the rest. Every state has
 * a label as well as a colour.
 */
export function BinDiagram() {
  const colours = { fees: "var(--cs-accent)", lend: "var(--cs-lend)", idle: "#3A4150" };

  // Static range: liquidity parked in bins 5–15, price has drifted to bin 22.
  const staticBins = Array.from({ length: BINS }, (_, i) => ({
    h: i >= 5 && i <= 15 ? 0.25 + 0.75 * bell(i, 10, 3.2) : 0,
    tone: "idle" as const,
  }));
  // DLMM: price at bin 14. Bins near price earn fees; the rest are lent out.
  const dlmmBins = Array.from({ length: BINS }, (_, i) => ({
    h: 0.2 + 0.8 * bell(i, 14, 6),
    tone: Math.abs(i - 14) <= 3 ? ("fees" as const) : ("lend" as const),
  }));

  const Panel = ({
    title,
    sub,
    bins,
    price,
    range,
    note,
    delay,
  }: {
    title: string;
    sub: string;
    bins: { h: number; tone: keyof typeof colours }[];
    price: number;
    range?: [number, number];
    note: string;
    delay: number;
  }) => (
    <div className="flex flex-col border border-(--cs-line) p-6 md:p-8">
      <p className="t-label text-(--cs-muted)">{sub}</p>
      <p className="cs-display mt-2 text-2xl font-medium tracking-[-0.02em]">{title}</p>
      <div className="relative mt-10 md:mt-14" data-reveal="bins" style={d(delay)}>
        {range && (
          <div
            className="absolute -top-7 flex items-center"
            style={{ left: `${(range[0] / BINS) * 100}%`, width: `${((range[1] - range[0] + 1) / BINS) * 100}%` }}
          >
            <span className="h-2.5 w-full border-x border-t border-(--cs-muted)" />
            <span className="t-label absolute -top-5 left-0 whitespace-nowrap text-[0.625rem] text-(--cs-muted)">Your range</span>
          </div>
        )}
        <div className="flex h-36 items-end gap-[3px] md:h-44">
          {bins.map((b, i) => (
            <span
              key={i}
              className="bar flex-1 rounded-t-[2px]"
              style={{
                height: `${Math.max(b.h * 100, 2)}%`,
                backgroundColor: b.h ? colours[b.tone] : "var(--cs-line)",
                outline: i === price && b.h ? "2px solid var(--cs-text)" : undefined,
                outlineOffset: 2,
                "--i": i,
              } as React.CSSProperties}
            />
          ))}
        </div>
        {/* Price marker */}
        <div className="absolute -bottom-8 flex -translate-x-1/2 flex-col items-center" style={{ left: `${((price + 0.5) / BINS) * 100}%` }}>
          <span className="h-3 w-px bg-(--cs-text)" />
          <span className="t-label whitespace-nowrap text-[0.625rem]">Price</span>
        </div>
      </div>
      <p className="mt-14 text-pretty text-[0.9375rem] text-(--cs-muted)">{note}</p>
    </div>
  );

  return (
    <figure data-span="wide">
      <div className="grid gap-[var(--col-gap)] gap-y-4 lg:grid-cols-2">
        <Panel
          sub="Before · static range"
          title="Out of range, out of work"
          bins={staticBins}
          price={22}
          range={[5, 15]}
          note="Price drifts outside the range the LP set. Every dollar in the position stops earning until they notice and rebalance by hand."
          delay={0}
        />
        <Panel
          sub="Juncta · DLMM + lending"
          title="Every bin has a job"
          bins={dlmmBins}
          price={14}
          note="The protocol always knows the active bin. Liquidity near price earns trading fees; bins further out are lent to the lending market, so they earn interest instead of nothing."
          delay={1}
        />
      </div>
      <figcaption className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.875rem] text-(--cs-muted)">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-[2px] bg-(--cs-accent)" /> Earning trading fees
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-[2px] bg-(--cs-lend)" /> Lent out, earning interest
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-[2px] bg-[#3A4150]" /> Idle, earning nothing
        </span>
        <span>Illustrative, not to scale.</span>
      </figcaption>
    </figure>
  );
}

/** Ordered states with colour + label + glyph, so meaning never depends on colour alone. */
export function Stages({
  items,
}: {
  items: { name: string; range: string; tone: "ok" | "attention" | "danger" | "critical"; note?: string }[];
}) {
  const tone = {
    ok: { color: "var(--cs-accent)", glyph: "●" },
    attention: { color: "var(--cs-attention)", glyph: "▲" },
    danger: { color: "var(--cs-danger)", glyph: "◆" },
    critical: { color: "var(--cs-danger)", glyph: "■" },
  };
  return (
    <div data-span="wide">
      {/* The scale: health factor from liquidation to safe. */}
      <div aria-hidden className="mb-px grid h-1.5 grid-cols-4 gap-px">
        {[...items].reverse().map((s) => (
          <span key={s.name} style={{ backgroundColor: tone[s.tone].color }} />
        ))}
      </div>
      <ol className="grid gap-px bg-(--cs-line) sm:grid-cols-2 lg:grid-cols-4">
        {[...items].reverse().map((s, i) => (
          <li key={s.name} className="bg-(--cs-bg) p-6 md:p-8" data-reveal="cell" style={d(i)}>
            <p className="t-label flex items-center gap-2" style={{ color: tone[s.tone].color }}>
              <span aria-hidden>{tone[s.tone].glyph}</span>
              {s.name}
            </p>
            <p className="cs-display mt-6 text-[clamp(2rem,3vw,2.75rem)] font-medium leading-none tabular-nums tracking-[-0.03em]">
              {s.range}
            </p>
            {s.note && <p className="mt-3 text-[0.9375rem] text-(--cs-muted)">{s.note}</p>}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[0.875rem] text-(--cs-muted)">Health factor, from liquidation (left) to safe (right).</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Design system                                                      */
/* ------------------------------------------------------------------ */

type Tone = "ok" | "attention" | "danger";

/** Palette, type and core components on one sheet. */
export function DesignSystem({
  palette,
  font,
  chips,
  note,
  actions = ["Continue", "Cancel"],
  sample,
}: {
  palette: { name: string; hex: string; role: string }[];
  font: { name: string; spec: string };
  chips: { label: string; tone: Tone }[];
  note?: string;
  /** Labels for the primary and secondary button samples. */
  actions?: [string, string];
  /** A small-text table sample: a header row and a value row (values marked * use the accent). */
  sample?: { caption: string; head: string[]; row: string[] };
}) {
  const tone: Record<Tone, { c: string; g: string }> = {
    ok: { c: "var(--cs-accent)", g: "●" },
    attention: { c: "var(--cs-attention)", g: "▲" },
    danger: { c: "var(--cs-danger)", g: "◆" },
  };
  return (
    <div data-span="wide" className="grid gap-px bg-(--cs-line) lg:grid-cols-12">
      {/* Type */}
      <div className="bg-(--cs-surface)/60 p-6 md:p-10 lg:col-span-7" data-reveal>
        <p className="t-label text-(--cs-muted)">Typography</p>
        <p className="cs-display mt-6 text-[clamp(6rem,14vw,12rem)] font-medium leading-[0.85] tracking-[-0.05em]" aria-hidden>
          Aa
        </p>
        <p className="cs-display mt-6 text-2xl font-medium">{font.name}</p>
        <p className="t-label mt-2 text-(--cs-muted)">{font.spec}</p>
        {note && <p className="mt-8 max-w-[52ch] text-pretty text-(--cs-muted)">{note}</p>}
        {sample && (
          <div className="mt-10 border-t border-(--cs-line) pt-4">
            <p className="t-label text-[0.625rem] text-(--cs-muted)">{sample.caption}</p>
            <div
              className="mt-3 grid gap-2 font-[family-name:var(--cs-font)] text-[12px] tabular-nums"
              style={{ gridTemplateColumns: `repeat(${sample.head.length}, minmax(0, 1fr))` }}
            >
              {sample.head.map((h) => (
                <span key={h} className="text-(--cs-muted)">
                  {h}
                </span>
              ))}
              {sample.row.map((c, i) => (
                <span key={i} className={c.endsWith("*") ? "text-(--cs-accent)" : undefined}>
                  {c.replace(/\*$/, "")}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Palette + components */}
      <div className="grid gap-px lg:col-span-5">
        <div className="bg-(--cs-surface)/60 p-6 md:p-10" data-reveal style={d(1)}>
          <p className="t-label text-(--cs-muted)">Palette</p>
          <ul className="mt-6 space-y-3">
            {palette.map((p) => (
              <li key={p.hex} className="flex items-center gap-4">
                <span aria-hidden className="size-10 shrink-0 rounded-[4px] ring-1 ring-white/15" style={{ backgroundColor: p.hex }} />
                <span className="min-w-0">
                  <span className="block font-medium">{p.name}</span>
                  <span className="block text-[0.875rem] text-(--cs-muted)">
                    <span className="font-mono">{p.hex}</span> · {p.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-(--cs-surface)/60 p-6 md:p-10" data-reveal style={d(2)}>
          <p className="t-label text-(--cs-muted)">Status, never colour alone</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li
                key={c.label}
                className="t-label inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6875rem]"
                style={{ color: tone[c.tone].c, borderColor: tone[c.tone].c }}
              >
                <span aria-hidden>{tone[c.tone].g}</span>
                {c.label}
              </li>
            ))}
          </ul>
          <p className="t-label mt-8 text-(--cs-muted)">Actions</p>
          <div aria-hidden className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex min-h-11 items-center rounded-[6px] bg-(--cs-accent) px-5 text-[0.9375rem] font-semibold text-(--cs-bg)">
              {actions[0]}
            </span>
            <span className="inline-flex min-h-11 items-center rounded-[6px] border border-(--cs-line) px-5 text-[0.9375rem]">
              {actions[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Colour roles in the design system. */
export function Swatches({ items }: { items: { name: string; hex: string; role: string }[] }) {
  return (
    <ul data-span="wide" className="grid gap-[var(--col-gap)] sm:grid-cols-3">
      {items.map((s) => (
        <li key={s.hex} data-reveal>
          <div aria-hidden className="h-24 ring-1 ring-white/10" style={{ backgroundColor: s.hex }} />
          <p className="mt-3 font-medium">{s.name}</p>
          <p className="text-[0.9375rem] text-(--cs-muted)">
            <span className="tabular-nums">{s.hex}</span> · {s.role}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Highlighted note. Use kind="a11y" for the accessibility-decisions callout. */
export function Callout({ title, kind, children }: { title: string; kind?: "a11y"; children: React.ReactNode }) {
  return (
    <aside aria-label={title} data-span="mid" className="border-l-2 border-(--cs-accent) bg-(--cs-surface)/60 p-6 md:p-10" data-reveal>
      <p className="t-label text-(--cs-accent)">{kind === "a11y" ? `Accessibility · ${title}` : title}</p>
      <div className="mt-6 space-y-4 text-pretty [&_li]:flex [&_li]:gap-3 [&_ul]:space-y-4">{children}</div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Unfinished content                                                 */
/* ------------------------------------------------------------------ */

/** Missing content. Visible (dashed) so it can't be missed before launch. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-(--cs-attention) p-6 text-(--cs-attention)">
      <p className="t-label">[PLACEHOLDER]</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/** Inline marker for a fact to confirm. Development only; renders nothing in production. */
export function Verify({ children }: { children?: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <span className="ml-2 border border-dashed border-(--cs-attention) px-1.5 text-[0.75rem] text-(--cs-attention)">
      [VERIFY]{children ? ` ${children}` : ""}
    </span>
  );
}
