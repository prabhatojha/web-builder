import { NextFunction, Response, Request } from "express";

var express = require('express');
var router = express.Router();
const Project = require('../models/project.model');

router.post('/', function (req: Request, res: Response, next: any) {
  Project.create(req.body).then(function (project) {
    res.send(project);
  });
});

router.delete('/', function (req, res, next) {
  Project.findByIdAndRemove({ id: req.body.id }).then(function (project) {
    req.send(project);
  });
});

router.get('/', function (req: Request, res: Response, next: any) {
  // Project.find({}).then(function (projects) {
    res.send('hello dear, what are you doing');
  // });

});

router.put('/', function (req, res, next) {
  Project.findByIdAndUpdate({ _id: req.body._id }, req.body).then(function (project) {
    res.send(project);
  });
});

module.exports = router;