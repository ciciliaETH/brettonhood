/** Hand-rolled social + decorative marks. No icon library, no emoji. */

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.9 4.3 18.9 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.25.25-.45.45-.9.45l.32-4.6L18.2 7c.37-.33-.08-.5-.57-.18L7.3 13.3l-4.4-1.4c-.95-.3-.97-.95.2-1.4l17.2-6.6c.8-.3 1.5.18 1.24 1.4z" />
    </svg>
  );
}

export function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.63l-5.2-6.8-5.94 6.8H1.73l7.5-8.58L1.08 2.25h6.8l4.87 6.43 5.49-6.43zm-1.16 17.52h1.83L7.05 4.13H5.08l12 15.64z" />
    </svg>
  );
}

export function ChartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className={className}>
      <path d="M3 20h18" strokeLinecap="round" />
      <path d="M6 20V11m6 9V5m6 15v-6" strokeLinecap="round" />
    </svg>
  );
}

/** Four-point sparkle used as floating confetti in the lime acts. */
export function Sparkle({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 0l2.6 8.2L23 12l-8.4 3.8L12 24l-2.6-8.2L1 12l8.4-3.8z"
        fill="currentColor"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Die face — casino motif. */
export function Die({ className = "h-8 w-8", pips = 5 }: { className?: string; pips?: number }) {
  const layouts: Record<number, [number, number][]> = {
    1: [[12, 12]],
    2: [[7, 7], [17, 17]],
    3: [[7, 7], [12, 12], [17, 17]],
    4: [[7, 7], [17, 7], [7, 17], [17, 17]],
    5: [[7, 7], [17, 7], [12, 12], [7, 17], [17, 17]],
    6: [[7, 6], [17, 6], [7, 12], [17, 12], [7, 18], [17, 18]],
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2.2" />
      {(layouts[pips] ?? layouts[5]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="var(--color-ink)" />
      ))}
    </svg>
  );
}
