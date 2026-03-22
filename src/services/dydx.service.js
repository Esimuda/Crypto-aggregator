const mockData = require('../mock/dydx.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchDYDXPositions = async (address) => {
  if (USE_MOCK) {
    return mockData.positions.map(p => normalizePosition(
      p.market,
      parseFloat(p.size),
      Math.abs(parseFloat(p.size)) * parseFloat(p.markPrice),
      'dydx',
      'perp',
      {
        side: p.side,
        entryPrice: parseFloat(p.entryPrice),
        markPrice: parseFloat(p.markPrice),
        unrealizedPnl: parseFloat(p.unrealizedPnl),
        realizedPnl: parseFloat(p.realizedPnl),
        leverage: parseInt(p.leverage)
      }
    ))
  }
}

const fetchDYDXAccount = async (address) => {
  if (USE_MOCK) {
    return {
      equity: parseFloat(mockData.equity),
      freeCollateral: parseFloat(mockData.freeCollateral)
    }
  }
}

const fetchAllDYDXData = async (address) => {
  const [positions, account] = await Promise.all([
    fetchDYDXPositions(address),
    fetchDYDXAccount(address)
  ])

  return {
    source: 'dydx',
    accounts: { perp: positions },
    account,
    all: positions
  }
}

module.exports = { fetchAllDYDXData }