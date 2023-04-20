import Table from 'cli-table';
import {runner as sequenceRunner } from './sequence/index'
import {runner as infuraRunner } from './infura/index'
import {runner as covalentRunner } from './covalent/index'
import {runner as alchemyRunner } from './alchemy/index'
import {runner as nftPortRunner } from './nftport/index'

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


    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    balanceTable.push(
        [balanceApis[0], `${await sequenceRunner()}`]
    , [balanceApis[1], `${await infuraRunner()}`]
    , [balanceApis[2], `${await covalentRunner()}`]
    , [balanceApis[3], `${await alchemyRunner()}`]
    , [balanceApis[4], `${await nftPortRunner()}`]
    );

    console.log(balanceTable.toString());


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
        'Chainstack NFT API', // https://chainstack.com/nft-api/
        'Alchemy', // https://docs.alchemy.com/reference/nft-api-quickstart
        'NFTPort' // https://docs.nftport.xyz/reference/retrieve-nft-details
    ]

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    nftTable.push(
        [nftApis[0], 'Second value']
      , [nftApis[1], 'Second value']
      , [nftApis[2], 'Second value']
      , [nftApis[3], 'Second value']
      , [nftApis[4], 'Second value']
      , [nftApis[5], 'Second value']
    );

    console.log(nftTable.toString())
})()
