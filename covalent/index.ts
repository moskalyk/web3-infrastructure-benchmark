
import { start, end } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async () => {
    console.log(process.env.WALLET_PUBLIC_ADDRESS)
    start()
    // call api
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + new Buffer('cqt_rQFjvkvxXdm3DGtJTgt8WDmhhwxJ').toString('base64'));
    
    await fetch(`https://api.covalenthq.com/v1/polygon/address/${process.env.WALLET_PUBLIC_ADDRESS}/balances_v2/`, {method: 'GET', headers: headers})
      // .then((resp) => resp.json())
      // .then((data) => console.log(data));

    return end()
}

export {
  runner
}