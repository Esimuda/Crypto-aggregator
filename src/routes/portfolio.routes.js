const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const { getBinancePortfolio } = require('../controllers/portfolio.controller')

router.get('/binance', auth, getBinancePortfolio)

module.exports = router