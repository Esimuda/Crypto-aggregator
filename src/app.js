const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/health', require('./routes/health.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/portfolio', require('./routes/portfolio.routes'))

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = app