"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var toJson = require('unsplash-js').toJson;
var image_service_1 = require("../services/images/image.service");
var imageService = new image_service_1.ImageService();
router.get('/', function (req, res, next) {
    var _a = req.query, query = _a.query, page = _a.page, limit = _a.limit, source = _a.source;
    try {
        imageService.getPhotos(query, page, limit, source).then(function (images) {
            res.send(images);
        }, function (error) {
            handleError(res, error);
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
router.get('/vectors', function (req, res, next) {
    var _a = req.query, query = _a.query, page = _a.page, limit = _a.limit, source = _a.source;
    try {
        imageService.getVectors(query, page, limit, source).then(function (images) {
            res.send(images);
        }).catch(function (error) {
            handleError(res, error);
        });
    }
    catch (error) {
        handleError(res, error);
    }
});
function handleError(res, error) {
    res.status(500).send({ error: 'Something went wrong' });
}
module.exports = router;
