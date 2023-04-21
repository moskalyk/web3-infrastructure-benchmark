import { start, end, wait } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async (config: any) => {
  const options = {method: 'GET', headers: {accept: 'application/json', Authorization: '90959bcc-3bba-4cd3-9760-a669635f0985'}};
  const times: any = []
  const ADDRESSES = process.env!.ADDRESSES?.split(',')!

  for (let j = 0; j < ADDRESSES.length; j++){
    for(let i = 0; i < 10; i++){
      if(config.loadTest == false) await wait(1000)

      // call api
      start()
      await fetch(`https://api.nftport.xyz/v0/accounts/${ADDRESSES[j]}?chain=polygon&page_size=50&include=metadata`, options)
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
  // https://api.nftport.xyz/v0/nfts/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d?chain=ethereum&page_number=1&page_size=50&include=metadata&refresh_metadata=false
  const options = {method: 'GET', headers: {accept: 'application/json', Authorization: '90959bcc-3bba-4cd3-9760-a669635f0985'}};
  
  start()
    // call api

  await fetch(`https://api.nftport.xyz/v0/nfts/0x631998e91476DA5B870D741192fc5Cbc55F5a52E?chain=polygon&page_number=1&page_size=50&include=metadata&refresh_metadata=false`, options)
  return end()
}

export {
  runner,
  nftRunner
}