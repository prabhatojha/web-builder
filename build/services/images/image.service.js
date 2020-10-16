"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
var unsplash_service_1 = require("../vendors/images/unsplash.service");
var pixabay_service_1 = require("../vendors/images/pixabay.service");
var ImageService = /** @class */ (function () {
    function ImageService() {
        this.unsplashService = new unsplash_service_1.UnsplashService();
        this.pixabay = new pixabay_service_1.PixabayService();
    }
    ImageService.prototype.getPhotos = function (query, page, limit, source) {
        return this.unsplashService.getPhotos(query, page, limit);
    };
    ImageService.prototype.getVectors = function (query, page, limit, source) {
        return this.pixabay.getVectors(query, page, limit);
    };
    return ImageService;
}());
exports.ImageService = ImageService;
