import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';

import { Tweet } from '../../typeorm/entities/Tweet';
import { User } from '../../typeorm/entities/User';

export const listown = async (req: Request, res: Response, next: NextFunction) => {
  // ownerId will be removed once authentication is set up
  const { ownerId } = req.body;

  try {
    const tweetRepository = getRepository(Tweet);

    const tweets = await tweetRepository.find({
      where: {
        author: ownerId,
      },
    });

    res.send(tweets);
  } catch (err) {}
};
