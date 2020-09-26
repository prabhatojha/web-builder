import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getImageElementInstance } from './image.config';
import { MOCK_IMAGES } from '../mock-images';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageLoader } from 'src/app/modules/shared/logic/image-loader';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends ImageLoader {

  rows = [[], []];
  GET_IMAGES = '/api/images';

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

  processPhotos(photos: Array<any>) {
    photos.forEach(photo => {
      const image: ImageCanvasElement = getImageElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvasElement.children[0].attribute.src = photo.imageUrl;
      image.canvasElement.type = ELEMENT_TYPES.PHOTO;
      // this.updateWidth(image.canvasElement, photo.width, photo.height);
      this.findContainer(image, photo);
    });

    this.isLoading = false;
  }

  findContainer(image: ImageCanvasElement, rawPhoto) {
    if (this.leftHeight <= this.rightHeight) {
      this.rows[0].push(image);
      this.leftHeight += rawPhoto.height;
    } else {
      this.rows[1].push(image);
      this.rightHeight += rawPhoto.height;
    }
  }

  updateWidth(canvasElement: CanvasElement, width, height) {
    console.log(width, height);
    canvasElement.style.width = width + 'px';
    canvasElement.style.height = height + 'px';
  }
}
