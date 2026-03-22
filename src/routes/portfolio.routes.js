const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const {
  getBinancePortfolio,
  getOKXPortfolio,
  getBybitPortfolio,
  getWalletPortfolio,
  getAllPortfolios
} = require('../controllers/portfolio.controller')

router.get('/binance', auth, getBinancePortfolio)
router.get('/okx', auth, getOKXPortfolio)
router.get('/bybit', auth, getBybitPortfolio)
router.get('/wallet', auth, getWalletPortfolio)
router.get('/all', auth, getAllPortfolios)

module.exports = router