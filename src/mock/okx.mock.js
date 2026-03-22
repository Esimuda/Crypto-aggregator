const mockOKXData = {
  spot: [
    { ccy: 'BTC', availBal: '0.3', frozenBal: '0.0' },
    { ccy: 'ETH', availBal: '2.5', frozenBal: '0.0' },
    { ccy: 'USDT', availBal: '3000.00', frozenBal: '0.0' },
    { ccy: 'SOL', availBal: '20.0', frozenBal: '0.0' },
  ],
  futures: [
    {
      instId: 'BTC-USDT-SWAP',
      posSide: 'long',
      pos: '0.2',
      avgPx: '58000.00',
      markPx: '62000.00',
      upl: '800.00',
      lever: '5',
      margin: '2320.00'
    },
    {
      instId: 'SOL-USDT-SWAP',
      posSide: 'short',
      pos: '-10',
      avgPx: '150.00',
      markPx: '145.00',
      upl: '50.00',
      lever: '3',
      margin: '483.33'
    }
  ],
  funding: [
    { ccy: 'USDT', availBal: '2000.00' },
    { ccy: 'BTC', availBal: '0.1' }
  ]
}

module.exports = mockOKXData