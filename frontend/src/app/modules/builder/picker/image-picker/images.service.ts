import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { buildImagePickerItem, getImageElementInstance } from './image.config';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageLoader } from 'src/app/modules/shared/logic/image-loader';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';
import { ImageModalFe } from 'src/app/models/services/image.modal-fe';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends ImageLoader {

  rows = [[], []];

  IMAGE_WIDTH = 130;

  // Will be used to place image in left or right container based on the total height
  leftHeight = 0;
  rightHeight = 0;

  constructor(protected httpService: HttpService) {
    super(httpService, HOT_KEYWORD.images, API_ENDPOINT.IMAGE);
  }

  resetPage(query) {
    this.rows = [[], []];
    super.resetPage(query);
  }

  processPhotos(photos: Array<ImageModalFe>) {
    photos.forEach((photo: ImageModalFe) => {
      const image: PickerItemModal = buildImagePickerItem(photo);
      this.findContainer(image, photo);
    });

    this.isLoading = false;
  }

  findContainer(image: PickerItemModal, newPhoto) {
    const height = this.findImageHeight(newPhoto);
    if (this.leftHeight <= this.rightHeight) {
      this.rows[0].push(image);
      this.leftHeight += height;
    } else {
      this.rows[1].push(image);
      this.rightHeight += height;
    }
  }

  findImageHeight(newPhoto) {
    return newPhoto.height * this.IMAGE_WIDTH / newPhoto.width;
  }

  updateWidth(canvasElement: CanvasElement, width, height) {
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';
  }
}
