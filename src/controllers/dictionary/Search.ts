import DictionaryBase from "./DictionaryBase";

class Search extends DictionaryBase {
  run(): void {
    this.response.json(this.dictionary.entries);
  }
}

export default Search;
