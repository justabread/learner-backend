import Dictionary from "../../services/dictionary/Dictionary";
import Controller from "../Controller";

abstract class DictionaryBase extends Controller {
  dictionary: Dictionary = new Dictionary();
}

export default DictionaryBase;
