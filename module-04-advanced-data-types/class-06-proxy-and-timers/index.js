const Events = require('events')

// ============== Proxy ==============
// The idea of the Proxy is, given an Object and a bunch of hooks, it spits out in
// a new Object that wraps the old one with these hooks.
const event = new Events()
const eventName = 'counter'
event.on(eventName, msg => console.log('it was called with:', msg))

const myCounter = {
  value: 1,
}

const proxy = new Proxy(myCounter, {
  set: (target, property, newValue) => {
    event.emit(eventName, { newValue, key: target[property] })
    target[property] = newValue

    return true
  },

  get: (target, property) => {
    // console.log('It called get', { target, property })
    return target[property]
  },
})

// ============== Timers ==============
// It starts in the near future and keeps executing forever
setInterval(function () {
  proxy.value += 1;
  console.log('4 => setInterval')
  if (proxy.value === 10) clearInterval(this)
}, 200);

// It executes right now, but it does not take care of the life cycle
process.nextTick(() => {
  console.log('1 => nextTick')
  proxy.value = 2
})

// It executes right now, taking care of the life cycle
// Bad practice
setImmediate(() => {
  console.log('2 => setImmediate', proxy.value)
})

// It executes the function in the future
setTimeout(() => {
  console.log('3 => setTimeout') // [3] because the time is less than that used in the setInterval
}, 100)