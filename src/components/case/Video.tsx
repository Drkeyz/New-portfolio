"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type VideoSource = {
  /** A file under /public, e.g. "/video/juncta-walkthrough.mp4". */
  src?: string | null;
  /** Or an embeddable player URL (YouTube / Vimeo / Loom embed link). */
  embed?: string | null;
  /** WebVTT captions for a self-hosted file. */
  captions?: string | null;
  title: string;
  /** e.g. "1:42" */
  duration?: string | null;
  /** The video's own proportions, so it plays without letterboxing. */
  width?: number;
  height?: number;
};

/**
 * Poster first; the video only loads when someone presses play (never
 * autoplays). With no source yet, it's simply the poster image.
 */
export function Video({
  video,
  poster,
  sizes,
  priority,
}: {
  video?: VideoSource;
  poster: { src: string; width: number; height: number; alt: string };
  sizes: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(video?.src || video?.embed);
  const ratio = `${poster.width} / ${poster.height}`;

  // A vertical (phone) recording plays phone-sized, centred over a blurred copy
  // of the poster, so the frame keeps the hero's shape.
  const portrait = Boolean(video?.width && video?.height && video.height > video.width);
  if (playing && video && portrait && video.src) {
    return (
      <div className="screen" style={{ aspectRatio: ratio }}>
        <Image src={poster.src} alt="" aria-hidden fill sizes="50vw" className="scale-110 object-cover blur-2xl brightness-75" />
        <video
            ref={ref}
            src={video.src}
            controls
            autoPlay
            playsInline
            className="absolute left-1/2 top-[4%] h-[92%] w-auto -translate-x-1/2 rounded-[clamp(12px,2.4vw,32px)] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            style={{ aspectRatio: `${video.width} / ${video.height}` }}
            aria-label={video.title}
          >
            {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
          </video>
      </div>
    );
  }

  if (playing && video) {
    return (
      <div className="screen" style={{ aspectRatio: video.width && video.height ? `${video.width} / ${video.height}` : ratio }}>
        {video.embed ? (
          <iframe
            src={video.embed}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <video
            ref={ref}
            src={video.src ?? undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full bg-black object-contain"
            aria-label={video.title}
          >
            {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
          </video>
        )}
      </div>
    );
  }

  return (
    <div className="screen group">
      <Image {...poster} sizes={sizes} priority={priority} className="clip-zoom h-auto w-full" />
      {hasVideo && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-4 bg-black/35 transition-colors duration-500 hover:bg-black/20"
          data-cursor="Play"
          aria-label={`Play ${video?.title ?? "video"}${video?.duration ? `, ${video.duration}` : ""}`}
        >
          {/* Play button, dead centre. */}
          <span className="relative grid size-20 place-items-center rounded-full bg-(--cs-accent) text-(--cs-bg) shadow-[0_0_0_10px_rgba(23,207,170,0.18)] transition-transform duration-500 ease-rhythm group-hover:scale-110 md:size-28">
            <svg aria-hidden width="26" height="30" viewBox="0 0 14 16" fill="currentColor" className="ml-1.5 md:scale-125">
              <path d="M0 0L14 8L0 16V0Z" />
            </svg>
          </span>
          <span aria-hidden className="t-label rounded-full bg-black/70 px-3 py-1.5 text-white">
            Watch the walkthrough{video?.duration ? ` · ${video.duration}` : ""}
          </span>
        </button>
      )}
    </div>
  );
}
