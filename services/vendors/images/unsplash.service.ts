const Unsplash = require('unsplash-js').default;
import { toJson } from 'unsplash-js';
import { ImageModel } from '../../../models/image.model';

export class UnsplashService {
    accessKey = "6Zq9RxSM-a6jXZx8yQkw4bXjBnztKnpwwmOUFbEWH2M";
    unsplash = new Unsplash({
        accessKey: this.accessKey
    });

    constructor() {
    }

    getPhotos(query: string, page: number, limit: number) {
        return this.unsplash.search.photos(query, page, limit).then(toJson).then(((d) => {
            return Promise.resolve(this.formatImageData(d.results));
        }));
    }

    formatImageData(images: any) {
        return images.map((image: any) => {
            return new ImageModel(image.id, image.urls.thumb, image.urls.regular, image.width, image.height);
        })
    }
}