/**
 * External Modules
 */

/**
 * Custom Modules
 */
import { ICreateUserPayload } from '@/interfaces/auth.interface';
import userModel from '@/models/user.model';

class AuthDAO {
    async checkUserExits(username: string, email: string) {
        return await userModel.findOne({
            $or: [{ username }, { email }],
        });
    }
    async createUser(payload: ICreateUserPayload) {
        return await userModel.create(payload);
    }
}

export default AuthDAO;
