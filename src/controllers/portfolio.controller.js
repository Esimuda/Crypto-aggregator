const { fetchAllBinanceData } = require('../services/binance.service')
const { fetchAllOKXData } = require('../services/okx.service')
const { fetchAllBybitData } = require('../services/bybit.service')

exports.getBinancePortfolio = async (req, res) => {
  try {
    const data = await fetchAllBinanceData(
      process.env.BINANCE_API_KEY,
      process.env.BINANCE_SECRET_KEY
    )
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch Binance portfolio' })
  }
}

exports.getOKXPortfolio = async (req, res) => {
  try {
    const data = await fetchAllOKXData(
      process.env.OKX_API_KEY,
      process.env.OKX_SECRET_KEY,
      process.env.OKX_PASSPHRASE
    )
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch OKX portfolio' })
  }
}

exports.getBybitPortfolio = async (req, res) => {
  try {
    const data = await fetchAllBybitData(
      process.env.BYBIT_API_KEY,
      process.env.BYBIT_SECRET_KEY
    )
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch Bybit portfolio' })
  }
}

exports.getAllPortfolios = async (req, res) => {
  try {
    const [binance, okx, bybit] = await Promise.all([
      fetchAllBinanceData(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET_KEY),
      fetchAllOKXData(process.env.OKX_API_KEY, process.env.OKX_SECRET_KEY, process.env.OKX_PASSPHRASE),
      fetchAllBybitData(process.env.BYBIT_API_KEY, process.env.BYBIT_SECRET_KEY)
    ])

    const all = [...binance.all, ...okx.all, ...bybit.all]

    res.json({
      sources: { binance, okx, bybit },
      all,
      summary: {
        totalPositions: all.length,
        exchanges: ['binance', 'okx', 'bybit']
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch all portfolios' })
  }
}