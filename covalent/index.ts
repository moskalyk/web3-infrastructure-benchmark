
import { start, end } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async () => {
    start()
    // call api
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + new Buffer('cqt_rQFjvkvxXdm3DGtJTgt8WDmhhwxJ').toString('base64'));
    
    await fetch(`https://api.covalenthq.com/v1/polygon/address/${process.env.WALLET_PUBLIC_ADDRESS}/balances_v2/`, {method: 'GET', headers: headers})
      // .then((resp) => resp.json())
      // .then((data) => console.log(data));

    return end()
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