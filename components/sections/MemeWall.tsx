import { FramedImage } from "@/components/ui/FramedImage";
import { Reveal } from "@/components/ui/Reveal";
import { ScribbleUnderline } from "@/components/ui/Divider";
import { BrettMark } from "@/components/ui/BrettMark";
import { TelegramIcon } from "@/components/ui/Icons";
import { art, links } from "@/lib/site-config";

/**
 * Sticker wall.
 *
 * Rotations are hand-picked and uneven — an even sequence (-3, -1, 1, 3) is a
 * giveaway that a machine laid it out. The vector card offers the SVG, which is
 * the asset people actually want for edits and print.
 */
const raster = [
  { src: art.logo, alt: "Brett on Hood logo", file: "brett-logo.png", rotate: -3.2, label: "The face" },
  { src: art.banner, alt: "Brett on Hood banner", file: "brett-banner.png", rotate: 2.1, label: "The banner" },
];

export function MemeWall() {
  return (
    <section id="memes" className="grain relative overflow-hidden bg-lime-wash py-20 sm:py-28">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ink/60">Ammunition</p>
          <h2 className="display-xl mt-3 text-[13vw] text-ink sm:text-6xl lg:text-7xl">
            Meme wall
          </h2>
          <ScribbleUnderline className="mt-1 h-5 max-w-[14rem]" />
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Take them. Post them. A memecoin that doesn&apos;t get posted doesn&apos;t exist.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {raster.map((sticker, i) => (
            <li key={sticker.file}>
              <Reveal delay={i * 0.07}>
                <figure
                  style={{ rotate: `${sticker.rotate}deg` }}
                  className="group h-full overflow-hidden rounded-2xl border-[3px] border-ink bg-lime shadow-[9px_9px_0_var(--color-ink)] transition-[rotate,translate,box-shadow] duration-200 ease-out hover:rotate-0 hover:-translate-y-2 hover:shadow-[13px_13px_0_var(--color-magenta)]"
                >
                  <div className="aspect-square overflow-hidden border-b-[3px] border-ink bg-lime-wash">
                    <FramedImage
                      src={sticker.src}
                      alt={sticker.alt}
                      width={800}
                      height={800}
                      sizes="(max-width: 1024px) 45vw, 260px"
                      className="h-full w-full"
                      imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      placeholderLabel={sticker.file}
                    />
                  </div>
                  <Caption label={sticker.label} href={sticker.src} />
                </figure>
              </Reveal>
            </li>
          ))}

          {/* Vector stickers — always render, scale forever */}
          <li>
            <Reveal delay={0.14}>
              <figure className="group h-full overflow-hidden rounded-2xl border-[3px] border-ink bg-lime shadow-[9px_9px_0_var(--color-ink)] transition-[rotate,translate,box-shadow] duration-200 ease-out [rotate:-1.4deg] hover:rotate-0 hover:-translate-y-2 hover:shadow-[13px_13px_0_var(--color-magenta)]">
                <div className="aspect-square overflow-hidden border-b-[3px] border-ink bg-lime-wash">
                  <BrettMark
                    alt="Brett on Hood vector mark"
                    className="h-full w-full p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Caption label="Vector · SVG" href="/img/brett-logo.svg" />
              </figure>
            </Reveal>
          </li>

          {/* Bring-your-own card */}
          <li>
            <Reveal delay={0.21}>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed border-ink bg-lime px-5 py-10 text-center shadow-[9px_9px_0_var(--color-ink)] transition-[rotate,translate,box-shadow] duration-200 ease-out [rotate:1.8deg] hover:rotate-0 hover:-translate-y-2 hover:border-solid hover:shadow-[13px_13px_0_var(--color-magenta)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl border-[3px] border-ink bg-ink text-lime">
                  <TelegramIcon className="h-6 w-6" />
                </span>
                <span className="font-display text-xl font-extrabold uppercase leading-tight text-ink">
                  Bring your
                  <br />
                  own
                </span>
                <span className="font-mono text-[0.66rem] uppercase tracking-widest text-ink/60">
                  good ones get pinned
                </span>
              </a>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Caption({ label, href }: { label: string; href?: string }) {
  return (
    <figcaption className="flex items-center justify-between gap-2 px-3.5 py-3">
      <span className="font-display text-sm font-extrabold uppercase text-ink sm:text-base">
        {label}
      </span>
      {href && (
        <a
          href={href}
          download
          aria-label={`Download ${label}`}
          className="btn-press shrink-0 rounded-md border-2 border-ink bg-ink px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-lime hover:bg-magenta hover:text-bone active:translate-x-[2px] active:translate-y-[2px]"
        >
          save
        </a>
      )}
    </figcaption>
  );
}
