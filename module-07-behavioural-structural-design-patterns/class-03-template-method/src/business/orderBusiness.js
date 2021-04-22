import BaseBusiness from './base/baseBusiness.js'

export default class OrderBusiness extends BaseBusiness {
  #orders = new Set()

  _validateRequiredFields({ amount, products }) {
    return !!amount && !!products.length
  }

  _create(data) {
    this.#orders.add(data)

    return true
  }
}