/**
 * External Modules
 */
import { NextFunction, Request, Response } from 'express';

const asyncHandler =
    <P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
        fn: (
            req: Request<P, ResBody, ReqBody, ReqQuery>,
            res: Response,
            next: NextFunction,
        ) => Promise<void>,
    ) =>
    (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction,
    ) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;
