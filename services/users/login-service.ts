import modelUser, { UserDocument, User } from '../../models/model.user';
import { handleError } from '../../routes/error-handler';

export class LoginService {
    public login() {

    }

    public getProfile() {

    }

    public signup(req, res) {
        this.createNewUser(req).then(t => {
            res.status(201).send('Created');
        }).catch(e => {
            console.log('Error ', JSON.stringify(e), 'Finished');
            handleError(res, ['User already exist'], 409)
        });
    }

    private async createNewUser({ email, name, password }) {
        return await modelUser.create({
            name: 'Prabhat',
            email: 'Prabhat123@gmail.com',
            password: 'my password'
        })
    }

    public confirmEmail() {

    }

    public resetPassword() {

    }

    public confirmResetPassword() {

    }
}