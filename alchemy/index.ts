import { wait, end, start } from '../utils'
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const runner = async (config: any) => {
    const times: any = []
    const ADDRESSES = process.env!.ADDRESSES?.split(',')!
    const ownerAddr = process.env!.WALLET_PUBLIC_ADDRESS!

    for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
        if(config.loadTest == false) await wait(1000)

        start()
        // call api
        // The wallet address / token we want to query for:
        const balances = await alchemy.core.getTokenBalances(ownerAddr, [
          ADDRESSES[j],
        ]);

        times.push(end())
      }
    }

    const sum = times.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    });
    
    const average = sum / times.length;

  return average
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