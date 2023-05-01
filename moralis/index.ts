
import { start, end, wait } from '../utils'

import Moralis from 'moralis';

// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

// try any account address you'd like :)
const accountAddress = process.env!.WALLET_PUBLIC_ADDRESS!

const runner = async (config: any) => {
    const times: any = []
    const ADDRESSES = process.env!.ADDRESSES?.split(',')!

    // call api
    for (let j = 0; j < ADDRESSES.length; j++){
        for(let i = 0; i < 10; i++){
            if(config.loadTest == false) await wait(1000)

            start()
            try{
                // TODO
            times.push(end())
            } catch(e){}
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

    await Moralis.start({
        apiKey: process.env!.MORALIS_API_KEY!
      });

    // call api
    for (let j = 0; j < ADDRESSES.length; j++){
        for(let i = 0; i < 10; i++){
            if(config.loadTest == false) await wait(1000)

            start()
            try{
                try {
                    await Moralis.EvmApi.transaction.getWalletTransactions({
                      "chain": "0x89",
                      "address": ADDRESSES[j]
                    });
                  } catch (e) {
                    console.error(e);
                  }
                times.push(end())
            } catch(e){}
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
                // TODO
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
    // runner,
    // nftRunner,
    walletTxRunner
}