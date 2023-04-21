
import { start, end, wait } from '../utils'

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
                // query Sequence Indexer for all token balances of the account on Polygon
                const tokenBalances = await indexer.getTokenBalances({
                    accountAddress: ADDRESSES[j],
                    // includeMetadata: true
                })
                // console.log('tokens in your account:', tokenBalances)
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

const nftRunner = async () => {
    start()
    const tokenBalances = await indexer.getTokenBalances({
        accountAddress: accountAddress,
        includeMetadata: true
    })
    return end()
}

export {
    runner,
    nftRunner
}