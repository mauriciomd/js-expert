const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')
const User = require('./user')

const DEFAULT_OPTIONS = {
  maxContentLines: 3,
  fields: ['id','name','profession','birthYear']
}

class File {
  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath)
    const content = (await readFile(filename)).toString('utf8')
    
    return content
  }
  
  static isValid(csvContent, parserOptions = DEFAULT_OPTIONS) {
    const [headers, ...contentWithoutHeaders] = csvContent.split('\n')
    const validHeaders = headers === parserOptions.fields.join(',')
    const validContentLength = (
      contentWithoutHeaders.length > 0 &&
      contentWithoutHeaders.length <= parserOptions.maxContentLines
    )

    if (!validHeaders) {
      return {
        error: error.FILE_HEADERS_ERROR_MESSAGE,
        valid: false,
      }
    }

    if (!validContentLength) {
      return {
        error: error.FILE_LENGHT_ERROR_MESSAGE,
        valid: false,
      }
    }

    return { 
      error: undefined,
      valid: true
    }

  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift() // It removes the first line of the array and assign it to the const
    const headers = firstLine.split(',')

    const data = lines.map(line => {
      const columns = line.split(',')
      const item = {}
      for (const index in headers) {
        item[headers[index]] = columns[index]
      }

      return new User(item)
    })

    return data
  }

  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if (!validation.valid) throw new Error(validation.error)
    
    const json = File.parseCsvToJson(content)

    return json
  }
}

module.exports = File