/**
 * The official Brett mark.
 *
 * Rendered from /img/brett-logo.svg via <img> rather than inlined: the supplied
 * trace is 284 paths / ~198KB, so inlining it would bloat every page payload
 * that touches the logo. As a file it's cached once and reused everywhere.
 */

export type CrewTint = keyof typeof CREW_TINTS;

/**
 * Crew recolours. Filters keep the mark's exact geometry across the row while
 * shifting hue, so the crew reads as one family rather than four drawings.
 */
export const CREW_TINTS = {
  brett: "",
  dog: "hue-rotate(-30deg) saturate(1.35) brightness(1.04)",
  squatch: "hue-rotate(-48deg) saturate(0.62) brightness(0.7) sepia(0.28)",
  pepe: "hue-rotate(42deg) saturate(1.15) brightness(0.92)",
} as const;

interface Props {
  className?: string;
  tint?: CrewTint;
  alt?: string;
  /** Skips lazy-loading — use for the hero. */
  priority?: boolean;
}

export function BrettMark({ className = "", tint = "brett", alt = "", priority = false }: Props) {
  return (
    // Plain <img>: next/image can't optimise SVG anyway, and this keeps the
    // element cheap enough to stack inside the 3D build.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/img/brett-logo.svg"
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      draggable={false}
      className={className}
      style={CREW_TINTS[tint] ? { filter: CREW_TINTS[tint] } : undefined}
    />
  );
}
