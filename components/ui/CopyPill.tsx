"use client";

import { useEffect, useState } from "react";
import { isTBA } from "@/lib/site-config";

interface Props {
  value: string;
  label?: string;
  /** "lime" for lime acts, "dark" for the night acts. */
  tone?: "lime" | "dark";
  className?: string;
}

/**
 * Contract address pill with copy-to-clipboard.
 *
 * Pre-launch the contract is still TBA, so the button disables itself rather
 * than letting anyone copy the literal string "TBA" into a swap box.
 */
export function CopyPill({ value, label = "Contract", tone = "lime", className = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const pending = isTBA(value);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    if (pending) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context / permissions) — select instead
      // so the user can still copy manually.
      setCopied(false);
    }
  };

  const dark = tone === "dark";

  return (
    <div
      className={`inline-flex max-w-full items-stretch overflow-hidden rounded-xl border-[3px] border-ink ${
        dark ? "bg-night-soft" : "bg-lime-wash"
      } ${className}`}
    >
      <span
        className={`hidden shrink-0 items-center border-r-[3px] border-ink px-4 sm:flex ${
          dark ? "bg-lime text-ink" : "bg-ink text-lime"
        } eyebrow`}
      >
        {label}
      </span>

      <span
        className={`flex min-w-0 flex-1 items-center px-3 py-3 font-mono text-xs sm:text-sm ${
          dark ? "text-bone" : "text-ink"
        } ${pending ? "opacity-55" : ""}`}
      >
        <span className="truncate">{pending ? "TBA — dropping at launch" : value}</span>
      </span>

      <button
        type="button"
        onClick={copy}
        disabled={pending}
        aria-label={pending ? "Contract address not available yet" : `Copy ${label}`}
        className={`btn-press shrink-0 border-l-[3px] border-ink px-4 font-display text-sm font-extrabold uppercase ${
          pending
            ? // Flat, not translucent — an alpha fill over lime goes olive.
              dark
              ? "cursor-not-allowed bg-night text-bone-dim"
              : "cursor-not-allowed bg-lime text-ink/50"
            : copied
              ? "bg-magenta text-bone"
              : dark
                ? "bg-lime text-ink hover:bg-lime-wash"
                : "bg-ink text-lime hover:bg-magenta hover:text-bone"
        }`}
      >
        {pending ? "soon" : copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
