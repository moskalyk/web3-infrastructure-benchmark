import { start, end } from '../utils'
import { fetch } from 'cross-fetch'

const runner = async () => {
    start()
    // call api

    const options = {method: 'GET', headers: {accept: 'application/json', Authorization: '90959bcc-3bba-4cd3-9760-a669635f0985'}};

    await fetch(`https://api.nftport.xyz/v0/accounts/${process.env.WALLET_PUBLIC_ADDRESS}?chain=ethereum&page_size=50&include=metadata`, options)
      // .then(response => response.json())
      // .then(response => console.log(response))
      // .catch(err => console.error(err));
    return end()
}

export {
  runner
}