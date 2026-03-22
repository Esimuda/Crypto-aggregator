const mockData = require('../mock/okx.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchOKXSpot = async (apiKey, secretKey, passphrase) => {
  if (USE_MOCK) {
    return mockData.spot
      .filter(b => parseFloat(b.availBal) > 0)
      .map(b => normalizePosition(
        b.ccy,
        parseFloat(b.availBal) + parseFloat(b.frozenBal),
        0,
        'okx',
        'spot'
      ))
  }
}

const fetchOKXFutures = async (apiKey, secretKey, passphrase) => {
  if (USE_MOCK) {
    return mockData.futures
      .filter(p => parseFloat(p.pos) !== 0)
      .map(p => normalizePosition(
        p.instId,
        p.pos,
        Math.abs(parseFloat(p.pos)) * parseFloat(p.markPx),
        'okx',
        'futures',
        {
          entryPrice: parseFloat(p.avgPx),
          markPrice: parseFloat(p.markPx),
          unrealizedPnl: parseFloat(p.upl),
          leverage: parseInt(p.lever),
          side: p.posSide.toUpperCase(),
          margin: parseFloat(p.margin)
        }
      ))
  }
}

const fetchOKXFunding = async (apiKey, secretKey, passphrase) => {
  if (USE_MOCK) {
    return mockData.funding
      .filter(b => parseFloat(b.availBal) > 0)
      .map(b => normalizePosition(
        b.ccy,
        parseFloat(b.availBal),
        0,
        'okx',
        'funding'
      ))
  }
}

const fetchAllOKXData = async (apiKey, secretKey, passphrase) => {
  const [spot, futures, funding] = await Promise.all([
    fetchOKXSpot(apiKey, secretKey, passphrase),
    fetchOKXFutures(apiKey, secretKey, passphrase),
    fetchOKXFunding(apiKey, secretKey, passphrase)
  ])

  return {
    source: 'okx',
    accounts: { spot, futures, funding },
    all: [...spot, ...futures, ...funding]
  }
}

module.exports = { fetchAllOKXData }