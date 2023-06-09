# web3-infrastructure-benchmark

![](./ships.png)

## methodology

### 1. Token Balance
- 10 different wallet addresses
- 10 requests per wallet addresses
- ~1 second between requests
- 100 trialed average across apis

### 2. NFT metadata
- 10 different smart contract addresses
- 10 requests per smart contract
- ~1 second between requests
- 100 trialed average across apis

### 3. ERC1155 Token Balance "time to update"
- average over 30 state changes post transaction mined using sequence relayer

### 4. Wallet Transaction History
- 10 different wallet addresses
- 10 requests per wallet addresses
- ~1 second between requests
- 100 trialed average across apis

### 5. Contract Transaction History
- 10 different smart contract addresses
- 10 requests per smart contract
- ~1 second between requests
- 100 trialed average across apis

# 1. Token Balance
```
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

# 2. NFT metadata (one shot requests)
TBC
```
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

# 3. ERC1155 Token Balance Time to Update
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
## Graph Comparison: "Time to Update" Benchmark (ms)
![](./token_update_nft_1.png)

# 4. Wallet Transaction History
```
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time (ms)                    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer             │ 86.7                         │
├──────────────────────────────┼──────────────────────────────┤
| Infura                       | N/A                          |
├──────────────────────────────┼──────────────────────────────┤
│ Covalent                     │ 456.93                       │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 253.3                        │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 365.7                        │
├──────────────────────────────┼──────────────────────────────┤
│ Moralis                      │ 109.65                       │
└──────────────────────────────┴──────────────────────────────┘
```

## Graph Comparison: Wallet Transaction History Benchmark (ms)
![](./wallet_tx_history_benchmark_1.png)

# 5. Contract Transaction History
```
┌──────────────────────────────┬──────────────────────────────┐
│ API                          │ Time (ms)                    │
├──────────────────────────────┼──────────────────────────────┤
│ Sequence Indexer             │ 87.5                         │
├──────────────────────────────┼──────────────────────────────┤
│ Covalent                     │ 258.35                       │
├──────────────────────────────┼──────────────────────────────┤
│ Alchemy                      │ 195.6                        │
├──────────────────────────────┼──────────────────────────────┤
│ NFTPort                      │ 325.9                        │
├──────────────────────────────┼──────────────────────────────┤
│ Moralis                      │ 471.89                       │
└──────────────────────────────┴──────────────────────────────┘
```

## Graph Comparison: Contract Transaction History Benchmark (ms)
![](./contract_tx_history_benchmark.png)
