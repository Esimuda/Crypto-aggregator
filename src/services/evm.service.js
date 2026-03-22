const mockData = require('../mock/evm.mock')
const { normalizePosition } = require('../utils/normalize')

const USE_MOCK = process.env.USE_MOCK === 'true'

const fetchEthereumBalances = async (address) => {
  if (USE_MOCK) {
    const { nativeBalance, tokens } = mockData.ethereum
    const positions = []

    positions.push(normalizePosition(
      nativeBalance.symbol,
      parseFloat(nativeBalance.balance),
      0,
      'ethereum',
      'wallet'
    ))

    tokens.forEach(t => {
      positions.push(normalizePosition(
        t.symbol,
        parseFloat(t.balance),
        0,
        'ethereum',
        'wallet',
        { contractAddress: t.contractAddress }
      ))
    })

    return positions
  }
}

const fetchBaseBalances = async (address) => {
  if (USE_MOCK) {
    const { nativeBalance, tokens } = mockData.base
    const positions = []

    positions.push(normalizePosition(
      nativeBalance.symbol,
      parseFloat(nativeBalance.balance),
      0,
      'base',
      'wallet'
    ))

    tokens.forEach(t => {
      positions.push(normalizePosition(
        t.symbol,
        parseFloat(t.balance),
        0,
        'base',
        'wallet',
        { contractAddress: t.contractAddress }
      ))
    })

    return positions
  }
}

const fetchAllEVMData = async (address) => {
  const [ethereum, base] = await Promise.all([
    fetchEthereumBalances(address),
    fetchBaseBalances(address)
  ])

  return {
    source: 'evm',
    accounts: { ethereum, base },
    all: [...ethereum, ...base]
  }
}

module.exports = { fetchAllEVMData }