import { start, end } from '../utils'

import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const runner = async () => {
    const ownerAddr = process.env!.WALLET_PUBLIC_ADDRESS!

    start()
    // call api
    // The wallet address / token we want to query for:
    const balances = await alchemy.core.getTokenBalances(ownerAddr, [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    ]);

    return end()
}

const nftRunner = async () => {
  start()
  // The token address we want to query for metadata:
  const metadata = await alchemy.core.getTokenMetadata(
    "0x631998e91476DA5B870D741192fc5Cbc55F5a52E"
  );
  return end()
}

export {
  runner,
  nftRunner
}