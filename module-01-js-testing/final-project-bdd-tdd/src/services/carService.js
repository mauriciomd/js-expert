const BaseRepository = require('../repository/base/baseRepository')

class CarService {
  constructor({ cars }) {
    this.repository = new BaseRepository({ filename: cars })
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
}

module.exports = CarService