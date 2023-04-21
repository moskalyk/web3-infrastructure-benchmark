import { start, end, wait } from '../utils'
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';

// Create Auth object
const auth = new Auth({
  projectId: process.env.INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 137,
});

// Instantiate SDK
const sdk = new SDK(auth);

const runner = async (config: any) => {
    const times: any = []
    const ADDRESSES = process.env!.ADDRESSES?.split(',')!

    for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
        if(config.loadTest == false) await wait(1000)
        start()
        // call api
        await sdk.api.getNFTs({
          publicAddress: ADDRESSES[j],
          // includeMetadata: true
        });
        // console.log('My NFTs: \n', myNFTs);
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
  // const tokenBalances = await indexer.getTokenBalances({
  //     accountAddress: accountAddress,
  //     includeMetadata: true
  // })
  const myNFTs = await sdk.api.getNFTs({
    publicAddress: process.env!.WALLET_PUBLIC_ADDRESS!,
    includeMetadata: true
  });
  return end()
}

export {
  runner,
  nftRunner
}