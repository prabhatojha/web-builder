import { Injectable } from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';
import { KEYBOAR_KEYS } from 'src/app/constants/keyboard-constants';

export enum UndoRedoType {
  ADD,
  DELETE,
  STYLE
}

export class UndoRedoModel {
  type: UndoRedoType;
  nodes: HTMLElement[];
  canvasElements: CanvasElement[];
  oldStyle?: string[]; // Styles as an object must be stringified
  newStyle?: string[]; // Styles as an object must be stringified
}

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  private parentNode: HTMLElement;
  private parentCanvasElement: CanvasElement;
  private list: UndoRedoModel[] = [];

  index = -1;
  length = 0;

  /**
   * Should initialize parent node before using undo service
   * One example is in canvas.component.ts file
   */
  init(parentNode, parentCanvasElement) {
    this.parentCanvasElement = parentCanvasElement;
    this.parentNode = parentNode;
  }

  add(entry: UndoRedoModel) {
    this.index++;
    this.list[this.index] = entry;
    this.length = this.index + 1;
  }

  undo() {
    if (this.index >= 0) {
      this.applyChange(this.list[this.index], true);
      this.index--;
    }
  }

  redo() {
    if (this.index < this.length - 1) {
      this.index++;
      this.applyChange(this.list[this.index], false);
    }
  }

  private applyChange(item: UndoRedoModel, isUndo: boolean) {
    let type = item.type;

    if (isUndo && [UndoRedoType.ADD, UndoRedoType.DELETE].includes(type)) {
      type = type === UndoRedoType.ADD ? UndoRedoType.DELETE : UndoRedoType.ADD;
    }

    switch (type) {
      case UndoRedoType.ADD:
        this.addItem(item);
        break;
      case UndoRedoType.DELETE:
        this.removeItem(item);
        break;
      case UndoRedoType.STYLE:
        this.applyStyles(item, isUndo);

    }
  }

  applyStyles(item: UndoRedoModel, isUndo: boolean) {
    const styles: any = isUndo ? item.oldStyle : item.newStyle;
    item.canvasElements.forEach((canvasElement: CanvasElement, index) => {
      const styleAsObject = JSON.parse(styles[index]);
      Object.keys(styleAsObject).forEach(key => {
        item.nodes[index].style[key] = styleAsObject[key];
        canvasElement.style[key] = styleAsObject[key];
      });
    });
  }

  private addItem(item: UndoRedoModel) {
    item.canvasElements.forEach((t, index) => {
      this.parentCanvasElement.children.push(t);
      this.parentNode.appendChild(item.nodes[index]);
    });
  }

  private removeItem(item: UndoRedoModel) {
    item.nodes.forEach(t => t.remove());
    this.parentCanvasElement.children = this.parentCanvasElement.children.filter(t => !item.canvasElements.includes(t));
  }

  private getOriginalItemStyle(canvasElement: CanvasElement) {
    return canvasElement.style;
  }
}
