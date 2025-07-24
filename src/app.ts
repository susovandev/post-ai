/**
 *
 */
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

/**
 * Custom Modules
 */
import connectToDB from './db/db';
import appRoutes from './routes';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    public async start() {
        await this.setupDB();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private async setupDB() {
        await connectToDB();
    }
    private setupMiddlewares() {
        this.app.use(helmet());
        this.app.use(express.json({ strict: true, limit: '100kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));
        this.app.use(cookieParser());
    }

    private async setupRoutes() {
        appRoutes(this.app);
    }

    private setupGlobalErrors() {
        this.app.all(
            '/*splat',
            (req: Request, res: Response, next: NextFunction) => {
                return res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    statusCode: StatusCodes.NOT_FOUND,
                    message: `Can't find ${req.originalUrl} on this server!`,
                });
                next();
            },
        );
    }

    private serverListen() {
        this.app.listen(4000, () => {
            console.log(`🚀 Server running at: http://localhost:${4000}`);
        });
    }
}
