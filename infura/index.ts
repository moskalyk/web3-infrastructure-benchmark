import { start, end, wait } from '../utils'
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
import { ethers } from 'ethers'

// Create Auth object
const auth = new Auth({
  projectId: process.env.INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 137,
});

const infuraProvider = new ethers.providers.InfuraProvider(
  "matic",
  process.env.INFURA_API_KEY
);

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


const nftRunner = async (config: any) => {
  const times: any = []
  const ADDRESSES = process.env!.NFTS?.split(',')!

  // call api
  for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
          if(config.loadTest == false) await wait(1000)
          
          try{    
              start()
              await sdk.api.getNFTs({
                    publicAddress: ADDRESSES[j],
                    includeMetadata: true
              });
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
    const ADDRESSES = process.env!.ADDRESSES?.split(',')!

    for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
        if(config.loadTest == false) await wait(1000)
        start()
        // // call api
  
        const toBlock = await infuraProvider.getBlockNumber()
        console.log(toBlock)

        const transfersFromBlockToBlock = await sdk.api.getTransferFromBlockToBlock({
          // fails
          fromBlock: Math.floor(toBlock-toBlock*.50), 
          toBlock: toBlock,
        });
        
        console.log('transfers:', transfersFromBlockToBlock);

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

export {
  runner,
  nftRunner,
  walletTxRunner
}