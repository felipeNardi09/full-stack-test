import express, { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import AppError from 'src/models/appError';
import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Route ${req.originalUrl} does not exist`, 404);
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';

    return res.status(err.statusCode).json({
        err,
        message: err.message,
        ...(process.env.NODE_ENV === 'production' ? null : { stack: err.stack })
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is running on port ${port}`));
