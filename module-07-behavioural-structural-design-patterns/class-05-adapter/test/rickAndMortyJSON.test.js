import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import axios from 'axios'
import fs from 'fs/promises'
import RickAndMortyJSON from '../src/business/integrations/rickAndMortyJSON.js'
import Character from '../src/entities/character.js'

describe('#RickAndMortyJSON', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getCharactersFromJSON should return a list of Character Entity', async () => {
    const data = await fs.readFile('./test/mocks/characters.json')
    const response = JSON.parse(data)
    const expected = response.results.map(char => new Character(char))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
    const result = await RickAndMortyJSON.getCharactersFromJSON()
    
    expect(result).toStrictEqual(expected)

  })

  test('getCharactersFromJSON should return an empty list if the API returns nothing', async () => {
    const data = await fs.readFile('./test/mocks/characters-empty.json')
    const response = JSON.parse(data)
    const expected = response.results

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })
    const result = await RickAndMortyJSON.getCharactersFromJSON()
    
    expect(result).toStrictEqual(expected)

  })
})