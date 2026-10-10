"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const EVENT = "stage-audio";

/** Every player announces when it starts, so only one sound plays at a time. */
export function announcePlay(id: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}
export function onOtherPlay(id: string, stop: () => void) {
  const handler = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== id) stop();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * "Listen" over a stage photograph: a soft performance that plays only when
 * asked. The sound fades in and out, stops when the photo leaves the screen
 * or another sound starts, and draws its own waveform across the foot of the
 * image while it plays (brass, from the live signal).
 * Never autoplays. With no recording yet it renders nothing in production
 * and a clearly marked placeholder in development.
 */
export function StageListen({
  src,
  instrument,
  title,
  available,
}: {
  src: string;
  instrument: string;
  title: string;
  /** Who's playing; shown under the photo by the caller. */
  credit?: string;
  /** Whether the recording exists (checked at build time). */
  available: boolean;
}) {
  const id = useId();
  const audio = useRef<HTMLAudioElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const graph = useRef<{ ctx: AudioContext; gain: GainNode; analyser: AnalyserNode } | null>(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState<string | null>(null);

  const setPlay = (v: boolean) => {
    playingRef.current = v;
    setPlaying(v);
  };

  const fadeTo = (value: number, seconds: number) => {
    const g = graph.current;
    if (!g) return;
    const t = g.ctx.currentTime;
    g.gain.gain.cancelScheduledValues(t);
    g.gain.gain.setValueAtTime(g.gain.gain.value, t);
    g.gain.gain.linearRampToValueAtTime(value, t + seconds);
  };

  const stop = useCallback((seconds = 0.6) => {
    const a = audio.current;
    if (!a || a.paused) return setPlay(false);
    setPlay(false);
    if (!graph.current) return a.pause();
    fadeTo(0, seconds);
    window.setTimeout(() => {
      if (!playingRef.current) a.pause();
    }, seconds * 1000 + 60);
  }, []);

  const start = async () => {
    const a = audio.current;
    if (!a) return;
    // The audio graph can only be built after a user gesture.
    if (!graph.current) {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(a);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(gain).connect(analyser).connect(ctx.destination);
      graph.current = { ctx, gain, analyser };
    }
    await graph.current.ctx.resume();
    announcePlay(id);
    try {
      await a.play();
    } catch {
      return;
    }
    setPlay(true);
    fadeTo(0.85, 1.4);
  };

  // One sound at a time; stop when the photograph scrolls away.
  useEffect(() => onOtherPlay(id, () => stop()), [id, stop]);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && stop(1.2), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [stop]);

  // Progress + time.
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => {
      if (!a.duration) return;
      setProgress(a.currentTime / a.duration);
      setTime(fmt(Math.max(0, a.duration - a.currentTime)));
    };
    const onMeta = () => a.duration && setTime(fmt(a.duration));
    const onEnd = () => {
      setPlay(false);
      setProgress(0);
      onMeta();
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  // Waveform: drawn from the live signal while playing, then settles flat.
  useEffect(() => {
    const c = canvas.current;
    if (!c || !playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx2d = c.getContext("2d");
    const g = graph.current;
    if (!ctx2d || !g) return;
    const data = new Uint8Array(g.analyser.fftSize);
    let frame = 0;
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = (c.width = c.clientWidth * dpr);
      const h = (c.height = c.clientHeight * dpr);
      g.analyser.getByteTimeDomainData(data);
      ctx2d.clearRect(0, 0, w, h);
      ctx2d.lineWidth = 1.5 * dpr;
      ctx2d.strokeStyle = "rgba(200, 155, 60, 0.95)";
      ctx2d.beginPath();
      const step = data.length / w;
      for (let x = 0; x < w; x++) {
        // Soft taper at both ends, so the line grows out of the frame edges.
        const edge = Math.sin((x / w) * Math.PI);
        const v = (data[Math.floor(x * step)] - 128) / 128;
        const y = h / 2 + v * (h / 2) * 0.9 * edge;
        if (x) ctx2d.lineTo(x, y);
        else ctx2d.moveTo(x, y);
      }
      ctx2d.stroke();
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  if (!available) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="absolute bottom-4 left-4 z-10 border border-dashed border-brass bg-stage/90 px-3 py-2 text-[0.8125rem] text-brass md:bottom-6 md:left-6">
        [MEDIA] Add {src} to enable “Listen”
      </div>
    );
  }

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 z-10">
      <audio ref={audio} src={src} preload="none" />

      {/* Foot of the photo: a scrim for the control, and the waveform while playing. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stage/85 to-transparent" />
      <canvas
        ref={canvas}
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-20 w-full transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
      />

      <button
        type="button"
        onClick={() => (playing ? stop() : start())}
        aria-pressed={playing}
        aria-label={`${playing ? "Pause" : "Play"} ${title}, soft ${instrument.toLowerCase()}`}
        data-cursor={playing ? "Pause" : "Listen"}
        className="group pointer-events-auto absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-stage py-1.5 pl-1.5 pr-5 text-snow ring-1 ring-brass/40 transition-[box-shadow] duration-500 hover:ring-brass md:bottom-6 md:left-6"
      >
        <span className="relative grid size-12 shrink-0 place-items-center">
          {/* Progress ring */}
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(200,155,60,0.25)" strokeWidth="1.5" />
            <circle
              cx="24"
              cy="24"
              r={R}
              fill="none"
              stroke="#C89B3C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress)}
            />
          </svg>
          <span className="grid size-9 place-items-center rounded-full bg-brass text-stage transition-transform duration-500 ease-rhythm group-hover:scale-105">
            {playing ? (
              <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <rect width="3" height="12" />
                <rect x="7" width="3" height="12" />
              </svg>
            ) : (
              <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="ml-0.5">
                <path d="M0 0L10 6L0 12V0Z" />
              </svg>
            )}
          </span>
        </span>
        <span className="text-left leading-tight">
          <span className="t-label block text-[0.625rem] text-brass">{playing ? "Now playing" : "Listen"}</span>
          <span className="mt-1 block text-[0.9375rem]">
            {title}
            <span className="text-muted-dark"> · {instrument}</span>
            {time && <span className="ml-1 tabular-nums text-muted-dark"> {time}</span>}
          </span>
        </span>
      </button>
    </div>
  );
}
