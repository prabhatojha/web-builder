// tslint:disable-next-line: no-string-literal
Node.prototype['forEach'] = Array.prototype.forEach;

export class CommonUtils {


  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static getElementsAsArray(nodes: HTMLCollection) {
    return Array.from(nodes);
  }
}
