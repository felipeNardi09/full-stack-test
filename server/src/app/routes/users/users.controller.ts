import { Request, Response, NextFunction, Router } from 'express';
import validateToken from 'src/app/middlewares/auth';
import { getAllUsers, getUserById } from './users.service';

const router = Router();

router.get(
    '/users',
    validateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await getAllUsers();

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/users/user/:id',
    validateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await getUserById(req.params.id);

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);
export default router;
