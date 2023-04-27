# web3-infrastructure-benchmark

![](./ships.png)

## methodology

### token balance
- 10 different wallet addresses
- 10 requests per wallet address
- >=1 second between requests

Result
```
Token Balance
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time (ms)                    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer             │ 132.62                       │
├──────────────────────────────┼──────────────────────────────┤
│ Infura API                   │ 916.79                       │
├──────────────────────────────┼──────────────────────────────┤
│ Covalent Balances            │ 216.03                       │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 189.56                       │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 2006.46                      │
└──────────────────────────────┴──────────────────────────────┘
```

## token balance benchmark
![](./benchmark_averages.png)

### NFT metadata
TBC

```
NFT Metadata (one shot requests)
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time (ms)                    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer Metadata    │ 94                           │
├──────────────────────────────┼──────────────────────────────┤
│ Infura NFT API               │ 298                          │
├──────────────────────────────┼──────────────────────────────┤
│ Covalent                     │ 228                          │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 179                          │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 422                          │
└──────────────────────────────┴──────────────────────────────┘
```

## metadata benchmark
![](./benchmark_nft.png)

### ERC1155 token balance update benchmark
```
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time without Relayer (ms)    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer             │ 467.3                        │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 26376                        │
├──────────────────────────────┼──────────────────────────────┤
│ Infura API                   │ 44382.6                      │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 705.7                        │
└──────────────────────────────┴──────────────────────────────┘

```
## time to update benchmark
![](./token_update_nft_1.png)
