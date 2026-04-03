import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export interface DictionaryEntry {
  english: string;
  swedish: string;
  addedAt: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DICTIONARY_PATH = resolve(__dirname, "../../../dictionary.json");

class Dictionary {
  private _entries: DictionaryEntry[] = this.readDictionary();
  get entries() {
    this._entries = this.readDictionary();
    return this._entries;
  }
  set entries(value) {
    this._entries = value;
    this.writeDictionary(this._entries);
  }

  private readDictionary(): DictionaryEntry[] {
    return JSON.parse(readFileSync(DICTIONARY_PATH, "utf-8"));
  }

  private writeDictionary(entries: DictionaryEntry[]): void {
    writeFileSync(DICTIONARY_PATH, JSON.stringify(entries, null, 2));
  }
}

export default Dictionary;
