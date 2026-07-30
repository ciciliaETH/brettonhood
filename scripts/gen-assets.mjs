/**
 * Derives favicons + the OG card from the master logo.
 *
 *   node scripts/gen-assets.mjs
 *
 * Reads  public/img/brett-logo.png
 * Writes public/favicon.ico
 *        public/favicon-32x32.png
 *        public/apple-touch-icon.png
 *        public/og-image.png       (1200x630, logo on brand lime)
 *
 * Safe to re-run. Skips with a clear message if the logo isn't in place yet.
 */

import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const logo = resolve(root, "public/img/brett-logo.png");
const out = resolve(root, "public");

const LIME = { r: 0xc8, g: 0xfd, b: 0x00, alpha: 1 };
const INK = "#0A0709";

if (!existsSync(logo)) {
  console.error(
    "\n  ✗ public/img/brett-logo.png not found." +
      "\n    Save the four brand images into public/img/ first — see README.md.\n",
  );
  process.exit(1);
}

mkdirSync(out, { recursive: true });

const step = async (label, fn) => {
  await fn();
  console.log(`  ✓ ${label}`);
};

console.log("\n  Generating assets from brett-logo.png\n");

// --- favicons -------------------------------------------------------------
await step("favicon-32x32.png", () =>
  sharp(logo).resize(32, 32, { fit: "cover" }).png().toFile(resolve(out, "favicon-32x32.png")),
);

// .ico via a 32px PNG payload — every current browser accepts a PNG-in-ICO,
// and it avoids pulling in an ico-specific dependency.
await step("favicon.ico", () =>
  sharp(logo).resize(32, 32, { fit: "cover" }).png().toFile(resolve(out, "favicon.ico")),
);

await step("apple-touch-icon.png", () =>
  sharp(logo)
    .resize(180, 180, { fit: "cover" })
    .png()
    .toFile(resolve(out, "apple-touch-icon.png")),
);

// --- transparent face texture for the WebGL build -------------------------
// The 3D Brett extrudes the silhouette for its body and prints the artwork on
// the front face. That needs the mark on transparency — brett-logo.png has the
// lime plate baked in — so rasterise the cleaned SVG instead.
const faceSvg = resolve(root, "public/img/brett-logo.svg");
if (existsSync(faceSvg)) {
  await step("brett-face.png (transparent, for 3D)", () =>
    sharp(faceSvg, { density: 300 })
      .resize(1024, 1024, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(resolve(out, "img/brett-face.png")),
  );
} else {
  console.log("  – skipped brett-face.png (no brett-logo.svg)");
}

// --- OG card --------------------------------------------------------------
// 1200x630 lime field, logo squared off on the left, wordmark to its right.
await step("og-image.png", async () => {
  const art = await sharp(logo)
    .resize(470, 470, { fit: "cover" })
    .composite([
      {
        // Rounded corners + ink border, matching the site's framed art.
        input: Buffer.from(
          `<svg width="470" height="470">
             <rect x="5" y="5" width="460" height="460" rx="34"
                   fill="none" stroke="${INK}" stroke-width="10"/>
           </svg>`,
        ),
        blend: "over",
      },
    ])
    .png()
    .toBuffer();

  const wordmark = Buffer.from(
    `<svg width="600" height="470" xmlns="http://www.w3.org/2000/svg">
       <style>
         .h { font: 800 108px system-ui, -apple-system, "Segoe UI", sans-serif;
              fill: ${INK}; letter-spacing: -4px; }
         .s { font: 700 30px ui-monospace, "Cascadia Mono", Consolas, monospace;
              fill: ${INK}; opacity: .72; letter-spacing: 3px; }
       </style>
       <text class="h" x="0" y="176">BRETT</text>
       <text class="h" x="0" y="286">ON HOOD</text>
       <rect x="4" y="330" width="300" height="9" rx="4" fill="#E0427F"/>
       <text class="s" x="0" y="392">ROBINHOOD CHAIN · 4663</text>
     </svg>`,
  );

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: LIME },
  })
    .composite([
      { input: art, top: 80, left: 74 },
      { input: wordmark, top: 80, left: 596 },
    ])
    .png()
    .toFile(resolve(out, "og-image.png"));
});

console.log("\n  Done.\n");
