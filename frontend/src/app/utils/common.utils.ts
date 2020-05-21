export class CommonUtils {

  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
