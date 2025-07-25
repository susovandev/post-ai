/**
 * Custom Modules
 */
import {
    ICreateUserPayload,
    ILoginUserPayload,
} from '@/interfaces/auth.interface';
import AuthDAO from '@/dao/auth.dao';
import { ConflictException, UnauthorizedException } from '@/utils/error';

class AuthService {
    constructor(private authDAO: AuthDAO) {}
    async createUser(payload: ICreateUserPayload) {
        const user = await this.authDAO.checkUserExits(
            payload.username,
            payload.email,
        );
        if (user) {
            throw new ConflictException(
                `An account with this email or username already exists.`,
            );
        }

        return this.authDAO.createUser(payload);
    }

    async loginUser(payload: ILoginUserPayload) {
        console.log(payload);
        const user = await this.authDAO.checkUserExits(
            payload?.username as string,
            payload?.email as string,
        );
        if (!user) {
            throw new UnauthorizedException(
                `Invalid credentials. Please try again.`,
            );
        }

        const isPasswordCorrect = await user.isPasswordMatch(payload?.password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedException(
                `Invalid credentials. Please try again.`,
            );
        }

        const accessToken = user.generateAccessToken();

        return { accessToken, user };
    }
}

export default new AuthService(new AuthDAO());
