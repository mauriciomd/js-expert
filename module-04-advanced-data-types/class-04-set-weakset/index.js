const assert = require('assert')

// The first use of Set: list with unique values
const arr = [1, 2, 3]
const arr2 = [2, 0, 1]

const arr3 = arr.concat(arr2)
assert.deepStrictEqual(arr3.sort(), [0, 1, 1, 2, 2, 3])

// Now, using Set
// There is no method get, so you have to use all the list
const mySet = new Set()
arr.forEach(item => mySet.add(item))
arr2.forEach(item => mySet.add(item))

assert.deepStrictEqual(Array.from(mySet).sort(), [0, 1, 2, 3])
assert.deepStrictEqual(Array.from(new Set([...arr, ...arr2])), [1, 2, 3, 0])

assert.deepStrictEqual(mySet.keys(), mySet.values()) // The keys() and values() exist only to be compatible with Map

// How to check if exist an element?
// [0, 1, 2].indexOf(1) !== -1 or [0].includes(0)
assert.ok(mySet.has(0))

const users = new Set([
  'Joaozinho',
  'Xuxa',
  'Jack'
])

const users2 = new Set([
  'Xuxa',
  'Jorge',
  'Maria'
])

const intersection = new Set([...users].filter(user => users2.has(user)))
const difference = new Set([...users].filter(user => !users2.has(user)))

assert.deepStrictEqual(Array.from(intersection), ['Xuxa'])
assert.deepStrictEqual(Array.from(difference), ['Joaozinho', 'Jack'])

// WeakSet has the same idea as WeakMap. It only works with references
const object = { id: 123 }
const object2 = { id: 456 }
const myWeakSet = new WeakSet([object])

myWeakSet.add(object2)
myWeakSet.delete(object2)
assert.ok(myWeakSet.has(object))