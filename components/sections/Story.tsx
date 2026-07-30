import { FramedImage } from "@/components/ui/FramedImage";
import { Reveal } from "@/components/ui/Reveal";
import { ScribbleUnderline } from "@/components/ui/Divider";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { art } from "@/lib/site-config";

const stats = [
  { value: "2021", label: "Born in Boys' Club" },
  { value: "1 Jul 2026", label: "The hood opens" },
  { value: "4663", label: "Chain he calls home" },
];

export function Story() {
  return (
    <section id="story" className="grain relative overflow-hidden bg-lime py-20 sm:py-28">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ink/60">The origin</p>
          <h2 className="display-xl mt-3 text-[13vw] text-ink sm:text-6xl lg:text-7xl">
            Who is
            <br />
            Brett on Hood?
          </h2>
          <ScribbleUnderline className="mt-1 h-5 max-w-[19rem]" />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12">
          {/* Copy card */}
          <Reveal rotate={-1.2}>
            <div className="rounded-2xl border-[3px] border-ink bg-lime-wash p-7 shadow-[10px_10px_0_var(--color-ink)] sm:p-9">
              <p className="text-lg leading-relaxed text-ink/90">
                Brett is the blue-hoodie frog from{" "}
                <strong className="font-bold">Matt Furie&apos;s Boys&apos; Club</strong> — the
                same comic that gave the internet Pepe. For years he was the quiet one in the
                back of the panel. Then the internet found him, and he became a legend.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-ink/90">
                This is the next chapter. Brett traded the swamp for a tailored suit and moved
                onto <strong className="font-bold">{ROBINHOOD_CHAIN.name}</strong> — the chain
                that was built for tokenised stocks and got taken over by memes instead. He
                fit right in.
              </p>

              <div className="mt-7 rounded-xl border-l-[6px] border-magenta bg-lime/70 px-5 py-4">
                <p className="font-display text-xl font-extrabold uppercase leading-tight text-ink sm:text-2xl">
                  &ldquo;They built a chain for Wall Street.
                  <br />
                  We moved in first.&rdquo;
                </p>
              </div>

              <p className="mt-6 font-mono text-sm leading-relaxed text-ink/65">
                No presale. No team allocation. No promises about partnerships. Just a frog, a
                suit, and a chain where gas is paid in real{" "}
                {ROBINHOOD_CHAIN.nativeCurrency.symbol}.
              </p>
            </div>
          </Reveal>

          {/* Banner art + stats */}
          <div className="space-y-7">
            <Reveal rotate={1.5} delay={0.08}>
              <div className="overflow-hidden rounded-2xl border-[3px] border-ink shadow-[10px_10px_0_var(--color-magenta)]">
                <FramedImage
                  src={art.banner}
                  alt="Brett on Hood banner artwork"
                  width={1500}
                  height={500}
                  sizes="(max-width: 1024px) 92vw, 620px"
                  imageClassName="h-auto w-full"
                  placeholderLabel="brett-banner.png"
                />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.12 + i * 0.06} rotate={i === 1 ? 1.6 : -1.4}>
                  <div className="h-full rounded-xl border-[3px] border-ink bg-ink px-4 py-5 text-center shadow-[6px_6px_0_var(--color-ink)]">
                    <p className="font-display text-2xl font-extrabold text-lime sm:text-[1.7rem]">
                      {s.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-lime/60">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
