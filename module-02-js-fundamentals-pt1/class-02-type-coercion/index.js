const { type } = require("os")

true + 2 // = 3
true - 2 // = -1

'21' + true // = '21true'
'21' - true // = 20

9999999999999999 // = 10000000000000000
0.1 + 0.2 === 0.3 // = false (0.30000000000000004)

3 > 2 > 1 // = false
3 > 2 >= 1 // = true

'21' - -1 // = 22

// Loose Equality Operator (==) permits the JavaScript engine to try and cast these expressions to a common type. 
// Meaning that the expressions don't necessarily need to be of the same type.
'1' == 1 // = true

// Strict Equality Operator (===), unlike the loose equality operator we talked about before, it not allows JS to 
// try the implicit conversion. Meaning the output won't be true unless both the type and values of the two expressions match.
'1' === 1 // = false


// -------------------
console.assert(String(123) === '123', 'explict conversion to string')
console.assert(123 + '' === '123', 'implicit conversion to string')

console.assert((null || 123) === 123, 'it returns the only truthy value')
console.assert(('hello' || 123) === 'hello', 'if both values are true, || will return the first one')
console.assert(('hello' && 123) === 123, 'if both values are true, && will return the last one')

// -------------------
const object = {
  name: 'Mauricio',
  age: 27,

  // If the type coercion is to string, js will call first toString method and then valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },

  // If the type coercion is to number, js will call first valueOf method and then toString
  valueOf() {
    return this.age
  },

  // Higher priority in the type coercion
  [Symbol.toPrimitive](coercionType) {
    console.log('Trying to convert to', coercionType)

    const types = {
      string: JSON.stringify(this),
      number: this.age,
    }

    return types[coercionType] || types.string
  }
}

console.assert(String(object) === '{"name":"Mauricio","age":27}')
console.assert(Number(object) === 27)

// It calls the default conversion (which is string) because we don'have an implementation
// for the required type
console.log(new Date(object)) // = Invalid date -> it returns a string

console.assert('Ae '.concat(object) === 'Ae {"name":"Mauricio","age":27}') // The concat method will convert the object to string
console.assert(object + 0 === '{"name":"Mauricio","age":27}0') // it will call the default coercion type
console.assert(!!object) // First, it calls the default coercion type and then converts to boolean (using !!)
console.assert(object == String(object)) // The implicit coercion will try to convert to default (which is string)

// In this case, object2 will receive the overrided methods (to string, valueOf and Symbom.toPrimitive)
// inherited by "object"
const object2 = {
  ...object,
  name: 'Xuxa da silva',
  age: 666
}

console.assert(String(object2) === '{"name":"Xuxa da silva","age":666}')