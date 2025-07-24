/**
 * External Modules
 */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

/**
 * Custom Modules
 */
import { CustomError } from '@/utils/error';
import { config } from '@/config/_config';
import Logger from '@/utils/logger';

const errorMiddleware = (
    err: Error | CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
): Response<Record<string, unknown>> => {
    Logger.error(`Global Error: ${err?.message}\n${err.stack}`);

    // Handle custom errors
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: err.status,
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    // Handle invalid schema fields
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Validation Error',
            errors: err.errors,
        });
    }

    // Handle invalid ObjectId
    if (err instanceof mongoose.Error.CastError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid resource identifier',
            errors: err.message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong',
        ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorMiddleware;
