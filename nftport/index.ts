import { start, end, wait } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async (config: any) => {
  const options = {method: 'GET', headers: {accept: 'application/json', Authorization: process.env!.NFT_PORT_API_KEY!}};
  const times: any = []
  const ADDRESSES = process.env!.ADDRESSES?.split(',')!

  for (let j = 0; j < ADDRESSES.length; j++){
    for(let i = 0; i < 10; i++){
      if(config.loadTest == false) await wait(1000)

      // call api
      start()
      await fetch(`https://api.nftport.xyz/v0/accounts/${ADDRESSES[j]}?chain=polygon`, options)
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
              const options = {method: 'GET', headers: {accept: 'application/json', Authorization: process.env!.NFT_PORT_API_KEY!}};
              start()
              await fetch(`https://api.nftport.xyz/v0/nfts/${ADDRESSES[j]}?chain=polygon&page_number=1&page_size=50&include=metadata&refresh_metadata=false`, options)
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
  runner,
  nftRunner
}