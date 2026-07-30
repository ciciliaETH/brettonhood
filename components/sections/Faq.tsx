import { Reveal } from "@/components/ui/Reveal";
import { ScribbleUnderline } from "@/components/ui/Divider";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { isTBA, token } from "@/lib/site-config";

const gas = ROBINHOOD_CHAIN.nativeCurrency.symbol;

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Robinhood Chain?",
    a: (
      <>
        An Ethereum layer 2 that Robinhood launched on 1 July 2026, built on Arbitrum&apos;s
        Orbit stack and settling back to Ethereum. It was designed for tokenised stocks —
        but memecoins took over the activity almost immediately. Brett fits right in.
      </>
    ),
  },
  {
    q: "Which wallet do I need?",
    a: (
      <>
        Any EVM wallet that lets you add a custom network — MetaMask, Rabby and Trust all
        work. Use the <strong>Add {ROBINHOOD_CHAIN.name}</strong> button in Getting In, or add
        it by hand with chain ID <span className="font-mono">{ROBINHOOD_CHAIN.chainId}</span>.
      </>
    ),
  },
  {
    q: `Why is gas paid in ${gas}?`,
    a: (
      <>
        Because {ROBINHOOD_CHAIN.name} uses {gas}{" "}
        as its native currency rather than minting a
        gas token. It&apos;s an Orbit chain that settles to Ethereum, so you bridge real {gas}{" "}
        in and pay fees with it. Keep a little spare for swaps.
      </>
    ),
  },
  {
    q: "Is there a tax on buys or sells?",
    a: isTBA(token.buyTax) ? (
      <>
        The final numbers get published the moment the contract is deployed. We&apos;re not
        going to quote a figure we haven&apos;t signed off on.
      </>
    ) : (
      <>
        Buy {token.buyTax}, sell {token.sellTax}. Both are verifiable on the explorer.
      </>
    ),
  },
  {
    q: "Is the contract renounced and the liquidity locked?",
    a: (
      <>
        Both states are readable straight off{" "}
        <a
          href={ROBINHOOD_CHAIN.explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-magenta decoration-2 underline-offset-4 hover:text-magenta"
        >
          Blockscout
        </a>
        . Don&apos;t take our word for it — that&apos;s the whole point of a public chain.
      </>
    ),
  },
  {
    q: "Is this affiliated with Robinhood or Matt Furie?",
    a: (
      <>
        No. Brett on Hood is an independent, community-run memecoin. It is not endorsed by,
        affiliated with, or operated by Robinhood Markets, and it is not an official Matt
        Furie project. Brett is a character we love, on a chain we like.
      </>
    ),
  },
  {
    q: "So what do I actually get?",
    a: (
      <>
        A token, a frog in a suit, and a group chat. There is no yield, no revenue share and
        no promise your bag goes up. Buy it because the joke lands, size it like it could go
        to zero, and never spend money you need.
      </>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="grain relative overflow-hidden bg-lime py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 texture-halftone opacity-[0.09]"
      />

      <div className="relative mx-auto max-w-[900px] px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow text-ink/60">Straight answers</p>
          <h2 className="display-xl mt-3 text-[13vw] text-ink sm:text-6xl lg:text-7xl">
            Questions
          </h2>
          <ScribbleUnderline className="mt-1 h-5 max-w-[15rem]" />
        </Reveal>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              {/* Native <details> — the accordion works with JS disabled. */}
              <details className="group rounded-xl border-[3px] border-ink bg-lime-wash shadow-[6px_6px_0_var(--color-ink)] transition-shadow open:shadow-[6px_6px_0_var(--color-magenta)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-xl">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink bg-ink text-lime transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>

                <div className="border-t-2 border-ink/15 px-5 pt-4 pb-5 sm:px-6">
                  <p className="leading-relaxed text-ink/80">{faq.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
