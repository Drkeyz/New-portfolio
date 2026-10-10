"use client";

import { useSyncExternalStore } from "react";

/**
 * One piano for the whole site. The nav button, the Creative invitation, the
 * footer toggle and the floating dock all share this state, and there is a
 * single AudioContext (created inside the click that turns sound on, so
 * browsers allow it).
 */

// Home row A S D F G H J K → C major scale, C4 to C5.
export const KEYS: { key: string; note: string; freq: number }[] = [
  { key: "a", note: "C", freq: 261.63 },
  { key: "s", note: "D", freq: 293.66 },
  { key: "d", note: "E", freq: 329.63 },
  { key: "f", note: "F", freq: 349.23 },
  { key: "g", note: "G", freq: 392.0 },
  { key: "h", note: "A", freq: 440.0 },
  { key: "j", note: "B", freq: 493.88 },
  { key: "k", note: "C", freq: 523.25 },
];

let on = false;
let ctx: AudioContext | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function play(freq: number, when = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + when;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.14, t + 0.008);
  out.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
  // A little warmth: a low-pass that closes as the note decays.
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(freq * 6, t);
  tone.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 1.5);
  tone.connect(out).connect(ctx.destination);
  // Fundamental + soft overtones: piano-ish, bell-like.
  (
    [
      [freq, "triangle", 1],
      [freq * 2, "sine", 0.28],
      [freq * 3, "sine", 0.08],
    ] as const
  ).forEach(([f, type, level]) => {
    const osc = ctx!.createOscillator();
    const g = ctx!.createGain();
    osc.type = type;
    osc.frequency.value = f;
    g.gain.value = level;
    osc.connect(g).connect(tone);
    osc.start(t);
    osc.stop(t + 2.3);
  });
}

export function setSound(next: boolean) {
  if (next === on) return;
  if (next) {
    ctx ??= new AudioContext();
    void ctx.resume();
    // Confirmation chime: C – E – G – C.
    [0, 2, 4, 7].forEach((i, n) => play(KEYS[i].freq, n * 0.11));
  }
  on = next;
  emit();
}

export const toggleSound = () => setSound(!on);

export function useSound() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => on,
    () => false,
  );
}

/** Which key is lit (for the dock's visual feedback). */
let lit: string | null = null;
const litListeners = new Set<() => void>();
export function strike(k: (typeof KEYS)[number]) {
  play(k.freq);
  lit = k.key;
  litListeners.forEach((l) => l());
  window.setTimeout(() => {
    if (lit === k.key) {
      lit = null;
      litListeners.forEach((l) => l());
    }
  }, 180);
}
export function useLitKey() {
  return useSyncExternalStore(
    (l) => {
      litListeners.add(l);
      return () => litListeners.delete(l);
    },
    () => lit,
    () => null,
  );
}
