import { AddChainButton } from "@/components/ui/AddChainButton";
import { Brett3D } from "@/components/ui/Brett3D";
import { CopyPill } from "@/components/ui/CopyPill";
import { Reveal } from "@/components/ui/Reveal";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { isTBA, links, token } from "@/lib/site-config";

export function GettingIn() {
  const ticker = isTBA(token.ticker) ? "$BRETT" : token.ticker;
  const gas = ROBINHOOD_CHAIN.nativeCurrency.symbol;

  return (
    <section id="getting-in" className="act-dark grain grain-light relative overflow-hidden bg-night py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow text-lime">Step by step</p>
          <h2 className="slab-head mt-3 text-[12vw] text-bone sm:text-5xl lg:text-6xl">
            Getting in
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/60 sm:text-lg">
            {ROBINHOOD_CHAIN.name}{" "}
            is its own network, so there&apos;s one extra step versus a mainnet buy. Four
            minutes, start to finish.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* ---------- Steps ---------- */}
          <ol className="space-y-5">
            {/* 1 — wallet + network */}
            <Step index={1} title="Get a wallet, add the chain" delay={0}>
              <p>
                MetaMask, Rabby or Trust all work. Then add {ROBINHOOD_CHAIN.name} — one click
                below, or enter it by hand.
              </p>

              <div className="mt-5">
                <AddChainButton />
              </div>

              <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 rounded-xl border border-bone/10 bg-night px-4 py-4 font-mono text-[0.72rem] sm:grid-cols-[auto_1fr]">
                <dt className="text-bone-dim">Network</dt>
                <dd className="text-bone">{ROBINHOOD_CHAIN.name}</dd>
                <dt className="text-bone-dim">Chain ID</dt>
                <dd className="text-lime">{ROBINHOOD_CHAIN.chainId}</dd>
                <dt className="text-bone-dim">RPC</dt>
                <dd className="break-all text-bone">{ROBINHOOD_CHAIN.rpcUrls[0]}</dd>
                <dt className="text-bone-dim">Currency</dt>
                <dd className="text-bone">{gas}</dd>
                <dt className="text-bone-dim">Explorer</dt>
                <dd className="break-all text-bone">
                  {ROBINHOOD_CHAIN.explorer.replace("https://", "")}
                </dd>
              </dl>

              <p className="mt-4 border-l-2 border-magenta pl-3 font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                If the chain ID doesn&apos;t read {ROBINHOOD_CHAIN.chainId}, stop. You&apos;re on
                the wrong network.
              </p>
            </Step>

            {/* 2 — bridge */}
            <Step index={2} title={`Bridge ${gas} across`} delay={0.06}>
              <p>
                Gas here is real {gas}, not a points token. Bridge some over with the canonical
                Arbitrum bridge — {ROBINHOOD_CHAIN.name} is an Arbitrum Orbit chain that settles
                back to Ethereum.
              </p>
              <a
                href={links.bridge}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-lime underline decoration-lime/40 underline-offset-4 hover:text-lime hover:decoration-lime"
              >
                Open the bridge ↗
              </a>
            </Step>

            {/* 3 — swap */}
            <Step index={3} title={`Swap for ${ticker}`} delay={0.12}>
              <p>
                Uniswap has been live on the chain since day one. Paste the contract below —
                always paste it, never search by name.
              </p>

              <CopyPill value={token.contract} label="Contract" tone="dark" className="mt-4 w-full" />
              {isTBA(links.uniswap) ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-lime/40 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-widest text-lime">
                  Pair goes live at launch
                </p>
              ) : (
                <a
                  href={links.uniswap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-lime underline decoration-lime/40 underline-offset-4 hover:text-lime hover:decoration-lime"
                >
                  Swap on Uniswap ↗
                </a>
              )}
            </Step>

            {/* 4 — hold */}
            <Step index={4} title="Take your seat" delay={0.18} last>
              <p>
                That&apos;s it. Hold it, post the memes, and come say something in the portal.
                The frog does the rest.
              </p>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-lime underline decoration-lime/40 underline-offset-4 hover:text-lime hover:decoration-lime"
              >
                Join the Telegram ↗
              </a>
            </Step>
          </ol>

          {/* ---------- Brett in the flat cap, anchoring the column ---------- */}
          <Reveal delay={0.1} className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-2xl border-[3px] border-bone/20 bg-night-soft p-6">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(200,253,0,0.15),transparent_62%)]"
                />
                <Brett3D className="relative mx-auto h-64 w-64" alt="Brett on Hood" />
              </div>
              <p className="mt-5 border-l-2 border-lime pl-4 font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                By order of the hood.
                <br />
                Suit on. Swamp off.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  children,
  delay,
  last = false,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
  delay: number;
  last?: boolean;
}) {
  return (
    <li>
      <Reveal delay={delay}>
        <div className="relative flex gap-5 sm:gap-6">
          {/* Numeral + connecting rule */}
          <div className="flex shrink-0 flex-col items-center">
            <span className="slab-head grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-lime bg-night text-lg text-lime sm:h-14 sm:w-14 sm:text-xl">
              {index}
            </span>
            {!last && <span aria-hidden className="mt-2 w-px flex-1 bg-gradient-to-b from-lime/50 to-transparent" />}
          </div>

          <div className="flex-1 rounded-2xl border border-bone/10 bg-night-soft p-6 sm:p-7">
            <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-bone sm:text-2xl">
              {title}
            </h3>
            <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-bone/70">
              {children}
            </div>
          </div>
        </div>
      </Reveal>
    </li>
  );
}
