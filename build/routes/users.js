"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_service_1 = require("../services/users/login-service");
var error_handler_1 = require("./error-handler");
var express = require('express');
var router = express.Router();
var loginService = new login_service_1.LoginService();
/* GET users listing. */
router.post('/login', function (req, res, next) {
    try {
        loginService.login(req, res);
    }
    catch (error) {
        error_handler_1.handleError(res);
    }
});
/* GET users listing. */
router.post('/create', function (req, res, next) {
    try {
        loginService.signup(req, res);
    }
    catch (error) {
        error_handler_1.handleError(res);
    }
});
module.exports = router;
