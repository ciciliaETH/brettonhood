# Brand artwork

Filenames are read from `lib/site-config.ts` (`art`), so they must match exactly.

| File | What it is | Source |
|---|---|---|
| `brett-logo.png` | HD square mark, 1254×1254 | supplied |
| `brett-logo.svg` | Vector mark, 284 paths, transparent | supplied trace, background plate stripped + viewBox added |
| `brett-banner.png` | 1500×500 banner | recovered from the Telegram channel |
| `brett-face.png` | 1024×1024 transparent render of the SVG | **generated** — `npm run gen:assets` |

`brett-face.png` is the texture printed on the front of the WebGL 3D Brett. It
has to be transparent, which is why it's rasterised from the SVG rather than
reusing `brett-logo.png` (that has the lime plate baked in). Don't hand-edit it —
regenerate it.

## Optional extras

These aren't required and nothing renders a placeholder without them, but if you
add them the site can use the original artwork instead of vector stand-ins:

| File | Would be used for |
|---|---|
| `brett-casino.png` | the craps-table scene behind the "house always wins" band |
| `brett-peaky.png` | the flat-cap portrait in "Getting In" |

Right now both of those sections are built from the vector mark plus CSS/SVG
scenery, so they render correctly with no missing assets.

## Missing files don't break the layout

`components/ui/FramedImage.tsx` swaps any file it can't load for a labelled
dashed block of the same aspect ratio.

## After changing `brett-logo.png` or `brett-logo.svg`

```bash
npm run gen:assets
```

Regenerates `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`,
`og-image.png` and `brett-face.png`.
