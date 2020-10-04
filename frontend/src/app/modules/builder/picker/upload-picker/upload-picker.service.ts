import { Injectable } from '@angular/core';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getImageElementInstance } from '../image-picker/image.config';

@Injectable({
  providedIn: 'root'
})
export class UploadPickerService {

  images = [];
  constructor() { }

  add(newImage) {
    const image: ImageCanvasElement = getImageElementInstance();
    image.id = Date.now().toString();
    image.imageUrl = newImage.src;
    image.canvasElement.children[0].attribute.src = newImage.src;
    image.canvasElement.type = ELEMENT_TYPES.PHOTO;
    this.images.push(image);
  }
}
