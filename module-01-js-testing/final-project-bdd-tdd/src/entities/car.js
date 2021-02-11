const Base = require('./base/base')

class Car extends Base {
  constructor({ id, name, releaseYear, available, isGasAvailable }) {
    super({ id, name })
    
    this.releaseYear = releaseYear
    this.available = available
    this.isGasAvailable = isGasAvailable
  }
}

module.exports = Car