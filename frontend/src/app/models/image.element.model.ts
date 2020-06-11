import { CanvasElement } from './canvas.element.model';

export class ImageCanvasElement {
  id: string;
  toolbarOptions: Array<number>;
  imageUrl: string;
  canvaElement: CanvasElement;

  constructor(id: string, toolbarOptions: Array<number>, imageUrl: string, canvaElement: CanvasElement) {
    this.id = id;
    this.toolbarOptions = toolbarOptions;
    this.imageUrl = imageUrl;
    this.canvaElement = canvaElement;
  }
}
