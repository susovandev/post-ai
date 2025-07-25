/**
 * External Modules
 */
import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom Modules
 */
import authRouter from './auth.routes';
import userRouter from './user.routes';

const appRoutes = (app: Application) => {
    app.get('/', (_: Request, res: Response) => {
        res.status(StatusCodes.OK).json({
            status: true,
            statusCode: StatusCodes.OK,
            message: 'API Running',
        });
    });
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
};

export default appRoutes;
