var express = require('express');
var router = express.Router();
const { toJson } = require('unsplash-js');
import { ImageService } from '../services/images/image.service';
import { Request, Response } from 'express';
import { ImageModel } from '../models/image.model';

const imageService = new ImageService();

router.get('/', function (req: Request, res: Response, next: any) {
    const { query, page, limit, source } = req.query;
    imageService.getPhotos(query, page, limit, source).then(toJson).then((images: ImageModel[]) => {
        res.send(images);
    })

});

module.exports = router;