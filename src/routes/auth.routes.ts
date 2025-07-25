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
import authMiddleware from '@/middlewares/auth.middleware';

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

/**
 * Login
 * @route POST /api/v1/auth/login
 * @access Public
 */
authRouter
    .route('/login')
    .post(schemaValidator(authValidation.loginSchema), authController.login);

/**
 * Logout
 * @route POST /api/v1/auth/logout
 * @access Private
 */
authRouter.route('/logout').post(authMiddleware, authController.logout);
export default authRouter;
