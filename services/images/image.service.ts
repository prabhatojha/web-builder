import { UnsplashService } from "../vendors/images/unsplash.service";
import { PixabayService } from "../vendors/images/pixabay.service";
import { ImageModel } from "../../models/image.model";

export class ImageService {
    unsplashService = new UnsplashService();
    pixabay = new PixabayService();

    constructor() {

    }

    getPhotos(query: string, page: any, limit: any, source: any): Promise<ImageModel[]> {
        return this.unsplashService.getPhotos(query, page, limit);
    }

    getVectors(query: string, page: any, limit: any, source: any): Promise<ImageModel[]> {
        return this.pixabay.getVectors(query, page, limit);
    }
}