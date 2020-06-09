import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { MyHttpRequest } from '../../../shared/services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  GET_IMAGES = '/api/images';

  constructor(private httpService: HttpService) { }

  getPhotos(query: string) {
    const options: MyHttpRequest = {
      params: {
        query
      }
    };

    return this.httpService.get(this.GET_IMAGES, options);
  }
}
