const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
global.fetch = require('node-fetch');

const unsplash = new Unsplash({
    accessKey: "6Zq9RxSM-a6jXZx8yQkw4bXjBnztKnpwwmOUFbEWH2M"
});
var getPhotos = function (query, page, limit) {
    return unsplash.search.photos(query, page, limit).then(toJson);

};

module.exports = { getPhotos };
