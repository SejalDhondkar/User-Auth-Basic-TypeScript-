import crypto from 'crypto';
import {CONFIG} from '../config/index'

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: String, password: String) => {
    return crypto.createHmac('sha256',[salt,password].join('/')).update(CONFIG.AUTH.SECRET as string).digest('hex');
}