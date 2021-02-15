const assert = require('assert')

// Passing by value: It creates a copy of the counter's value and assigns to counter2
let counter = 0
let counter2 = counter
counter2++

assert.deepStrictEqual(counter, 0)
assert.deepStrictEqual(counter2, 1)

// Passing by reference: The two variables appoint to the same memory address.
// If we change the value of any one of them, the other will receive the same effect
let obj = { value: 1 }
let obj2 = obj
obj.value++
obj2.value++

assert.deepStrictEqual(obj.value, 3)
assert.deepStrictEqual(obj2.value, 3)
