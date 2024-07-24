import AppError from 'src/models/appError';
import prisma from 'src/prisma/prisma-client';

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    });

    return users;
};

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        omit: {
            password: true
        }
    });

    if (!user) throw new AppError('There is no user with provided id', 404);

    return user;
};
