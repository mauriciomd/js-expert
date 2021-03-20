const { evaluateRegex } = require('./util')
const Person = require('./person')

// Fluent API: the goal here is executa tasks, step by step (as a pipeline)
// and then it calls the method 'build'. 
// This pattern is very similar to Builder Pattern
class TextProcessorFluentAPI {
  // private property
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const regex = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(regex)
    this.#content = onlyPerson
    
    return this
  }

  divideTextIntoColumns() {
    const regex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(regex))

    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, '')))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI