import { CanvasElement } from './canvas.element.model';
import { TextPickerTypes } from '../modules/builder/picker/text-picker/text-picker.config';

export class TextPickerModel {
  id: string;
  toolbarOptions: Array<number>;
  imageUrl: string;
  type: TextPickerTypes = TextPickerTypes.IMAGE;
  fontSize: string;
  fontFamily: string;

  innerText: string;
  canvaElement: CanvasElement;

  constructor(toolbarOptions: Array<number>, canvaElement: CanvasElement) {
    this.toolbarOptions = toolbarOptions;
    this.canvaElement = canvaElement;
  }
}
