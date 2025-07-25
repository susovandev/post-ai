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

class UserController {
    public static getMe = asyncHandler(async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).json(
            new ApiResponse(StatusCodes.OK, 'success', req.user),
        );
    });
}
export default UserController;
