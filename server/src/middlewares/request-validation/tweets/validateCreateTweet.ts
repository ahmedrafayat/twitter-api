import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { validator } from 'middlewares/request-validation/validator';

const TWEET_MINIMUM_CHARACTER = 5;

const getCharacterLength = (text: string) => {
  return text.replace(/(?:\r\n|\r|\n|\s)/gm, '').length;
};

export const validateCreateTweet = (req: Request, res: Response, next: NextFunction) => {
  validator([
    body('content')
      .custom((value) => {
        return getCharacterLength(value) >= TWEET_MINIMUM_CHARACTER;
      })
      .withMessage(`Tweet must contain atleast ${TWEET_MINIMUM_CHARACTER} characters`),
  ])(req, res, next);
};
