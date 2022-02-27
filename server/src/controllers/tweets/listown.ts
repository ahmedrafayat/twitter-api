import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { User } from 'typeorm/entities/User';

export const listown = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user.id;

  try {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(ownerId);
    const tweets = await user.tweets;

    res.send(tweets);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    next(customError);
  }
};
