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

export {
  runner
}