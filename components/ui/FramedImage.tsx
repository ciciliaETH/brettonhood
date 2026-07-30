"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Shown in the placeholder if the file isn't in /public/img yet. */
  placeholderLabel?: string;
  sizes?: string;
  /** Applied to the <img> — used to crop a single artwork multiple ways. */
  style?: CSSProperties;
}

/**
 * Artwork wrapper that degrades gracefully.
 *
 * The brand art is dropped in by hand, so a missing file must not blow up the
 * layout — it renders a labelled lime/ink block of the exact same dimensions
 * instead. Lets the whole site be built and reviewed before the art lands.
 */
export function FramedImage({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  priority = false,
  placeholderLabel,
  sizes,
  style,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-lime-wash texture-halftone ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={alt}
      >
        <div className="border-[3px] border-dashed border-ink/50 bg-lime px-4 py-3 text-center">
          <p className="eyebrow text-ink/70">artwork pending</p>
          <p className="mt-1 font-mono text-[0.7rem] break-all text-ink/55">
            {placeholderLabel ?? src.replace("/img/", "")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      style={style}
      onError={() => setFailed(true)}
      className={`${className} ${imageClassName}`}
    />
  );
}
