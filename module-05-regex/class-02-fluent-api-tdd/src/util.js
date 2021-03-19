const safeRegex = require('safe-regex')

class InvalidRegexError extends Error {
  constructor(exp) {
    super(`The expression ${exp} is unsafe, man!`)
    this.name = 'InvalidRegexError'
  }
}

const evaluateRegex = regex => {
  const isSafe = safeRegex(regex)
  if (isSafe) return regex

  throw new InvalidRegexError(regex)
}

module.exports = { InvalidRegexError, evaluateRegex }