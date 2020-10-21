"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var Project = require('../models/project.model');
router.post('/', function (req, res, next) {
    Project.create(req.body).then(function (project) {
        res.send(project);
    });
});
router.delete('/', function (req, res, next) {
    Project.findByIdAndRemove({ id: req.body.id }).then(function (project) {
        req.send(project);
    });
});
router.get('/', function (req, res, next) {
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
