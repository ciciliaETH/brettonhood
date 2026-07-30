import { Reveal } from "@/components/ui/Reveal";
import { Die } from "@/components/ui/Icons";
import { Brett3D } from "@/components/ui/Brett3D";

/**
 * The tonal pivot — lime act into night act.
 *
 * The table is built rather than photographed: felt ground, a betting-layout
 * grid, spotlight, chips and dice. Self-contained, so it can't fall back to a
 * broken image, and the 3D Brett does the heavy lifting in the middle.
 */
export function CasinoBand() {
  return (
    <section className="act-dark grain grain-light cursor-dice relative overflow-hidden bg-night">
      {/* felt weave */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55] bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.16)_0_2px,transparent_2px_5px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.12)_0_2px,transparent_2px_5px)]"
      />

      {/* betting layout, faint, skewed into perspective */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-[0.16] [transform:perspective(620px)_rotateX(58deg)] [transform-origin:bottom]"
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,var(--color-lime)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-lime)_1px,transparent_1px)] bg-[size:88px_88px]" />
      </div>

      {/* overhead spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,rgba(200,253,0,0.17),transparent_58%)]"
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_18%,rgba(14,36,25,0.7)_66%,var(--color-night)_92%)]"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-night to-transparent" />

      <div className="relative mx-auto max-w-[1240px] px-4 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <div className="mx-auto mb-9 flex w-fit items-center gap-3 rounded-full border border-lime/35 bg-night/70 px-5 py-2 backdrop-blur-sm">
            <Die pips={5} className="h-5 w-5" />
            <span className="eyebrow text-lime">The high roller table</span>
            <Die pips={2} className="h-5 w-5" />
          </div>
        </Reveal>

        {/* Brett, in 3D, holding the middle of the table */}
        <Reveal delay={0.05}>
          <Brett3D className="mx-auto h-44 w-44 sm:h-56 sm:w-56" alt="Brett at the table" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="slab-head mx-auto mt-8 max-w-4xl text-[10vw] text-bone sm:text-6xl lg:text-7xl">
            The house
            <br />
            <span className="text-lime">always wins</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-bone/70 sm:text-xl">
            So we stopped playing against it. On this chain the table is open, the dice are
            onchain, and the frog in the tuxedo is holding.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mt-10 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-lime/70">
            — and the house is us —
          </p>
        </Reveal>
      </div>

      {/* chip stacks along the felt edge */}
      <div aria-hidden className="pointer-events-none absolute bottom-5 left-[4%] hidden items-end gap-2 lg:flex">
        <ChipStack n={5} color="#E0427F" />
        <ChipStack n={3} color="#C8FD00" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-[5%] bottom-8 hidden items-end gap-2 lg:flex">
        <ChipStack n={4} color="#F4F1E4" />
        <ChipStack n={6} color="#E0427F" />
      </div>
    </section>
  );
}

function ChipStack({ n, color }: { n: number; color: string }) {
  return (
    <span className="flex flex-col-reverse">
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="-mb-[7px] block h-3.5 w-11 rounded-[50%] border-2 border-ink/70"
          style={{ backgroundColor: color, opacity: 0.5 + i * 0.06 }}
        />
      ))}
    </span>
  );
}
