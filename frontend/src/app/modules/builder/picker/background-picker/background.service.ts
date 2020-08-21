import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getVectorElementInstance } from '../image-picker/image.config';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { MOCK_IMAGES } from '../mock-images';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  backgrounds = [];
  GET_IMAGES = '/api/images';
  PAGE = 0;
  LIMIT = '20';
  withMock = false;
  isLoading = true;
  query = '';
  EXTRA_DELAY = 10;

  constructor(private httpService: HttpService) {
    this.getPhotos();
  }

  resetPage(query) {
    this.query = query;
    this.backgrounds = [];
    this.PAGE = 0;
  }

  getPhotos() {
    this.isLoading = true;
    this.PAGE += 1;
    const options: MyHttpRequest = {
      params: {
        page: '' + this.PAGE,
        limit: this.LIMIT,
        query: (this.query + ' background').trim(),
        source: 'unsplash'
      }
    };

    if (!this.withMock) {
      this.httpService.get(this.GET_IMAGES, options).pipe(delay(this.EXTRA_DELAY)).subscribe((photos: any) => {
        this.processPhotos(photos);
      });
    } else {
      this.mock().pipe(delay(500)).subscribe(photos => {
        this.processPhotos(photos);
      });
    }
  }

  processPhotos(photos: Array<any>) {
    photos.forEach(photo => {
      const image: ImageCanvasElement = getVectorElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvasElement.type = ELEMENT_TYPES.BACKGROUND;
      image.canvasElement.style = {
        [CSS_PROPERTIES.BG]: `url('${photo.imageUrl}') center/cover`
      };
      this.backgrounds.push(image);
    });

    console.log(photos, this.backgrounds);
    this.isLoading = false;
  }

  updateWidth(canvasElement: CanvasElement, width, height) {
    canvasElement.style.width = width * 1.5 + 'px';
    canvasElement.style.height = height * 1.5 + 'px';
  }

  mock() {
    return of(MOCK_IMAGES);
  }
}