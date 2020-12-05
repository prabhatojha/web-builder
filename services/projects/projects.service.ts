import { User, UserDocument } from '../../models/model.user';
import modelProject, { Project, ProjectDocument } from '../../models/project.model';
import { handleError, handleSuccess } from '../../routes/error-handler';
export class ProjectsService {


    createProject(req, res) {
        const user: UserDocument = res.locals.user;
        const project: Project = Object.assign(req.body, {
            userId: user.id
        });
        modelProject.create(project).then(d => {
            handleSuccess(res, { id: d.id });
        }).catch(err => {
            console.debug(err);
            handleError(res);
        });
    }

    getProjects(req, res) {
        const user: UserDocument = res.locals.user;
        modelProject.find({
            userId: user.id
        }).then(d => {
            handleSuccess(res, d);
        }).catch(err => {
            console.debug(err);
            handleError(res);
        });
    }

    saveProject(req, res) {
        const reqProject = req.body;
        const user: UserDocument = res.locals.user;
        modelProject.findOne({
            userId: user.id,
            _id: reqProject._id
        }).then((project: ProjectDocument) => {
            project.pages = reqProject.pages;
            project.save();
            handleSuccess(res, { saved: true });
        }).catch(err => {
            console.log(err);
            handleError(res);
        });
    }

    getProjectById(req, res) {
        const id = req.params['id'];
        const user: UserDocument = res.locals.user;
        modelProject.findOne({
            userId: user.id,
            _id: id
        }).then(d => {
            handleSuccess(res, d);
        }).catch(err => {
            console.debug(err);
            handleError(res);
        });
    }
}