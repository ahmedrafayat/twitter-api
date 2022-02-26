import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';

export const listown = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: ownerId will be removed once authentication is set up
  const { ownerId } = req.body;

  try {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(ownerId);
    const tweets = await user.tweets;

    res.send(tweets);
  } catch (err) {}
};
