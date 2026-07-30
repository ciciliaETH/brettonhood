"use client";

import { useState } from "react";
import { ROBINHOOD_CHAIN, addRobinhoodChain } from "@/lib/chain";

/**
 * One-click "add Robinhood Chain to your wallet".
 *
 * Fires EIP-3085 with the verified mainnet params (chain 4663, ETH gas).
 * Shows the failure reason inline — a dead button with no feedback is the
 * single most common way this pattern gets shipped broken.
 */
export function AddChainButton() {
  const [state, setState] = useState<"idle" | "pending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setState("pending");
    setError(null);

    const result = await addRobinhoodChain();

    if (result.ok) {
      setState("done");
    } else {
      setState("idle");
      setError(result.reason);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={state === "pending"}
        className="btn-press inline-flex items-center gap-2 rounded-lg border-[3px] border-lime bg-transparent px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-tight text-lime shadow-[4px_4px_0_var(--color-lime)] hover:bg-lime hover:text-ink active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:opacity-60"
      >
        {state === "done"
          ? "Network added ✓"
          : state === "pending"
            ? "Check your wallet…"
            : `Add ${ROBINHOOD_CHAIN.name}`}
      </button>

      {error && (
        <p role="alert" className="mt-2 max-w-xs font-mono text-[0.7rem] leading-relaxed text-magenta">
          {error}
        </p>
      )}

      <p className="mt-2 font-mono text-[0.7rem] text-bone-dim">
        Chain ID {ROBINHOOD_CHAIN.chainId} · gas in {ROBINHOOD_CHAIN.nativeCurrency.symbol}
      </p>
    </div>
  );
}
