const mockEVMData = {
  ethereum: {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    nativeBalance: {
      symbol: 'ETH',
      balance: '2.45'
    },
    tokens: [
      { symbol: 'USDT', balance: '5000.00', contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7' },
      { symbol: 'USDC', balance: '3200.00', contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
      { symbol: 'LINK', balance: '150.00', contractAddress: '0x514910771af9ca656af840dff83e8264ecf986ca' },
      { symbol: 'UNI', balance: '80.00', contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984' }
    ]
  },
  base: {
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    nativeBalance: {
      symbol: 'ETH',
      balance: '0.8'
    },
    tokens: [
      { symbol: 'USDC', balance: '1500.00', contractAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913' },
      { symbol: 'DAI', balance: '800.00', contractAddress: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb' }
    ]
  }
}

module.exports = mockEVMData