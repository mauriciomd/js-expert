const File = require('./src/file')
const { error } = require('./src/constants')
const { rejects, deepStrictEqual } = require('assert')

;
(async () => {
  {
    const filePath = '../mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection) 
    // it expectes that a promise to be rejected
  }

  {
    const filePath = '../mocks/fiveItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }

  {
    const filePath = '../mocks/headers-invalid.csv'
    const rejection = new Error(error.FILE_HEADERS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath) 

    await rejects(result, rejection)
  }

  {
    const filePath = '../mocks/fourItems-valid.csv'
    const expectedResult = [
      {
        "id": 1,
        "name": "Joaozinho",
        "profession": "professor",
        "birthYear": 1990
      },
      {
        "id": 2,
        "name": "Maria",
        "profession": "diretora",
        "birthYear": 1950
      },
      {
        "id": 3,
        "name": "Roberto",
        "profession": "prefeito",
        "birthYear": 1978
      }
    ]

    const result = await File.csvToJson(filePath)

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expectedResult))
    // it expects that the result and the object reference to be equal
    
    // WARNING: The order of the object properties influences the result. 
    // For the deepStrictEqual function, it means that { id: 123, name:  "John" } 
    // is not equal to { name: "Jhon", id: 123 } 
  }
})()