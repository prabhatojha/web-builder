import { Response, Request } from "express";
import { LoginService } from "../services/users/login-service";

var express = require('express');
var router = express.Router();
const Project = require('../models/project.model');

router.post('/', LoginService.authenticateRequest, function (req: Request, res: Response, next: any) {
  Project.create(req.body).then(function (project) {
    res.send(project);
  });
});

router.delete('/', LoginService.authenticateRequest, function (req, res, next) {
  Project.findByIdAndRemove({ id: req.body.id }).then(function (project) {
    req.send(project);
  });
});

router.get('/', LoginService.authenticateRequest, function (req: Request, res: Response, next: any) {
  res.send('hello dear, what are you doing');
});

router.put('/', LoginService.authenticateRequest, function (req, res, next) {
  Project.findByIdAndUpdate({ _id: req.body._id }, req.body).then(function (project) {
    res.send(project);
  });
});

module.exports = router;
