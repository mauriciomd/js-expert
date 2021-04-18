import knex from 'knex'

export default class PostgresStrategy {
  #dbInstance

  constructor (connectionString) {
    this.connectionString = connectionString
    this.table = 'warriors'
  }

  async connect() {
    this.#dbInstance = await knex({
      client: 'pg',
      connection: this.connectionString,
    })

    return this.#dbInstance.raw('select 1+1 as result')
  }

  async create(item) {
    return this.#dbInstance
      .insert(item)
      .into(this.table)
  }

  async read(item) {
    return this.#dbInstance.select().from(this.table)
  }
}