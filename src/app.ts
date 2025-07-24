/**
 * External Modules
 */
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

/**
 * Custom Modules
 */
import connectToDB from '@/db/db';
import appRoutes from '@/routes';
import morganConfig from '@/config/morgan.config';
import Logger from '@/utils/logger';
import { config } from '@/config/_config';
import { NotFoundException } from './utils/error';
import errorMiddleware from '@/middlewares/error.middleware';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }
    // Start
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

    // Middlewares
    private setupMiddlewares() {
        this.app.use(morganConfig);
        this.app.use(helmet());
        this.app.use(express.json({ strict: true, limit: '100kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '100kb' }));
        this.app.use(cookieParser());
    }

    // Routes
    private async setupRoutes() {
        appRoutes(this.app);
    }

    // Global Errors
    private setupGlobalErrors() {
        this.app.all(
            '/*splat',
            (req: Request, _: Response, next: NextFunction) => {
                next(new NotFoundException(`Can't find ${req.originalUrl}`));
            },
        );
        this.app.use(errorMiddleware);
    }

    private serverListen() {
        this.app.listen(config.PORT, () => {
            Logger.warn(
                `🚀 Server running at: http://localhost:${config.PORT}`,
            );
        });
    }
}
