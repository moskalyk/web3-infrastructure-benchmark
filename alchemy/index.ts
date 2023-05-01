import { wait, end, start } from '../utils'
import { Alchemy, Network, AssetTransfersCategory } from "alchemy-sdk";

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

const nftRunner = async (config: any) => {
  const times: any = []
  const ADDRESSES = process.env!.NFTS?.split(',')!

  // call api
  for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
          if(config.loadTest == false) await wait(1000)
          
          try{    

            start()
            await alchemy.core.getTokenMetadata(ADDRESSES[j]);
            
            times.push(end())
            console.log(`${i},${j}`)
          } catch(e){
              console.log(e)
          }
      }
  }


  const sum = times.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    });
    
    const average = sum / times.length;

  return average
}

const walletTxRunner = async (config: any) => {
  const times: any = []
  const ADDRESSES = process.env!.NFTS?.split(',')!

  // call api
  for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
          if(config.loadTest == false) await wait(1000)
          
          try{    

            start()

            await alchemy.core.getAssetTransfers({
              maxCount: 100,
              fromBlock: "0x0",
              toAddress: ADDRESSES[j],
              excludeZeroValue: true,
              withMetadata: false,
              category: [AssetTransfersCategory.ERC1155, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC20]
            })
            
            times.push(end())
            console.log(`${i},${j}`)
          } catch(e){
              console.log(e)
          }
      }
  }


  const sum = times.reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
    });
    
    const average = sum / times.length;

  return average
}

export {
  runner,
  nftRunner,
  walletTxRunner
}