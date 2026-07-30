/**
 * Torn-paper and zigzag section seams.
 *
 * Straight section edges are the giveaway of a template. These are irregular
 * SVG paths — the tear points are deliberately uneven, not a repeating unit.
 */

interface DividerProps {
  /** Colour the tear paints in — i.e. the colour of the section BELOW. */
  fill: string;
  className?: string;
  flip?: boolean;
}

/** Ragged torn-paper edge. Lime → night and back. */
export function TornDivider({ fill, className = "", flip = false }: DividerProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative z-20 -mt-px w-full leading-[0] ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-[28px] w-full sm:h-[42px]"
      >
        <path
          d="M0,20 L38,9 L74,24 L119,6 L163,22 L214,11 L252,27 L301,13 L338,3 L389,21 L437,8 L481,25 L536,12 L578,29 L627,15 L668,4 L717,23 L761,10 L812,26 L857,13 L903,30 L948,17 L991,5 L1042,22 L1086,9 L1133,27 L1178,14 L1224,31 L1268,18 L1311,6 L1358,23 L1400,11 L1440,26 L1440,48 L0,48 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/** Sharper sawtooth — used going back up into the lime. */
export function ZigZagDivider({ fill, className = "" }: DividerProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative z-20 -mt-px w-full leading-[0] ${className}`}
    >
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="block h-[24px] w-full sm:h-[36px]"
      >
        <path
          d="M0,32 L48,8 L96,30 L144,6 L192,28 L240,10 L288,32 L336,7 L384,29 L432,11 L480,31 L528,9 L576,27 L624,5 L672,30 L720,12 L768,33 L816,8 L864,28 L912,10 L960,31 L1008,6 L1056,29 L1104,11 L1152,32 L1200,9 L1248,27 L1296,7 L1344,30 L1392,12 L1440,28 L1440,40 L0,40 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/**
 * Hand-drawn underline. Two overlapping wobbly strokes, because a single
 * clean curve looks vector-perfect and therefore machine-made.
 */
export function ScribbleUnderline({
  className = "",
  color = "var(--color-magenta)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
    >
      <path
        d="M4,15 C46,7 92,19 138,11 C184,4 232,17 296,9"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M10,20 C58,14 104,23 152,16 C200,10 246,21 292,15"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
