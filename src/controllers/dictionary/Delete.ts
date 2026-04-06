import DictionaryBase from "./DictionaryBase.js";

class Delete extends DictionaryBase {
  run(): void {
    const english = this.request.params.english as string;
    const deleted = this.dictionary.delete(this.getSession().user_id, english);
    this.response.json({ deleted });
  }
}

export default Delete;
