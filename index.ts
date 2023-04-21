import { config as loadEnv } from 'dotenv';

loadEnv();

import Table from 'cli-table';
import {runner as sequenceRunner, nftRunner as sequenceNFTRunner } from './sequence/index'
import {runner as infuraRunner, nftRunner as infuraNFTRunner } from './infura/index'
import {runner as covalentRunner, nftRunner as covalentNFTRunner } from './covalent/index'
import {runner as alchemyRunner, nftRunner as alchemyNFTRunner } from './alchemy/index'
import {runner as nftPortRunner, nftRunner as nftPortNFTRunner } from './nftport/index'


(async () => {
    // instantiate
    var balanceTable = new Table({
        head: ['API', 'Time (ms)']
    , colWidths: [30, 30]
    });

    // balances
    const balanceApis = [
        'Sequence Indexer', // https://docs.sequence.xyz/indexer/fetch-tokens
        'Infura API', // https://docs.infura.io/infura/tutorials/ethereum/retrieve-the-balance-of-an-erc-20-token
        'Covalent Balances', // https://www.covalenthq.com/docs/api/balances/get-token-balances-for-address/
        // 'Chainstack NFT API', // https://chainstack.com/nft-api/
        'Alchemy', // https://docs.alchemy.com/reference/token-api-quickstart
        'NFTPort' // https://docs.nftport.xyz/reference/retrieve-nfts-owned-by-account
    ];


    try {
        const loadTest = false
        balanceTable.push(
               [balanceApis[0], `${await sequenceRunner({ loadTest: loadTest })}`]
            ,  [balanceApis[1], `${await infuraRunner({ loadTest: loadTest })}`]
            ,  [balanceApis[2], `${await covalentRunner({ loadTest: loadTest })}`]
            ,  [balanceApis[3], `${await alchemyRunner({ loadTest: loadTest })}`]
            ,  [balanceApis[4], `${await nftPortRunner({ loadTest: loadTest })}`]
        );

        console.log(balanceTable.toString());
    }catch(e){
        console.log(e)
    }

    // instantiate
    var nftTable = new Table({
        head: ['API', 'Time (ms)']
    , colWidths: [30, 30]
    });

    // metadata
    const nftApis = [
        'Sequence Indexer Metadata', // https://docs.sequence.xyz/indexer/unique-tokens
        'Infura NFT API', //https://docs.infura.io/infura/infura-expansion-apis/nft-api/nft-sdk/how-to/get-nft-information
        'Covalent ', // https://www.covalenthq.com/docs/api/nft/get-nft-token-ids-for-contract-with-metadata/#core-rendering/
        // 'Chainstack NFT API', // https://chainstack.com/nft-api/
        'Alchemy', // https://docs.alchemy.com/reference/nft-api-quickstart
        'NFTPort' // https://docs.nftport.xyz/reference/retrieve-nft-details
    ]

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    nftTable.push(
        // [nftApis[0], `${await sequenceNFTRunner()}`]
    //   , [nftApis[1], `${await infuraNFTRunner()}`]
    //   , [nftApis[2], `${await covalentNFTRunner()}`]
    //   , [nftApis[3], `${await alchemyNFTRunner()}`]
    //   , [nftApis[4], `${await nftPortNFTRunner()}`]
    );

    console.log(nftTable.toString())
})()
