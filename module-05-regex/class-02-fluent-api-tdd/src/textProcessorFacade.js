const TextProcessorFluentAPI = require('./textProcessorFluentAPI')

class TextProcessorFacade {
  #textProcessorFluentApi

  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentAPI(text)
  }

  getPeopleFromPdf() {
    return this.#textProcessorFluentApi
              .extractPeopleData()
              .divideTextIntoColumns()
              .removeEmptyCharacters()
              .mapPerson()
              .build()
  }
}

module.exports = TextProcessorFacade