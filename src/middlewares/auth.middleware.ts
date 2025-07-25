/**
 * External Modules
 */
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * Custom Modules
 */
import { UnauthorizedException } from '@/utils/error';
import { config } from '@/config/_config';
import userModel from '@/models/user.model';
import Logger from '@/utils/logger';

interface DecodedToken extends JwtPayload {
    _id: string;
}
const authMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader =
        authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;

    const accessToken = req.cookies?.accessToken || tokenFromHeader;
    Logger.info(`Access token: ${accessToken}`);
    if (!accessToken) {
        throw new UnauthorizedException('Authentication required.');
    }

    try {
        const decodeToken = jwt.verify(
            accessToken,
            config.ACCESS_TOKEN_SECRET as jwt.Secret,
        ) as DecodedToken;

        const user = await userModel
            .findById(decodeToken?._id)
            .select('-password');
        if (!user) {
            throw new UnauthorizedException('Authentication failed.');
        }

        req.user = user;
        next();
    } catch (error) {
        Logger.error(`Auth middleware error: ${error}`);
        throw new UnauthorizedException('Invalid or expired token.');
    }
};

export default authMiddleware;
