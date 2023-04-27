import { end, wait } from '../utils'
import { ethers } from 'ethers'
import { sequence } from '0xsequence'
import { RpcRelayer } from '@0xsequence/relayer'
import { Wallet } from '@0xsequence/wallet'
import { SequenceIndexerClient } from '@0xsequence/indexer'

import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
import { Alchemy, Network } from "alchemy-sdk";

// configs
const POLLING_TIME = 300

// sequence
const provider = new ethers.providers.JsonRpcProvider('https://nodes.sequence.app/polygon')
const serverPrivateKey = process.env!.PKEY!
const walletEOA = new ethers.Wallet(serverPrivateKey, provider)
const relayer = new RpcRelayer({url: 'https://polygon-relayer.sequence.app', provider: provider})
const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')

// infura

// Create Auth object
const auth = new Auth({
    projectId: process.env.INFURA_API_KEY,
    secretId: process.env.INFURA_API_KEY_SECRET,
    privateKey: process.env.WALLET_PRIVATE_KEY,
    chainId: 137,
  });
  
// Instantiate SDK
const sdk = new SDK(auth);

// alchemy
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
  };
  
const alchemy = new Alchemy(settings);

const getAddress = async () => {
    const wallet = (await Wallet.singleOwner(walletEOA)).connect(provider, relayer)
    return await wallet.getAddress()
}

const getAverages = (times: any) => {

    const sums: number[] = new Array(times[0].length).fill(0)
    for(let j = 0; j < times[0].length; j++){
        for(let i = 0; i < times.length; i++){
            sums[j] = sums[j] + times[i][j][1]
        }
    }

    const averages: number[] = []

    for(let i = 0; i < times[0].length; i++){
        averages.push(sums[i] / times.length)
    }
      
    return averages
}

const sequenceListener = async (address: string, balance: number, contractAddress: string) => {

    return new Promise(async (resolve, reject) => {

        let interval = setInterval(async () => {
            // query Sequence Indexer for all token balances of the account on Polygon
            try{

                const tokenBalances = await indexer.getTokenBalances({
                    accountAddress: address,
                    contractAddress: contractAddress
                })
    
                tokenBalances.balances.map((token) => {
                    // if there is a change in balance
                    console.log(Number(token.balance))
                    if(contractAddress == token.contractAddress && Number(token.balance) == balance){
                        console.log(token.balance, ' vs ', balance)
                        resolve(new Date())
                        clearInterval(interval)
                    }
                })

            }catch(e){
                console.log(e)
            }

            console.log('polling... sequence')
        }, POLLING_TIME)
    })
}

const nftPortPagination = async (contractAddress: string) => {
    const options = {method: 'GET', headers: {accept: 'application/json', Authorization: process.env!.NFT_PORT_API_KEY!}};

    const balancesPaginated: any = []
    const res = await fetch(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}?chain=polygon`, options)
    
    let balances = await res.json()
    if(!balances!.error)  balancesPaginated.push(...balances.transactions)

    while(balances.continuation){
        await wait(1100)
        try{
            const res = await fetch(`https://api.nftport.xyz/v0/transactions/nfts/${contractAddress}?chain=polygon&continuation=${balances.continuation}`, options)
            balances = await res.json()
        }catch(e){
            console.log('ERROR')
            console.log(e)
        }
        if(!balances!.error) balancesPaginated.push(...balances.transactions)
    }

    return balancesPaginated
}

const nftportListener = async (address: string, balance: any, contractAddress: any) => {

    return new Promise(async (resolve, reject) => {

        let interval = setInterval(async () => {
            try{
                const balances = await nftPortPagination(contractAddress)
                // console.log(balances)
                const balanceMap = new Map()
                balances.map((event: any) => {
                    if(event.type == 'transfer'){
                        if(!balanceMap.has(event.transfer_to)){
                            balanceMap.set(event.transfer_to, 1)
                        } else {
                            balanceMap.set(event.transfer_to, balanceMap.get(event.transfer_to)+1)
                        }
                    }
                })
                if(balanceMap.get(address) == balance) {
                    console.log('success')
                    resolve(new Date())
                    clearInterval(interval)
                } 
                // else { resolve(new Date())}
            }catch(e){
                console.log(e)
            }

            console.log('polling... nftport')
        }, POLLING_TIME)
    })
}

const infuraListener = async (address: string, balance: any, contractAddress: any) => {

    return new Promise(async (resolve, reject) => {

        let interval = setInterval(async () => {
            try{
                const res = await sdk.api.getNFTs({
                    publicAddress: address,
                });
                res.assets.map((asset: any) => {
                    if(asset.contract == contractAddress && Number(asset.supply) == balance){
                        console.log('success')
                        resolve(new Date())
                        clearInterval(interval)
                    }
                })

            }catch(e){
                console.log(e)
            }

            console.log('polling... infura')
        }, POLLING_TIME)
    })
}
// grr 401 errors
// const covalentListener = async (address: string, balance: any, contractAddress: any) => {
//     // await wait(1000)
//     return new Promise(async (resolve, reject) => {

//         // let interval = setInterval(async () => {
//             try{

//                 let headers = new Headers();
//                 headers.set('Authorization', 'Basic ' + new Buffer(process.env!.COVALENT_API_KEY!).toString('base64'));

//                 // start()
//                 
//                 const res = await fetch(`https://api.covalenthq.com/v1/polygon/address/${address}/collection/${contractAddress}/`, {method: 'GET', headers: headers})
//                 console.log(res)
//                 const balances = await res.json()
//                 console.log(balances)

