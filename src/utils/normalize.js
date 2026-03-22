const normalizePosition = (asset, amount, valueUSD, source, accountType, extra = {}) => {
  return {
    asset,
    amount: parseFloat(amount),
    valueUSD: parseFloat(valueUSD),
    source,
    accountType,
    ...extra
  }
}

module.exports = { normalizePosition }