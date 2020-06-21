export class ImageModel {
    id: string;
    thumb: string;
    imageUrl: string;
    width: string;
    height: string;

    constructor(id: string, thumb: string, imageUrl: string, width: string, height: string) {
        this.id = id;
        this.thumb = thumb;
        this.imageUrl = imageUrl;
        this.width = width;
        this.height = height;
    }
}