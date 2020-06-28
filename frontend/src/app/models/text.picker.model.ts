import { CanvasElement } from './canvas.element.model';

export class TextPickerModel {
  id: string;
  toolbarOptions: Array<number>;
  imageUrl: string;
  type: TextPickerTypes = TextPickerTypes.IMAGE;
  fontSize: string;
  fontFamily: string;

  innerText: string;
  canvasElement: CanvasElement;

  constructor(toolbarOptions: Array<number>, canvasElement: CanvasElement) {
    this.toolbarOptions = toolbarOptions;
    this.canvasElement = canvasElement;
  }
}

export enum TextPickerTypes {
  TEXT,
  IMAGE
}
