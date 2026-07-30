/**
 * Robinhood Chain network parameters.
 *
 * Verified against ChainList's rpcs.json (chainId 4663) — do not edit these
 * from memory. Robinhood Chain is an Arbitrum Orbit L2 that settles to
 * Ethereum and pays gas in real ETH, which is the detail most people get
 * wrong when they arrive.
 */

export const ROBINHOOD_CHAIN = {
  name: "Robinhood Chain",
  shortName: "robinhoodchain",
  chainId: 4663,
  /** EIP-3085 wants hex. 4663 === 0x1237. */
  chainIdHex: "0x1237",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: [
    "https://rpc.mainnet.chain.robinhood.com",
    "https://robinhood.rpc.blxrbdn.com",
    "https://robinhood-rpc.publicnode.com",
  ],
  explorer: "https://robinhoodchain.blockscout.com",
} as const;

/** Link straight to a token page on the official explorer. */
export const explorerTokenUrl = (contract: string) =>
  `${ROBINHOOD_CHAIN.explorer}/token/${contract}`;

type AddChainResult = { ok: true } | { ok: false; reason: string };

interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

/**
 * Ask the user's wallet to add (or switch to) Robinhood Chain.
 *
 * Tries switch first: if the chain is already known, adding it again makes
 * some wallets throw. Falls back to wallet_addEthereumChain on 4902.
 */
export async function addRobinhoodChain(): Promise<AddChainResult> {
  const provider = (globalThis as { ethereum?: Eip1193Provider }).ethereum;

  if (!provider) {
    return {
      ok: false,
      reason: "No wallet detected. Install MetaMask, Rabby or Trust Wallet first.",
    };
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ROBINHOOD_CHAIN.chainIdHex }],
    });
    return { ok: true };
  } catch (switchError) {
    const code = (switchError as { code?: number })?.code;

    // 4902 = chain not added yet. Anything else is a real failure.
    if (code !== 4902) {
      if (code === 4001) return { ok: false, reason: "Request rejected in your wallet." };
      return { ok: false, reason: "Your wallet could not switch network." };
    }

    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ROBINHOOD_CHAIN.chainIdHex,
            chainName: ROBINHOOD_CHAIN.name,
            nativeCurrency: ROBINHOOD_CHAIN.nativeCurrency,
            rpcUrls: [...ROBINHOOD_CHAIN.rpcUrls],
            blockExplorerUrls: [ROBINHOOD_CHAIN.explorer],
          },
        ],
      });
      return { ok: true };
    } catch (addError) {
      const addCode = (addError as { code?: number })?.code;
      if (addCode === 4001) return { ok: false, reason: "Request rejected in your wallet." };
      return { ok: false, reason: "Could not add Robinhood Chain. Add it manually — chain ID 4663." };
    }
  }
}
