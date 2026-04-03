import DictionaryBase from "./DictionaryBase";

class Delete extends DictionaryBase {
  run(): void {
    const word = (this.request.params.english as string).toLowerCase();
    const filtered = this.dictionary.entries.filter((e) => e.english.toLowerCase() !== word);
    this.dictionary.entries = filtered;
    this.response.json({ deleted: this.dictionary.entries.length - filtered.length });
  }
}

export default Delete;
