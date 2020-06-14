import { CanvasElement } from './canvas.element.model';

export class ImageCanvasElement {
  id: string;
  toolbarOptions: Array<number>;
  imageUrl: string;
  canvaElement: CanvasElement;

  constructor(toolbarOptions: Array<number>, canvaElement: CanvasElement) {
    this.toolbarOptions = toolbarOptions;
    this.canvaElement = canvaElement;
  }
}
