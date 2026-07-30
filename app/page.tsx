import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TickerStrips } from "@/components/sections/TickerStrips";
import { Story } from "@/components/sections/Story";
import { CasinoBand } from "@/components/sections/CasinoBand";
import { Crew } from "@/components/sections/Crew";
import { GettingIn } from "@/components/sections/GettingIn";
import { Roadmap } from "@/components/sections/Roadmap";
import { MemeWall } from "@/components/sections/MemeWall";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { TornDivider, ZigZagDivider } from "@/components/ui/Divider";

/**
 * Three acts, and the seams between them do real work:
 *
 *   ACT 1  lime, loud       — hero, ticker, story
 *   ACT 2  night, cinematic — casino, crew, ledger, getting in
 *   ACT 3  lime, playful    — roadmap, memes, faq
 *
 * The torn edge going into the dark and the sawtooth coming back out are what
 * stop this reading as a stack of interchangeable blocks.
 */
export default function Home() {
  return (
    <>
      <Nav />

      <main>
        {/* ---------- ACT 1 ---------- */}
        <Hero />
        <TickerStrips />
        <Story />

        {/* Lime → night */}
        <TornDivider fill="var(--color-night)" />

        {/* ---------- ACT 2 ---------- */}
        <CasinoBand />
        <Crew />
        <GettingIn />

        {/* Night → lime */}
        <ZigZagDivider fill="var(--color-lime)" />

        {/* ---------- ACT 3 ---------- */}
        <Roadmap />
        <MemeWall />
        <Faq />
      </main>

      {/* Lime → ink, into the footer */}
      <TornDivider fill="var(--color-ink)" flip />
      <Footer />
    </>
  );
}
