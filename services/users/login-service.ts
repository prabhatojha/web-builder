import { Request, Response } from 'express';
import { COOKIES_NAME } from '../../constants';
import modelUser, { UserDocument, User, comparePassword } from '../../models/model.user';
import { handleError, handleSuccess } from '../../routes/error-handler';
import { HashUtils } from '../../utils/hash.util';
import { JWTTokenUtil } from './jwt-token.service';

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
                    this.loginSuccessHandler(user, res);
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

    private loginSuccessHandler(user: UserDocument, res) {
        this.attachCookie(res, COOKIES_NAME.JWT, JWTTokenUtil.sign(user), false);
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

    private attachCookie(res: Response, key, value, httpOnly = true) {
        res.cookie(key, value); // options is optional
    }

    static authenticateRequest(req: Request, res, next) {
        try {
            const token = req.cookies[COOKIES_NAME.JWT];
            if (token) {
                const user: User = JWTTokenUtil.verify(token);
                next();
            } else {
                handleError(res, ['Token is present'], 403);
            }
        } catch (e) {
            handleError(res, ['Auth failed'], 403);
        }
    };
}