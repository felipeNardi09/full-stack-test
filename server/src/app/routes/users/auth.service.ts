import bcrypt from 'bcryptjs';
import AppError from 'src/models/appError';
import prisma from 'src/prisma/prisma-client';
import { validateSignupInput } from './signupUser.validation';
import { RegisterInput } from './register-input.model';
import generateToken from './token.utils';
import { LoginInput } from './login-input.model';
import { validateUpdateInput } from './updateUser.validation';

const checkEmailUniqueness = async (email: string) => {
    const existingEmail = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingEmail) throw new AppError('Email already in use', 400);
};

export const createUser = async (input: RegisterInput) => {
    const { name, email, password } = input;

    validateSignupInput(input);

    await checkEmailUniqueness(email);

    const hashedPass = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPass
        }
    });

    const token = generateToken(user.id);

    const displayedUser = { ...user, password: undefined };

    return { user: displayedUser, token };
};

export const login = async (userPayload: LoginInput) => {
    const { email, password } = userPayload;

    if (!email || !password)
        throw new AppError('E-mail and password are required', 400);

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = generateToken(user.id);

            const displayedUser = { ...user, password: undefined };

            return { user: displayedUser, token };
        }
    }

    throw new AppError('Email or password is invalid', 403);
};

export const getCurrentUser = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    const displayedUser = { ...user, password: undefined };

    return displayedUser;
};

export const updateUser = async (input: RegisterInput, userId: string) => {
    if (
        !input.name &&
        !input.email &&
        !input.password &&
        !input.confirmPassword
    )
        throw new AppError('You must update at least one field', 400);

    validateUpdateInput(input);

    if (input.email) await checkEmailUniqueness(input.email);

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) throw new AppError('Invalid user', 400);

    const newUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: input,
        omit: {
            password: true
        }
    });

    return newUser;
};

export const deleteUser = async (userId: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) throw new AppError('User id is invalid', 400);

    if (!password) throw new AppError('Enter your password', 400);

    if (!(await bcrypt.compare(password, user.password)))
        throw new AppError('Invalid password', 400);

    await prisma.user.delete({
        where: {
            id: user.id
        }
    });
};
