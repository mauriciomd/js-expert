import Order from './entities/order.js'
import OrderBusiness from './business/orderBusiness.js'

const order = new Order({
  customerId: 1,
  amount: 89.970,
  products: ['Ford F150'],
})

const orderBusiness = new OrderBusiness()
console.info('Order Business created:', orderBusiness.create(order))