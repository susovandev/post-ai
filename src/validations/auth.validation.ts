/**
 * External Modules
 */
import Joi from 'joi';

const authValidation = {
    registerSchema: Joi.object({
        username: Joi.string().min(3).max(30).trim().required(),
        email: Joi.string()
            .pattern(
                new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
            )
            .required(),
        password: Joi.string()
            .min(6)
            .pattern(
                new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?#&])[A-Za-z\\d@$!%*?#&]{8,}$',
                ),
            )
            .trim()
            .required()
            .messages({
                'string.pattern.base':
                    'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
                'string.empty': 'Password is required',
            }),
    }).required(),
};

export default authValidation;
