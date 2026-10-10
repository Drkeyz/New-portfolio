import Image from "next/image";
import type { Media as MediaType } from "@content/projects";

type Props = {
  media: MediaType;
  sizes: string;
  className?: string;
  /** Background and text colour for the placeholder (and the loading background for real images). */
  bg?: string;
  fg?: string;
  priority?: boolean;
  /** Fill the parent instead of keeping an aspect ratio. */
  fill?: boolean;
  /** Aspect ratio of the frame when it differs from the media (e.g. a matted cover). */
  ratio?: string;
  imgClassName?: string;
};

/**
 * Three modes:
 * - `media.src` + `media.matte`: the image sits at (at most) its native size,
 *   centred on a panel of the matte colour. For covers that are too small to
 *   fill their slot — never upscaled.
 * - `media.src`: the image fills the frame (object-cover).
 * - no src: a labelled [MEDIA] placeholder at the same aspect ratio.
 */
export function Media({
  media,
  sizes,
  className = "",
  bg = "#E6E6E1",
  fg = "#0E0E0E",
  priority,
  fill,
  ratio,
  imgClassName = "",
}: Props) {
  const aspect = fill ? {} : { aspectRatio: ratio ?? `${media.width} / ${media.height}` };

  if (media.src && media.matte) {
    return (
      <div
        className={`relative grid place-items-center overflow-hidden ${className}`}
        style={{ backgroundColor: media.matte, ...aspect }}
      >
        <div className={`relative ${imgClassName}`} style={{ width: `min(${media.width}px, ${media.inset ?? 88}%)` }}>
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={media.width > 1000 ? sizes : `${media.width}px`}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      </div>
    );
  }

  if (media.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: bg, ...aspect }}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${media.alt} (image coming soon)`}
      className={`@container relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg, color: fg, ...aspect }}
    >
      <div className={`absolute inset-0 ${imgClassName}`}>
        {/* Quiet construction lines so the placeholder reads as "frame", not "broken". */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
          <span className="t-label text-[0.625rem] opacity-80 @[18rem]:text-[0.75rem]">[MEDIA] {media.label}</span>
          <span className="t-label hidden tabular-nums opacity-80 @[18rem]:inline">
            {media.width}×{media.height}
          </span>
        </div>
      </div>
    </div>
  );
}
