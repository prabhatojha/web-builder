import { LoginService } from "../services/users/login-service";
import { handleError } from "./error-handler";

var express = require('express');

var router = express.Router();
const loginService = new LoginService();

/* GET users listing. */
router.get('/login', function (req, res, next) {
});

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  try {
    loginService.signup(req, res);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = router;
