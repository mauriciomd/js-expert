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
    const regex = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(regex);
    this.#content = onlyPerson
    
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI