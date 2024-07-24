import Joi from 'joi';
import { RegisterInput } from '../users/register-input.model';
import AppError from 'src/models/appError';

const updateSchema = Joi.object({
    name: Joi.string().messages({
        'string.base': 'Name should be a string'
    }),
    email: Joi.string().email().messages({
        'string.email': 'Invalid email address',
        'string.base': 'E-mail must be a string'
    }),
    password: Joi.string().min(6).messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords must match'
    })
});

const validateUpdateInput = (input: RegisterInput) => {
    const { error } = updateSchema.validate(input, {
        abortEarly: false
    });

    if (error) throw new AppError(error.message, 422);
};
export { validateUpdateInput };
