import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getVectorElementInstance } from '../image-picker/image.config';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { MOCK_VECTORS } from '../mock-images';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { ImageLoader } from 'src/app/modules/shared/logic/image-loader';

@Injectable({
  providedIn: 'root'
})
export class VectorService extends ImageLoader {

  vectors = [];

  constructor(protected httpService: HttpService) {
    super(httpService, HOT_KEYWORD.vectors, API_ENDPOINT.VECTOR);
  }

  resetPage(query) {
    this.vectors = [];
    super.resetPage(query);
  }

  processPhotos(photos: Array<any>) {
    photos.forEach(photo => {
      const image: ImageCanvasElement = getVectorElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvasElement.children[0].attribute.src = photo.imageUrl;
      image.canvasElement.type = ELEMENT_TYPES.VECTOR;
      this.updateWidth(image.canvasElement, photo.thumbWidth, photo.thumbHeight);
      this.vectors.push(image);
    });
  }

  updateWidth(canvasElement: CanvasElement, width, height) {
    canvasElement.style.width = width * 1.5 + 'px';
    canvasElement.style.height = height * 1.5 + 'px';
  }
}
