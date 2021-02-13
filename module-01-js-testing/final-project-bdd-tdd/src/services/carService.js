const BaseRepository = require('../repository/base/baseRepository')
const Tax = require('../entities/tax')
const Transaction = require('../entities/transaction')

class CarService {
  constructor({ cars }) {
    this.repository = new BaseRepository({ filename: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(
      Math.random() * listLength
    )
  }

  chooseRandomCar(carCategory) {
    const randomPosition = this.getRandomPositionFromArray(carCategory.carsId)
    const carId = carCategory.carsId[randomPosition]

    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.repository.find(carId)

    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = (price * tax) * numberOfDays
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)
    
    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const dueDate = today.toLocaleDateString('pt-br', dateOptions)
    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate
    })

    return transaction
  }
}

module.exports = CarService