import { Reveal } from "@/components/ui/Reveal";
import { StickerCard } from "@/components/ui/StickerCard";
import { ScribbleUnderline } from "@/components/ui/Divider";

const phases = [
  {
    tag: "Phase one",
    title: "Get hood rich",
    body: "Launch the pair, lock the liquidity, and let the chart do the talking. No influencer rounds, no seed VCs, no unlock cliff waiting to dump on you.",
    rotate: -2.4,
    tone: "lime" as const,
  },
  {
    tag: "Phase two",
    title: "Take the table",
    body: "Every chart tracker, every listing, every group chat on the chain. Brett is the frog in the suit — people should see him before they see the ticker.",
    rotate: 1.6,
    tone: "magenta" as const,
  },
  {
    tag: "Phase three",
    title: "Own the house",
    body: "The mascot of the chain that Wall Street built and the memes took. Merch, collabs, and a crew that outlasts the cycle.",
    rotate: -1.2,
    tone: "bone" as const,
  },
];

export function Roadmap() {
  return (
    <section className="grain relative overflow-hidden bg-lime py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 texture-halftone opacity-[0.1]"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-ink/60">No promises</p>
          <h2 className="display-xl mt-3 text-[13vw] text-ink sm:text-6xl lg:text-7xl">
            The plan
          </h2>
          <ScribbleUnderline className="mt-1 h-5 max-w-[11rem]" />
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Three phases. No quarterly milestones we&apos;ll quietly delete later.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6">
          {phases.map((phase, i) => (
            <li key={phase.title}>
              <Reveal delay={i * 0.08}>
                <StickerCard rotate={phase.rotate} tone={phase.tone} className="h-full">
                  <p
                    className={`eyebrow ${
                      phase.tone === "magenta" ? "text-bone/75" : "text-ink/55"
                    }`}
                  >
                    {phase.tag}
                  </p>
                  <h3 className="display-xl mt-3 text-3xl sm:text-4xl">{phase.title}</h3>
                  <p
                    className={`mt-4 leading-relaxed ${
                      phase.tone === "magenta" ? "text-bone/90" : "text-ink/80"
                    }`}
                  >
                    {phase.body}
                  </p>

                  <span
                    aria-hidden
                    className={`mt-6 block font-mono text-5xl font-bold opacity-15 ${
                      phase.tone === "magenta" ? "text-bone" : "text-ink"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </StickerCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
