import { CanvasElement } from './canvas.element.model';

export class ImageCanvasElement {
  id: string;
  imageUrl: string;
  canvaElement: CanvasElement;

  constructor(canvaElement: CanvasElement) {
    this.canvaElement = canvaElement;
  }
}
