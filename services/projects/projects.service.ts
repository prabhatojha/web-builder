import { User, UserDocument } from '../../models/model.user';
import modelProject, { Project } from '../../models/project.model';
import { handleError, handleSuccess } from '../../routes/error-handler';

export class ProjectsService {
    createProject(req, res) {
        const user: UserDocument = res.locals.user;
        const project: Project = Object.assign(req.body, {
            userId: user.id
        });
        modelProject.create(project).then(d => {
            handleSuccess(res);
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
}