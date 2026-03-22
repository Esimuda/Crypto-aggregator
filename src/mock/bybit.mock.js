const mockBybitData = {
  spot: [
    { coin: 'BTC', free: '0.25', locked: '0.0' },
    { coin: 'ETH', free: '3.0', locked: '0.0' },
    { coin: 'USDT', free: '5000.00', locked: '0.0' },
    { coin: 'MATIC', free: '500.0', locked: '0.0' }
  ],
  futures: [
    {
      symbol: 'BTCUSDT',
      side: 'Buy',
      size: '0.15',
      avgPrice: '59000.00',
      markPrice: '62000.00',
      unrealisedPnl: '450.00',
      leverage: '10',
      positionValue: '9300.00'
    },
    {
      symbol: 'ETHUSDT',
      side: 'Sell',
      size: '2.0',
      avgPrice: '3300.00',
      markPrice: '3100.00',
      unrealisedPnl: '400.00',
      leverage: '5',
      positionValue: '6200.00'
    }
  ],
  unified: [
    { coin: 'USDT', equity: '10000.00', availableToWithdraw: '7000.00' }
  ]
}

module.exports = mockBybitData