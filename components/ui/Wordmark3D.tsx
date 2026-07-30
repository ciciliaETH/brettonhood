"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface Props {
  lines: string[];
  className?: string;
  /** Number of extrusion copies. */
  layers?: number;
  /** Z gap between copies, in px. */
  gap?: number;
}

/**
 * Extruded 3D wordmark for the footer.
 *
 * Real CSS 3D rather than a text-shadow fake: the same text is stacked along Z
 * inside a preserve-3d container, so the depth is genuine geometry that shifts
 * correctly as the block rotates. Back copies are solid and progressively
 * darker (they're the sides of the letters); only the front copy is outlined.
 *
 * Rotation is driven by scroll progress through the footer plus a slow idle
 * sway, so the type turns as you arrive rather than spinning on a fixed loop.
 */
export function Wordmark3D({ lines, className = "", layers = 12, gap = 5 }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), {
      rootMargin: "120px",
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  // Scroll-linked tilt + idle sway, written straight to the transform so React
  // never re-renders 12 stacked text layers on scroll.
  useEffect(() => {
    if (reduced || !visible) return;
    const host = hostRef.current;
    const inner = innerRef.current;
    if (!host || !inner) return;

    let raf = 0;
    let t = 0;
    let stop = false;

    const frame = () => {
      if (stop) return;
      t += 0.01;

      const r = host.getBoundingClientRect();
      // 0 as the block enters from the bottom, 1 once it's fully up the screen.
      const p = Math.max(0, Math.min(1, 1 - (r.top + r.height * 0.35) / window.innerHeight));

      const rotX = 26 - p * 22 + Math.sin(t * 0.7) * 1.6;
      const rotY = Math.sin(t * 0.45) * 7 + (p - 0.5) * 5;
      const rotZ = Math.sin(t * 0.33) * 0.7;

      inner.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2,
      )}deg) rotateZ(${rotZ.toFixed(2)}deg)`;

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
    };
  }, [reduced, visible]);

  const text = lines.map((l, i) => (
    <span key={i} className="block">
      {l}
    </span>
  ));

  if (reduced) {
    return (
      <div aria-hidden className={className}>
        <p className="display-xl w-full text-center leading-[0.78] text-transparent [-webkit-text-stroke:2px_rgba(200,253,0,0.22)]">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`[perspective:900px] [perspective-origin:50%_40%] ${className}`}
    >
      <div
        ref={innerRef}
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(26deg)",
          willChange: "transform",
        }}
      >
        {/* Extrusion: the letter sides. Darkest at the back. */}
        {Array.from({ length: layers }, (_, i) => {
          const t = i / Math.max(1, layers - 1);
          return (
            <p
              key={i}
              className="display-xl absolute inset-x-0 top-0 w-full text-center leading-[0.78] select-none"
              style={{
                transform: `translateZ(${-(layers - i) * gap}px)`,
                // Hue pushed off the lime's 72° toward true green and
                // desaturated: a dark, high-saturation 72° goes olive, which is
                // the exact muddy cast the brand is avoiding.
                color: `hsl(96 38% ${9 + t * 13}%)`,
              }}
            >
              {text}
            </p>
          );
        })}

        {/* Front face — outlined, so the lime reads as an edge light rather than
            a muddy low-alpha fill over the dark ground. */}
        <p
          className="display-xl relative w-full text-center leading-[0.78] text-transparent select-none [-webkit-text-stroke:2px_rgba(200,253,0,0.5)]"
          style={{ transform: `translateZ(${gap}px)` }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
