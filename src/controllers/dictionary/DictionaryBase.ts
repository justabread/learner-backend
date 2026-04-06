import Dictionary from "../../services/dictionary/Dictionary";
import Controller from "../Controller";

abstract class DictionaryBase extends Controller {
  dictionary: Dictionary = new Dictionary();

  checkPermissions(): boolean {
    this.loginRequired();

    return true;
  }
}

export default DictionaryBase;
