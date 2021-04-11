class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  async find() {
    const users = await this.userRepository.find()
    return users
            .map(item => ({ ...item, name: item.name.toUpperCase() }))
  }
}

module.exports = UserService