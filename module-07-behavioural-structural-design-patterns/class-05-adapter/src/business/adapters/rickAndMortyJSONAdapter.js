import RickAndMortyJSON from "../integrations/rickAndMortyJSON.js";

export default class RickAndMortyJSONAdapter {
  static async getCharacters() {
    return RickAndMortyJSON.getCharactersFromJSON()
  }
}