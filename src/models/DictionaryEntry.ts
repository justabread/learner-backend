import Model from "./Model";

class DictionaryEntry extends Model {
  english: string;
  swedish: string;
  inserted: string;

  constructor(english: string, swedish: string, inserted: string) {
    super();

    this.english = english;
    this.swedish = swedish;
    this.inserted = inserted;
  }
}

export default DictionaryEntry;
