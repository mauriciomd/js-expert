import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyJSON from '../../src/business/integrations/rickAndMortyJSON'
import RickAndMortyJSONAdapter from '../../src/business/adapters/rickAndMortyJSONAdapter.js'

describe('#RickAndMortyJSONAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyJSON.getCharactersFromJSON', async () => {
    const jsonIntegration = jest.spyOn(
      RickAndMortyJSON, 
      RickAndMortyJSON.getCharactersFromJSON.name
    ).mockResolvedValue([])

    const result = await RickAndMortyJSONAdapter.getCharacters()

    expect(jsonIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})