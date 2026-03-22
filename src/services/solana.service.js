const mockData = require('../mock/solana.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchSolanaBalances = async (address) => {
  if (USE_MOCK) {
    const { nativeBalance, tokens } = mockData
    const positions = []

    positions.push(normalizePosition(
      nativeBalance.symbol,
      parseFloat(nativeBalance.balance),
      0,
      'solana',
      'wallet'
    ))

    tokens.forEach(t => {
      positions.push(normalizePosition(
        t.symbol,
        parseFloat(t.balance),
        0,
        'solana',
        'wallet',
        { mint: t.mint }
      ))
    })

    return positions
  }
}

const fetchAllSolanaData = async (address) => {
  const balances = await fetchSolanaBalances(address)

  return {
    source: 'solana',
    accounts: { wallet: balances },
    all: balances
  }
}

module.exports = { fetchAllSolanaData }