const assert = require('assert')

// Using Symbol as Object keys
const uniqueKey = Symbol('userName') // It will always be unique at the memory address level
const obj = {}

obj['userName'] = 'Value for string keys'
obj[uniqueKey] = 'Value for Symbol keys'

assert.deepStrictEqual('Value for string keys', obj.userName)
assert.deepStrictEqual('Value for Symbol keys', obj[uniqueKey])
assert.deepStrictEqual(undefined, obj[Symbol('userName')])

console.log('Object symbols', Object.getOwnPropertySymbols(obj))
assert.deepStrictEqual(Object.getOwnPropertySymbols(obj)[0], uniqueKey)

obj[Symbol.for('password')] = 123 // ByPass (bad practice)
assert.deepStrictEqual(obj[Symbol.for('password')], 123)


// Well Known Symbols
const object = {
  // Iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

for (const item of object) {
  console.log('item:', item)
}
assert.deepStrictEqual([...object], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  get [Symbol.toStringTag]() {
    return 'WTF?!'
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()

    const items = this[kItems].map(item => 
                                    new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
                                    .format(item)
                                  )
    
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

    for (const item of this[kItems]) {
      await timeout(500)
      yield item.toISOString()
    }
  }
}

const myDates = new MyDate(
  [2020, 03, 01],
  [2019, 02, 02]
)

const expectedDates = [
  new Date(2020, 03, 01),
  new Date(2019, 02, 02)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDates), '[object WTF?!]')
assert.deepStrictEqual(String(myDates), '01 de abril de 2020 e 02 de março de 2019')
assert.throws(() => myDates + 1, TypeError)
assert.deepStrictEqual([...myDates], expectedDates)

;(async () => {
  for await (const item of myDates) {
    console.log('Async Iterator:', item)
  }

  const dates = await Promise.all([...myDates])
  assert.deepStrictEqual(dates, expectedDates)
})()