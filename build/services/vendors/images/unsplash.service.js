"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsplashService = void 0;
var Unsplash = require('unsplash-js').default;
var unsplash_js_1 = require("unsplash-js");
var image_model_1 = require("../../../models/image.model");
var UnsplashService = /** @class */ (function () {
    function UnsplashService() {
        this.accessKey = "6Zq9RxSM-a6jXZx8yQkw4bXjBnztKnpwwmOUFbEWH2M";
        this.unsplash = new Unsplash({
            accessKey: this.accessKey
        });
    }
    UnsplashService.prototype.getPhotos = function (query, page, limit) {
        var _this = this;
        return this.unsplash.search.photos(query, page, limit).then(unsplash_js_1.toJson).then((function (d) {
            return Promise.resolve(_this.formatImageData(d.results));
        }));
    };
    UnsplashService.prototype.formatImageData = function (images) {
        return images.map(function (image) {
            return new image_model_1.ImageModel(image.id, image.urls.thumb, image.urls.regular, image.width, image.height, image.thumbWidth, image.thumbHeight);
        });
    };
    return UnsplashService;
}());
exports.UnsplashService = UnsplashService;
