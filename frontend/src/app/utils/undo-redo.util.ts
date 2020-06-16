export const UNDO_REDO_CONST = {

}

export enum UndoRedoTypes {
  CSS,
  NODE
}

class UndoRedoModel {
  type: UndoRedoTypes;
  cssFiled: string;
  cssValue: string;
}

export class UndoRedoUtil {

  private static list: UndoRedoModel[] = [];

  private static index = -1;

  /**
   * Maintaining the node update at one place
   */
  static addAttribute(item, node, attr, attrValue) {

  }

  static addStyle(item, node, cssField, cssValue) {
    node.style[cssField] = cssValue;

    const style = this.getOriginalItemStyle(item);

    this.addCssItemToList(cssField, cssValue, style[cssField]);

    style[cssField] = cssValue;

    console.log(cssField, cssValue);
    console.log(this.list);
  }

  private static getOriginalItemStyle(item) {
    return item.canvaElement.style;
  }

  private static addCssItemToList(cssField, cssValue, oldCssValue) {

    if (this.index === -1 || this.list[this.index].cssFiled !== cssField) {
      const item = new UndoRedoModel();
      item.type = UndoRedoTypes.CSS;
      item.cssFiled = cssField;
      item.cssValue = oldCssValue;

      this.list.push(item);
      this.index += 1;
    }
  }
}
