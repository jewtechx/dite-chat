import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { handleMethodsNotAllowed } from './utils';
import { SIGNUP_ROUTE } from './utils/index';

interface BodyInterface {
  email: string;
  password: string;
}

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body('email').isEmail().withMessage('Email must be in a valid format'),
    body('password')
      .isLength({ min: 8, max: 32 })
      .withMessage('Password must be in a valid format'),
    body('password')
      .matches(/^(.*[a-z].*)$/)
      .withMessage('Password must contain atleast one lowercase letter'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)
      .withMessage('Password must contain atleast one uppercase letter'),
  ],
  (req: Request<BodyInterface>, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).send({});
    }

    if (/.+@[A-Z]/g.test(req.body.email)) {
      res.status(422).send({});
    }

    if (/[><'"/]/g.test(req.body.password)) {
      res.status(422).send({});
    }
  },
);

signUpRouter.options(SIGNUP_ROUTE, (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Orign', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Authorization,Content-Length, X-Requested-With',
  );
  res.sendStatus(200);
});

signUpRouter.get(SIGNUP_ROUTE, handleMethodsNotAllowed);
signUpRouter.put(SIGNUP_ROUTE, handleMethodsNotAllowed);
signUpRouter.patch(SIGNUP_ROUTE, handleMethodsNotAllowed);
signUpRouter.delete(SIGNUP_ROUTE, handleMethodsNotAllowed);

export default signUpRouter;
