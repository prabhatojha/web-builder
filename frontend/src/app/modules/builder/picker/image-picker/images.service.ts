import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getImageElementInstance } from './image.config';
import { MOCK_IMAGES } from '../mock-images';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  rows = [[], []];
  GET_IMAGES = '/api/images';
  PAGE = 0;
  LIMIT = '20';
  withMock = false;
  isLoading = true;
  query = '';
  EXTRA_DELAY = 1000;

  constructor(private httpService: HttpService) {
    this.query = HOT_KEYWORD.images;
    this.getPhotos();
  }

  resetPage(query) {
    this.query = query;
    this.rows = [[], []];
    this.PAGE = 0;
  }

  getPhotos() {
    this.isLoading = true;
    this.PAGE += 1;
    const options: MyHttpRequest = {
      params: {
        page: '' + this.PAGE,
        limit: this.LIMIT,
        query: this.query,
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
    let alternate = true;
    photos.forEach(photo => {
      const image: ImageCanvasElement = getImageElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvasElement.children[0].attribute.src = photo.imageUrl;
      image.canvasElement.type = ELEMENT_TYPES.PHOTO;
      alternate ? this.rows[0].push(image) : this.rows[1].push(image);
      alternate = !alternate;
    });

    this.isLoading = false;
  }

  mock() {
    return of(MOCK_IMAGES);
  }
}
