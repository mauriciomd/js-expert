import { describe, expect, test, jest, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness.js'
import Order from '../src/entities/order.js'

describe('#Test Suite for Template Method design pattert', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#OrderBusiness', () => {
    // This test was created to demonstrate the problems that occur when we don't use Template Method
    test('execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 123.33,
        products: ['Monitor', 'Keyboard', 'Mouse'],
      })

      // Every dev must follow the execution flow described below
      // in order to avoid failures on the system
      const orderBusiness = new OrderBusiness()

      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 123.33,
        products: ['Monitor', 'Keyboard', 'Mouse'],
      })

      // With the template method, the sequence is always the same avoiding the replication of logic and code
      const orderBusiness = new OrderBusiness()
      const validateFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
      const createFn = jest.spyOn(orderBusiness, orderBusiness._create.name)

      const result = orderBusiness.create(order)

      expect(result).toBeTruthy()
      expect(validateFn).toHaveBeenCalledWith(order)
      expect(createFn).toHaveBeenCalledWith(order)
    })
  })
})