export class ImageModel {
    id: string;
    thumb: string;
    imageUrl: string;
    width: string;
    height: string;
    thumbWidth: number;
    thumbHeight: number;

    constructor(id: string, thumb: string, imageUrl: string, width: string, height: string, thumbWidth, thumbHeight) {
        this.id = id;
        this.thumb = thumb;
        this.imageUrl = imageUrl;
        this.width = width;
        this.height = height;
        this.thumbWidth = thumbWidth;
        this.thumbHeight = thumbHeight;
    }
}