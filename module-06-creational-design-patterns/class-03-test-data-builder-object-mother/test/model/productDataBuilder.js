const Product = require("../../src/entities/product");

class ProductDataBuilder {
  constructor() {
    // The default is the correct info
    this.productData = {
      id: '0000001',
      name: 'Computer',
      price: 999.99,
      category: 'Eletronic',
    }
  }

  withInvalidId() {
    this.productData.id = ''
    
    return this
  }

  withInvalidName() {
    this.productData.name = 'A.b.c.123'

    return this
  }

  withInvalidPrice() {
    this.productData.price = 1900

    return this
  }

  withInvalidCategory() {
    this.productData.category = 'Musical instrument'

    return this
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  build() {
    return new Product(this.productData)
  }
}

module.exports = ProductDataBuilder