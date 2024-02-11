import { ValidationError } from 'express-validator';
import BaseCustomError from './base-custom-error';
import { serializeErrorOutput, serializedErrorField } from './types/serialize-output-erors';

export type InvalidInputConstructorErrorsParam = ValidationError[];

export default class InvalidInput extends BaseCustomError {
  private readonly errors: ValidationError[] | undefined;

  private statusCode = 422;

  private defaultErrorMessage = 'The input provided is invalid';

  constructor(errors?: InvalidInputConstructorErrorsParam) {
    super('Input does not match validation criteria');
    this.errors = errors;

    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): serializeErrorOutput {
    return this.parseValidationErrors();
  }

  private parseValidationErrors(): serializeErrorOutput {
    const parsedErrors: serializedErrorField = {}

    if (this.errors && this.errors.length > 0) {
        this.errors.forEach((error) => {
          if (parsedErrors[error.path]) {
            parsedErrors[error.path].push(error.msg);
          } else {
            parsedErrors[error.path] = [error.msg];
          }
        });
      }
      
    return {
      errors: [
        {
          message: this.defaultErrorMessage,
          fields: parsedErrors
        },
      ],
    };
  }
}
