/**
 * Splits text into words, each in its own clip, for the
 * data-reveal="words" rise. Put data-reveal="words" on the parent.
 * `accent` words (exact match, punctuation included) get the serif italic;
 * `accentAt` picks words by position instead, for words that repeat.
 */
export function SplitWords({
  text,
  accent = [],
  accentAt,
  offset = 0,
}: {
  text: string;
  accent?: string[];
  accentAt?: number[];
  offset?: number;
}) {
  const words = text.split(" ");
  const isAccent = (w: string, i: number) => (accentAt ? accentAt.includes(i) : accent.includes(w));
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="w" style={{ "--i": i + offset } as React.CSSProperties}>
          <span className={isAccent(w, i) ? "t-accent" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
