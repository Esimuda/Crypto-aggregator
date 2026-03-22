const mockDYDXData = {
  address: 'dydx1abcdef123456789',
  equity: '15000.00',
  freeCollateral: '8000.00',
  positions: [
    {
      market: 'BTC-USD',
      side: 'LONG',
      size: '0.1',
      entryPrice: '60000.00',
      markPrice: '62000.00',
      unrealizedPnl: '200.00',
      realizedPnl: '350.00',
      leverage: '5'
    },
    {
      market: 'ETH-USD',
      side: 'SHORT',
      size: '2.0',
      entryPrice: '3300.00',
      markPrice: '3100.00',
      unrealizedPnl: '400.00',
      realizedPnl: '120.00',
      leverage: '3'
    }
  ]
}

module.exports = mockDYDXData