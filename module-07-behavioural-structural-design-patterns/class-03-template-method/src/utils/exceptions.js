class NotImplementedException extends Error {
  constructor({ message }) {
    super(`[${message}] was called without a valid implementation`)
    this.name = 'NotImplementedException';
  }
}

export { NotImplementedException }