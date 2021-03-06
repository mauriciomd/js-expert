const { expect } = require('chai')
const { it, describe } = require('mocha')
const { productValidator } = require('../src/index')
const ProductDataBuilder = require('./model/productDataBuilder')

describe('Test Data Builder', () => {
  it('should return result equal true with a valid product', () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)
    const expected = {
      errors: [],
      result: true,
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('Product Validator Rules', () => {
    it('should return an object error when a product is created with an invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build()
      const result = productValidator(product)
      const expected = {
        errors: ['id: invalid length, current [0] expected to be between [2, 20]'],
        result: false,
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when a product is created with an invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)
      const expected = {
        errors: ['name: invalid value, current [A.b.c.123] expected only words'],
        result: false,
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when a product is created with an invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)
      const expected = {
        errors: ['price: invalid value, current [1900] expected values between [0, 1000]'],
        result: false,
      }

      expect(result).to.be.deep.equal(expected)
    })

    it('should return an object error when a product is created with an invalid category', () => {
      const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
      const result = productValidator(product)
      const expected = {
        errors: ['category: invalid value, current [Musical instrument] expected Eletronic or Organic'],
        result: false,
      }

      expect(result).to.be.deep.equal(expected)
    })
  })
})