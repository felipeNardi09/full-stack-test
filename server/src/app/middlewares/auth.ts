import { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import AppError from 'src/models/appError';

const validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
    )
        return next(new AppError('Login to perform this action', 401));

    const [, token] = req.headers.authorization.split(' ');

    try {
        const decoded: JwtPayload | string = await jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (typeof decoded !== 'string')
            req.user = {
                id: decoded.id
            };

        next();
    } catch (error) {
        return next(
            new AppError('Invalid token, log in to perform this action', 500)
        );
    }
};

export default validateToken;
