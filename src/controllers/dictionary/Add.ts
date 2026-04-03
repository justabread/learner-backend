import DictionaryBase from "./DictionaryBase";
import type { DictionaryEntry } from "../../services/dictionary/Dictionary";

class Add extends DictionaryBase {
  run(): void {
    const incoming: { english: string; swedish: string }[] = this.request.body;

    if (!Array.isArray(incoming)) {
      this.response.status(400).json({ error: "Expected an array of entries" });
      return;
    }

    const existing = this.dictionary.entries;
    const existingWords = new Set(existing.map((e) => e.english.toLowerCase()));

    const added: DictionaryEntry[] = [];
    for (const entry of incoming) {
      if (!entry.english || !entry.swedish) continue;
      if (existingWords.has(entry.english.toLowerCase())) continue;
      const newEntry: DictionaryEntry = {
        english: entry.english,
        swedish: entry.swedish,
        addedAt: new Date().toISOString(),
      };
      existing.push(newEntry);
      existingWords.add(entry.english.toLowerCase());
      added.push(newEntry);
    }

    this.dictionary.entries = existing;
    this.response.json({ added });
  }
}

export default Add;
