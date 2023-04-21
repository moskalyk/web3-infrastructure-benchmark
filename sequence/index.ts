
import { start, end } from '../utils'

// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

// try any account address you'd like :)
const accountAddress = process.env!.WALLET_PUBLIC_ADDRESS!

const runner = async () => {
    console.log('running sequence...')
    start()
    // call api
    // query Sequence Indexer for all token balances of the account on Polygon
    const tokenBalances = await indexer.getTokenBalances({
        accountAddress: accountAddress,
        // includeMetadata: true
    })
    // console.log('tokens in your account:', tokenBalances)

    return end()
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