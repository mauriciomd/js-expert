const Database = require("../utils/Database")
const UserRepository = require("../repositories/userRepository")
const UserService = require("../services/userService")

class UserFactory {
  static async createInstance() {
    const db = new Database({ connectionString: 'database://url' })
    const dbConnection = await db.connect()

    const userRepository = new UserRepository({ dbConnection })
    const service = new UserService({ userRepository })

    return service
  }
}

module.exports = UserFactory