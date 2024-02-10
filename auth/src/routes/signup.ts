import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SIGNUP_ROUTE } from './utils';
import { User } from '../models';

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body('email')
      .isEmail()
      .withMessage('Email must be in a valid format')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage('Password must be between 8 and 32 characters'),
    body('password')
      .matches(/^(.*[a-z].*)$/)
      .withMessage('Password must contain at least one lowercase letter'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)
      .withMessage('Password must contain at least one uppercase letter'),
    body('password')
      .matches(/^(.*\d.*)$/)
      .withMessage('Password must contain at least one digit'),
    body('password').escape(),
  ],
  async (req: Request, res: Response) => {
    // const errors = validationResult(req).array();

    if (/.+@[A-Z]/g.test(req.body.email)) {
      res.status(422);
    }

    if (/[><'"/]/g.test(req.body.password)) {
      res.status(422);
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.sendStatus(422);
    }

    const newUser = new User({ email, password });

    await newUser.save();

    res.status(201).send({ email: req.body.email });
  },
);

export default signUpRouter;

// signUpRouter.options(SIGNUP_ROUTE, (req: Request, res: Response) => {
//   res.header('Access-Control-Allow-Orign', '*');
//   res.header('Access-Control-Allow-Methods', 'POST');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type,Authorization,Content-Length, X-Requested-With',
//   );
// });

// signUpRouter.get(SIGNUP_ROUTE, handleMethodsNotAllowed);
// signUpRouter.put(SIGNUP_ROUTE, handleMethodsNotAllowed);
// signUpRouter.patch(SIGNUP_ROUTE, handleMethodsNotAllowed);
// signUpRouter.delete(SIGNUP_ROUTE, handleMethodsNotAllowed);
