import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import dotnev from 'dotenv';
dotnev.config();

import { default as signUpRouter } from './routes/signup';
import { errorhandler } from './middlewares';

export const app = express();

app.use(json());

app.use(signUpRouter);

app.use(errorhandler);

app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy' });
});
