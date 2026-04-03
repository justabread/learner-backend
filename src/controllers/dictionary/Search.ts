import DictionaryBase from './DictionaryBase.js'

class Search extends DictionaryBase {
  run(): void {
    this.response.json(this.dictionary.getAll())
  }
}

export default Search