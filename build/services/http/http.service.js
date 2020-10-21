"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = exports.HttpRequest = void 0;
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
        this.headers = {};
        this.params = {};
    }
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;
var HttpService = /** @class */ (function () {
    function HttpService() {
    }
    HttpService.prototype.get = function (url, options) {
        var request = new URL(url);
        Object.keys(options.params).forEach(function (key) { return request.searchParams.append(key, options.params[key]); });
        return fetch(request.toString()).then(function (res) { return res.json(); });
    };
    return HttpService;
}());
exports.HttpService = HttpService;
