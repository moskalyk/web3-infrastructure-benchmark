import { start, end } from '../utils'
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';

console.log(process.env.INFURA_API_KEY)
// Create Auth object
const auth = new Auth({
  projectId: process.env.INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 1,
});

// Instantiate SDK
const sdk = new SDK(auth);

const runner = async () => {
    start()
    // call api
    const myNFTs = await sdk.api.getNFTs({
      publicAddress: process.env!.WALLET_PUBLIC_ADDRESS!,
      // includeMetadata: true
    });
    // console.log('My NFTs: \n', myNFTs);
    return end()
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