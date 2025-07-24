/**
 * External Modules
 */
import { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const appRoutes = (app: Application) => {
    app.get('/', (_: Request, res: Response) => {
        res.status(StatusCodes.OK).json({
            status: true,
            statusCode: StatusCodes.OK,
            message: 'API Running',
        });
    });
};

export default appRoutes;
