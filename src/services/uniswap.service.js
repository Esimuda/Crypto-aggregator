const mockData = require('../mock/uniswap.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchUniswapPositions = async (address) => {
  if (USE_MOCK) {
    return mockData.positions.map(p => normalizePosition(
      `${p.token0.symbol}/${p.token1.symbol}`,
      p.liquidity,
      parseFloat(p.valueUSD),
      'uniswap',
      'lp',
      {
        tokenId: p.tokenId,
        token0: p.token0,
        token1: p.token1,
        feeTier: p.feeTier,
        inRange: p.inRange,
        uncollectedFees: p.uncollectedFees
      }
    ))
  }
}

const fetchAllUniswapData = async (address) => {
  const positions = await fetchUniswapPositions(address)

  return {
    source: 'uniswap',
    accounts: { lp: positions },
    all: positions
  }
}

module.exports = { fetchAllUniswapData }