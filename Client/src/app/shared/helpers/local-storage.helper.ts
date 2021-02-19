type dataType = string;

interface SetStorageItemModel {
  key: string;
  data: dataType
}

export class LocalStorageHelper {

  static set setItem(model: SetStorageItemModel) {
    localStorage.setItem(model.key, JSON.stringify(model.data))
  }

  static getItem(key: string): dataType {
    return JSON.parse(localStorage.getItem(key))
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
