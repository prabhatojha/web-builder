import { ImageModel } from '../../../models/image.model';
import { HttpService, HttpRequest } from '../../http/http.service';
import { json } from 'body-parser';

export class PixabayService {
    accessKey = "4249382-87a9e4940455958fb0aeb112c";
    url = `https://pixabay.com/api`
    private httpService = new HttpService();
    constructor() {
    }

    getVectors(query: string, page: number, limit: number) {
        const options = new HttpRequest();
        options.params = {
            q: query,
            image_type: 'vector',
            page: page,
            per_page: limit,
            key: this.accessKey
        }
        return this.httpService.get(this.url, options).then((data: any) => {
            console.log('=====> Data ', data);
            return Promise.resolve(this.formatImageData(data.hits));
        });
    };


    formatImageData(images: any) {
        return images.map((image: any) => {
            return new ImageModel(image.id, image.previewURL, image.largeImageURL, image.imageWidth, image.imageHeight);
        })
    }
}