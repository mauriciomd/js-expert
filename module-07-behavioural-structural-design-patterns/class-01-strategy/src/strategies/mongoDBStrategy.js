import MongoDB from 'mongodb'

export default class MongoDBStrategy {
  #dbInstance

  constructor (connectionString) {
    const { pathname: dbName } = new URL(connectionString)

    this.connectionString = connectionString.replace(dbName, '')
    this.dbName = dbName.replace(/\W/, '')
    this.collection = 'warriors'
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {
      useUnifiedTopology: true,
    })
    
    await client.connect()
    const db = client.db(this.dbName).collection(this.collection)

    this.#dbInstance = db
  }

  async create(item) {
    return this.#dbInstance.insertOne(item)
  }

  async read(item) {
    return this.#dbInstance.find(item).toArray()
  }
}