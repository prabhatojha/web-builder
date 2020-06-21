import { UnsplashService } from "../vendors/images/unsplash.service";

export class ImageService {
    unsplashService = new UnsplashService();
    constructor() {

    }

    getPhotos(query: string, page: number, limit: number, source: string) {
        return this.unsplashService.getPhotos(query, page, limit);
    }

    getVectors(query: string, page: number, limit: number, source: string) {
        return Promise.resolve('Not Implemented');
    }
}