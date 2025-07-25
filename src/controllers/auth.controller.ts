/**
 * External Modules
 */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom Modules
 */
import asyncHandler from '@/utils/asyncHandler';
import ApiResponse from '@/utils/apiResponse';
import {
    ICreateUserPayload,
    ILoginUserPayload,
} from '@/interfaces/auth.interface';
import AuthService from '@/services/auth.service';
import { config } from '@/config/_config';
import timeStringToSeconds from '@/utils/timeUtils';

class AuthController {
    public static register = asyncHandler(
        async (
            req: Request<unknown, unknown, ICreateUserPayload>,
            res: Response,
        ) => {
            const user = await AuthService.createUser(req.body);
            res.status(StatusCodes.CREATED).json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    `${user?.username}Your account has been created successfully.`,
                    {
                        _id: user?._id,
                        username: user?.username,
                        email: user?.email,
                    },
                ),
            );
        },
    );

    public static login = asyncHandler(
        async (
            req: Request<unknown, unknown, ILoginUserPayload>,
            res: Response,
        ) => {
            const { user, accessToken } = await AuthService.loginUser(req.body);

            const accessTokenExpiresIn = timeStringToSeconds(
                config.ACCESS_TOKEN_EXPIRES_IN,
            );
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: config.NODE_ENV === 'production' ? true : false,
                sameSite: 'none',
                maxAge: accessTokenExpiresIn * 1000,
            })
                .status(StatusCodes.OK)
                .json(
                    new ApiResponse(
                        StatusCodes.OK,
                        `Welcome back, ${user?.username}!`,
                        {
                            _id: user?._id,
                            username: user?.username,
                            email: user?.email,
                            accessToken: accessToken,
                        },
                    ),
                );
        },
    );

    public static logout = asyncHandler(
        async (_req: Request, res: Response) => {
            res.clearCookie('accessToken')
                .status(StatusCodes.OK)
                .json(
                    new ApiResponse(
                        StatusCodes.OK,
                        `You have logged out successfully!`,
                    ),
                );
        },
    );
}
export default AuthController;
