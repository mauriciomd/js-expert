const { describe, it } = require('mocha')
const { expect } = require('chai')
const { InvalidRegexError, evaluateRegex} = require('./../src/util')

describe('#Util', () => {
  it('#evaluateRegex should throw an error using an unsafe expression', () => {
    const regex = /^([a-z|A-Z|0-9]+\s?)+$/ 

    expect(() => evaluateRegex(regex)).to.throw(InvalidRegexError, `The expression ${regex} is unsafe, man!`)
  })
  
  it('#evaluateRegex should not throw an error using an safe expression', () => {
    const regex = /^([a-z])$/ 

    expect(() => evaluateRegex(regex)).to.not.throw
    expect(evaluateRegex(regex)).to.be.deep.equal(regex)
  })
})