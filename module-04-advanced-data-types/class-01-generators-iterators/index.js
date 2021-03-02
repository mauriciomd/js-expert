const assert = require('assert')

function* multiply(x, y) {
  yield x * y
}

function* main() {
  yield 'Hello'
  yield '-'
  yield 'World'
  // yield multiply(10, 10) // Here, main will return an Object - yield does not execute the multiply function
  yield* multiply(10, 10) // On the other hand, yield* will execute multiply and return its value
}

const generator = main()

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 100 , done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

// There are other ways to get all the generated values
assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 100])
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 100])


// ==== Async Iterators ====
const { readFile, stat, readdir } = require('fs/promises')

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('Hey Dude')
}

async function* sysInfo() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

// First option to resolve the promises is using Promise.all
Promise.all([...promisified()]).then(result => console.log('Promisified =>', result))

// The second option is using for await
;
(async () => {
  for await (const item of promisified()) {
    console.log('For await =>', item)
  }
})()

;
(async () => {
  for await (const item of sysInfo()) {
    console.log('Sys infor =>', item)
  }
})()