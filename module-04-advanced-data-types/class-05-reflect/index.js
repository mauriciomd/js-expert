'use strict';

// Main goal: guarantee the security and semantic of objects

const assert = require('assert')

// Apply
const myClass = {
  add(value) {
    return this.a + this.b + value
  }
}

assert.deepStrictEqual(myClass.add.apply({ a: 1, b: 1}, [1]), 3)

// This problem could happen, someone override the Function.prototype.apply (it's rare)
Function.prototype.apply = function () { throw new TypeError('Override') }
assert.throws(
  () => myClass.add.apply({ a: 1, b: 1}, [1]),
  {
    name: 'TypeError',
    message: 'Override'
  }
)

// Now, using Reflect
assert.deepStrictEqual(Reflect.apply(myClass.add, { a: 1, b : 1}, [1]), 3)


// =============== Semantic issues
// Define property
function MyFunction() {}

Object.defineProperty(MyFunction, 'withObject', { value: () => 'Hey, Object!' })
Reflect.defineProperty(MyFunction, 'withReflect', { value: () => 'Hey, Reflect!' })
assert.deepStrictEqual(MyFunction.withObject(), 'Hey, Object!')
assert.deepStrictEqual(MyFunction.withReflect(), 'Hey, Reflect!')

// Delete property
const withDelete = { user: 'Xuxa' }
const deleteWithReflect = { user: 'Joaozinho' }

delete withDelete.user
Reflect.deleteProperty(deleteWithReflect, 'user')

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)
assert.deepStrictEqual(deleteWithReflect.hasOwnProperty('user'), false)

// We should do 'get' only in objects instances
assert.deepStrictEqual(1['user'], undefined)
assert.throws(() => Reflect.get(1, 'user'), TypeError)

// Own Keys
const symbolUser = Symbol('user')
const myObj = {
  id: 1,
  [symbolUser]: 'Joaozinho',
  [Symbol.for('password')]: 123,
}

// Using object methods
const objectKeys = [
  ...Object.getOwnPropertyNames(myObj),
  ...Object.getOwnPropertySymbols(myObj),
]

assert.deepStrictEqual(objectKeys, ['id', symbolUser, Symbol.for('password')])
assert.deepStrictEqual(Reflect.ownKeys(myObj), ['id', symbolUser, Symbol.for('password')])