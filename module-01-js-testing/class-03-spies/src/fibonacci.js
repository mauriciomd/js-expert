class Fibonacci {
  // This is a generator that returns an iterator
  // There are 3 ways to read the data:
  // Using .next function, for await and rest/spread operator
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0
    }
    
    // it "returns" a value, i.e, current
    yield current

    // it "delegates" the execution but does not return anything
    yield* this.execute(input - 1, next, current + next)
  }
}

module.exports = Fibonacci