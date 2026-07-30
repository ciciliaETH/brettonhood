/**
 * ============================================================
 *  LAUNCH-DAY FILE — edit this, and only this.
 * ============================================================
 *
 * Everything the site says about the token lives here. Any value left as
 * TBA is detected at render time: the UI greys it out, tags it "soon", and
 * disables its copy/link affordance. Fill these in and the site goes live
 * with zero component changes.
 */

/** Sentinel for anything not announced yet. */
export const TBA = "TBA" as const;

export const isTBA = (v: string | number | undefined | null): boolean =>
  v === undefined || v === null || String(v).trim().toUpperCase() === "TBA" || String(v).trim() === "";

export const site = {
  name: "Brett on Hood",
  /** Used in <title> and the nav wordmark. */
  shortName: "BRETT ON HOOD",
  tagline: "Brett went legit. Brett moved to the hood.",
  description:
    "Brett on Hood — the legendary Matt Furie frog took his seat at the table on Robinhood Chain. Gas in ETH, chain ID 4663, zero tax.",
  /** Set this once you have the domain — used for canonical + OG URLs. */
  url: "https://brettonhood.com",
  locale: "en_US",
} as const;

export const token = {
  /** e.g. "$BRETT" — keep the $ in. */
  ticker: "$BRETT" as string,
  /** Full contract address, 0x… */
  contract: "0x76A0355d6b8B0D549a0838EC652EB487097049bE" as string,
  totalSupply: TBA as string,
  buyTax: TBA as string,
  sellTax: TBA as string,
  /** e.g. "Locked" / "Burned" */
  liquidity: TBA as string,
  /** e.g. "Renounced" */
  ownership: TBA as string,
} as const;

export const links = {
  telegram: "https://t.me/brettonhood",
  twitter: "https://x.com/bretton_hood",
  /**
   * Chart + buy. The token launched on the Pons Family launchpad, whose pad
   * page serves as both chart and swap — so both point there until a
   * DEX-aggregator pair page exists.
   */
  dexscreener:
    "https://www.ponsfamily.com/launchpad/0x76A0355d6b8B0D549a0838EC652EB487097049bE" as string,
  uniswap:
    "https://www.ponsfamily.com/launchpad/0x76A0355d6b8B0D549a0838EC652EB487097049bE" as string,
  /** Canonical Arbitrum bridge — how ETH gets onto Robinhood Chain. */
  bridge: "https://bridge.arbitrum.io",
} as const;

/** Nav + in-page anchors. Order matters. */
export const navLinks = [
  { label: "The Story", href: "#story" },
  { label: "The Crew", href: "#crew" },
  { label: "Getting In", href: "#getting-in" },
  { label: "Memes", href: "#memes" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Artwork. Files live in /public/img — see README for exact names. */
export const art = {
  logo: "/img/brett-logo.png",
  casino: "/img/brett-casino.png",
  peaky: "/img/brett-peaky.png",
  banner: "/img/brett-banner.png",
} as const;
