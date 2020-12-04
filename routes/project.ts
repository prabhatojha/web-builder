import { Response, Request } from "express";
import { ProjectsService } from "../services/projects/projects.service";
import { LoginService } from "../services/users/login-service";
import { handleError } from "./error-handler";

var express = require('express');
var router = express.Router();

const projectService = new ProjectsService();

router.post('/', LoginService.authenticateRequest, function (req: Request, res: Response, next: any) {
  try {
    projectService.createProject(req, res);
  } catch (error) {
    handleError(res);
  }
});

router.delete('/', LoginService.authenticateRequest, function (req, res, next) {
  // Project.findByIdAndRemove({ id: req.body.id }).then(function (project) {
  //   req.send(project);
  // });
});

router.get('/:id', LoginService.authenticateRequest, function (req: Request, res: Response, next: any) {
  try {
    projectService.getProjectById(req, res);
  } catch (error) {
    handleError(res);
  }
});

router.get('/', LoginService.authenticateRequest, function (req: Request, res: Response, next: any) {
  try {
    projectService.getProjects(req, res);
  } catch (error) {
    handleError(res);
  }
});

router.put('/', LoginService.authenticateRequest, function (req, res, next) {
  // Project.findByIdAndUpdate({ _id: req.body._id }, req.body).then(function (project) {
  //   res.send(project);
  // });
});

module.exports = router;
