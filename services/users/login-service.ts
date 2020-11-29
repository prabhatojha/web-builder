import modelUser, { UserDocument, User, comparePassword, getUniqueToken } from '../../models/model.user';
import { handleError, handleSuccess } from '../../routes/error-handler';
import { HashUtils } from '../../utils/hash.util';

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

    public resetPassword(body, res) {
        modelUser.findOne({ email: body.email }).then((user: UserDocument) => {
            console.log(user);
            if (user) {
                user.resetPasswordToken = HashUtils.getRandomToken();
                user.save();
                handleSuccess(res, { emailSent: true });
                // Send email here
            } else {
                handleError(res, ['User doesn\'t exist'], 404);
            }
        }, err => {
            handleError(res);
        });
    }

    public confirmResetPassword({ password, token }, res) {
        if (!token) {
            handleError(res, ['Invalid token, please click the link given in the email']);
        }
        modelUser.findOne({ resetPasswordToken: token }).then((user: UserDocument) => {
            if (user) {
                user.resetPasswordToken = '';
                user.password = password;
                user.save();
                handleSuccess(res, { passwordChanged: true });
            } else {
                handleError(res, ['Invalid token, please click the link given in the email'], 404);
            }
        }, err => {
            handleError(res);
        });

    }
}