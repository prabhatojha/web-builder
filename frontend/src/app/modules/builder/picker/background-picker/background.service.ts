import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getVectorElementInstance } from '../image-picker/image.config';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { MOCK_BACKGROUNDS } from '../mock-images';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { ImageLoader } from 'src/app/modules/shared/logic/image-loader';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { ImageModalFe } from 'src/app/models/services/image.modal-fe';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';

const BACKGROUND_TXT = ' background';
@Injectable({
  providedIn: 'root'
})
export class BackgroundService extends ImageLoader {

  backgrounds = [];


  constructor(protected httpService: HttpService) {
    super(httpService, BACKGROUND_TXT, API_ENDPOINT.IMAGE);
  }

  resetPage(query) {
    this.backgrounds = [];
    super.resetPage(query + BACKGROUND_TXT);
  }

  processPhotos(photos: Array<ImageModalFe>) {
    photos.forEach(photo => {
      const image: PickerItemModal = getVectorElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvasElement.type = ELEMENT_TYPES.BACKGROUND;
      image.canvasElement.style = {
        [CSS_PROPERTIES.BG]: `url('${photo.imageUrl}') center/cover`
      };
      image.photo = photo;
      this.backgrounds.push(image);
    });

    this.isLoading = false;
  }

  updateWidth(canvasElement: CanvasElement, width, height) {
    canvasElement.style.width = width * 1.5 + 'px';
    canvasElement.style.height = height * 1.5 + 'px';
  }
}
