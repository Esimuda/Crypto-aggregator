const mockBinanceData = {
  spot: {
    balances: [
      { asset: 'BTC', free: '0.5', locked: '0.0' },
      { asset: 'ETH', free: '4.2', locked: '0.0' },
      { asset: 'USDT', free: '1200.00', locked: '0.0' },
      { asset: 'BNB', free: '10.0', locked: '0.0' },
    ]
  },
  usdtFutures: {
    balances: [
      { asset: 'USDT', balance: '5000.00', availableBalance: '3200.00' }
    ],
    positions: [
      {
        symbol: 'BTCUSDT',
        positionAmt: '0.1',
        entryPrice: '60000.00',
        markPrice: '62000.00',
        unrealizedProfit: '200.00',
        leverage: '10',
        positionSide: 'LONG'
      },
      {
        symbol: 'ETHUSDT',
        positionAmt: '-1.5',
        entryPrice: '3200.00',
        markPrice: '3100.00',
        unrealizedProfit: '150.00',
        leverage: '5',
        positionSide: 'SHORT'
      }
    ]
  },
  coinFutures: {
    balances: [
      { asset: 'BTC', balance: '0.2', availableBalance: '0.15' }
    ],
    positions: [
      {
        symbol: 'BTCUSD_PERP',
        positionAmt: '10',
        entryPrice: '59000.00',
        markPrice: '62000.00',
        unrealizedProfit: '0.005',
        leverage: '3',
        positionSide: 'LONG'
      }
    ]
  },
  crossMargin: {
    totalAssetOfBtc: '0.15',
    totalLiabilityOfBtc: '0.02',
    totalNetAssetOfBtc: '0.13',
    userAssets: [
      { asset: 'BTC', free: '0.1', borrowed: '0.02', interest: '0.0001' },
      { asset: 'USDT', free: '2000.00', borrowed: '500.00', interest: '0.5' }
    ]
  },
  isolatedMargin: {
    assets: [
      {
        symbol: 'BTCUSDT',
        baseAsset: { asset: 'BTC', free: '0.05', borrowed: '0.01' },
        quoteAsset: { asset: 'USDT', free: '1000.00', borrowed: '200.00' }
      }
    ]
  }
}

module.exports = mockBinanceData