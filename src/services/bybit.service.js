const mockData = require('../mock/bybit.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchBybitSpot = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    return mockData.spot
      .filter(b => parseFloat(b.free) > 0)
      .map(b => normalizePosition(
        b.coin,
        parseFloat(b.free) + parseFloat(b.locked),
        0,
        'bybit',
        'spot'
      ))
  }
}

const fetchBybitFutures = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    return mockData.futures
      .filter(p => parseFloat(p.size) > 0)
      .map(p => normalizePosition(
        p.symbol,
        p.size,
        parseFloat(p.positionValue),
        'bybit',
        'futures',
        {
          entryPrice: parseFloat(p.avgPrice),
          markPrice: parseFloat(p.markPrice),
          unrealizedPnl: parseFloat(p.unrealisedPnl),
          leverage: parseInt(p.leverage),
          side: p.side === 'Buy' ? 'LONG' : 'SHORT'
        }
      ))
  }
}

const fetchBybitUnified = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    return mockData.unified
      .filter(b => parseFloat(b.equity) > 0)
      .map(b => normalizePosition(
        b.coin,
        parseFloat(b.equity),
        parseFloat(b.equity),
        'bybit',
        'unified'
      ))
  }
}

const fetchAllBybitData = async (apiKey, secretKey) => {
  const [spot, futures, unified] = await Promise.all([
    fetchBybitSpot(apiKey, secretKey),
    fetchBybitFutures(apiKey, secretKey),
    fetchBybitUnified(apiKey, secretKey)
  ])

  return {
    source: 'bybit',
    accounts: { spot, futures, unified },
    all: [...spot, ...futures, ...unified]
  }
}

module.exports = { fetchAllBybitData }