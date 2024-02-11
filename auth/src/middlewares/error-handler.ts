import { NextFunction } from 'express';
import BaseCustomError from '../errors/base-custom-error';

const errhandler = (err: Error, _: any, res: any, next: NextFunction) => {
  if (err instanceof BaseCustomError) {
    return res.status(err.getStatusCode());
  }
};

export default errhandler;
