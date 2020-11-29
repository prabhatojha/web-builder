import { LoginService } from "../services/users/login-service";
import { handleError } from "./error-handler";

var express = require('express');

var router = express.Router();
const loginService = new LoginService();

router.post('/login', function (req, res, next) {
  try {
    loginService.login(req, res);
  } catch (error) {
    handleError(res);
  }
});

router.post('/create', function (req, res, next) {
  try {
    loginService.signup(req, res);
  } catch (error) {
    handleError(res);
  }
});

router.post('/reset', function (req, res, next) {
  try {
    loginService.resetPassword(req.body, res);
  } catch (error) {
    handleError(res);
  }
});

router.post('/confirm', function (req, res, next) {
  try {
    loginService.confirmResetPassword(req.body, res);
  } catch (error) {
    handleError(res);
  }
});

module.exports = router;
