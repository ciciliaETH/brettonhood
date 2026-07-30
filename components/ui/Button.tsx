import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "lime" | "ink" | "magenta" | "bone";

const variants: Record<Variant, string> = {
  // On a lime background the button must NOT be lime — invert it.
  lime: "bg-lime text-ink border-ink shadow-[6px_6px_0_var(--color-ink)] hover:bg-lime-wash",
  ink: "bg-ink text-lime border-ink shadow-[6px_6px_0_var(--color-magenta)] hover:text-lime-wash",
  magenta: "bg-magenta text-bone border-ink shadow-[6px_6px_0_var(--color-ink)] hover:bg-magenta-deep",
  bone: "bg-bone text-ink border-ink shadow-[6px_6px_0_var(--color-magenta)] hover:bg-white",
};

const sizes = {
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg sm:text-xl",
} as const;

/**
 * Pending ("soon") state. Deliberately NOT opacity — a translucent magenta or
 * ink button over lime composites to a muddy olive that reads as a rendering
 * bug. This is a flat, intentional outlined treatment instead.
 */
const pendingStyle =
  "cursor-not-allowed border-dashed border-ink/45 bg-transparent text-ink/55 shadow-none " +
  "hover:translate-y-0 active:translate-x-0 active:translate-y-0";
const pendingStyleDark =
  "cursor-not-allowed border-dashed border-bone/30 bg-transparent text-bone/45 shadow-none " +
  "hover:translate-y-0 active:translate-x-0 active:translate-y-0";

interface Props {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  disabled?: boolean;
  className?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  /** Switches the pending treatment to the light-on-dark variant. */
  onDark?: boolean;
}

/**
 * Chunky button that physically presses into its own shadow on click.
 * The press is the whole point — soft hover fades read as generated.
 */
export function Button({
  children,
  href,
  variant = "ink",
  size = "md",
  disabled = false,
  className = "",
  external = false,
  onClick,
  ariaLabel,
  onDark = false,
}: Props) {
  const base = [
    "btn-press inline-flex items-center justify-center gap-2",
    "border-[3px] rounded-xl font-display font-extrabold uppercase tracking-tight",
    "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
    "hover:-translate-y-[2px]",
    sizes[size],
    // Skip the variant paint entirely when pending, so nothing composites.
    disabled ? (onDark ? pendingStyleDark : pendingStyle) : variants[variant],
    className,
  ].join(" ");

  if (disabled || !href) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={base}
      >
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={base}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={base}>
      {children}
    </Link>
  );
}
