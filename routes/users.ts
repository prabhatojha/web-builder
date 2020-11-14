import { LoginService } from "../services/users/login-service";
import { handleError } from "./error-handler";

var express = require('express');

var router = express.Router();
const loginService = new LoginService();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  try {
    loginService.login(req, res);
  } catch (error) {
    handleError(res);
  }
});

/* GET users listing. */
router.post('/create', function (req, res, next) {
  try {
    loginService.signup(req, res);
  } catch (error) {
    handleError(res);
  }
});

module.exports = router;
