const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const {
  getBinancePortfolio,
  getOKXPortfolio,
  getBybitPortfolio,
  getAllPortfolios
} = require('../controllers/portfolio.controller')

router.get('/binance', auth, getBinancePortfolio)
router.get('/okx', auth, getOKXPortfolio)
router.get('/bybit', auth, getBybitPortfolio)
router.get('/all', auth, getAllPortfolios)

module.exports = router