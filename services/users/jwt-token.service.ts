import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../../models/model.user';

const PRIVATE_KEY = process.env.PRIVATE_JWT_KEY || 'sflajsfk1209409218*&@&@^@^$$$$$498jlafJSLKDFDSFDSAFY8DS7F8SAD78F67DSA6F8' +
    '7ADS6&&^298712!@#!F789DSA9F68DSAF9G86ADSFDS987AF';
const EXPIRE_JWT_IN = process.env.EXPIRE_JWT_IN || '1m';

export class JWTTokenUtil {
    static sign(user: UserDocument) {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        return jwt.sign(data, PRIVATE_KEY, { expiresIn: EXPIRE_JWT_IN });
    }

    static verify(token) {
        return jwt.verify(token, PRIVATE_KEY);
    }
}