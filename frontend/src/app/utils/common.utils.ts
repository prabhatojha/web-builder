// tslint:disable-next-line: no-string-literal
Node.prototype['forEach'] = Array.prototype.forEach;

export class CommonUtils {
  static cloneShallow(obj) {
    if (Array.isArray(obj)) {
      return [...obj];
    }
    return Object.assign({}, obj);
  }

  static cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static getElementsAsArray(nodes: HTMLCollection) {
    return Array.from(nodes);
  }
}
