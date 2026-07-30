# Brand artwork — drop the four files here

Filenames must match **exactly**. The site reads them from `lib/site-config.ts`.

| Filename | What it is | Ideal size |
|---|---|---|
| `brett-logo.png` | Square Brett-head PFP on lime | 1600×1600 |
| `brett-casino.png` | Tuxedo Brett at the craps table with the crew | 1600×1600 |
| `brett-peaky.png` | Peaky Blinders Brett, flat cap, Robinhood feather pin | 1600×1600 |
| `brett-banner.png` | The "Brett" script banner | 1500×500 |

## ⚠️ `brett-logo.png` is currently a 320×320 placeholder

It was pulled from the Telegram channel avatar so the site renders and the OG
card generates before the real art lands. **Replace it with the 1600×1600
original** — at 320px it will look soft in the hero.

## Missing files don't break anything

Any file that isn't here renders as a labelled dashed placeholder block of the
correct aspect ratio (see `components/ui/FramedImage.tsx`), so you can build and
review the whole page before the art is final.

## After adding or replacing files

```bash
npm run gen:assets
```

Regenerates `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` and
`og-image.png` from `brett-logo.png`.
