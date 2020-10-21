"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var error_handler_1 = require("./error-handler");
var http_service_1 = require("../services/http/http.service");
var http = new http_service_1.HttpService();
var GOOGLE_FONT_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';
router.get('/', function (req, res, next) {
    try {
        var options = {
            params: {
                sort: 'popularity',
                key: 'AIzaSyCvow7GWJspMK_3yWHOiLt09S8-QmKg4wQ'
            }
        };
        http.get(GOOGLE_FONT_URL, options).then(function (fonts) {
            res.send(fonts);
        }).catch(function (err) {
        });
    }
    catch (error) {
        error_handler_1.handleError(res, error);
    }
});
module.exports = router;
