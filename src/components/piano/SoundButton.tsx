"use client";

import { toggleSound, useSound } from "./store";

/** Speaker icon for the nav: always visible, turns the site's piano on and off. */
export function SoundButton({ className = "" }: { className?: string }) {
  const on = useSound();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={on}
      aria-label={on ? "Sound on: turn off the piano" : "Sound off: turn on the piano"}
      title={on ? "Sound on" : "Turn on sound and play a little piano"}
      className={`group relative flex size-11 items-center justify-center rounded-full ${className}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
        {on ? (
          <>
            <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
            <path d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
      {/* A brass dot pulses until the first time sound is turned on. */}
      {!on && (
        <span aria-hidden className="pointer-events-none absolute right-2 top-2 flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-brass opacity-60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-brass" />
        </span>
      )}
    </button>
  );
}

/** The Creative section's invitation. */
export function PlayInvite() {
  const on = useSound();
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={on}
      className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full border border-brass/60 py-2 pl-2 pr-5 text-left text-[0.95rem] transition-colors duration-500 hover:border-brass md:mt-14"
      data-cursor={on ? "Sound off" : "Play"}
    >
      <span aria-hidden className="flex h-8 items-end gap-[2px] rounded-full bg-brass px-2.5 pb-1.5 pt-1.5">
        {/* Three keys, as a tiny glyph of what's about to appear. */}
        <span className="h-full w-1.5 rounded-b-[1px] bg-coal/80" />
        <span className="h-full w-1.5 rounded-b-[1px] bg-coal/80" />
        <span className="h-full w-1.5 rounded-b-[1px] bg-coal/80" />
      </span>
      <span>
        <span className="block text-snow">{on ? "Piano on: play along below" : "Play along: turn on the piano"}</span>
        <span className="block text-[0.8125rem] text-muted-dark">{on ? "Tap the keys, or press A–K. Tap again to stop." : "Soft notes, at your fingertips. Sound plays only when you do."}</span>
      </span>
    </button>
  );
}
