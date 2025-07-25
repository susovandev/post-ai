/**
 * Custom Modules
 */
import { ICreateUserPayload } from '@/interfaces/auth.interface';
import AuthDAO from '@/dao/auth.dao';
import { ConflictException } from '@/utils/error';

class AuthService {
    constructor(private authDAO: AuthDAO) {}
    async createUser(payload: ICreateUserPayload) {
        const ifUserExists = await this.authDAO.checkUserExits(
            payload.username,
            payload.email,
        );
        if (ifUserExists) {
            throw new ConflictException(
                `An account with this email or username already exists.`,
            );
        }

        return this.authDAO.createUser(payload);
    }
}

export default new AuthService(new AuthDAO());
