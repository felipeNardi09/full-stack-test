import { Router } from 'express';
import authRouter from './users/auth.controller';
import usersRouter from './users/users.controller';

const api = Router().use(authRouter).use(usersRouter);

export default Router().use('/api/v1', api);
