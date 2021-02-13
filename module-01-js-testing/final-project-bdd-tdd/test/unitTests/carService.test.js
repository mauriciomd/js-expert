const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { join } = require('path')
const { expect } = require('chai')
const sinon = require('sinon')
const CarService = require('../../src/services/carService')

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
})