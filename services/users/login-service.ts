import modelUser, { UserDocument, User, comparePassword } from '../../models/model.user';
import { handleError, handleSuccess } from '../../routes/error-handler';

export class LoginService {
    public login(req, res) {
        this.findAndauthenticateUser(req.body, res);
    }

    public getProfile() {

    }

    public signup(req, res) {
        this.createNewUser(req.body).then(t => {
            handleSuccess(res, {}, 201);
        }).catch(e => {
            handleError(res, ['User already exist'], 409)
        });
    }

    private async createNewUser({ email, name, password }) {
        return await modelUser.create({
            name,
            email,
            password
        })
    }

    private findAndauthenticateUser({ email, password }, res) {
        modelUser.findOne({ email: email }).then((user: UserDocument) => {
            console.log(user);
            if (user) {
                if (comparePassword(password, user.password)) {
                    this.loginSuccessHandler(email, res);
                } else {
                    handleError(res, ['Incorrect password'], 403);
                }
            } else {
                handleError(res, ['User doesn\'t exist'], 404);
            }
        }, err => {
            handleError(res);
        });
    }

    private loginSuccessHandler(email, res) {
        handleSuccess(res, { login: true });
    }

    public confirmEmail() {

    }

    public resetPassword() {

    }

    public confirmResetPassword() {

    }
}