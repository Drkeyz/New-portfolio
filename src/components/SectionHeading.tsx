type Props = {
  id: string;
  title: string;
  intro?: string;
  /** Small label above the title, e.g. "Beyond the interface." */
  eyebrow?: string;
  className?: string;
  tone?: "light" | "dark";
};

/** Section title with a masked line reveal and an optional supporting line. */
export function SectionHeading({ id, title, intro, eyebrow, className = "", tone = "light" }: Props) {
  return (
    <header className={`grid-12 gap-y-6 ${className}`}>
      <div className="col-span-12 md:col-span-8">
        {eyebrow && (
          <p className="t-label mb-6 flex items-center gap-3" data-reveal="fade">
            <span aria-hidden className="h-px w-6 bg-brass" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="t-display mask-line" data-reveal="mask">
          <span className="line">{title}</span>
        </h2>
      </div>
      {intro && (
        <p
          className={`col-span-12 max-w-[34ch] self-end text-pretty md:col-span-4 ${tone === "dark" ? "text-muted-dark" : "text-muted"}`}
          data-reveal
          style={{ "--d": 3 } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
