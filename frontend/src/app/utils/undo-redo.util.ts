export enum UndoRedoTypes {
  CSS,
  NODE
}

class UndoRedoModel {
  type: UndoRedoTypes;
  cssField: string;
  oldCssValue: string;
  newCssValue: string;
}

export class UndoRedoUtil {

  private static list: UndoRedoModel[] = [];

  private static index = -1;

  /**
   * Maintaining the node update at one place
   */
  static addAttribute(item, node, attr, attrValue) {

  }

  static addStyle(item, node, cssField, newCssValue, saveToList = true) {
    node.style[cssField] = newCssValue || '';

    const style = this.getOriginalItemStyle(item);

    // tslint:disable-next-line: no-unused-expression
    saveToList && this.addCssItemToList(cssField, newCssValue, style[cssField]);

    style[cssField] = newCssValue;
  }

  private static getOriginalItemStyle(item) {
    return item.canvasElement.style;
  }

  private static addCssItemToList(cssField, newCssValue, oldCssValue) {

    if (this.list.length > this.index + 1) {
      this.list.length = this.index + 1;
    }

    if (this.index === -1 || this.list[this.index].cssField !== cssField) {
      const item = new UndoRedoModel();
      item.type = UndoRedoTypes.CSS;
      item.cssField = cssField;
      item.oldCssValue = oldCssValue;
      item.newCssValue = newCssValue;

      this.list.push(item);
      this.index += 1;
    }
  }

  static undo(item, node) {
    const undoItem = this.list[this.index];

    switch (undoItem.type) {
      case UndoRedoTypes.CSS:
        this.addStyle(item, node, undoItem.cssField, undoItem.oldCssValue, false);
        break;
    }

    if (this.index > 0) {
      this.index -= 1;
    }
  }

  static redo(item, node) {
    const redoItem = this.list[this.index];

    switch (redoItem.type) {
      case UndoRedoTypes.CSS:
        this.addStyle(item, node, redoItem.cssField, redoItem.newCssValue, false);
        break;
    }

    if (this.index < this.list.length - 1) {
      this.index += 1;
    }
  }
}
