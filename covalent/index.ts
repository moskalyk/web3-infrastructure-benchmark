
import { start, end, wait } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async (config: any) => {
  const times: any = []
  const ADDRESSES = process.env!.ADDRESSES?.split(',')!

    for (let j = 0; j < ADDRESSES.length; j++){
      for(let i = 0; i < 10; i++){
        // call api
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + new Buffer('cqt_rQFjvkvxXdm3DGtJTgt8WDmhhwxJ').toString('base64'));
        if(config.loadTest == false) await wait(1000)
        
        start()
        
        await fetch(`https://api.covalenthq.com/v1/polygon/address/${ADDRESSES[j]}/balances_v2/`, {method: 'GET', headers: headers})
          // .then((resp) => resp.json())
          // .then((data) => console.log(data));
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
  start()
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + new Buffer('cqt_rQFjvkvxXdm3DGtJTgt8WDmhhwxJ').toString('base64'));
  
  await fetch(`https://api.covalenthq.com/v1/polygon/nft/${`0x631998e91476DA5B870D741192fc5Cbc55F5a52E`}/${`0`}/`, {method: 'GET', headers: headers})

  return end()
}

export {
  runner,
  nftRunner
}