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
import { ICreateUserPayload } from '@/interfaces/auth.interface';
import AuthService from '@/services/auth.service';

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
}
export default AuthController;
