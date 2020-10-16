"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixabayService = void 0;
var image_model_1 = require("../../../models/image.model");
var http_service_1 = require("../../http/http.service");
var PixabayService = /** @class */ (function () {
    function PixabayService() {
        this.accessKey = "4249382-87a9e4940455958fb0aeb112c";
        this.url = "https://pixabay.com/api";
        this.httpService = new http_service_1.HttpService();
    }
    PixabayService.prototype.getVectors = function (query, page, limit) {
        var _this = this;
        var options = new http_service_1.HttpRequest();
        options.params = {
            q: query,
            image_type: 'vector',
            page: page,
            per_page: limit,
            key: this.accessKey
        };
        return this.httpService.get(this.url, options).then(function (data) {
            return Promise.resolve(_this.formatImageData(data.hits));
        });
    };
    ;
    PixabayService.prototype.formatImageData = function (images) {
        return images.map(function (image) {
            return new image_model_1.ImageModel(image.id, image.previewURL, image.largeImageURL, image.imageWidth, image.imageHeight, image.previewWidth, image.previewHeight);
        });
    };
    return PixabayService;
}());
exports.PixabayService = PixabayService;
