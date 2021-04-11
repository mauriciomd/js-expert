const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// <It could be in another file>
const dbData = [{ id: 2, name: 'Mariazinha' }, { id: 3, name: 'John' }]
class MockDatabase {
  connect = () => this
  find = async () => dbData
} 
// </It could be in another file>

rewiremock(() => require('../src/utils/Database')).with(MockDatabase)

;
(async () => {
  {
    const expected = [{ id: 2, name: 'MARIAZINHA' }, { id: 3, name: 'JOHN' }]
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userService = await UserFactory.createInstance()
    const result = await userService.find()

    deepStrictEqual(result, expected)
    rewiremock.disable()
  }

  {
    const expected = [{ id: 1, name: 'JOHN DOE' }]
    // rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userService = await UserFactory.createInstance()
    const result = await userService.find()

    deepStrictEqual(result, expected)
    // rewiremock.disable()
  }
})()