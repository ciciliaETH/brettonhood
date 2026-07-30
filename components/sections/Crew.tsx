import { Reveal } from "@/components/ui/Reveal";
import { BrettMark, type CrewTint } from "@/components/ui/BrettMark";

/**
 * The crew, built from the official mark.
 *
 * Each portrait is the same vector artwork under a different hue filter, so the
 * row shares exact geometry and reads as one family — and it costs one cached
 * SVG rather than four separate assets.
 */
const crew: { name: string; role: string; tint: CrewTint; lead?: boolean }[] = [
  { name: "The Dog", role: "Rolled in early", tint: "dog" },
  { name: "Brett", role: "Holds the dice", tint: "brett", lead: true },
  { name: "The Sasquatch", role: "Counts the chips", tint: "squatch" },
  { name: "Pepe", role: "Original gangster", tint: "pepe" },
];

export function Crew() {
  return (
    <section id="crew" className="act-dark grain grain-light relative bg-night texture-ledger py-20 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="eyebrow text-lime">The table</p>
          <h2 className="slab-head mx-auto mt-3 max-w-3xl text-[11vw] text-bone sm:text-5xl lg:text-6xl">
            The crew at the table
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-bone/60 sm:text-lg">
            Brett didn&apos;t come alone. Every legend on this chain came from the same corner
            of the internet.
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
          {crew.map((member, i) => (
            <li key={member.name}>
              <Reveal delay={i * 0.07} rotate={i % 2 === 0 ? -1.6 : 1.4}>
                <figure
                  className={`group h-full overflow-hidden rounded-2xl border-[3px] transition-transform duration-200 hover:-translate-y-1.5 ${
                    member.lead
                      ? "border-lime shadow-[8px_8px_0_var(--color-lime)]"
                      : "border-bone/25 shadow-[8px_8px_0_rgba(244,241,228,0.14)]"
                  }`}
                >
                  <div
                    className={`relative aspect-square overflow-hidden ${
                      member.lead ? "bg-night-lift" : "bg-night-soft"
                    }`}
                  >
                    {/* spotlight behind the portrait */}
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(200,253,0,0.16),transparent_62%)]"
                    />
                    <BrettMark
                      tint={member.tint}
                      alt={`${member.name} at the table`}
                      className="relative h-full w-full p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>

                  <figcaption
                    className={`border-t-[3px] px-4 py-3.5 ${
                      member.lead
                        ? "border-lime bg-lime text-ink"
                        : "border-bone/25 bg-night-soft text-bone"
                    }`}
                  >
                    <p className="slab-head text-base sm:text-lg">{member.name}</p>
                    <p
                      className={`mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] ${
                        member.lead ? "text-ink/70" : "text-bone-dim"
                      }`}
                    >
                      {member.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
