"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
var ImageModel = /** @class */ (function () {
    function ImageModel(id, thumb, imageUrl, width, height, thumbWidth, thumbHeight) {
        this.id = id;
        this.thumb = thumb;
        this.imageUrl = imageUrl;
        this.width = width;
        this.height = height;
        this.thumbWidth = thumbWidth;
        this.thumbHeight = thumbHeight;
    }
    return ImageModel;
}());
exports.ImageModel = ImageModel;
