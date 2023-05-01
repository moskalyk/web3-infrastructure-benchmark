import { config as loadEnv } from 'dotenv';

loadEnv();

import Table from 'cli-table';
import { runner as sequenceRunner, nftRunner as sequenceNFTRunner, walletTxRunner as sequenceWalletTxRunner } from './sequence/index'
import { runner as infuraRunner, nftRunner as infuraNFTRunner, walletTxRunner as infuraWalletTxRunner } from './infura/index'
import { runner as covalentRunner, nftRunner as covalentNFTRunner, walletTxRunner as covalentWalletTxRunner } from './covalent/index'
import { runner as alchemyRunner, nftRunner as alchemyNFTRunner, walletTxRunner as alchemyWalletTxRunner } from './alchemy/index'
import { runner as nftPortRunner, nftRunner as nftPortNFTRunner, walletTxRunner as nftPortWalletTxRunner } from './nftport/index'
import { walletTxRunner as moralisWalletTxRunner } from './moralis/index'
import { changeRunner } from './update/'

(async () => {

    // token balance
    try {

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
        const loadTest = false

        // **** uncomment below table for testing

        balanceTable.push(
        //        [balanceApis[0], `${await sequenceRunner({ loadTest: loadTest })}`]
        //     ,  [balanceApis[1], `${await infuraRunner({ loadTest: loadTest })}`]
            //   [balanceApis[2], `${await covalentRunner({ loadTest: loadTest })}`]
        //     ,  [balanceApis[3], `${await alchemyRunner({ loadTest: loadTest })}`]
        //     ,  [balanceApis[4], `${await nftPortRunner({ loadTest: loadTest })}`]
        );

        console.log('/===== Token Balance Benchmark =====/')
        console.log(balanceTable.toString());
    }catch(e){
        console.log(e)
    }

    // time to index
    try {

        // instantiate
        var balanceChangeTable = new Table({
            head: ['API', 'Time without Relayer (ms)']
        , colWidths: [30, 30]
        });

        // balances
        const balanceChangeApis = [
            'Sequence Indexer', // https://docs.sequence.xyz/indexer/fetch-tokens
            'Infura API', // https://docs.infura.io/infura/tutorials/ethereum/retrieve-the-balance-of-an-erc-20-token
            'Covalent Balances', // https://www.covalenthq.com/docs/api/balances/get-token-balances-for-address/
            // 'Chainstack NFT API', // https://chainstack.com/nft-api/
            'Alchemy', // https://docs.alchemy.com/reference/token-api-quickstart
            'NFTPort' // https://docs.nftport.xyz/reference/retrieve-nfts-owned-by-account
        ];

        const loadTest = false
        // const res = await changeRunner()
        balanceChangeTable.push(
            //    [balanceChangeApis[0], `${res[0]}`],
            //    [balanceChangeApis[4], `${res[1]}`],
            //    [balanceChangeApis[1], `${res[2]}`],
            //    [balanceChangeApis[3], `${res[3]}`]
        );
        console.log('/===== Time to Index Benchmark =====/')
        console.log(balanceChangeTable.toString());
    }catch(e){
        console.log(e)
    }

    // metadata 
    try {
        
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

        const loadTest = false

        // **** uncomment below table for testing

        nftTable.push(
            // [nftApis[0], `${await sequenceNFTRunner({ loadTest: loadTest })}`]
            // [nftApis[1], `${await infuraNFTRunner({ loadTest: loadTest })}`]
        //   , [nftApis[2], `${await covalentNFTRunner({ loadTest: loadTest })}`]
        //   , [nftApis[3], `${await alchemyNFTRunner({ loadTest: loadTest })}`]
        //   ,  [nftApis[4], `${await nftPortNFTRunner({ loadTest: loadTest })}`]
        );
        
        console.log('/===== NFT Metadata Benchmark =====/')
        console.log(nftTable.toString())
    }catch(e){
        console.log(e)
    }

    // transactions history from wallet
    try{
        // instantiate
        var txHistoryTable = new Table({
            head: ['API', 'Time (ms)']
        , colWidths: [30, 30]
        });

        // metadata
        const txAPI = [
            'Sequence Indexer Metadata', // https://docs.sequence.xyz/indexer/unique-tokens
            'Infura NFT API', //https://docs.infura.io/infura/infura-expansion-apis/nft-api/nft-sdk/how-to/get-nft-information
            'Covalent ', // https://www.covalenthq.com/docs/api/nft/get-nft-token-ids-for-contract-with-metadata/#core-rendering/
            // 'Chainstack NFT API', // https://chainstack.com/nft-api/
            'Alchemy', // https://docs.alchemy.com/reference/nft-api-quickstart
            'NFTPort', // https://docs.nftport.xyz/reference/retrieve-nft-details
            'Moralis' // https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-transactions
        ]

        const loadTest = false

        txHistoryTable.push(
            [txAPI[0], `${await sequenceWalletTxRunner({ loadTest: loadTest })}`]
            // [nftApis[1], `${await infuraWalletTxRunner({ loadTest: loadTest })}`] // fails with block to block
           , [txAPI[2], `${await covalentWalletTxRunner({ loadTest: loadTest })}`]
        ,   [txAPI[3], `${await alchemyWalletTxRunner({ loadTest: loadTest })}`]
         ,   [txAPI[4], `${await nftPortWalletTxRunner({ loadTest: loadTest })}`]
          [txAPI[5], `${await moralisWalletTxRunner({loadTest: loadTest})}`]
        );
        
        console.log('/===== Wallet Transaction History Benchmark =====/')
        console.log(txHistoryTable.toString())

    }catch(e){
        console.log(e)
    }

    // transactions history from contract
    try{
        // instantiate
        var txContractHistoryTable = new Table({
            head: ['API', 'Time (ms)']
        , colWidths: [30, 30]
        });

        // metadata
        const txAPI = [
            'Sequence Indexer Metadata', // https://docs.sequence.xyz/indexer/unique-tokens
            'Infura NFT API', //https://docs.infura.io/infura/infura-expansion-apis/nft-api/nft-sdk/how-to/get-nft-information
            'Covalent ', // https://www.covalenthq.com/docs/api/nft/get-nft-token-ids-for-contract-with-metadata/#core-rendering/
            // 'Chainstack NFT API', // https://chainstack.com/nft-api/
            'Alchemy', // https://docs.alchemy.com/reference/nft-api-quickstart
            'NFTPort', // https://docs.nftport.xyz/reference/retrieve-nft-details
            'Moralis' // https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-transactions
        ]

        const loadTest = false

        txContractHistoryTable.push(
            [txAPI[0], `${await sequenceWalletTxRunner({ loadTest: loadTest })}`]
            // [nftApis[1], `${await infuraWalletTxRunner({ loadTest: loadTest })}`] // fails with block to block
           , [txAPI[2], `${await covalentWalletTxRunner({ loadTest: loadTest })}`]
        ,   [txAPI[3], `${await alchemyWalletTxRunner({ loadTest: loadTest })}`]
         ,   [txAPI[4], `${await nftPortWalletTxRunner({ loadTest: loadTest })}`]
          [txAPI[5], `${await moralisWalletTxRunner({loadTest: loadTest})}`]
        );
        
        console.log('/===== Contract Transaction History Benchmark =====/')
        console.log(txContractHistoryTable.toString())
    }catch(e){
        console.log(e)
    }

})()