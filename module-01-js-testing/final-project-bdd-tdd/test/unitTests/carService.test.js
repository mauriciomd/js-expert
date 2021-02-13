const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')
const CarService = require('../../src/services/carService')
const Transaction = require('../../src/entities/transaction')

const carsDatabase = join(__dirname, './../../database', 'cars.json')
const mocks = {
  validCar: require('./../mocks/car-valid.json'),
  validCarCategory: require('./../mocks/carCategory-valid.json'),
  validCustomer: require('./../mocks/customer-valid.json')
}

describe('CarService Suite Tests', () => {
  let carService = undefined
  let sandbox = undefined

  before(() => {
    carService = new CarService({
      cars: carsDatabase
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.to.be.gte(0)
  })

  it('choose the first id from carsId in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const selectedCarIndex = 0
    
    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(selectedCarIndex)
    
    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carsId[selectedCarIndex]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('should return an available car when given a carCategory', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carsId = [car.id]

    sandbox.stub(
      carService.repository,
      carService.repository.find.name
    ).resolves(car)

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name
    )

    const result = await carService.getAvailableCar(carCategory)
    const expectedResult = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.repository.find.calledWithExactly(car.id))
    expect(result).to.be.deep.equal(expectedResult)
  })

  it('should calculate the final amount in real when given a carCategory, a customer and numberOfDays', () => {
    const customer = Object.create(mocks.validCustomer)
    const carCategory = Object.create(mocks.validCarCategory)
    const numberOfDays = 5

    customer.age = 50
    carCategory.price = 37.6
    
    sandbox.stub(
      carService,
      'taxesBasedOnAge'
    ).get(_ => [{ from: 40, to: 50, then: 1.3 }])

    const expected = carService.currencyFormat.format(244.40)
    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )
    
    expect(result).to.be.deep.equal(expected)
  })

  it('should return a transaction receipt when given a customer and a carCategory', async () => {
    const car = mocks.validCar
    const customer = Object.create(mocks.validCustomer)
    customer.age = 20
    
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carsId: [car.id],
    }
    const numberOfDays = 5
    const now = new Date(2020, 10, 5)

    sandbox.useFakeTimers(now.getTime())
    sandbox.stub(
      carService.repository,
      carService.repository.find.name
    ).resolves(car)

    // price: 37.6; tax: 1.1 = 41.36/day * 5 days = 206.8
    const expectedAmount = carService.currencyFormat.format(206.80)
    const dueDate = '10 de novembro de 2020'
    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate
    })

    const result = await carService.rent(customer, carCategory, numberOfDays)

    expect(result).to.be.deep.equal(expected)


  })
})