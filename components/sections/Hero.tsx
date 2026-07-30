import { Brett3D } from "@/components/ui/Brett3D";
import { Button } from "@/components/ui/Button";
import { CopyPill } from "@/components/ui/CopyPill";
import { Reveal } from "@/components/ui/Reveal";
import { ChartIcon, Die, Sparkle } from "@/components/ui/Icons";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { isTBA, links, token } from "@/lib/site-config";

export function Hero() {
  const ticker = isTBA(token.ticker) ? "$BRETT" : token.ticker;

  return (
    <section id="top" className="grain relative overflow-hidden bg-lime pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Halftone wash, heavier at the bottom so the tear reads as ink build-up */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 texture-halftone opacity-[0.13]"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 70%)" }}
      />

      {/* Floating confetti — irregular positions, not a grid */}
      <Sparkle className="pointer-events-none absolute top-[18%] left-[6%] hidden h-8 w-8 animate-[bob_5s_ease-in-out_infinite] text-magenta lg:block [--bob-rot:-12deg]" />
      <Sparkle className="pointer-events-none absolute top-[62%] left-[3%] hidden h-5 w-5 animate-[bob_6.5s_ease-in-out_infinite] text-ink/25 xl:block [--bob-rot:18deg]" />
      <Die
        pips={3}
        className="pointer-events-none absolute top-[10%] right-[4%] hidden h-12 w-12 animate-[bob_7s_ease-in-out_infinite] xl:block [--bob-rot:-14deg]"
      />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* ---------- Left: type ---------- */}
        <div className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-ink px-4 py-2 text-lime shadow-[4px_4px_0_var(--color-magenta)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
              </span>
              <span className="eyebrow">Live on {ROBINHOOD_CHAIN.name}</span>
            </span>
          </Reveal>

          {/* Wordmark — magenta ghost layer offset behind the ink layer */}
          <Reveal delay={0.06} className="mt-6">
            <h1 className="relative select-none">
              <span aria-hidden className="display-xl absolute left-[6px] top-[7px] block text-[15vw] text-magenta/45 sm:text-[8.5rem] lg:text-[7.5rem] xl:text-[8.5rem]">
                Brett
                <br />
                on Hood
              </span>
              <span className="display-xl relative block text-[15vw] text-ink sm:text-[8.5rem] lg:text-[7.5rem] xl:text-[8.5rem]">
                Brett
                <br />
                on Hood
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="mt-7 max-w-[34rem]">
            <p className="text-lg leading-relaxed font-medium text-ink/85 sm:text-xl">
              Matt Furie drew him. The internet made him a legend. Now he&apos;s cashed out of
              the swamp, put on a suit, and taken a seat at the table on{" "}
              <strong className="font-bold">{ROBINHOOD_CHAIN.name}</strong>.
            </p>
            <p className="mt-3 font-mono text-sm text-ink/65">
              Gas in {ROBINHOOD_CHAIN.nativeCurrency.symbol}. Chain {ROBINHOOD_CHAIN.chainId}. No suits, no roadmap, no permission.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              href={isTBA(links.uniswap) ? undefined : links.uniswap}
              external={!isTBA(links.uniswap)}
              disabled={isTBA(links.uniswap)}
              variant="ink"
              size="lg"
            >
              {isTBA(links.uniswap) ? `${ticker} — Dropping soon` : `Buy ${ticker}`}
            </Button>
            <Button
              href={isTBA(links.dexscreener) ? undefined : links.dexscreener}
              external={!isTBA(links.dexscreener)}
              disabled={isTBA(links.dexscreener)}
              variant="magenta"
              size="lg"
            >
              <ChartIcon className="h-5 w-5" />
              Chart
            </Button>
          </Reveal>

          <Reveal delay={0.24} className="mt-8 w-full max-w-[32rem]">
            <CopyPill value={token.contract} label="Contract" tone="lime" className="w-full" />
          </Reveal>
        </div>

        {/* ---------- Right: Brett in 3D, bleeding off the edge ---------- */}
        <Reveal delay={0.1} className="relative lg:-mr-10 xl:-mr-16">
          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            {/* Glow puddle under the mark so it sits in the page, not on it */}
            <div
              aria-hidden
              className="absolute inset-x-8 bottom-10 h-24 rounded-[50%] bg-lime-deep/35 blur-2xl"
            />
            <Brett3D
              className="relative aspect-square w-full"
              depth={17}
              priority
              alt="Brett on Hood — the mascot"
            />

            {/* Off-grid badge, stuck on at an angle */}
            <div className="absolute bottom-2 -left-2 rotate-[-8deg] rounded-xl border-[3px] border-ink bg-lime px-4 py-2 shadow-[5px_5px_0_var(--color-ink)] sm:-left-6">
              <p className="font-display text-sm font-extrabold uppercase text-ink sm:text-base">
                friend of pepe
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
