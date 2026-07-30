import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Rest rotation in degrees. Vary it per card — uniform tilt looks scripted. */
  rotate?: number;
  tone?: "lime" | "bone" | "magenta" | "night";
  className?: string;
  /** Lift and straighten on hover. */
  interactive?: boolean;
}

const tones = {
  lime: "bg-lime border-ink text-ink shadow-[10px_10px_0_var(--color-ink)]",
  bone: "bg-bone border-ink text-ink shadow-[10px_10px_0_var(--color-ink)]",
  magenta: "bg-magenta border-ink text-bone shadow-[10px_10px_0_var(--color-ink)]",
  night: "bg-night-soft border-lime text-bone shadow-[10px_10px_0_var(--color-lime)]",
} as const;

/**
 * A card that sits on the page like a stuck-on sticker: hard border, hard
 * offset shadow, slightly rotated. Hover straightens and lifts it.
 */
export function StickerCard({
  children,
  rotate = 0,
  tone = "lime",
  className = "",
  interactive = true,
}: Props) {
  return (
    <div
      style={{ rotate: `${rotate}deg` }}
      className={[
        "rounded-2xl border-[3px] p-6 sm:p-7",
        tones[tone],
        interactive
          ? "transition-[rotate,translate,box-shadow] duration-200 ease-out hover:rotate-0 hover:-translate-y-1.5"
          : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
