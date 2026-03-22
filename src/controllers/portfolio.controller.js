const { fetchAllBinanceData } = require('../services/binance.service')

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