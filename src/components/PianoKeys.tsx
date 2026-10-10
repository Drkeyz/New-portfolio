"use client";

import { toggleSound, useSound } from "./piano/store";

/**
 * Footer sound toggle. The piano itself (keys + A–K) lives in the floating
 * dock (piano/PianoDock), shared with the nav button and the Creative invite.
 */
export function PianoKeys() {
  const on = useSound();
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={toggleSound}
      className="link-underline inline-flex min-h-11 items-center gap-2 text-[0.875rem] text-muted hover:text-ink"
    >
      <span aria-hidden className={`size-1.5 rounded-full ${on ? "bg-brass" : "border border-line"}`} />
      {on ? "Sound on" : "Sound off · play a little piano"}
    </button>
  );
}
