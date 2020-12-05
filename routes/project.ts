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
  try {
    projectService.saveProject(req, res);
  } catch (error) {
    console.log(error);
    handleError(res);
  }  
});

module.exports = router;
