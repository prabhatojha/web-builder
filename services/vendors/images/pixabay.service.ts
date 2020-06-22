import { ImageModel } from '../../../models/image.model';

export class PixabayService {
    accessKey = "4249382-87a9e4940455958fb0aeb112c";
    url = `https://pixabay.com/api`

    constructor() {
    }

    getPhotos(query: string, page: number, limit: number) {
            fetch(this.url,{
                
            })
        }));
    }

    formatImageData(images: any) {
        return images.map((image: any) => {
            return new ImageModel(image.id, image.urls.thumb, image.urls.regular, image.width, image.height);
        })
    }
}