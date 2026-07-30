interface Props {
  items: string[];
  /** Scroll direction. Two strips running opposite ways reads as designed. */
  reverse?: boolean;
  rotate?: number;
  className?: string;
  separator?: string;
}

/**
 * Infinite ticker strip.
 *
 * The track holds the item list twice and translates -50%, which is what
 * makes the loop seamless. Duplicated half is aria-hidden so screen readers
 * hear the copy exactly once.
 */
export function Marquee({
  items,
  reverse = false,
  rotate = 0,
  className = "",
  separator = "◆",
}: Props) {
  const strip = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-5 font-mono text-sm font-bold tracking-[0.2em] uppercase sm:text-base">
            {item}
          </span>
          <span aria-hidden className="text-magenta">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`group relative w-screen overflow-hidden border-y-[3px] border-ink bg-ink py-3 text-lime ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <div
        className={`flex w-max ${
          reverse ? "animate-[marquee-rev_38s_linear_infinite]" : "animate-[marquee_38s_linear_infinite]"
        } group-hover:[animation-play-state:paused]`}
      >
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
