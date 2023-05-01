
import { start, end, wait } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async (config: any) => {
  const times: any = []
  const ADDRESSES = process.env!.ADDRESSES?.split(',')!

    for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
        // call api
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + new Buffer(process.env.COVALENT_API_KEY!+":").toString('base64'));
        if(config.loadTest == false) await wait(1000)
        
        start()
        
        await fetch(`https://api.covalenthq.com/v1/matic-mainnet/address/${ADDRESSES[j]}/balances_v2/`, {method: 'GET', headers: headers})
          // .then((resp) => resp.json())
          // .then((data) => console.log(data));
        // console.log(await res.json())

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
            let headers = new Headers();
            headers.set('Authorization', 'Basic ' + new Buffer(process.env.COVALENT_API_KEY!+":").toString('base64'));

            start()
            await fetch(`https://api.covalenthq.com/v1/matic-mainnet/nft/${ADDRESSES[j]}/${`0`}/`, {method: 'GET', headers: headers})
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
        // call api
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + new Buffer(process.env.COVALENT_API_KEY!+":").toString('base64'));
        if(config.loadTest == false) await wait(1000)
        
        start()
        
        await fetch(`https://api.covalenthq.com/v1/matic-mainnet/address/${ADDRESSES[j]}/transactions_v2/`, {method: 'GET', headers: headers})
          // .then((res) => res.json())
          // .then((data) => console.log(data))
          // .catch((e) => console.log(e));

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