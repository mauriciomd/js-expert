const { fake } = require('faker')
const faker = require('faker')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/carCaterogy')
const Customer = require('./../src/entities/customer')

const databaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 3

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carsId: [],
  price: parseFloat(faker.finance.amount(20, 100)),
})

const cars = []
const customers = []
for (let index = 0; index < ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    isGasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  })
  carCategory.carsId.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 60 })
  })
  customers.push(customer)
}

const write = (filename, data) => writeFile(join(databaseFolder, filename), JSON.stringify(data))

;
(async () => {
  await write('cars.json', cars);
  await write('carCategories.json', [carCategory])
  await write('customers.json', customers)
})()