//             }catch(e){
//                 console.log(e)
//             }

//             console.log('polling...')
//         // }, 200)
//     })
// }

const alchemyListener = async (address: string, balance: any, contractAddress: any) => {

    return new Promise(async (resolve, reject) => {

        let interval = setInterval(async () => {
            try{

                const nfts = await alchemy.nft.getNftsForOwner(address);
                nfts.ownedNfts.map((token: any) => {
                    if(token.contract.address == contractAddress && Number(token.balance) == balance){
                        console.log('success alchemy')
                        resolve(new Date())
                        clearInterval(interval)
                    }
                })
                
            }catch(e){
                console.log(e)
            }
            console.log('polling... alchemy')
        }, POLLING_TIME)
    })
}

const executeTx = async (address: string) => {

    console.log('running...')

    // Create your Sequence server wallet, controlled by your server EOA, and connect it to the relayer
    const wallet = (await Wallet.singleOwner(walletEOA)).connect(provider, relayer)

    const erc1155TokenAddress = '0xEcBD06a3E4d6485237320007d10e944C3a7E40a7'

    // Craft your transaction
    const erc1155Interface = new ethers.utils.Interface([
        'function claim(uint type_, address address_) public'
    ])

    try{

        const data = erc1155Interface.encodeFunctionData(
            'claim', [0, address]
        )
    
        const txn = {
            to: erc1155TokenAddress,
            data
        }
        // Request the possible fee options the relayer will accept for this transaction
        const [config, context] = await Promise.all([wallet.getWalletConfig(), wallet.getWalletContext()])
        const { options, quote } = await relayer.getFeeOptions(config[0], context, txn /* , txn2, txn3, etc... */)
        // const options = []
        // Choose a fee from the list of options returned by the relayer
        // MATIC is native to Polygon and needs to be handled differently than other ERC-20 tokens like USDC
        // === To pay the fee in native MATIC: ===
        const option: any= options.find((option: any)=> option.token.symbol === 'MATIC')
        console.log(options)

        if (!option) {
            console.log('sending the tx without a fee...')

            // Send your transaction with the fee and quote to the relayer for dispatch
            const tx = await wallet.sendTransaction(txn)
            console.log(tx)

            // Wait for transaction to be mined
            // const txnReceipt = await txnResponse.wait()

            // // Check if transaction was successful 
            // if (txnReceipt.status != 1) {
            //     console.log(`Unexpected status: ${txnReceipt.status}`)
            //     throw new Error(`Unexpected status: ${txnReceipt.status}`)
            // }

            return { tx: tx }
        } else { // to be used for mainnet / polygon
            console.log('sending the tx with a fee...')

            // // Craft the MATIC fee payment transaction
            // // revertOnError: true is required for fee payments
            const feeTxn = {
                to: option.to,
                value: option.value,
                gasLimit: option.gasLimit,
                revertOnError: true
            }
            // // === MATIC fee ===

            // // Send your transaction with the fee and quote to the relayer for dispatch
            const tx = await wallet.sendTransaction([txn, feeTxn], undefined, undefined, quote)
            console.log(tx)

            // // Wait for transaction to be mined
            // const txnReceipt = await txnResponse.wait()

            // // Check if transaction was successful 
            // if (txnReceipt.status != 1) {
            //     console.log(`Unexpected status: ${txnReceipt.status}`)
            //     throw new Error(`Unexpected status: ${txnReceipt.status}`)
            // }

            return { tx: tx }
        }
    }catch(e: any){
        console.log(e)
        throw new Error(e)
    }
}

const changeRunner = async () => {
    console.log(`relaying from this sequence wallet: ${await getAddress()}`)
    
    const accountAddress = process.env!.WALLET_PUBLIC_ADDRESS!

    const contractAddress = "0xecbd06a3e4d6485237320007d10e944c3a7e40a7"

    let balance: any = 0;

    // start time
    const times: any = []

    for(let i = 0; i < 30; i++){

        const tokenBalances = await indexer.getTokenBalances({
            accountAddress: accountAddress,
            contractAddress: contractAddress
        })
    
        // get balance
        tokenBalances.balances.map((token) => {
            if(contractAddress == token.contractAddress){
                console.log(token.balance, ' vs ', balance)
                balance = Number(token.balance)
            } else {
                console.log('zero balance')
            }
        })
    
        console.log(`starting balance ${balance}`)

        const start: any = new Date()

        // send relay update
        const tx = await executeTx(accountAddress)
        const mid: any = new Date()

        try{

            const [sequenceTime, nftportTime, infuraTime, alchemyTime]: any[] = await Promise.all([
                sequenceListener(accountAddress, balance+1, contractAddress), 
                nftportListener(accountAddress, balance+1, contractAddress),
                infuraListener(accountAddress, balance+1, contractAddress),
                // covalentListener(accountAddress, balance, contractAddress),
                alchemyListener(accountAddress, balance+1, contractAddress)
            ]);

            times.push([
                [Math.round(sequenceTime - start), Math.round(sequenceTime - mid)], 
                [Math.round(nftportTime - start), Math.round(nftportTime - mid)],
                [Math.round(infuraTime - start), Math.round(infuraTime - mid)],
                [Math.round(alchemyTime - start), Math.round(alchemyTime - mid)]
            ])

            await wait(5000)
        }catch(e){
            console.log(e)
            return []
        }
    }

    const averages = getAverages(times)
    
    return averages;

}

export {
    changeRunner
}