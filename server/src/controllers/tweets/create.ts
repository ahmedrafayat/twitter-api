import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';

import { User } from '../../typeorm/entities/User';

import { Tweet } from './../../typeorm/entities/Tweet';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  // ownerId will be removed once authentication is set up
  const { content, ownerId } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne(ownerId);

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id ${ownerId} does not exist`, [
        'User not found.',
      ]);
      return next(customError);
    }

    const tweetRepository = await getRepository(Tweet);
    const tweet = new Tweet();
    tweet.author = user;
    const savedTweet = await tweetRepository.save(tweet);
    res.status(200).send(savedTweet);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
