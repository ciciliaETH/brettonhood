import { Button } from "@/components/ui/Button";
import { CopyPill } from "@/components/ui/CopyPill";
import { TelegramIcon, XIcon } from "@/components/ui/Icons";
import { Wordmark3D } from "@/components/ui/Wordmark3D";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { isTBA, links, navLinks, site, token } from "@/lib/site-config";

export function Footer() {
  const ticker = isTBA(token.ticker) ? "$BRETT" : token.ticker;

  return (
    <footer className="act-dark grain grain-light relative overflow-hidden bg-night pt-20 pb-10 text-bone">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* CTA row */}
        <div className="flex flex-col gap-8 border-b border-bone/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display-xl text-[13vw] text-lime sm:text-6xl lg:text-7xl">
              Take your
              <br />
              seat
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-bone/60">
              {site.tagline} Come find the crew in the portal.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Button
              href={isTBA(links.buy) ? undefined : links.buy}
              external={!isTBA(links.buy)}
              disabled={isTBA(links.buy)}
              variant="lime"
              size="lg"
              onDark
            >
              {isTBA(links.buy) ? "Buy — soon" : "Buy Now"}
            </Button>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="btn-press grid h-14 w-14 place-items-center rounded-xl border-[3px] border-lime bg-transparent text-lime hover:bg-lime hover:text-ink active:translate-x-[3px] active:translate-y-[3px]"
            >
              <TelegramIcon className="h-6 w-6" />
            </a>
            <a
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="btn-press grid h-14 w-14 place-items-center rounded-xl border-[3px] border-lime bg-transparent text-lime hover:bg-lime hover:text-ink active:translate-x-[3px] active:translate-y-[3px]"
            >
              <XIcon className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Contract */}
        <div className="border-b border-bone/10 py-8">
          <CopyPill value={token.contract} label="Contract" tone="dark" className="w-full max-w-2xl" />
          <p className="mt-3 font-mono text-[0.7rem] text-bone-dim">
            {ROBINHOOD_CHAIN.name} · chain {ROBINHOOD_CHAIN.chainId} ·{" "}
            <a
              href={ROBINHOOD_CHAIN.explorer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime underline decoration-lime/40 underline-offset-2 hover:text-lime"
            >
              explorer ↗
            </a>
          </p>
        </div>

        {/* Nav + credits */}
        <div className="flex flex-col gap-8 py-8 lg:flex-row lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-display text-sm font-extrabold uppercase tracking-tight text-bone/55 hover:text-lime"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="max-w-md font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            Brett is a character created by <strong className="text-bone/70">Matt Furie</strong>{" "}
            in Boys&apos; Club. This is a fan-made community project — not an official Furie
            release, and not affiliated with or endorsed by Robinhood Markets, Inc.
          </p>
        </div>

        {/* Disclaimer — a memecoin site genuinely needs this */}
        <div className="rounded-xl border border-bone/10 bg-night-soft p-5">
          <p className="eyebrow text-magenta">Read this bit</p>
          <p className="mt-2.5 font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            {ticker} is a meme token with no intrinsic value, no expectation of financial
            return, and no roadmap you should rely on. It is not an investment, not a
            security, and nothing on this page is financial advice. Crypto is volatile and
            you can lose everything you put in. Verify the contract yourself before you buy,
            and never spend more than you can comfortably lose. Do your own research.
          </p>
        </div>

        <p className="mt-8 text-center font-mono text-[0.66rem] tracking-wide text-bone-dim/60">
          © {new Date().getFullYear()} {site.name} · built by the crew, for the crew
        </p>
      </div>

      {/* Oversized wordmark bleeding off the bottom, extruded into real 3D and
          tilted by scroll position. */}
      <Wordmark3D
        lines={["Brett", "on Hood"]}
        className="pointer-events-none mt-14 w-full text-[17vw] select-none sm:text-[15vw]"
      />
    </footer>
  );
}
