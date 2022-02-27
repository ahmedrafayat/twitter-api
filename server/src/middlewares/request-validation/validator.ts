import { NextFunction, Request, Response } from 'express';
import { Result, ValidationChain, ValidationError, validationResult } from 'express-validator';

import { CustomError } from 'response/CustomError';

import { ErrorValidation } from './../../response/types/ErrorValidation';

const getErrors = (validatorErrors: Result<ValidationError>) => {
  return validatorErrors.array().map((error) => {
    const customError: ErrorValidation = {};
    customError[error.param] = error.msg;
    return customError;
  });
};

export const validator = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const customError = new CustomError(
        400,
        'Validation',
        'Request validation failure',
        null,
        null,
        getErrors(errors)
      );
      return next(customError);
    }

    next();
  };
};
