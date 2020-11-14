var express = require('express');
var router = express.Router();
import { Request, Response } from 'express';
import { handleError } from './error-handler';
import { HttpService } from '../services/http/http.service';

const http = new HttpService();
const GOOGLE_FONT_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';
router.get('/', function (req: Request, res: Response, next: any) {
    try {
        const options = {
            params: {
                sort: 'popularity',
                key: 'AIzaSyCvow7GWJspMK_3yWHOiLt09S8-QmKg4wQ'
            }
        };
        http.get(GOOGLE_FONT_URL, options).then(fonts => {
            res.send(fonts);
        }).catch(err => {

        });
    } catch (error) {
        handleError(res);
    }
});

module.exports = router;
