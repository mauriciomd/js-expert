import RickAndMortyXML from "../integrations/rickAndMortyXML.js";

export default class RickAndMortyXMLAdapter {
  static async getCharacters() {
    return RickAndMortyXML.getCharactersFromXML()
  }
}