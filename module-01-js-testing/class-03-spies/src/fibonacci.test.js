const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

;
(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const expectedCallCount = 4
    
    for await (const _ of fibonacci.execute(3)) {}

    assert.deepStrictEqual(expectedCallCount, spy.callCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    
    const [...result] = fibonacci.execute(5)
    // What'is happening here:
    // [0]: input = 5, current = 0, next = 1
    // [1]: input = 4, current = 1, next = 1
    // [2]: input = 3, current = 1, next = 2
    // [3]: input = 2, current = 2, next = 3
    // [4]: input = 1, current = 3, next = 5
    // [5]: input = 0 -> stop the execution

    const { args } = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(result, expectedResult)

  }
})()