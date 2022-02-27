import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';

import { validator } from 'middlewares/request-validation/validator';

export const validateFollowUser = (req: Request, res: Response, next: NextFunction) => {
  validator([
    param('id')
      .isInt({ gt: 0 })
      .withMessage('Invalid user id')
      .custom((value, { req }) => {
        const ownerId = req.user.id;
        return String(ownerId) !== value;
      })
      .withMessage("You cannot follow yourself, that's just silly"),
  ])(req, res, next);
};
