import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HOT_KEYWORD, ELEMENT_TYPES } from 'src/app/constants/contants';
import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { getImageElementInstance } from './image.config';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  rows = [[], []];
  GET_IMAGES = '/api/images';
  PAGE = 0;
  LIMIT = '20';
  withMock = true;
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
      image.canvasElement.width = photo.width;
      image.canvasElement.height = photo.height;
      image.canvasElement.type = ELEMENT_TYPES.PHOTO;
      image.canvasElement.increaseZIndex = false;
      alternate ? this.rows[0].push(image) : this.rows[1].push(image);
      alternate = !alternate;
    });

    this.isLoading = false;
  }

  mock() {
    return of([
      {
        "id": "w9KEokhajKw",
        "thumb": "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 16000,
        "height": 9000
      },
      {
        "id": "Ikf439frOLg",
        "thumb": "https://images.unsplash.com/photo-1584687121306-889ff420a474?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1584687121306-889ff420a474?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 2306,
        "height": 3500
      },
      {
        "id": "Mbfz0Lm2jr0",
        "thumb": "https://images.unsplash.com/photo-1587493681629-6b4c02555fee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1587493681629-6b4c02555fee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 2048,
        "height": 3072
      },
      {
        "id": "Sss9uGhSiPw",
        "thumb": "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 4608,
        "height": 3072
      },
      {
        "id": "9b4QLnWR3Sk",
        "thumb": "https://images.unsplash.com/photo-1591185157258-11aec5f039d0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1591185157258-11aec5f039d0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 6000,
        "height": 4000
      },
      {
        "id": "92EsTvssqEE",
        "thumb": "https://images.unsplash.com/photo-1590292804913-a6174c36ecf3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1590292804913-a6174c36ecf3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 4057,
        "height": 6085
      },
      {
        "id": "JDm4bagm2LA",
        "thumb": "https://images.unsplash.com/photo-1590935216525-e35827458736?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1590935216525-e35827458736?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 2666,
        "height": 3999
      },
      {
        "id": "Lc0oQ05JNGg",
        "thumb": "https://images.unsplash.com/photo-1584972055996-56af6f368174?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1584972055996-56af6f368174?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 9447,
        "height": 8333
      },
      {
        "id": "-ivUqmSSJrw",
        "thumb": "https://images.unsplash.com/photo-1580907413813-87aaf61e28f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1580907413813-87aaf61e28f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 5616,
        "height": 3744
      },
      {
        "id": "WIYtZU3PxsI",
        "thumb": "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1583947582886-f40ec95dd752?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 5568,
        "height": 3712
      },
      {
        "id": "60QEnTvCNDo",
        "thumb": "https://images.unsplash.com/photo-1584127050037-746c151b9284?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1584127050037-746c151b9284?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 4735,
        "height": 7099
      },
      {
        "id": "zHDzQDr5_DI",
        "thumb": "https://images.unsplash.com/photo-1584263345983-e8a1fcd129fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "imageUrl": "https://images.unsplash.com/photo-1584263345983-e8a1fcd129fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNzIzOX0",
        "width": 7720,
        "height": 5149
      }
    ]);
  }
}
