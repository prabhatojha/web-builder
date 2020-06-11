var express = require('express');
var router = express.Router();
const Project = require('../Model/project');

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
  Project.find({}).then(function (projects) {
    res.send(projects);
  });

});

router.put('/', function (req, res, next) {
  Project.findByIdAndUpdate({ _id: req.body._id }, req.body).then(function (project) {
    res.send(project);
  });
});

module.exports = router;
