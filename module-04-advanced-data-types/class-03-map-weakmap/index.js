const assert = require('assert')

const myMap = new Map()
// We can use anything as a key
myMap
  .set(1, 'one')
  .set('2', { value: 'two' })
  .set(true, () => 'hello')

// Using the constructor
const myMapWithConstructor = new Map([
  [1, 'one'],
  ['two', 2]
])

console.log(myMapWithConstructor)

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('2'), { value: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// In Object, the key only can be string or Symbol.
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, 'Map')

assert.deepStrictEqual(myMap.get({ id: 1}), undefined) // { id: 1 } is stored in another memory address
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), 'Map')

// Utils - Comparing with Object

// Object key lenght => Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4)

// Check if the object has a specific property
// ({ property: 'test' }).hasOwnProperty('property') === true
assert.ok(myMap.has(onlyReferenceWorks))

// Remove a property
// delete object.property => bad performance
assert.ok(myMap.delete(onlyReferenceWorks))

// It's not possible to iterate on Object
// We have to use Object.entries()
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([[1,"one"], ["2",{"value":"two"}], [true, () => 'hello']])
)

// Using for...of
for (const [key, value] of myMap) {
  console.log(`key: ${key} | value: ${value}`)
}

// The Object is unsafe because it's possible to override a default behavior 
// inherited, like valueOf, toString, etc.
const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen Xuxa'
}

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// It's not possible to clean an object without re-assigning it
myMap.clear()
assert.deepStrictEqual(myMap.size, 0)
assert.deepStrictEqual([...myMap.keys()], [])


// ============= WeakMap ============

// It has almost all the benefits from Map but does not allow iterate. The keys
// must be references that you already know. However, it's is lighter than Map 
// and prevents memory leak because when an instance is removed from memory, 
// all is clean
const weakMap = new WeakMap()
const hero = { name: 'Flash' }
weakMap.set(hero)
weakMap.has(hero)
weakMap.get(hero)
weakMap.delete(hero)