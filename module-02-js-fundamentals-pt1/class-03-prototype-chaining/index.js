const assert = require('assert')

const object = {}
const array =[]
const fn = () => {}

// internally, literal objects turn to explicit functions
console.log('{} is new Object() ?', {}.__proto__ === new Object().__proto__)
assert.deepStrictEqual({}.__proto__, new Object().__proto__)

// __proto__ is the object's reference that has its properties
console.log('object.__proto__ is equal to Object.prototype', object.__proto__ === Object.prototype)
assert.deepStrictEqual(object.__proto__, Object.prototype)

console.log('array.__proto__ === Array.prototype', array.__proto__ === Array.prototype)
assert.deepStrictEqual(array.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// the __proto__ of the Object.prototype isnull null
console.log('object.__proto__.__proto__ === null', object.__proto__.__proto__ === null) // 'object' <- Object.prototype <- null
assert.deepStrictEqual(object.__proto__.__proto__, null)


console.log('----------------- Heritage ------------------')
function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}
// Inherit the Employee instance
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// We can call the inherited functions using __proto__, but if we try to call directly it results in error
console.log('Manager.prototype.salary()', Manager.prototype.salary())
// Manager.salary() --> error!

// If we don't use the 'new' keyword, the first __proto__ will always be a function's instance 
// (because we created the 'class' using functions), without inheriting the classes.
// To access those  classes without 'new', we have to use the prototype
console.log('Manager.prototype.__proto__ === Supervisor.prototype?', Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// When we use 'new', the __proto__ receives the current prototype
console.log('new Manager().__proto__: %s | new Manager().salary():', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
console.log('manager.salary():', manager.salary())
console.log('manager.profitShare():', manager.profitShare())
console.log('manager.monthlyBonuses():', manager.monthlyBonuses())

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)


class T1 {
  ping() {
    return 'ping'
  }
}

class T2 extends T1 {
  pong() {
    return 'pong'
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot'
  }
}

const t3 = new T3()
console.log('t3.ping():', t3.ping())
console.log('t3.pong():', t3.pong())
console.log('t3.shoot():', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)