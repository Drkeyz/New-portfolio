"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Media } from "./Media";
import { announcePlay, onOtherPlay } from "./StageListen";

type Release = {
  title: string;
  artist: string;
  href: string;
  artwork: string | null;
  audio: string | null;
};

/**
 * Minimal player: artwork, title, play/pause, release link. Never autoplays.
 * With no audio file it becomes a link out to the release page.
 */
export function MusicPlayer({ release }: { release: Release }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const id = useId();

  // Only one sound on the page at a time.
  useEffect(
    () =>
      onOtherPlay(id, () => {
        audioRef.current?.pause();
        setPlaying(false);
      }),
    [id],
  );

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      announcePlay(id);
      void a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const buttonClass =
    "flex size-14 shrink-0 items-center justify-center rounded-full border border-brass text-brass transition-[transform,background-color,color] duration-500 ease-rhythm hover:scale-105 hover:bg-brass hover:text-stage";

  return (
    <div className="grid grid-cols-[minmax(0,7rem)_1fr] items-center gap-5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
      <Media
        media={{
          src: release.artwork,
          alt: `${release.title} cover art`,
          width: 1000,
          height: 1000,
          label: "Cover art",
        }}
        sizes="160px"
        bg="#17171A"
        fg="#F5F5F2"
      />

      <div className="min-w-0">
        <p className="t-label text-muted-dark">Latest release</p>
        <p className="t-sub mt-2 truncate">{release.title}</p>
        <p className="text-muted-dark">{release.artist}</p>

        <div className="mt-5 flex items-center gap-5">
          {release.audio ? (
            <>
              <audio ref={audioRef} src={release.audio} preload="none" />
              <button
                type="button"
                onClick={toggle}
                aria-pressed={playing}
                aria-label={`${playing ? "Pause" : "Play"} ${release.title} by ${release.artist}`}
                className={buttonClass}
                data-cursor="Play music"
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="h-px flex-1 bg-white/15" aria-hidden>
                <div className="h-px origin-left bg-brass" style={{ transform: `scaleX(${progress})` }} />
              </div>
              <a
                href={release.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[0.9375rem] text-muted-dark hover:text-snow"
              >
                Release <span aria-hidden>↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : (
            // No audio file yet: the play button becomes a link out to the release.
            <a
              href={release.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border border-brass px-6 text-[0.95rem] text-brass transition-colors duration-500 ease-rhythm hover:bg-brass hover:text-stage"
              data-cursor="Play music"
            >
              <PlayIcon />
              Listen on Fanlink <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg aria-hidden width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
      <path d="M0 0L14 8L0 16V0Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg aria-hidden width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
      <rect width="4" height="16" />
      <rect x="10" width="4" height="16" />
    </svg>
  );
}
