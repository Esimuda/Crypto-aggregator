const { fetchAllBinanceData } = require('../services/binance.service')
const { fetchAllOKXData } = require('../services/okx.service')
const { fetchAllBybitData } = require('../services/bybit.service')
const { fetchAllEVMData } = require('../services/evm.service')
const { fetchAllSolanaData } = require('../services/solana.service')
const { fetchAllUniswapData } = require('../services/uniswap.service')
const { fetchAllDYDXData } = require('../services/dydx.service')

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

exports.getWalletPortfolio = async (req, res) => {
  try {
    const { evmAddress, solanaAddress } = req.query

    const [evm, solana, uniswap, dydx] = await Promise.all([
      fetchAllEVMData(evmAddress || 'mock'),
      fetchAllSolanaData(solanaAddress || 'mock'),
      fetchAllUniswapData(evmAddress || 'mock'),
      fetchAllDYDXData(evmAddress || 'mock')
    ])

    const all = [...evm.all, ...solana.all, ...uniswap.all, ...dydx.all]

    res.json({
      sources: { evm, solana, uniswap, dydx },
      all,
      summary: {
        totalPositions: all.length,
        chains: ['ethereum', 'base', 'solana'],
        dex: ['uniswap', 'dydx']
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch wallet portfolio' })
  }
}

exports.getAllPortfolios = async (req, res) => {
  try {
    const [binance, okx, bybit, evm, solana, uniswap, dydx] = await Promise.all([
      fetchAllBinanceData(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET_KEY),
      fetchAllOKXData(process.env.OKX_API_KEY, process.env.OKX_SECRET_KEY, process.env.OKX_PASSPHRASE),
      fetchAllBybitData(process.env.BYBIT_API_KEY, process.env.BYBIT_SECRET_KEY),
      fetchAllEVMData('mock'),
      fetchAllSolanaData('mock'),
      fetchAllUniswapData('mock'),
      fetchAllDYDXData('mock')
    ])

    const all = [
      ...binance.all,
      ...okx.all,
      ...bybit.all,
      ...evm.all,
      ...solana.all,
      ...uniswap.all,
      ...dydx.all
    ]

    res.json({
      sources: { binance, okx, bybit, evm, solana, uniswap, dydx },
      all,
      summary: {
        totalPositions: all.length,
        exchanges: ['binance', 'okx', 'bybit'],
        chains: ['ethereum', 'base', 'solana'],
        dex: ['uniswap', 'dydx']
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch all portfolios' })
  }
}