var express = require('express');
var router = express.Router();
const { toJson } = require('unsplash-js');
import { ImageService } from '../services/images/image.service';
import { Request, Response } from 'express';
import { ImageModel } from '../models/image.model';

const imageService = new ImageService();

router.get('/', function (req: Request, res: Response, next: any) {
    const { query, page, limit, source } = req.query;
    try {
        imageService.getPhotos(query as string, page, limit, source).then((images: ImageModel[]) => {
            res.send(images);
        }, (error) => {
            handleError(res, error);
        })
    } catch (error) {
        handleError(res, error);
    }
});

router.get('/vectors', function (req: Request, res: Response, next: any) {
    const { query, page, limit, source } = req.query;
    try {
        imageService.getVectors(query as string, page, limit, source).then((images: ImageModel[]) => {
            res.send(images);
        }).catch((error) => {
            handleError(res, error);
        })
    } catch (error) {
        handleError(res, error);
    }
});

function handleError(res, error) {
    res.status(500).send({ error: 'Something went wrong' });
}

module.exports = router;