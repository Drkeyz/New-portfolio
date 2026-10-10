import { approach } from "@content/site";
import { FocusList } from "./motion/FocusList";
import { ScrollHighlight } from "./motion/ScrollHighlight";
import { SplitWords } from "./motion/SplitWords";

/**
 * Headline holds still (sticky) while the four principles pass through
 * focus one by one; then a pause, and the statement lights up word by word.
 */
export function Approach() {
  const s = approach.statement;
  return (
    <section aria-labelledby="approach-title" className="py-32 md:py-56">
      <div className="wrap grid-12 gap-y-16">
        <div className="col-span-12 md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="t-label mb-6 flex items-center gap-3 text-muted" data-reveal="fade">
              <span aria-hidden className="h-px w-8 bg-brass" />
              Approach
            </p>
            <h2 id="approach-title" className="t-display text-balance" data-reveal="words">
              <SplitWords text={approach.headline} />
            </h2>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7">
          <FocusList items={approach.principles} />
        </div>
      </div>

      <div className="wrap grid-12 mt-28 md:mt-64">
        <ScrollHighlight
          className="t-display col-span-12 text-balance md:col-span-10 md:col-start-2"
          text={`${s.lead} ${s.accent} ${s.tail}`}
          accent={[s.accent]}
        />
      </div>
    </section>
  );
}
