import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

interface BodyInterface {
  email: string;
}

const signUpRouter = express.Router();

signUpRouter.post(
  '/api/auth/signup',
  [body('email').isEmail().withMessage('Email must be in a valid format')],
  (req: Request<BodyInterface>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).send({});
    }
  },
);

export default signUpRouter;
