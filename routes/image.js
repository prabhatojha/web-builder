var express = require('express');
var router = express.Router();
var router1 = express.Router();
const { toJson } = require('unsplash-js');
global.fetch = require('node-fetch');
var unsplashSource = require('./unsplash');
var fs = require('fs');
var Request = require('request');
router.get('/', function (req, res, next) {

    const { query, page, limit, source } = req.query;
    switch (source) {

        case 'unsplash':
            unsplashSource.getPhotos(query, page, limit).then(toJson).then((data) => {
                res.send(formatImageData(data.results));
            });
            break;
        default: res.send({ "warning": "route not defined" });
            break;

    };
});

function formatImageData(images) {
    return images.map((image) => {
        return {
            id: image.id,
            thumb: image.urls.thumb,
            regular: image.urls.regular,
            full: image.urls.full
        }
    })
}

module.exports = router;