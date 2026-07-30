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
 * giveaway that a machine laid it out. The banner gets its own full-width card
 * at its real 3:1 ratio: cropping a banner into a square tile mangles it, and
 * the mixed card sizes give the grid a composed rhythm.
 */
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

        {/* Square tiles */}
        <ul className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
          <li>
            <Reveal>
              <Card rotate={-3.2}>
                <div className="aspect-square overflow-hidden border-b-[3px] border-ink bg-lime-wash">
                  <FramedImage
                    src={art.logo}
                    alt="Brett on Hood logo"
                    width={1254}
                    height={1254}
                    sizes="(max-width: 1024px) 45vw, 380px"
                    className="h-full w-full"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholderLabel="brett-logo.png"
                  />
                </div>
                <Caption label="The face" sub="PNG · 1254px" href={art.logo} />
              </Card>
            </Reveal>
          </li>

          <li>
            <Reveal delay={0.07}>
              <Card rotate={2.1}>
                <div className="aspect-square overflow-hidden border-b-[3px] border-ink bg-lime-wash">
                  <BrettMark
                    alt="Brett on Hood vector mark"
                    className="h-full w-full p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Caption label="Vector" sub="SVG · scales forever" href="/img/brett-logo.svg" />
              </Card>
            </Reveal>
          </li>

          <li className="col-span-2 lg:col-span-1">
            <Reveal delay={0.14}>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[16rem] flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed border-ink bg-lime px-5 py-10 text-center shadow-[9px_9px_0_var(--color-ink)] transition-[rotate,translate,box-shadow] duration-200 ease-out rotate-[1.8deg] hover:rotate-0 hover:-translate-y-2 hover:border-solid hover:shadow-[13px_13px_0_var(--color-magenta)]"
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

        {/* Banner — full width at its real 3:1 ratio */}
        <Reveal delay={0.1} className="mt-8">
          <Card rotate={-1.1}>
            <div className="overflow-hidden border-b-[3px] border-ink bg-lime-wash">
              <FramedImage
                src={art.banner}
                alt="Brett on Hood banner artwork"
                width={1500}
                height={499}
                sizes="(max-width: 1240px) 92vw, 1160px"
                className="w-full"
                imageClassName="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                placeholderLabel="brett-banner.png"
              />
            </div>
            <Caption label="The banner" sub="1500 × 500 · for X / TG headers" href={art.banner} />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ children, rotate }: { children: React.ReactNode; rotate: number }) {
  return (
    <figure
      style={{ rotate: `${rotate}deg` }}
      className="group h-full overflow-hidden rounded-2xl border-[3px] border-ink bg-lime shadow-[9px_9px_0_var(--color-ink)] transition-[rotate,translate,box-shadow] duration-200 ease-out hover:rotate-0 hover:-translate-y-2 hover:shadow-[13px_13px_0_var(--color-magenta)]"
    >
      {children}
    </figure>
  );
}

function Caption({ label, sub, href }: { label: string; sub?: string; href?: string }) {
  return (
    <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="min-w-0">
        <span className="block truncate font-display text-sm font-extrabold uppercase text-ink sm:text-base">
          {label}
        </span>
        {sub && (
          <span className="mt-0.5 block truncate font-mono text-[0.62rem] uppercase tracking-wider text-ink/55">
            {sub}
          </span>
        )}
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
