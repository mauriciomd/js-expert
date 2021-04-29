import RickAndMortyJSONAdapter from './business/adapters/rickAndMortyJSONAdapter.js'
import RickAndMortyXMLAdapter from './business/adapters/rickAndMortyXMLAdapter.js'

const data = [
  RickAndMortyJSONAdapter, 
  RickAndMortyXMLAdapter
].map(integration => integration.getCharacters())

const all = await Promise.allSettled(data)
const success = all.filter(({ status }) => status === 'fulfilled')
                   .map(({ value }) => value)
                   .reduce((prev, next) => prev.concat(next), [])


const errors = all.filter(({ status }) => status === 'rejected')
console.table(success)
console.table(errors)