/**
 * External Modules
 */
import { Router } from 'express';

/**
 * Custom Modules
 */
import schemaValidator from '@/middlewares/validation.middleware';
import authValidation from '@/validations/auth.validation';
import authController from '@/controllers/auth.controller';

const authRouter: Router = Router();
/**
 * Register
 * @route POST /api/v1/auth/register
 * @access Public
 */
authRouter
    .route('/register')
    .post(
        schemaValidator(authValidation.registerSchema),
        authController.register,
    );
export default authRouter;
