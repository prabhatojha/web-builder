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

  static swapArrayElements(arr: Array<any>, sourceIndex: number, targetIndex: number) {
    const b = arr[sourceIndex];
    arr[sourceIndex] = arr[targetIndex];
    arr[targetIndex] = b;
  }

  static insertNodeBefore(node: HTMLElement, reference: HTMLElement) {
    node.parentNode.insertBefore(node, reference);
  }
}
