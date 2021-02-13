const { readFile } = require('fs/promises')

class BaseRepository {
  constructor({ filename }) {
    this.filename = filename
  }

  async find(itemId) {
    const fileContent = await readFile(this.filename)
    const fileData = JSON.parse(fileContent)

    if (!itemId) return fileData

    const item = fileData.find(({ id }) => id === itemId)
    return item
  }
}

module.exports = BaseRepository