/**
 * External Modules
 */
import { Router } from 'express';

/**
 * Custom Modules
 */
import userController from '@/controllers/user.controller';
import authMiddleware from '@/middlewares/auth.middleware';

const userRouter: Router = Router();
/**
 * Get Current User
 * @route GET /api/v1/users/me
 * @access Private
 */
userRouter.route('/me').get(authMiddleware, userController.getMe);

export default userRouter;
