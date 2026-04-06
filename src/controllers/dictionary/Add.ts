import DictionaryBase from "./DictionaryBase.js";

class Add extends DictionaryBase {
  run(): void {
    const incoming: { english: string; swedish: string }[] = this.request.body;

    if (!Array.isArray(incoming)) {
      this.response.status(400).json({ error: "Expected an array of entries" });
      return;
    }

    const added = this.dictionary.add(incoming);
    this.response.json({ added });
  }
}

export default Add;
