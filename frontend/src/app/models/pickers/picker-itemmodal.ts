import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { CanvasElement } from '../canvas.element.model';

export class PickerItemModal {
  id?: string;
  type?: ELEMENT_TYPES;
  canvasElement: CanvasElement;
  imageUrl?: string;
}
