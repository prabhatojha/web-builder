import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IMAGE_SOURCE } from 'src/app/constants/api-endpoint';
import { MOCK_IMAGES } from '../../builder/picker/mock-images';
import { HttpService, MyHttpRequest } from '../services/http-service/http.service';

export abstract class ImageLoader {

  url: string;
  page = 0;
  limit = '20';
  source = IMAGE_SOURCE.UNSPLASH;
  withMock = false;
  isLoading = true;
  query = '';
  EXTRA_DELAY = 0;
  isError: boolean;
  scrollTimer = null;

  // Will be used to place image in left or right container based on the total height
  leftHeight = 0;
  rightHeight = 0;
  endOfResult: boolean;

  constructor(protected httpService: HttpService, query: string, url: string) {
    this.query = query;
    this.url = url;
    this.getPhotos();
  }

  resetPage(query) {
    this.query = query;
    this.page = 0;
    this.leftHeight = 0;
    this.endOfResult = false;
    this.rightHeight = 0;
  }

  onScroll(e) {
    if (this.isLoading || this.endOfResult || this.isError) {
      return;
    }

    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {

      if (this.isLoading || this.endOfResult || this.isError) {
        return;
      }

      const el = e.target;
      if ((el.scrollTop + el.offsetHeight + 500) > el.scrollHeight) {
        this.getPhotos();
      }

    }, 50);
  }

  onTryAgain() {
    this.getPhotos();
  }

  getPhotos() {
    if (this.endOfResult) {
      return;
    }

    this.isError = false;
    this.isLoading = true;
    this.page++;
    const options: MyHttpRequest = {
      params: {
        page: '' + this.page,
        limit: this.limit,
        query: this.query,
        source: this.source
      }
    };

    if (!this.withMock) {
      this.httpService.get(this.url, options).pipe(delay(this.EXTRA_DELAY)).subscribe((photos: any) => {
        this.processPhotos(photos);
        this.isLoading = false;

        if (!photos.length) {
          this.endOfResult = true;
        }
      }, err => {
        this.page--;
        this.isError = true;
      });
    } else {
      this.mock().pipe(delay(500)).subscribe((photos: Array<any>) => {
        this.processPhotos(photos);
      });
    }
  }

  abstract processPhotos(photos: Array<any>);

  mock() {
    return of(MOCK_IMAGES);
  }
}
