/**
 * External Modules
 */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';
const schemaValidator =
    (schema: Schema) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                success: false,
                statusCode: StatusCodes.BAD_REQUEST,
                message: error.details.map((err) =>
                    err.message.replaceAll('"', ''),
                ),
            });
        }
        next();
    };

export default schemaValidator;
