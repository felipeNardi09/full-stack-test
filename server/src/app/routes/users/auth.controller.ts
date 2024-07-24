import { Request, Response, NextFunction, Router } from 'express';
import {
    createUser,
    deleteUser,
    getCurrentUser,
    login,
    updateUser
} from './auth.service';
import validateToken from 'src/app/middlewares/auth';

const router = Router();

router.post(
    '/users/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await createUser(req.body);

            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/users/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await login(req.body);

            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/users/user/logged-user',
    validateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await getCurrentUser(req.user.id);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/users/user/update-user',
    validateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await updateUser(req.body, req.user.id);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/users/user/delete-user',
    validateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await deleteUser(req.user.id, req.body.password);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
