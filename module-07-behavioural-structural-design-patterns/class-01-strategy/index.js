import ContextStrategy from './src/base/contextStrategy.js';
import PostgresStrategy from './src/strategies/postgresStrategy.js';
import MongoDBStrategy from './src/strategies/mongoDBStrategy.js';

const postgresUrl = 'postgres://root:root@localhost:5432/heroes'
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresUrl))
await postgresContext.connect();

const mongoDBUrl = 'mongodb://root:root@localhost:27017/heroes'
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBUrl))
await mongoDBContext.connect()

const data = [
  {
    name: 'Beltrano da silva',
    type: 'transaction',
  },
  {
    name: 'Ciclano sauro',
    type: 'activityLog',
  }
]

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
}

for (const { name, type } of data) {
  const database = contextTypes[type]
  await database.create({ name })

  console.log(type, database.dbStrategy.constructor.name)
  console.log(await database.read())
}