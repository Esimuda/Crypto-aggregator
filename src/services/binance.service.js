const mockData = require('../mock/binance.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchSpotBalances = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    const balances = mockData.spot.balances
    return balances
      .filter(b => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0)
      .map(b => normalizePosition(
        b.asset,
        parseFloat(b.free) + parseFloat(b.locked),
        0,
        'binance',
        'spot'
      ))
  }
}

const fetchUsdtFutures = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    const { balances, positions } = mockData.usdtFutures

    const balancePositions = balances.map(b =>
      normalizePosition(b.asset, b.balance, parseFloat(b.balance), 'binance', 'usdt-futures')
    )

    const openPositions = positions
      .filter(p => parseFloat(p.positionAmt) !== 0)
      .map(p => normalizePosition(
        p.symbol,
        p.positionAmt,
        Math.abs(parseFloat(p.positionAmt)) * parseFloat(p.markPrice),
        'binance',
        'usdt-futures',
        {
          entryPrice: parseFloat(p.entryPrice),
          markPrice: parseFloat(p.markPrice),
          unrealizedPnl: parseFloat(p.unrealizedProfit),
          leverage: parseInt(p.leverage),
          side: parseFloat(p.positionAmt) > 0 ? 'LONG' : 'SHORT'
        }
      ))

    return [...balancePositions, ...openPositions]
  }
}

const fetchCoinFutures = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    const { balances, positions } = mockData.coinFutures

    const balancePositions = balances.map(b =>
      normalizePosition(b.asset, b.balance, 0, 'binance', 'coin-futures')
    )

    const openPositions = positions
      .filter(p => parseFloat(p.positionAmt) !== 0)
      .map(p => normalizePosition(
        p.symbol,
        p.positionAmt,
        0,
        'binance',
        'coin-futures',
        {
          entryPrice: parseFloat(p.entryPrice),
          markPrice: parseFloat(p.markPrice),
          unrealizedPnl: parseFloat(p.unrealizedProfit),
          leverage: parseInt(p.leverage),
          side: parseFloat(p.positionAmt) > 0 ? 'LONG' : 'SHORT'
        }
      ))

    return [...balancePositions, ...openPositions]
  }
}

const fetchCrossMargin = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    return mockData.crossMargin.userAssets.map(a =>
      normalizePosition(
        a.asset,
        parseFloat(a.free),
        0,
        'binance',
        'cross-margin',
        {
          borrowed: parseFloat(a.borrowed),
          interest: parseFloat(a.interest)
        }
      )
    )
  }
}

const fetchIsolatedMargin = async (apiKey, secretKey) => {
  if (USE_MOCK) {
    const positions = []
    mockData.isolatedMargin.assets.forEach(pair => {
      positions.push(normalizePosition(
        pair.baseAsset.asset,
        pair.baseAsset.free,
        0,
        'binance',
        'isolated-margin',
        { pair: pair.symbol, borrowed: parseFloat(pair.baseAsset.borrowed) }
      ))
      positions.push(normalizePosition(
        pair.quoteAsset.asset,
        pair.quoteAsset.free,
        0,
        'binance',
        'isolated-margin',
        { pair: pair.symbol, borrowed: parseFloat(pair.quoteAsset.borrowed) }
      ))
    })
    return positions
  }
}

const fetchAllBinanceData = async (apiKey, secretKey) => {
  const [spot, usdtFutures, coinFutures, crossMargin, isolatedMargin] =
    await Promise.all([
      fetchSpotBalances(apiKey, secretKey),
      fetchUsdtFutures(apiKey, secretKey),
      fetchCoinFutures(apiKey, secretKey),
      fetchCrossMargin(apiKey, secretKey),
      fetchIsolatedMargin(apiKey, secretKey)
    ])

  return {
    source: 'binance',
    accounts: {
      spot,
      usdtFutures,
      coinFutures,
      crossMargin,
      isolatedMargin
    },
    all: [...spot, ...usdtFutures, ...coinFutures, ...crossMargin, ...isolatedMargin]
  }
}

module.exports = { fetchAllBinanceData }