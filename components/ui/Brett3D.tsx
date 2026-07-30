"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BrettMark, type CrewTint } from "./BrettMark";

/**
 * Brett in 3D — lazily mounted.
 *
 * three.js is ~600KB, so it must never sit in the initial bundle for a landing
 * page. It loads as its own chunk only once the mark is actually near the
 * viewport, behind the flat SVG which stays visible until WebGL is ready.
 */
const BrettGL = dynamic(() => import("./BrettGL").then((m) => ({ default: m.BrettGL })), {
  ssr: false,
});

interface Props {
  className?: string;
  /** Extrusion depth in the logo's own 1254-unit space. */
  depth?: number;
  tint?: CrewTint;
  priority?: boolean;
  alt?: string;
}

export function Brett3D({ className = "", depth = 130, tint = "brett", priority = false, alt = "" }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // Only pull in the WebGL chunk when the mark is about to be seen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // The crew tints are hue filters on the flat mark; the GL build is only used
  // for the untinted Brett, so tinted instances stay 2D by design.
  const use3D = near && tint === "brett";

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      {/* Flat mark: the poster frame, and the permanent fallback when WebGL is
          unavailable or the visitor prefers reduced motion. */}
      <BrettMark
        className={`h-full w-full transition-opacity duration-700 ${
          use3D && !reduced ? "opacity-0" : "opacity-100"
        }`}
        tint={tint}
        alt={alt}
        priority={priority}
      />

      {use3D && (
        <div className="absolute inset-0">
          <BrettGL className="h-full w-full" depth={depth} animate={!reduced} />
        </div>
      )}
    </div>
  );
}
