# Brett on Hood — landing page

Brett, in a suit, on **Robinhood Chain**.

Next.js 16 · React 19 · Tailwind v4 · Motion.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run gen:assets   # favicons + OG card from public/img/brett-logo.png
npm run build        # production build
```

---

## 🚀 Launch day: edit ONE file

Everything the site claims about the token lives in
[`lib/site-config.ts`](lib/site-config.ts). Fill in the `token` and `links`
objects and the site goes live — **no component changes needed.**

```ts
export const token = {
  ticker:      "$BRETT",     // keep the $
  contract:    "0x…",
  totalSupply: "1,000,000,000",
  buyTax:      "0%",
  sellTax:     "0%",
  liquidity:   "Locked",
  ownership:   "Renounced",
};

export const links = {
  dexscreener: "https://dexscreener.com/…",
  uniswap:     "https://app.uniswap.org/…",
  // …
};
```

Anything left as `TBA` is handled automatically: the ledger row greys out and
tags itself `soon`, buy/chart buttons render disabled, and the copy-contract
button refuses to copy the literal string `"TBA"` into someone's swap box.

---

## Artwork

Four PNGs in `public/img/` — exact names in
[`public/img/README.md`](public/img/README.md). Missing files degrade to
labelled placeholder blocks rather than breaking the layout.

> `brett-logo.png` currently ships as a **320×320 placeholder** taken from the
> Telegram avatar. Replace it with the 1600×1600 original.

---

## Design system

The palette is **sampled from the logo artwork**, not picked by eye — don't
"tidy up" these values:

| Token | Hex | Role |
|---|---|---|
| `--color-lime` | `#C8FD00` | brand primary, Act 1 + 3 ground |
| `--color-magenta` | `#E0427F` | accent — **large text and decoration only** |
| `--color-ink` | `#0A0709` | outlines, body text on lime |
| `--color-night` | `#12100F` | Act 2 ground |
| `--color-bone` | `#F5F1E6` | body text on night |
| `--color-brass` | `#C9A227` | Act 2 accent |

**Contrast rule:** magenta on lime is ~2.5:1. Fine for display type, never for
body copy. Body text on lime is always `--color-ink`.

Type: `Baloo 2` (lime-act display) · `Bevan` (dark-act slab) ·
`Space Grotesk` (body) · `Space Mono` (contract, numerals).

### The three acts

The page is built as three movements, and the seams between them are load-bearing:

| | Ground | Type | Sections |
|---|---|---|---|
| **Act 1** | lime, loud | Baloo 2 | Hero, ticker strips, Story |
| **Act 2** | night, cinematic | Bevan | Casino, Crew, Ledger, Getting In |
| **Act 3** | lime, playful | Baloo 2 | Roadmap, Meme wall, FAQ |

Torn-paper and sawtooth SVG dividers ([`components/ui/Divider.tsx`](components/ui/Divider.tsx))
join the acts. The tear points are deliberately irregular. Straight section
edges and a single flat palette are what make a page read as a template — the
tonal shift is the point, so keep it if you extend the page.

---

## Robinhood Chain

Network params in [`lib/chain.ts`](lib/chain.ts), verified against ChainList —
**do not edit from memory**:

- Chain ID **4663** (`0x1237`)
- Native currency **ETH** (gas is real ETH, not a points token)
- RPC `https://rpc.mainnet.chain.robinhood.com`
- Explorer `https://robinhoodchain.blockscout.com`
- Arbitrum Orbit L2, settles to Ethereum, launched 1 Jul 2026

`AddChainButton` fires EIP-3085 `wallet_addEthereumChain` with these values,
after first trying `wallet_switchEthereumChain` (wallets throw if you re-add a
known chain).

---

## Accessibility

- All motion is gated behind `prefers-reduced-motion` — both the CSS blanket
  rule in `globals.css` and `useReducedMotion()` in `Reveal`.
- The FAQ uses native `<details>`, so it works with JS disabled.
- Focus rings flip from magenta to lime inside `.act-dark` sections.
- Marquee duplicate strips are `aria-hidden` so the copy is announced once.

---

## Structure

```
app/
  layout.tsx      fonts, metadata, OG/Twitter cards
  page.tsx        act composition + dividers
  globals.css     design tokens, textures, keyframes
components/
  sections/       the 12 page sections
  ui/             Button, StickerCard, CopyPill, Marquee, Reveal,
                  FramedImage, Divider, AddChainButton, Icons
lib/
  site-config.ts  ← launch-day file
  chain.ts        verified Robinhood Chain params
scripts/
  gen-assets.mjs  favicon + OG generation
```
