const mockUniswapData = {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  positions: [
    {
      tokenId: '123456',
      token0: { symbol: 'ETH', amount: '0.5' },
      token1: { symbol: 'USDC', amount: '1550.00' },
      feeTier: '0.05%',
      inRange: true,
      uncollectedFees: {
        token0: '0.002',
        token1: '6.20'
      },
      liquidity: '1500000',
      valueUSD: '3100.00'
    },
    {
      tokenId: '789012',
      token0: { symbol: 'WBTC', amount: '0.05' },
      token1: { symbol: 'USDT', amount: '3100.00' },
      feeTier: '0.30%',
      inRange: false,
      uncollectedFees: {
        token0: '0.0001',
        token1: '6.20'
      },
      liquidity: '800000',
      valueUSD: '6200.00'
    }
  ]
}

module.exports = mockUniswapData