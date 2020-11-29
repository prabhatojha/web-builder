import * as crypto from 'crypto';

export class HashUtils {
    static getRandomToken() {
        return crypto.randomBytes(48).toString('hex');
        // return token;
    }
}