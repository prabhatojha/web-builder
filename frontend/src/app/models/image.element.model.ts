import { CanvasElement } from './canvas.element.model';

export class ImageCanvasElement {
  id: string;
  imageUrl: string;
  canvasElement: CanvasElement;

  constructor(canvasElement: CanvasElement) {
    this.canvasElement = canvasElement;
  }
}
