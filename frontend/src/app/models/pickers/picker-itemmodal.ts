import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { CanvasElement } from '../canvas.element.model';
import { ImageModalFe } from '../services/image.modal-fe';

export class PickerItemModal {
  id?: string;
  type?: ELEMENT_TYPES;
  photo?: ImageModalFe;
  canvasElement: CanvasElement;
  imageUrl?: string; // Is kind of thumbnail image
  originalImgUrl?: string; // bigger image
}
