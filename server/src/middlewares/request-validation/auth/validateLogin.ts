import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

import { validator } from 'middlewares/request-validation/validator';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  validator([
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must contain minimum 6 and maximum 20 characters'),
  ])(req, res, next);
};
