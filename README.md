# web3-infrastructure-benchmark

![](./ships.png)

## methodology

### 1. Token Balance
- 10 different wallet addresses
- 10 requests per wallet address
- ~1 second between requests
- 100 trialed average across apis

### 2. NFT metadata
- 10 different smart contract address
- 10 requests per smart contract
- ~1 second between requests
- 100 trialed average across apis

### 3. ERC1155 Token Balance "time to update"
- average over 30 state changes with the sequence relayer

# 1. Token Balance
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

## Graph Comparison: Token Balance Benchmark (ms)
![](./benchmark_averages.png)

# 2. NFT metadata

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

## Graph Comparison: NFT Metadata Benchmark (ms)
![](./benchmark_nft.png)

# 3. ERC1155 Token Balance Time to Update (ms)
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
## Graph Comparison: "Time to Update" Benchmark
![](./token_update_nft_1.png)

# 4. Transaction History (ms)
```
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time (ms)                    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer             │ 71.25                        │
├──────────────────────────────┼──────────────────────────────┤
| Infura                       | N/A                          |
├──────────────────────────────┼──────────────────────────────┤
│ Covalent                     │ 316.01                       │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 216.06                       │
├──────────────────────────────┼──────────────────────────────┤
│ Moralis                      │ 115.88                       │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 344.5                        │
└──────────────────────────────┴──────────────────────────────┘
```

## Graph Comparison: Transaction History Benchmark
![](./tx_history_benchmark.png)
