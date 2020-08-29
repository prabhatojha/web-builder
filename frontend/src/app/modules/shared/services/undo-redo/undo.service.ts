import { Injectable } from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';

export enum UndoRedoTypes {
  ADD,
  DELETE,
  STYLE
}

export class UndoRedoModel {
  type: UndoRedoTypes;
  nodes: HTMLElement[];
  canvasElements: CanvasElement[];
  style: any;
}

@Injectable({
  providedIn: 'root'
})
export class UndoService {

  private list: UndoRedoModel[] = [];
  private index = -1;

  private getOriginalItemStyle(canvasElement: CanvasElement) {
    return canvasElement.style;
  }

  private add(entry: UndoRedoModel) {

  }

  undo() {
  }

  redo() {

  }
}
