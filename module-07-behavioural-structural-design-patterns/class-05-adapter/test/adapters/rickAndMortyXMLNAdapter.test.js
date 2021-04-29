import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyXML from '../../src/business/integrations/rickAndMortyXML'
import RickAndMortyXMLAdapter from '../../src/business/adapters/rickAndMortyXMLAdapter.js'

describe('#RickAndMortyXMLAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyXML.getCharactersFromXML', async () => {
    const xmlIntegration = jest.spyOn(
      RickAndMortyXML, 
      RickAndMortyXML.getCharactersFromXML.name
    ).mockResolvedValue([])

    const result = await RickAndMortyXMLAdapter.getCharacters()

    expect(xmlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})