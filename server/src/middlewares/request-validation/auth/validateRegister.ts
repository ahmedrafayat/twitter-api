import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { validator } from 'middlewares/request-validation/validator';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  validator([
    body('email').isEmail().withMessage('Invalid email'),
    body('name').notEmpty().withMessage('Name is required'),
    body('passwordConfirm').notEmpty(),
    body('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must contain minimum 6 and maximum 20 characters')
      .custom((value, { req }) => {
        return req.body.passwordConfirm === value;
      })
      .withMessage('Passwords do not match'),
  ])(req, res, next);
};
