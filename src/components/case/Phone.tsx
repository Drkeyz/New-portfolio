import Image from "next/image";

export type Screen = { src: string; width: number; height: number; alt: string };

/**
 * A phone, drawn in CSS around a flat screen export, so every screen gets the
 * same hardware no matter where it came from. Sizes scale with the phone's
 * own width (container query units).
 */
export function Phone({
  screen,
  sizes = "(min-width: 768px) 360px, 70vw",
  priority,
  className = "",
  children,
}: {
  screen: Screen;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Overlays positioned over the screen (e.g. annotation pins). */
  children?: React.ReactNode;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-body">
        <div className="phone-screen" style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
          <Image {...screen} sizes={sizes} priority={priority} className="absolute inset-0 size-full object-cover" />
          {children}
        </div>
      </div>
    </div>
  );
}

/** Numbered pins on a phone with the notes beside it. Pins are decorative; the list carries the meaning. */
export function PhoneNotes({
  screen,
  notes,
  flip,
}: {
  screen: Screen;
  notes: { x: number; y: number; title: string; body: string }[];
  /** Put the phone on the right. */
  flip?: boolean;
}) {
  return (
    <figure data-span="wide" className="grid-12 items-center gap-y-12">
      <div className={`col-span-12 flex justify-center md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`} data-reveal>
        <Phone screen={screen} className="w-[min(78vw,360px)]">
          {notes.map((n, i) => (
            <span
              key={n.title}
              aria-hidden
              className="absolute z-[3] grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-(--cs-accent) text-[0.75rem] font-semibold text-(--cs-bg) shadow-[0_0_0_5px_color-mix(in_srgb,var(--cs-accent)_30%,transparent)] tabular-nums"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </Phone>
      </div>
      <figcaption className={`col-span-12 md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
        <ol className="border-t border-(--cs-line)">
          {notes.map((n, i) => (
            <li
              key={n.title}
              className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-(--cs-line) py-6"
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
            >
              <span className="grid size-7 place-items-center rounded-full border border-(--cs-accent) text-[0.75rem] font-semibold text-(--cs-accent) tabular-nums">
                {i + 1}
              </span>
              <span>
                <span className="cs-display block text-xl font-medium tracking-[-0.01em]">{n.title}</span>
                <span className="mt-2 block text-pretty text-(--cs-muted)">{n.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

/** A browser window around a page screenshot. */
export function Browser({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div aria-hidden className="browser-bar">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="browser-url">{url}</span>
        <span className="w-10" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
