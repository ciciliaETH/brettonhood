import { Marquee } from "@/components/ui/Marquee";
import { ROBINHOOD_CHAIN } from "@/lib/chain";
import { isTBA, token } from "@/lib/site-config";

/**
 * Two counter-scrolling strips, each rotated a touch the opposite way, so
 * they cross. One strip alone looks like a widget; two crossing looks built.
 */
export function TickerStrips() {
  const ticker = isTBA(token.ticker) ? "$BRETT" : token.ticker;

  const top = [
    ticker,
    "Brett on Hood",
    `Chain ID ${ROBINHOOD_CHAIN.chainId}`,
    `Gas in ${ROBINHOOD_CHAIN.nativeCurrency.symbol}`,
    "Zero tax",
    "LP locked",
    "Friend of Pepe",
  ];

  const bottom = [
    "The house always wins",
    "Suit on, swamp off",
    ROBINHOOD_CHAIN.name,
    "Community owned",
    "No presale",
    "Matt Furie legend",
  ];

  return (
    <div className="relative z-10 -my-2 py-6">
      <Marquee items={top} rotate={-1.4} className="relative left-[-2vw] w-[104vw]" />
      <Marquee
        items={bottom}
        reverse
        rotate={1.1}
        className="relative left-[-2vw] mt-3 w-[104vw]"
      />
    </div>
  );
}
