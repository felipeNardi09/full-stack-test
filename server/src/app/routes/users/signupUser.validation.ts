import Joi from 'joi';
import { RegisterInput } from './register-input.model';
import AppError from 'src/models/appError';

const signUpSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords must match'
    })
});

const validateSignupInput = (input: RegisterInput) => {
    const { error } = signUpSchema.validate(input, {
        abortEarly: false
    });

    if (error) throw new AppError(error.message, 422);
};
export { validateSignupInput };
